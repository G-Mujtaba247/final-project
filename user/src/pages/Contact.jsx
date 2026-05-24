"use client";

import { useState, useEffect } from "react";
import WebLayout from "@/layout/WebLayout";
import axios from "axios";
import { HOST, SUBMIT_CONTACT } from "@/resources/server-API";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Mail, Phone, MapPin } from "lucide-react";

const API_BASE_URL = HOST;

export default function Contact() {
  const [contactData, setContactData] = useState({
    phone: "+92 342 4493250",
    email: "explorepakistan369@gmail.com",
    address: "Arfa Tower, Lahore, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13611.01962830055!2d74.317488!3d31.481210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905bda2f42c0f%3A0xaea46777dae1f7a0!2sArfa%20Software%20Technology%20Park!5e0!3m2!1sen!2sPK!4v1700000000000"
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await axios.post(SUBMIT_CONTACT, formData);
      if (response.data.status) {
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitMessage(response.data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/website/contact`);
        if (response.data.status === true && response.data.contact) {
          setContactData(response.data.contact);
        }
      } catch (error) {
        console.log("Error fetching contact data:", error);
        // Using default values if API fails
      }
    };
    fetchContactData();
  }, []);
  return (
    <WebLayout>
      {/* ======================= HERO BANNER ======================= */}
      <section className="relative w-full h-[460px] overflow-hidden bg-white-100">
        <img
          src="Safety.webp"
          className="absolute inset-0 mt-20 w-500 h-170 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/70"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-3 tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg opacity-90">
            We’re here to help you plan your next adventure.
          </p>
        </div>
      </section>

      {/* ======================= CONTACT & FORM ======================= */}
      <section className="container m-auto  pl-8 pr-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Left Cards */}
        <div className="space-y-6 ">
          {/* Card Template */}
          {[
            { icon: Mail, title: "Email Us", value: contactData.email },
            { icon: Phone, title: "Call Us", value: contactData.phone },
            { icon: MapPin, title: "Visit Us", value: contactData.address },
          ].map((item, index) => (
            <Card
              key={index}
              className="shadow-lg backdrop-blur-xl bg-white/80 border border-white/40 hover:shadow-2xl transition-all duration-300 p-8"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <item.icon className="w-10 h-10 p-2 rounded-full bg-primary/10 text-primary" />
                <div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base mt-1">
                    {item.value}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Right Contact Form */}
        <Card className="shadow-xl border border-gray-200 rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>
              Our team will get back to you within 24 hours.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 mt-3">
            {submitMessage && (
              <div className={`p-3 rounded-lg text-sm ${submitMessage.includes("Thank you") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="h-12"
                  required
                />
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="h-12"
                  required
                />
              </div>

              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                type="email"
                className="h-12"
                required
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message..."
                rows={5}
                className="resize-none"
                required
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* ======================= FAQ SECTION ======================= */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto space-y-3"
        >
          <AccordionItem value="item-1" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg">
              When is the best time to visit?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              The summer season (June–September) provides ideal temperatures and
              breathtaking views. Spring and autumn are perfect for peaceful
              exploration with pleasant weather.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg">
              Do you offer group discounts?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Yes! Groups of 8+ enjoy discounted pricing. We also offer special
              packages for corporate or student tours.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg">
              What’s included in the tour price?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Accommodation, transport, local guides, and meals are included.
              Some optional activities have additional costs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ======================= MAP SECTION ======================= */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="text-4xl font-bold text-center mb-8">Find Us</h2>

        <Card className="overflow-hidden shadow-xl rounded-2xl border border-gray-200">
          <iframe
            title="Location Map"
            src={contactData.map}
            width="100%"
            height="430"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Card>
      </section>
    </WebLayout>
  );
}
