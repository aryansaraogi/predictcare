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
import { Heart, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CHDPredictionPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | { probability: number; risk: string }>(null)

  // Update the formData state
  const [formData, setFormData] = useState({
    male: 1,
    age: 45,
    education: 2,
    currentSmoker: 0,
    cigsPerDay: 0,
    BPMeds: 0,
    prevalentStroke: 0,
    prevalentHyp: 0,
    diabetes: 0,
    totChol: 200,
    sysBP: 120,
    diaBP: 80,
    BMI: 25,
    heartRate: 75,
    glucose: 100,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    // Convert string values to numbers for specific fields
    if (
      ["male", "education", "currentSmoker", "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes"].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number.parseInt(value, 10),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
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
      const response = await fetch("/api/predict/chd", {
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
      const mockProbability = Math.random()
      const mockRisk = mockProbability > 0.7 ? "High" : mockProbability > 0.3 ? "Moderate" : "Low"

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
      male: 1,
      age: 45,
      education: 2,
      currentSmoker: 0,
      cigsPerDay: 0,
      BPMeds: 0,
      prevalentStroke: 0,
      prevalentHyp: 0,
      diabetes: 0,
      totChol: 200,
      sysBP: 120,
      diaBP: 80,
      BMI: 25,
      heartRate: 75,
      glucose: 100,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="flex items-center justify-center mb-8">
        <Heart className="h-10 w-10 text-red-500 mr-4" />
        <h1 className="text-4xl font-bold">CHD Risk Prediction</h1>
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
              <CardTitle className="text-center">Your CHD Risk Assessment</CardTitle>
              <CardDescription className="text-center">Based on the information you provided</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full p-8 bg-primary/10 mb-4">
                  <Heart
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
                    A high risk assessment suggests you may have an elevated risk of developing coronary heart disease.
                    It's recommended to consult with a healthcare professional for a thorough evaluation.
                  </p>
                )}
                {result.risk === "Moderate" && (
                  <p className="text-muted-foreground">
                    A moderate risk assessment suggests you have some risk factors for coronary heart disease. Consider
                    discussing these results with your healthcare provider during your next visit.
                  </p>
                )}
                {result.risk === "Low" && (
                  <p className="text-muted-foreground">
                    A low risk assessment suggests you currently have a lower risk of developing coronary heart disease.
                    Continue maintaining a healthy lifestyle to keep your risk low.
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
                <CardDescription>Fill in the form below to get your CHD risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="male">Gender</Label>
                    <RadioGroup
                      id="male"
                      value={formData.male.toString()}
                      onValueChange={(value) => handleSelectChange("male", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="male-1" />
                        <Label htmlFor="male-1">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="male-0" />
                        <Label htmlFor="male-0">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

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
                    <Label htmlFor="education">Education Level</Label>
                    <Select
                      value={formData.education.toString()}
                      onValueChange={(value) => handleSelectChange("education", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Level 1</SelectItem>
                        <SelectItem value="2">Level 2</SelectItem>
                        <SelectItem value="3">Level 3</SelectItem>
                        <SelectItem value="4">Level 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentSmoker">Current Smoker</Label>
                    <RadioGroup
                      id="currentSmoker"
                      value={formData.currentSmoker.toString()}
                      onValueChange={(value) => handleSelectChange("currentSmoker", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="smoker-yes" />
                        <Label htmlFor="smoker-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="smoker-no" />
                        <Label htmlFor="smoker-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cigsPerDay">Cigarettes Per Day</Label>
                    <Input
                      id="cigsPerDay"
                      name="cigsPerDay"
                      type="number"
                      value={formData.cigsPerDay}
                      onChange={handleInputChange}
                      min={0}
                      max={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="BPMeds">BP Medications</Label>
                    <RadioGroup
                      id="BPMeds"
                      value={formData.BPMeds.toString()}
                      onValueChange={(value) => handleSelectChange("BPMeds", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="bpMeds-yes" />
                        <Label htmlFor="bpMeds-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="bpMeds-no" />
                        <Label htmlFor="bpMeds-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prevalentStroke">Prevalent Stroke</Label>
                    <RadioGroup
                      id="prevalentStroke"
                      value={formData.prevalentStroke.toString()}
                      onValueChange={(value) => handleSelectChange("prevalentStroke", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="stroke-yes" />
                        <Label htmlFor="stroke-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="stroke-no" />
                        <Label htmlFor="stroke-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prevalentHyp">Prevalent Hypertension</Label>
                    <RadioGroup
                      id="prevalentHyp"
                      value={formData.prevalentHyp.toString()}
                      onValueChange={(value) => handleSelectChange("prevalentHyp", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="hyp-yes" />
                        <Label htmlFor="hyp-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="hyp-no" />
                        <Label htmlFor="hyp-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diabetes">Diabetes</Label>
                    <RadioGroup
                      id="diabetes"
                      value={formData.diabetes.toString()}
                      onValueChange={(value) => handleSelectChange("diabetes", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="diabetes-yes" />
                        <Label htmlFor="diabetes-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="diabetes-no" />
                        <Label htmlFor="diabetes-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totChol">Total Cholesterol (mg/dL)</Label>
                    <Input
                      id="totChol"
                      name="totChol"
                      type="number"
                      value={formData.totChol}
                      onChange={handleInputChange}
                      min={100}
                      max={600}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sysBP">Systolic Blood Pressure (mmHg)</Label>
                    <Input
                      id="sysBP"
                      name="sysBP"
                      type="number"
                      value={formData.sysBP}
                      onChange={handleInputChange}
                      min={80}
                      max={250}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diaBP">Diastolic Blood Pressure (mmHg)</Label>
                    <Input
                      id="diaBP"
                      name="diaBP"
                      type="number"
                      value={formData.diaBP}
                      onChange={handleInputChange}
                      min={40}
                      max={150}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="BMI">Body Mass Index (BMI)</Label>
                    <Input
                      id="BMI"
                      name="BMI"
                      type="number"
                      value={formData.BMI}
                      onChange={handleInputChange}
                      min={10}
                      max={50}
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                    <Input
                      id="heartRate"
                      name="heartRate"
                      type="number"
                      value={formData.heartRate}
                      onChange={handleInputChange}
                      min={40}
                      max={220}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
                    <Input
                      id="glucose"
                      name="glucose"
                      type="number"
                      value={formData.glucose}
                      onChange={handleInputChange}
                      min={50}
                      max={400}
                    />
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
