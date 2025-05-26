"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Copy, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type CharacterType = "numbers" | "lowercase" | "uppercase" | "special"

export default function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)
  const [characterTypes, setCharacterTypes] = useState<Record<CharacterType, boolean>>({
    numbers: true,
    lowercase: true,
    uppercase: true,
    special: false,
  })

  const generatePassword = () => {
    const numbers = "0123456789"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    if (characterTypes.numbers) chars += numbers
    if (characterTypes.lowercase) chars += lowercase
    if (characterTypes.uppercase) chars += uppercase
    if (characterTypes.special) chars += special

    // Ensure at least one character type is selected
    if (chars === "") {
      setCharacterTypes({ ...characterTypes, lowercase: true })
      chars = lowercase
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      newPassword += chars[randomIndex]
    }

    setPassword(newPassword)
  }

  const calculateStrength = () => {
    if (!password) return 0

    // Base score from length
    let score = Math.min(length / 30, 1) * 40

    // Add points for character variety
    const hasNumbers = /\d/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasSpecial = /[^A-Za-z0-9]/.test(password)

    const varietyCount = [hasNumbers, hasLowercase, hasUppercase, hasSpecial].filter(Boolean).length
    score += varietyCount * 15

    return Math.min(Math.round(score), 100)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  const handleCharacterTypeChange = (type: CharacterType, checked: boolean) => {
    setCharacterTypes({ ...characterTypes, [type]: checked })
  }

  useEffect(() => {
    generatePassword()
  }, [length, characterTypes])

  useEffect(() => {
    setStrength(calculateStrength())
  }, [password])

  const getStrengthLabel = () => {
    if (strength < 30) return "Fraca"
    if (strength < 60) return "Média"
    if (strength < 80) return "Forte"
    return "Muito Forte"
  }

  const getStrengthColor = () => {
    if (strength < 30) return "bg-red-500"
    if (strength < 60) return "bg-yellow-500"
    if (strength < 80) return "bg-green-500"
    return "bg-emerald-500"
  }

  const getCharacterColor = (char: string) => {
    if (/\d/.test(char)) return "text-blue-500"
    if (/[^A-Za-z0-9]/.test(char)) return "text-red-500"
    if (/[A-Z]/.test(char)) return "text-gray-600 dark:text-gray-400"
    return ""
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Configurações da Senha</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Senha Gerada</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={generatePassword} title="Gerar nova senha">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copiar senha">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            className="flex items-center w-full rounded-md border border-input bg-background px-3 py-2 text-base font-mono ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            tabIndex={0}
            role="textbox"
            aria-readonly="true"
          >
            {password.split('').map((char, index) => (
              <span key={index} className={getCharacterColor(char)}>
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Força da Senha</Label>
            <span className="text-sm font-medium">{getStrengthLabel()}</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className={cn("h-full transition-all", getStrengthColor())} style={{ width: `${strength}%` }} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="length">Tamanho da Senha: {length}</Label>
          </div>
          <Slider
            id="length"
            min={4}
            max={30}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>

        <div className="space-y-3">
          <Label>Incluir:</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={characterTypes.numbers}
                onCheckedChange={(checked) => handleCharacterTypeChange("numbers", checked as boolean)}
              />
              <Label htmlFor="numbers" className="cursor-pointer">
                Números
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={characterTypes.lowercase}
                onCheckedChange={(checked) => handleCharacterTypeChange("lowercase", checked as boolean)}
              />
              <Label htmlFor="lowercase" className="cursor-pointer">
                Letras Minúsculas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={characterTypes.uppercase}
                onCheckedChange={(checked) => handleCharacterTypeChange("uppercase", checked as boolean)}
              />
              <Label htmlFor="uppercase" className="cursor-pointer">
                Letras Maiúsculas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="special"
                checked={characterTypes.special}
                onCheckedChange={(checked) => handleCharacterTypeChange("special", checked as boolean)}
              />
              <Label htmlFor="special" className="cursor-pointer">
                Caracteres Especiais
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}