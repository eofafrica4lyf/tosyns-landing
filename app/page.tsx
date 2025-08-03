"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Check, FileText, Calendar, Key, Home } from "lucide-react"

export default function TosynsLanding() {
  const [formState, setFormState] = useState<{
    success?: boolean
    error?: string
    message?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    // Get form reference safely
    const form = event.currentTarget || document.getElementById("contact-form") as HTMLFormElement
    if (!form) {
      setFormState({
        success: false,
        error: "Form not found. Please refresh the page and try again.",
      })
      setIsSubmitting(false)
      return
    }
    
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      message: formData.get("message") as string,
    }

    try {
      // Using Netlify function for email sending
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('HTTP error:', response.status, errorText)
        setFormState({
          success: false,
          error: `HTTP Error ${response.status}: ${errorText}`,
        })
        return
      }

      const result = await response.json()
      console.log('Form submission result:', result)
      setFormState(result)
      
      if (result.success) {
        // Reset form using the safe reference
        if (form) {
          form.reset()
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState({
        success: false,
        error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-700 rounded flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-teal-800">TOSYNS</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-teal-700 font-medium">
                Home
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-teal-700 font-medium">
                How It Works
              </a>
              <a href="#contact" className="text-gray-700 hover:text-teal-700 font-medium">
                Contact
              </a>
            </nav>

            <Button className="bg-teal-700 hover:bg-teal-800 text-white px-6">Get an Offer</Button>
          </div>
        </div>
      </header>

              {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
            {/* Right side - House Image */}
            <div className="absolute inset-0">
              <img
                src="/images/house.jpg"
                alt="Beautiful two-story home"
                className="w-full h-full object-cover sm:object-cover md:object-cover lg:object-fill object-center sm:object-right"
              />
            </div>

            {/* Full coverage overlay for mobile */}
            <div
              className="absolute inset-0 bg-teal-800 md:hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
            ></div>
            {/* Diagonal overlay for larger screens */}
            <div
              className="absolute inset-0 bg-teal-800 hidden md:block"
              style={{
                clipPath: "polygon(0 0, 60% 0, 50% 100%, 0 100%)",
              }}
            ></div>

          {/* Content Container */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg lg:max-w-xl">
                <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                  Sell Your Home Fast, As-Is, and Without the Stress
                </h1>

                <div className="mt-6 sm:mt-8 space-y-2">
                  <p className="text-lg sm:text-xl text-teal-100">Local, Honest Homebuyers</p>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-teal-100 space-y-1 sm:space-y-0">
                    <span>No Repairs</span>
                    <span className="hidden sm:inline">|</span>
                    <span>No Agent Fees</span>
                  </div>
                </div>

                <Button size="lg" className="mt-6 sm:mt-8 bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg">
                  Get My Offer Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-teal-800 sm:text-4xl">How It Works</h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tell us about your home</h3>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We schedule a quick viewing (no repairs needed)
              </h3>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center mb-6">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">You pick your closing date and get paid</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold text-teal-800 mb-6">About Tosyns</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At Tosyns, we understand that selling a home isn't always easy. Whether you're facing life changes,
                dealing with repairs, or just ready for a fresh start — we're here to help with
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Local</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Private</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Simple</span>
                </div>
              </div>
            </div>

            {/* Right Column - Testimonials */}
            <div className="mt-12 lg:mt-0 space-y-8">
              <Card className="p-6 border-l-4 border-l-teal-700">
                <blockquote className="text-gray-700 italic mb-4">
                  "Tosyns made a tough time easier. No pressure, no surprises."
                </blockquote>
                <cite className="text-sm text-gray-600 font-medium">J.M., Springfield</cite>
              </Card>

              <Card className="p-6 border-l-4 border-l-teal-700">
                <blockquote className="text-gray-700 italic mb-4">
                  "Selling our house was fast and easy. I'd recommend Tosyns to anyone needing a clean break."
                </blockquote>
                <cite className="text-sm text-gray-600 font-medium">D.T., Metro area homeowner</cite>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800 sm:text-4xl">Ready for a No-Obligation Offer?</h2>
          </div>

          <Card className="p-8">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Input type="text" name="name" placeholder="Name" required className="w-full" />
                </div>
                <div>
                  <Input type="tel" name="phone" placeholder="Phone" required className="w-full" />
                </div>
              </div>

              <div>
                <Input type="text" name="address" placeholder="Property Address" required className="w-full" />
              </div>

              <div>
                <Textarea name="message" placeholder="Optional Message" rows={4} className="w-full" />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 text-lg"
                >
                  {isSubmitting ? "Sending..." : "Get My Free Offer"}
                </Button>
              </div>

              {formState.success && <div className="text-center text-green-600 font-medium">{formState.message}</div>}

              {formState.error && <div className="text-center text-red-600 font-medium">{formState.error}</div>}
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <Home className="w-4 h-4 text-teal-800" />
            </div>
            <span className="text-xl font-bold">TOSYNS</span>
          </div>
          <p className="text-teal-100">© 2024 Tosyns. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
