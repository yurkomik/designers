"use client"

import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Camera, Cloud, Compass, Eye, Map, Sun, Moon, Droplets, Snowflake, AlertCircle, Settings } from 'lucide-react'
import WeatherEffects from './weather-effects'
import CityScene from './city-scene'
import CameraController from './camera-controller'
import { WeatherData, getWeatherData } from './weather-service'

// Sample test locations
const SAMPLE_LOCATIONS = [
  { name: "New York", coords: { lat: 40.7128, lon: -74.006 } },
  { name: "London", coords: { lat: 51.5074, lon: -0.1278 } },
  { name: "Tokyo", coords: { lat: 35.6762, lon: 139.6503 } },
  { name: "Sydney", coords: { lat: -33.8688, lon: 151.2093 } },
  { name: "Rio de Janeiro", coords: { lat: -22.9068, lon: -43.1729 } },
]

// Camera view modes
const VIEW_MODES = {
  OVERVIEW: 'overview',
  STREET: 'street',
  AERIAL: 'aerial',
  CLOSEUP: 'closeup'
}

export default function WeatherWidget() {
  const [isClient, setIsClient] = useState(false)
  const [location, setLocation] = useState("New York")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentView, setCurrentView] = useState(VIEW_MODES.OVERVIEW)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [performanceMode, setPerformanceMode] = useState(false)
  const cameraRef = useRef<any>(null)
  
  // Handle switching camera views
  const handleViewChange = (view: string) => {
    if (cameraRef.current?.changeView) {
      cameraRef.current.changeView(view)
      setCurrentView(view)
    }
  }
  
  // Client-side only
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Auto-hide notifications after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])
  
  // Auto-enable performance mode at night
  useEffect(() => {
    if (weatherData && !weatherData.isDay) {
      setPerformanceMode(true);
    }
  }, [weatherData?.isDay]);
  
  // Simple notification system
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
  }
  
  // Fetch weather data for a location
  const fetchWeather = async (locationName: string) => {
    if (!isClient) return
    
    try {
      setLoading(true)
      const data = await getWeatherData(locationName)
      setWeatherData(data)
      setLoading(false)
      
      showNotification(`Weather for ${data.location}: ${data.condition}, ${data.temperature}°C`, 'success')
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setLoading(false)
      
      showNotification("Could not get weather data for this location", 'error')
    }
  }
  
  // Load weather for a sample location
  const loadSampleLocation = (location: { name: string, coords: { lat: number, lon: number } }) => {
    setLocation(location.name)
    fetchWeather(location.name)
  }
  
  // Load weather for user's current location
  const loadUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
            )
            const data = await response.json()
            if (data && data.length > 0) {
              const locationName = data[0].name
              setLocation(locationName)
              fetchWeather(locationName)
            } else {
              setLoading(false)
              
              showNotification("Could not determine your location name", 'error')
            }
          } catch (error) {
            console.error('Error loading user location:', error)
            setLoading(false)
            
            showNotification("Could not get your current location", 'error')
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          setLoading(false)
          
          showNotification(error.message || "Could not access your location", 'error')
        }
      )
    } else {
      showNotification("Your browser does not support geolocation", 'error')
    }
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeather(location)
  }
  
  // Toggle time of day (day/night)
  const toggleTimeOfDay = () => {
    if (weatherData) {
      setWeatherData({
        ...weatherData,
        isDay: !weatherData.isDay
      })
    }
  }
  
  // Change weather condition
  const changeWeatherCondition = (condition: string) => {
    if (weatherData) {
      setWeatherData({
        ...weatherData,
        condition
      })
    }
  }
  
  // Weather conditions for selection
  const weatherConditions = [
    { value: "clear", label: "Clear", icon: Sun },
    { value: "partly cloudy", label: "Partly Cloudy", icon: Cloud },
    { value: "cloudy", label: "Cloudy", icon: Cloud },
    { value: "rainy", label: "Rainy", icon: Droplets },
    { value: "stormy", label: "Stormy", icon: Cloud },
    { value: "thunderstorm", label: "Thunderstorm", icon: Cloud },
    { value: "snowy", label: "Snowy", icon: Snowflake },
    { value: "foggy", label: "Foggy", icon: Cloud }
  ]
  
  // Get the right icon for current weather
  const getWeatherIcon = () => {
    if (!weatherData) return Sun
    const condition = weatherData.condition.toLowerCase()
    const foundCondition = weatherConditions.find(c => 
      condition.includes(c.value.toLowerCase())
    )
    return foundCondition?.icon || Sun
  }
  
  // Get the right day/night icon
  const TimeIcon = weatherData?.isDay ? Sun : Moon
  
  // Get background style based on time of day
  const getCardStyle = () => {
    if (!weatherData) {
      // Default styling for initial state (light blue sky, daytime)
      return {
        background: 'linear-gradient(to bottom, #87ceeb, #e0f7fa)',
        color: '#000000' 
      }
    }
    
    return {
      background: weatherData.isDay
        ? 'linear-gradient(to bottom, #87ceeb, #e0f7fa)'
        : 'linear-gradient(to bottom, #1a237e, #311b92)',
      color: weatherData.isDay ? '#000000' : '#ffffff'
    }
  }
  
  // Initialize with default weather data instead of null
  useEffect(() => {
    if (isClient && !weatherData) {
      // Set default weather data for New York on initial load
      fetchWeather("New York");
    }
  }, [isClient]);
  
  // Style for city selection buttons to ensure they're visible in both light/dark modes
  const cityButtonStyle = {
    border: '1px solid rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: weatherData?.isDay ? '#000000' : '#ffffff',
    transition: 'all 0.2s ease',
    margin: '0.25rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
  }
  
  // Style for control buttons to ensure visibility in both day/night modes
  const controlButtonStyle = {
    border: weatherData?.isDay ? '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(255,255,255,0.5)',
    backgroundColor: weatherData?.isDay ? 'rgba(255,255,255,0.2)' : 'rgba(30,30,80,0.4)',
    color: weatherData?.isDay ? '#000000' : '#ffffff',
  }
  
  // Style for camera view buttons
  const cameraButtonStyle = {
    border: weatherData?.isDay ? '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(255,255,255,0.5)',
    backgroundColor: weatherData?.isDay ? 'white' : 'rgba(30,30,80,0.6)',
    color: weatherData?.isDay ? '#000000' : '#ffffff',
  }
  
  // Don't render 3D content on server
  if (!isClient) {
    return <Card className="w-full h-[600px] flex items-center justify-center">
      <CardContent>Loading 3D Weather Widget...</CardContent>
    </Card>
  }
  
  const WeatherIcon = getWeatherIcon()
  
  return (
    <Card className="w-full" style={getCardStyle()}>
      <CardContent className="p-0">
        {/* Notification */}
        {notification && (
          <div className={`p-3 mx-4 mt-4 rounded-md flex items-center gap-2 ${
            notification.type === 'success' 
              ? 'bg-green-500/20 text-green-700 dark:text-green-300' 
              : 'bg-red-500/20 text-red-700 dark:text-red-300'
          }`}>
            <AlertCircle className="h-4 w-4" />
            {notification.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[700px]">
          {/* 3D Weather Scene */}
          <div className="col-span-2 relative h-full">
            <Canvas 
              shadows={!performanceMode} // Disable shadows in performance mode
              dpr={performanceMode ? 1 : [1, 2]} // Reduce pixel ratio in performance mode
              frameloop={performanceMode ? "demand" : "always"} // Only render frames when needed in performance mode
              gl={{
                antialias: true,
                alpha: false, // Disable alpha for better performance
                stencil: false, // Disable stencil for better performance
                depth: true, // Keep depth testing
                logarithmicDepthBuffer: true, // Help with z-fighting
                precision: 'highp', // High precision for depth calculations
              }}
              camera={{
                near: 0.1,
                far: 1000,
                position: [0, 30, 60],
                fov: 45
              }}
            >
              <CameraController 
                initialView={VIEW_MODES.OVERVIEW}
                onViewChange={setCurrentView}
                ref={cameraRef}
              />
              {/* Use default weather data if none is available */}
              <WeatherEffects weatherData={weatherData || { 
                isDay: true, 
                condition: 'clear',
                location: 'Loading...',
                temperature: 20,
                conditionCode: 800,
                humidity: 50,
                windSpeed: 5,
                pressure: 1015,
                icon: '01d',
                sunrise: '06:00',
                sunset: '18:00',
                performanceMode: performanceMode
              }} />
              <CityScene weatherData={weatherData || { 
                isDay: true, 
                condition: 'clear',
                location: 'Loading...',
                temperature: 20,
                conditionCode: 800,
                humidity: 50,
                windSpeed: 5,
                pressure: 1015,
                icon: '01d',
                sunrise: '06:00',
                sunset: '18:00',
                performanceMode: performanceMode
              }} />
            </Canvas>
            
            {/* Camera view controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <TooltipProvider>
                {[
                  { id: VIEW_MODES.OVERVIEW, label: "Overview", icon: Map },
                  { id: VIEW_MODES.STREET, label: "Street View", icon: Compass },
                  { id: VIEW_MODES.AERIAL, label: "Aerial View", icon: Eye },
                  { id: VIEW_MODES.CLOSEUP, label: "Close-up", icon: Camera }
                ].map((view) => (
                  <Tooltip key={view.id}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={currentView === view.id ? "default" : "outline"}
                        onClick={() => handleViewChange(view.id)}
                        style={cameraButtonStyle}
                      >
                        <view.icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {view.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
          
          {/* Controls panel */}
          <div className="p-6 flex flex-col space-y-6" style={{ 
            color: weatherData?.isDay ? '#000000' : '#ffffff',
            borderLeft: `1px solid ${weatherData?.isDay ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}` 
          }}>
            <div>
              <h2 className="text-2xl font-bold mb-2">Weather Controls</h2>
              <p className="text-sm opacity-70">
                Enter a location or select a sample city to view its weather conditions.
              </p>
            </div>
            
            {/* Location form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city name"
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Search"}
                </Button>
              </div>
            </form>
            
            {/* Sample locations */}
            <div>
              <h3 className="text-sm font-medium mb-2">Sample Locations</h3>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_LOCATIONS.map((loc) => (
                  <Button 
                    key={loc.name}
                    variant="outline"
                    size="sm"
                    onClick={() => loadSampleLocation(loc)}
                    style={cityButtonStyle}
                  >
                    {loc.name}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadUserLocation}
                  style={cityButtonStyle}
                >
                  My Location
                </Button>
              </div>
            </div>
            
            {/* Weather information */}
            {weatherData && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <WeatherIcon className="h-5 w-5" />
                    {weatherData.location}
                  </h3>
                  <p className="text-sm">
                    {weatherData.condition}, {weatherData.temperature}°C
                  </p>
                  <p className="text-sm">
                    Wind: {weatherData.windSpeed} km/h
                  </p>
                </div>
                
                {/* Weather controls */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Simulation Controls</h3>
                  
                  <div className="flex flex-col gap-2">
                    {/* Time of day toggle */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleTimeOfDay}
                      className="flex items-center gap-2"
                      style={controlButtonStyle}
                    >
                      <TimeIcon className="h-4 w-4" />
                      {weatherData.isDay ? "Switch to Night" : "Switch to Day"}
                    </Button>
                    
                    {/* Performance mode toggle */}
                    <Button 
                      variant={performanceMode ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setPerformanceMode(!performanceMode)}
                      className="flex items-center gap-2"
                      style={controlButtonStyle}
                    >
                      <Settings className="h-4 w-4" />
                      {performanceMode ? "Performance Mode: ON" : "Performance Mode: OFF"}
                    </Button>
                  </div>
                  
                  {/* Weather condition select */}
                  <div>
                    <label className="text-sm block mb-1">Weather Condition</label>
                    <Select 
                      value={weatherData.condition.toLowerCase()} 
                      onValueChange={changeWeatherCondition}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select weather" />
                      </SelectTrigger>
                      <SelectContent>
                        {weatherConditions.map((condition) => (
                          <SelectItem key={condition.value} value={condition.value}>
                            <div className="flex items-center gap-2">
                              <condition.icon className="h-4 w-4" />
                              {condition.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Information section */}
            <div className="mt-auto text-xs opacity-70">
              <p>Use the buttons at the bottom of the 3D view to change camera angles.</p>
              <p>Weather data provided by OpenWeatherMap API.</p>
              <p>Press keys 1-4 to quickly switch between camera views.</p>
              {!weatherData?.isDay && (
                <p className="text-amber-400">Night scenes may be graphically intensive. Enable Performance Mode if experiencing lag.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 