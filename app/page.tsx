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
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/images/tosyns-logo.png" 
                  alt="Tosyns Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-tosyns-primary">TOSYNS</span>
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

            <Button className="bg-tosyns-primary hover:bg-tosyns-primary-dark text-white px-6">Get an Offer</Button>
          </div>
        </div>
      </header>

                      {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
            {/* Two-column layout for larger screens */}
            <div className="hidden md:grid md:grid-cols-2 h-full relative">
              {/* Left side - Green background with content */}
              <div className="bg-tosyns-primary flex items-center relative z-20">
                <div className="px-8 lg:px-12 ml-32 lg:ml-32">
                  <div className="max-w-lg">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                      Sell Your Home Fast, As-Is, and Without the Stress
                    </h1>

                    <div className="mt-6 sm:mt-8 space-y-2">
                                          <p className="text-lg sm:text-xl text-tosyns-primary-text-light">Local, Honest Homebuyers</p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-tosyns-primary-text-light space-y-1 sm:space-y-0">
                        <span>No Repairs</span>
                        <span className="hidden sm:inline">|</span>
                        <span>No Agent Fees</span>
                      </div>
                    </div>

                    <Button size="lg" className="mt-6 sm:mt-8 bg-tosyns-primary-light hover:bg-tosyns-primary-dark text-white px-6 sm:px-8 py-3 text-base sm:text-lg">
                      Get My Offer Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right side - Hero Image */}
              <div className="h-full relative z-10">
                <img
                  src="/images/hero-image.png"
                  alt="Tosyns Hero Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Triangular wedge overlay for diagonal divide */}
              <div 
                className="absolute left-1/2 top-0 w-1/2 h-full bg-tosyns-primary hidden md:block z-10"
                style={{
                  clipPath: "polygon(0 0, 20% 0, 0% 100%, 0 100%)",
                }}
              ></div>
            </div>

            {/* Mobile layout - Full green background with content */}
            <div className="md:hidden absolute inset-0 bg-tosyns-primary flex items-center">
              <div className="px-4 sm:px-6 w-full">
                <div className="max-w-lg mx-auto">
                  <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                    Sell Your Home Fast, As-Is, and Without the Stress
                  </h1>

                  <div className="mt-6 sm:mt-8 space-y-2">
                    <p className="text-lg sm:text-xl text-tosyns-primary-text-light">Local, Honest Homebuyers</p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-tosyns-primary-text-light space-y-1 sm:space-y-0">
                      <span>No Repairs</span>
                      <span className="hidden sm:inline">|</span>
                      <span>No Agent Fees</span>
                    </div>
                  </div>

                                      <Button size="lg" className="mt-6 sm:mt-8 bg-tosyns-primary-light hover:bg-tosyns-primary-dark text-white px-6 sm:px-8 py-3 text-base sm:text-lg">
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
            <h2 className="text-3xl font-bold text-tosyns-primary sm:text-4xl">How It Works</h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-tosyns-primary rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tell us about your home</h3>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-tosyns-primary rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We schedule a quick viewing (no repairs needed)
              </h3>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-tosyns-primary rounded-full flex items-center justify-center mb-6">
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
              <h2 className="text-3xl font-bold text-tosyns-primary mb-6">About Tosyns</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At Tosyns, we understand that selling a home isn't always easy. Whether you're facing life changes,
                dealing with repairs, or just ready for a fresh start — we're here to help with
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-tosyns-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Local</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-tosyns-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Private</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-tosyns-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Simple</span>
                </div>
              </div>
            </div>

            {/* Right Column - Testimonials */}
            <div className="mt-12 lg:mt-0 space-y-8">
              <Card className="p-6 border-l-4 border-l-tosyns-primary">
                <blockquote className="text-gray-700 italic mb-4">
                  "Tosyns made a tough time easier. No pressure, no surprises."
                </blockquote>
                <cite className="text-sm text-gray-600 font-medium">J.M., Springfield</cite>
              </Card>

              <Card className="p-6 border-l-4 border-l-tosyns-primary">
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
            <h2 className="text-3xl font-bold text-tosyns-primary sm:text-4xl">Ready for a No-Obligation Offer?</h2>
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
                <Textarea name="message" placeholder="Message" rows={4} className="w-full" />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-tosyns-primary hover:bg-tosyns-primary-dark text-white px-8 py-3 text-lg"
                >
                  {isSubmitting ? "Sending..." : "Get My Free Offer"}
                </Button>
              </div>

              {formState.success && <div className="text-center text-tosyns-primary font-medium">{formState.message}</div>}

              {formState.error && <div className="text-center text-red-600 font-medium">{formState.error}</div>}
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tosyns-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/images/tosyns-logo-white.png" 
                alt="Tosyns Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xl font-bold">TOSYNS</span>
          </div>
          <p className="text-tosyns-primary-text-light">© 2024 Tosyns. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
