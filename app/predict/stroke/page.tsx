"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Brain, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StrokePredictionPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | { probability: number; risk: string }>(null)

  // Update the formData state
  const [formData, setFormData] = useState({
    age: 45,
    hypertension: "0",
    heart_disease: "0",
    avg_glucose_level: 100,
    bmi: 25,
    gender: "Male",
    residence_type: "Urban",
    smoking_status: "never_smoked",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      // In a real app, this would be a fetch to your Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict/stroke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      // Simulate a response for demonstration
      // In a real app, you would use: const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock result for demonstration
      const mockProbability = Math.random() * 0.5 // Lower probability for stroke
      const mockRisk = mockProbability > 0.3 ? "High" : mockProbability > 0.1 ? "Moderate" : "Low"

      setResult({
        probability: mockProbability,
        risk: mockRisk,
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Prediction Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Also update the resetForm function:
  const resetForm = () => {
    setResult(null)
    setFormData({
      age: 45,
      hypertension: "0",
      heart_disease: "0",
      avg_glucose_level: 100,
      bmi: 25,
      gender: "Male",
      residence_type: "Urban",
      smoking_status: "never_smoked",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="flex items-center justify-center mb-8">
        <Brain className="h-10 w-10 text-purple-500 mr-4" />
        <h1 className="text-4xl font-bold">Stroke Risk Prediction</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This tool provides an estimate based on the information you provide and should not be considered a medical
            diagnosis. Always consult with healthcare professionals for proper medical advice.
          </AlertDescription>
        </Alert>

        {result ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Your Stroke Risk Assessment</CardTitle>
              <CardDescription className="text-center">Based on the information you provided</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-8 bg-primary/10 mb-4">
                  <Brain
                    className={`h-16 w-16 ${
                      result.risk === "High"
                        ? "text-red-500"
                        : result.risk === "Moderate"
                          ? "text-amber-500"
                          : "text-green-500"
                    }`}
                  />
                </div>
                <h2 className="text-3xl font-bold mb-2">{result.risk} Risk</h2>
                <p className="text-muted-foreground">Estimated probability: {(result.probability * 100).toFixed(1)}%</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">What does this mean?</h3>
                {result.risk === "High" && (
                  <p className="text-muted-foreground">
                    A high risk assessment suggests you may have an elevated risk of experiencing a stroke. It's
                    recommended to consult with a healthcare professional for a thorough evaluation.
                  </p>
                )}
                {result.risk === "Moderate" && (
                  <p className="text-muted-foreground">
                    A moderate risk assessment suggests you have some risk factors for stroke. Consider discussing these
                    results with your healthcare provider during your next visit.
                  </p>
                )}
                {result.risk === "Low" && (
                  <p className="text-muted-foreground">
                    A low risk assessment suggests you currently have a lower risk of experiencing a stroke. Continue
                    maintaining a healthy lifestyle to keep your risk low.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={resetForm}>Start New Assessment</Button>
            </CardFooter>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Health Information</CardTitle>
                <CardDescription>Fill in the form below to get your stroke risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{formData.age} years</span>
                    </div>
                    <Slider
                      id="age"
                      min={20}
                      max={90}
                      step={1}
                      value={[formData.age]}
                      onValueChange={(value) => handleSliderChange("age", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hypertension">Hypertension</Label>
                    <RadioGroup
                      id="hypertension"
                      value={formData.hypertension}
                      onValueChange={(value) => handleSelectChange("hypertension", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="hypertension-yes" />
                        <Label htmlFor="hypertension-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="hypertension-no" />
                        <Label htmlFor="hypertension-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heart_disease">Heart Disease</Label>
                    <RadioGroup
                      id="heart_disease"
                      value={formData.heart_disease}
                      onValueChange={(value) => handleSelectChange("heart_disease", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="heart-disease-yes" />
                        <Label htmlFor="heart-disease-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="heart-disease-no" />
                        <Label htmlFor="heart-disease-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avg_glucose_level">Average Glucose Level (mg/dL)</Label>
                    <Input
                      id="avg_glucose_level"
                      name="avg_glucose_level"
                      type="number"
                      value={formData.avg_glucose_level}
                      onChange={handleInputChange}
                      min={50}
                      max={300}
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bmi">BMI</Label>
                    <Input
                      id="bmi"
                      name="bmi"
                      type="number"
                      value={formData.bmi}
                      onChange={handleInputChange}
                      min={10}
                      max={50}
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="residence_type">Residence Type</Label>
                    <RadioGroup
                      id="residence_type"
                      value={formData.residence_type}
                      onValueChange={(value) => handleSelectChange("residence_type", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Urban" id="residence-urban" />
                        <Label htmlFor="residence-urban">Urban</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rural" id="residence-rural" />
                        <Label htmlFor="residence-rural">Rural</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smoking_status">Smoking Status</Label>
                    <Select
                      value={formData.smoking_status}
                      onValueChange={(value) => handleSelectChange("smoking_status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never_smoked">Never Smoked</SelectItem>
                        <SelectItem value="formerly_smoked">Formerly Smoked</SelectItem>
                        <SelectItem value="smokes">Smokes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Get Prediction"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        )}
      </div>
    </div>
  )
}

