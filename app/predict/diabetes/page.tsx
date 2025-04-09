"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Droplet, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DiabetesPredictionPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | { probability: number; risk: string }>(null)

  // Update the formData state
  const [formData, setFormData] = useState({
    age: 45,
    gender: "1",
    bmi: 25,
    sbp: 120,
    dbp: 80,
    fpg: 100,
    chol: 200,
    hdl: 50,
    ldl: 130,
    bun: 15,
    ccr: 90,
    ffpg: 95,
    smoking_status: "0",
    drinking_status: "0",
    family_history: "0",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      // In a real app, this would be a fetch to your Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict/diabetes", {
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
      const mockProbability = Math.random() * 0.8
      const mockRisk = mockProbability > 0.6 ? "High" : mockProbability > 0.3 ? "Moderate" : "Low"

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
      gender: "1",
      bmi: 25,
      sbp: 120,
      dbp: 80,
      fpg: 100,
      chol: 200,
      hdl: 50,
      ldl: 130,
      bun: 15,
      ccr: 90,
      ffpg: 95,
      smoking_status: "0",
      drinking_status: "0",
      family_history: "0",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="flex items-center justify-center mb-8">
        <Droplet className="h-10 w-10 text-blue-500 mr-4" />
        <h1 className="text-4xl font-bold">Diabetes Risk Prediction</h1>
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
              <CardTitle className="text-center">Your Diabetes Risk Assessment</CardTitle>
              <CardDescription className="text-center">Based on the information you provided</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-8 bg-primary/10 mb-4">
                  <Droplet
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
                    A high risk assessment suggests you may have an elevated risk of developing diabetes. It's
                    recommended to consult with a healthcare professional for a thorough evaluation.
                  </p>
                )}
                {result.risk === "Moderate" && (
                  <p className="text-muted-foreground">
                    A moderate risk assessment suggests you have some risk factors for diabetes. Consider discussing
                    these results with your healthcare provider during your next visit.
                  </p>
                )}
                {result.risk === "Low" && (
                  <p className="text-muted-foreground">
                    A low risk assessment suggests you currently have a lower risk of developing diabetes. Continue
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
                <CardDescription>Fill in the form below to get your diabetes risk assessment</CardDescription>
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
                    <Label htmlFor="gender">Gender</Label>
                    <RadioGroup
                      id="gender"
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="gender-male" />
                        <Label htmlFor="gender-male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="gender-female" />
                        <Label htmlFor="gender-female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bmi">Body Mass Index (BMI)</Label>
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
                    <Label htmlFor="sbp">Systolic Blood Pressure (mmHg)</Label>
                    <Input
                      id="sbp"
                      name="sbp"
                      type="number"
                      value={formData.sbp}
                      onChange={handleInputChange}
                      min={80}
                      max={250}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dbp">Diastolic Blood Pressure (mmHg)</Label>
                    <Input
                      id="dbp"
                      name="dbp"
                      type="number"
                      value={formData.dbp}
                      onChange={handleInputChange}
                      min={40}
                      max={150}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fpg">Fasting Plasma Glucose (mg/dL)</Label>
                    <Input
                      id="fpg"
                      name="fpg"
                      type="number"
                      value={formData.fpg}
                      onChange={handleInputChange}
                      min={50}
                      max={300}
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chol">Cholesterol (mg/dL)</Label>
                    <Input
                      id="chol"
                      name="chol"
                      type="number"
                      value={formData.chol}
                      onChange={handleInputChange}
                      min={100}
                      max={500}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hdl">HDL Cholesterol (mg/dL)</Label>
                    <Input
                      id="hdl"
                      name="hdl"
                      type="number"
                      value={formData.hdl}
                      onChange={handleInputChange}
                      min={20}
                      max={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ldl">LDL Cholesterol (mg/dL)</Label>
                    <Input
                      id="ldl"
                      name="ldl"
                      type="number"
                      value={formData.ldl}
                      onChange={handleInputChange}
                      min={50}
                      max={300}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bun">Blood Urea Nitrogen (mg/dL)</Label>
                    <Input
                      id="bun"
                      name="bun"
                      type="number"
                      value={formData.bun}
                      onChange={handleInputChange}
                      min={5}
                      max={50}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ccr">Creatinine Clearance Rate (mL/min)</Label>
                    <Input
                      id="ccr"
                      name="ccr"
                      type="number"
                      value={formData.ccr}
                      onChange={handleInputChange}
                      min={30}
                      max={150}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ffpg">Fasting FPG (mg/dL)</Label>
                    <Input
                      id="ffpg"
                      name="ffpg"
                      type="number"
                      value={formData.ffpg}
                      onChange={handleInputChange}
                      min={50}
                      max={300}
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smoking_status">Smoking Status</Label>
                    <RadioGroup
                      id="smoking_status"
                      value={formData.smoking_status}
                      onValueChange={(value) => handleSelectChange("smoking_status", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="smoking-yes" />
                        <Label htmlFor="smoking-yes">Smoker</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="smoking-no" />
                        <Label htmlFor="smoking-no">Non-smoker</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="drinking_status">Drinking Status</Label>
                    <RadioGroup
                      id="drinking_status"
                      value={formData.drinking_status}
                      onValueChange={(value) => handleSelectChange("drinking_status", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="drinking-yes" />
                        <Label htmlFor="drinking-yes">Drinker</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="drinking-no" />
                        <Label htmlFor="drinking-no">Non-drinker</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="family_history">Family History of Diabetes</Label>
                    <RadioGroup
                      id="family_history"
                      value={formData.family_history}
                      onValueChange={(value) => handleSelectChange("family_history", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="family-yes" />
                        <Label htmlFor="family-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="family-no" />
                        <Label htmlFor="family-no">No</Label>
                      </div>
                    </RadioGroup>
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

