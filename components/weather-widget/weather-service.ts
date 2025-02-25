import axios from 'axios';

// Types
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  conditionCode: number;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  isDay: boolean;
  sunrise: string;
  sunset: string;
}

// OpenWeatherMap API configuration
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch weather data for a given location
 * @param location - City name or coordinates
 * @returns Promise with weather data
 */
export async function getWeatherData(location: string = 'New York'): Promise<WeatherData> {
  try {
    // For demo purposes, we'll use a mock response if no API key is provided
    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
      return getMockWeatherData(location);
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric',
      }
    });
    
    const data = response.data;
    
    return {
      location: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      conditionCode: data.weather[0].id,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      isDay: isItDaytime(data.dt, data.sys.sunrise, data.sys.sunset),
      sunrise: formatTime(data.sys.sunrise * 1000),
      sunset: formatTime(data.sys.sunset * 1000)
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return getMockWeatherData(location); // Fallback to mock data
  }
}

// For backward compatibility
export const fetchWeatherData = getWeatherData;

/**
 * Helper function to determine if it's currently daytime
 */
function isItDaytime(current: number, sunrise: number, sunset: number): boolean {
  return current >= sunrise && current < sunset;
}

/**
 * Format Unix timestamp to readable time
 */
function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Provide mock weather data for development or when API key is not available
 */
function getMockWeatherData(location: string): WeatherData {
  // Generate varied weather conditions with appropriate lowercase names for our component
  const conditions = ['clear', 'partly cloudy', 'cloudy', 'rainy', 'stormy', 'thunderstorm', 'snowy', 'foggy'];
  const conditionCodes = [800, 801, 803, 500, 202, 200, 600, 741];
  const icons = ['01d', '02d', '03d', '10d', '11d', '11d', '13d', '50d'];
  
  const randomIndex = Math.floor(Math.random() * conditions.length);
  
  const now = new Date();
  const sunrise = new Date(now);
  sunrise.setHours(6, 0, 0, 0);
  
  const sunset = new Date(now);
  sunset.setHours(18, 0, 0, 0);
  
  const isDay = now > sunrise && now < sunset;
  
  return {
    location: location || 'New York',
    temperature: Math.floor(Math.random() * 35) - 5, // -5 to 30 celsius
    condition: conditions[randomIndex],
    conditionCode: conditionCodes[randomIndex],
    icon: icons[randomIndex],
    humidity: Math.floor(Math.random() * 100),
    windSpeed: Math.floor(Math.random() * 20),
    pressure: 1000 + Math.floor(Math.random() * 30),
    isDay: isDay,
    sunrise: '06:00',
    sunset: '18:00'
  };
} 