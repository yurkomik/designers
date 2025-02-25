import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Info, Search, Send, Star, Bell, Settings, ChevronDown } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from "@/lib/theme-context"

// Lazy load the calendar to avoid issues if the package is not installed
const Calendar = React.lazy(() => import("@/components/ui/calendar").then(mod => ({
  default: mod.Calendar
})))

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]

const salesData = [
  { month: 'W1', sales: 1200 },
  { month: 'W2', sales: 900 },
  { month: 'W3', sales: 1500 },
  { month: 'W4', sales: 2000 },
  { month: 'W5', sales: 1700 },
]

export function ThemePreview() {
  const { colors } = useTheme()

  // Create dynamic styles based on theme colors
  const styles = {
    primary: { backgroundColor: colors.primary, color: 'white' },
    secondary: { backgroundColor: colors.secondary },
    accent: { backgroundColor: colors.accent },
    neutral: { backgroundColor: colors.neutral },
    info: { backgroundColor: colors.info },
    success: { backgroundColor: colors.success },
    warning: { backgroundColor: colors.warning },
    error: { backgroundColor: colors.error },
  }

  return (
    <Card className="w-full min-w-[300px]">
      <CardContent className="p-8 w-full">
        <Tabs defaultValue="inputs" className="w-full">
          <TabsList className="w-full flex justify-start mb-4">
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="inputs" className="space-y-6">
            <div className="grid gap-6 w-full">
              <div className="space-y-2 max-w-lg">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for events..." className="pl-9" />
                </div>
              </div>
              <div className="space-y-2 max-w-lg">
                <Label>Text Input</Label>
                <Input placeholder="Enter some text..." className="w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              <div className="space-y-2 max-w-lg">
                <Label>Slider</Label>
                <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="space-y-2">
                <Label>Radio Group</Label>
                <RadioGroup defaultValue="option-one" className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="buttons" className="space-y-6">
            <div className="grid gap-6 w-full">
              <div className="flex flex-wrap gap-2 items-start">
                <Button style={styles.primary}>Primary</Button>
                <Button variant="secondary" style={styles.secondary}>Secondary</Button>
                <Button variant="outline" style={{ borderColor: colors.accent }}>Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2 items-start">
                <Button size="sm" style={styles.primary}>Small</Button>
                <Button size="default" style={styles.primary}>Default</Button>
                <Button size="lg" style={styles.primary}>Large</Button>
              </div>
              <div className="flex flex-wrap gap-2 items-start">
                <Button disabled style={styles.primary}>Disabled</Button>
                <Button variant="destructive" style={styles.error}>Destructive</Button>
                <Button variant="outline" className="gap-2" style={{ borderColor: colors.primary }}>
                  <Info className="h-4 w-4" />
                  With Icon
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 items-start">
                <Button variant="outline" size="icon" style={{ borderColor: colors.primary }}>
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" style={{ borderColor: colors.primary }}>
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" style={{ borderColor: colors.primary }}>
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <div className="grid gap-6 w-full">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Badges</h4>
                <div className="flex gap-2">
                  <Badge style={styles.primary}>Default</Badge>
                  <Badge variant="secondary" style={styles.secondary}>Secondary</Badge>
                  <Badge variant="outline" style={{ borderColor: colors.accent }}>Outline</Badge>
                  <Badge variant="destructive" style={styles.error}>Destructive</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Progress</h4>
                <Progress value={60} className="w-full" style={styles.primary} />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Cards</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback style={styles.primary}>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-medium">John Doe</h5>
                          <p className="text-sm text-muted-foreground">Software Engineer</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium">Status</h5>
                          <Badge variant="outline" style={{ borderColor: colors.success }}>Active</Badge>
                        </div>
                        <Progress value={80} className="w-full" style={styles.success} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Messages</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${colors.info}20` }}>
                    <Info className="h-4 w-4" style={{ color: colors.info }} />
                    <p className="text-sm">There are 9 new messages</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${colors.error}20`, color: colors.error }}>
                    <Info className="h-4 w-4" />
                    <p className="text-sm">Access denied</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid gap-6 w-full">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Orders</h4>
                <div className="space-y-2">
                  {['Charlie Chapman', 'Howard Hudson', 'Fiona Fisher', 'Nick Nelson', 'Amanda Anderson'].map((name, i) => (
                    <div key={name} className="flex items-center justify-between p-2 border rounded-lg">
                      <span>{name}</span>
                      <Badge 
                        style={i === 0 ? styles.primary : i === 1 ? styles.error : { borderColor: colors.primary }}
                        variant={i === 0 ? 'default' : i === 1 ? 'destructive' : 'outline'}
                      >
                        {i === 0 ? 'Send' : i === 1 ? 'Failed' : 'Completed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Revenue</h4>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-bold">$32,400</h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <ChevronDown className="h-4 w-4" style={{ color: colors.success }} />
                        21% more than last month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid gap-6 w-full">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sales Overview</h4>
                <Card>
                  <CardContent className="p-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke={colors.primary} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <p>Sales volume reached $12,450 this week</p>
                      <p>15% increase</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Weekly Performance</h4>
                <Card>
                  <CardContent className="p-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="sales" fill={colors.primary} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 