"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  HelpCircle,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Variants } from "framer-motion";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Contact Info Data
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    contact: "support@meetandgo.com",
    link: "mailto:support@meetandgo.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm",
    contact: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office",
    contact: "123 Adventure St, San Francisco, CA 94102",
    link: "#",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "We're here to help",
    contact: "Monday - Friday: 9:00 AM - 6:00 PM",
    link: "#",
  },
];

// Support Options
const supportOptions = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description:
      "Chat with our support team in real-time for quick assistance.",
    action: "Start Chat",
    color: "bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400",
    borderColor: "border-blue-100 dark:border-blue-900",
  },
  {
    icon: Headphones,
    title: "Phone Support",
    description: "Speak directly with our customer service representatives.",
    action: "Call Now",
    color:
      "bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400",
    borderColor: "border-emerald-100 dark:border-emerald-900",
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    description: "Browse our comprehensive FAQ and documentation.",
    action: "Visit Help Center",
    color: "bg-primary/10 text-primary",
    borderColor: "border-primary/20",
  },
];

// FAQ Data
const faqs = [
  {
    question: "How do I create an event on Meet & Go?",
    answer:
      "To create an event, log in to your account, click on 'Create Event' in the navigation menu, fill in the event details including title, date, location, and description, then publish it for others to discover and join.",
  },
  {
    question: "Is it free to join events?",
    answer:
      "Many events on Meet & Go are free to join. However, some hosts may set a joining fee to cover costs like venue rentals, materials, or other expenses. The fee will be clearly displayed on the event page before you join.",
  },
  {
    question: "How do I become a host?",
    answer:
      "You can apply to become a host by going to 'Become a Host' in the menu. Complete your profile, verify your identity, and submit your application. Our team will review it within 2-3 business days.",
  },
  {
    question: "What if I need to cancel my attendance?",
    answer:
      "You can cancel your attendance from 'My Events' in your dashboard. Please note that cancellation policies vary by event, and some may have deadlines for full refunds. Check the event details for specific policies.",
  },
  {
    question: "How do I report an issue with an event or user?",
    answer:
      "Safety is our priority. You can report any concerns through the event page or user profile using the 'Report' button. Our safety team reviews all reports within 24 hours and takes appropriate action.",
  },
  {
    question: "Can I get a refund for a paid event?",
    answer:
      "Refund policies are set by individual hosts. Generally, cancellations made 48+ hours before the event are eligible for full refunds. For disputes, contact our support team and we'll help mediate.",
  },
];

// Social Links
const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    // Show success message (you can add toast notification here)
    alert("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 dark:from-gray-950 dark:to-black py-16 lg:py-24 transition-colors duration-300">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 dark:bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 dark:bg-blue-500/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="bg-white/10 dark:bg-white/5 text-white border-white/20 dark:border-gray-700 mb-6 px-4 py-2 text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              We&apos;d Love to{" "}
              <span className="text-orange-400 dark:text-orange-300">
                Hear From You
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-blue-100 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
            >
              Have questions about Meet & Go? Need help with an event? Our
              friendly team is here to assist you every step of the way.
            </motion.p>
          </motion.div>
        </div>

        {/* Clean Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-border shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-300 bg-card group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {info.description}
                    </p>
                    <a
                      href={info.link}
                      className="text-primary font-medium text-sm hover:underline"
                    >
                      {info.contact}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-muted dark:bg-gray-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="border-border shadow-lg dark:shadow-black/30 bg-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">
                        Subject
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSubjectChange}
                      >
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing Question
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunity
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-full font-semibold transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Map Placeholder */}
              <Card className="border-border shadow-lg dark:shadow-black/30 bg-card overflow-hidden">
                <div className="h-64 bg-muted dark:bg-gray-900 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968173775!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500 dark:opacity-80 dark:hover:opacity-100"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    Our Office
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    123 Adventure Street, San Francisco, CA 94102, United States
                  </p>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-border shadow-lg dark:shadow-black/30 bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Follow us on social media for updates, tips, and community
                    stories.
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 bg-muted dark:bg-gray-800 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-primary/10 text-primary border-0 mb-4 font-medium">
                <Headphones className="w-4 h-4 mr-2" />
                Support Options
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground mb-3"
            >
              How Can We <span className="text-primary">Help You?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Choose the support option that works best for you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {supportOptions.map((option, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`h-full border ${option.borderColor} shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-300 bg-card`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <option.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {option.description}
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted dark:bg-gray-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border-0 mb-4 font-medium">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground mb-3"
            >
              Frequently Asked <span className="text-primary">Questions</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Find quick answers to common questions about Meet & Go.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-border shadow-lg dark:shadow-black/30 bg-card">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="text-left text-card-foreground hover:text-primary hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:border-t dark:border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-primary-foreground dark:text-white mb-4"
            >
              Still Have Questions?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-primary-foreground/80 dark:text-gray-400 mb-8"
            >
              Can&apos;t find what you&apos;re looking for? Our support team is
              just a message away.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-background dark:bg-white text-foreground dark:text-gray-900 hover:bg-background/90 dark:hover:bg-gray-200 px-8 py-6 rounded-full font-semibold transition-all duration-300"
              >
                <Mail className="mr-2 w-5 h-5" />
                Email Support
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-primary-foreground/10 dark:bg-white/5 hover:bg-primary-foreground/20 dark:hover:bg-white/10 text-primary-foreground dark:text-white border border-primary-foreground/20 dark:border-gray-700 px-8 py-6 rounded-full font-semibold transition-all duration-300"
              >
                <MessageSquare className="mr-2 w-5 h-5" />
                Start Live Chat
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
