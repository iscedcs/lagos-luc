"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorPicker } from "./color-picker"

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("system")
  const [highContrast, setHighContrast] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [fontSize, setFontSize] = useState(16)
  const [primaryColor, setPrimaryColor] = useState("#10b981") // emerald-500
  const [logoVariant, setLogoVariant] = useState("default")

  const handleSave = () => {
    // Save appearance settings
    console.log({
      theme,
      highContrast,
      animationsEnabled,
      fontSize,
      primaryColor,
      logoVariant,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Theme</h3>
          <p className="text-sm text-muted-foreground">Choose your preferred color theme</p>
        </div>

        <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="light" id="light" className="sr-only" />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 cursor-pointer [&:has([data-state=checked])]:border-emerald-500"
            >
              <div className="w-full h-12 rounded bg-white border"></div>
              <span className="mt-2">Light</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="dark" id="dark" className="sr-only" />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 cursor-pointer [&:has([data-state=checked])]:border-emerald-500"
            >
              <div className="w-full h-12 rounded bg-gray-900 border"></div>
              <span className="mt-2">Dark</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="system" id="system" className="sr-only" />
            <Label
              htmlFor="system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 cursor-pointer [&:has([data-state=checked])]:border-emerald-500"
            >
              <div className="w-full h-12 rounded bg-gradient-to-r from-white to-gray-900 border"></div>
              <span className="mt-2">System</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Accessibility</h3>
          <p className="text-sm text-muted-foreground">Configure accessibility settings</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
            </div>
            <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Animations</Label>
              <p className="text-sm text-muted-foreground">Enable or disable UI animations</p>
            </div>
            <Switch id="animations" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="font-size">Font Size ({fontSize}px)</Label>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Default</span>
              <span>Large</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Branding</h3>
          <p className="text-sm text-muted-foreground">Customize branding elements</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <ColorPicker color={primaryColor} onChange={setPrimaryColor} id="primary-color" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo-variant">Logo Variant</Label>
            <Select value={logoVariant} onValueChange={setLogoVariant}>
              <SelectTrigger id="logo-variant">
                <SelectValue placeholder="Select logo variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="monochrome">Monochrome</SelectItem>
                <SelectItem value="colorful">Colorful</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
}

