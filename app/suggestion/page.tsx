"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function SuggestionPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    suggestion: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Replace these with your actual EmailJS service, template, and user IDs
      await emailjs.send(
        "service_9hs1die",
        "template_lvqr2zn",
        {
          name: formData.name,
          subject: formData.subject,
          suggestion: formData.suggestion,
        },
        "up7Peaw4yhzp7_HRq",
      )

      toast({
        title: "Suggestion Submitted",
        description: "Thank you for your feedback!",
      })

      // Reset form
      setFormData({
        name: "",
        subject: "",
        suggestion: "",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your suggestion. Please try again.",
        variant: "destructive",
      })
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Send Us Your Suggestions</h1>

        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            We value your feedback! Please share your thoughts, ideas, or suggestions to help us improve PredictCare.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Feature suggestion, improvement idea, etc."
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggestion">Your Suggestion</Label>
            <Textarea
              id="suggestion"
              name="suggestion"
              placeholder="Please share your detailed feedback or suggestion here..."
              rows={6}
              value={formData.suggestion}
              onChange={handleChange}
              required
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Submit Suggestion <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <p className="text-muted-foreground">
            You can also contact us directly at <span className="font-medium">support@predictcare.example.com</span>
          </p>
        </div>
      </div>
    </div>
  )
}

