"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  Shield,
  Sparkles,
  Globe,
  Award,
  Zap,
  ArrowRight,
  CheckCircle,
  MapPin,
  Calendar,
  Star,
  Quote,
  Linkedin,
  Twitter,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Data
const coreValues = [
  {
    icon: Heart,
    title: "Community First",
    description:
      "We believe in the power of human connection. Every feature we build brings people closer together.",
    color: "bg-rose-50 text-rose-500 dark:bg-rose-950 dark:text-rose-400",
    borderColor: "border-rose-100 dark:border-rose-900",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Your safety is our priority. We implement rigorous verification processes for positive experiences.",
    color: "bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400",
    borderColor: "border-blue-100 dark:border-blue-900",
  },
  {
    icon: Sparkles,
    title: "Quality Experiences",
    description:
      "We curate events that create meaningful memories. From intimate gatherings to grand adventures.",
    color: "bg-primary/10 text-primary",
    borderColor: "border-primary/20",
  },
  {
    icon: Globe,
    title: "Inclusive & Diverse",
    description:
      "Everyone deserves a companion for their next adventure. We celebrate diversity and welcome all.",
    color:
      "bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400",
    borderColor: "border-emerald-100 dark:border-emerald-900",
  },
];

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former community lead at Airbnb. Passionate about connecting people through shared experiences.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "10+ years in tech. Built scalable platforms at Google and Stripe. Loves hiking and board games.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Community",
    bio: "Event organizer turned tech enthusiast. Organized 500+ events before joining Meet & Go.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Park",
    role: "Head of Product",
    bio: "UX expert with a mission to make social connections effortless. Former design lead at Spotify.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
];

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "Meet & Go was born from a simple idea: no one should miss out on experiences due to lack of companions.",
  },
  {
    year: "2022",
    title: "First 1,000 Events",
    description:
      "Reached our first major milestone with events hosted across 15 cities and growing community.",
  },
  {
    year: "2023",
    title: "Series A Funding",
    description:
      "Secured $5M in funding to expand our platform and introduce new features for hosts and users.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Launched in 50+ cities worldwide, connecting over 100,000 adventure seekers.",
  },
];

const stats = [
  { number: "100K+", label: "Active Members", icon: Users },
  { number: "500+", label: "Events Monthly", icon: Calendar },
  { number: "50+", label: "Cities Worldwide", icon: MapPin },
  { number: "4.9", label: "Average Rating", icon: Star },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="bg-background/10 text-background border-background/20 mb-6 px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight"
            >
              Connecting People Through{" "}
              <span className="text-orange-400">Shared Adventures</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-background/70 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              We&apos;re on a mission to ensure no one misses out on life&apos;s
              amazing experiences. Meet & Go connects like-minded individuals
              for events, activities, and adventures.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-base font-semibold transition-all duration-300"
              >
                Join Our Community
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="bg-background hover:bg-background/90 text-foreground px-8 py-6 rounded-full text-base font-semibold transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Our Story
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Clean Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Image Grid */}
            <motion.div variants={scaleIn} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop"
                      alt="Friends hiking together"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=500&fit=crop"
                      alt="Group at concert"
                      width={300}
                      height={250}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&h=500&fit=crop"
                      alt="Board game night"
                      width={300}
                      height={250}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop"
                      alt="Tech meetup"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">
                      10K+
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Happy Connections
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <Badge className="bg-primary/10 text-primary border-0 mb-4 font-medium">
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Bringing People Together,{" "}
                  <span className="text-primary">One Event at a Time</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  At Meet & Go, we believe that the best experiences in life are
                  shared. Our platform bridges the gap between wanting to attend
                  an event and having someone to share it with. We&apos;re
                  building a world where no concert goes unattended, no hiking
                  trail unexplored, and no adventure missed.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Connect with like-minded individuals who share your passions",
                  "Discover events and activities tailored to your interests",
                  "Build meaningful friendships through shared experiences",
                  "Safe, verified community with trusted hosts",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/events">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                    Explore Events
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 border-0 mb-4 font-medium">
                <Award className="w-4 h-4 mr-2" />
                Our Journey
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              From Idea to{" "}
              <span className="text-primary">Global Community</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Every great journey starts with a single step. Here&apos;s how
              Meet & Go grew from a simple idea into a thriving community.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {milestones.map((milestone, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-primary">
                        {milestone.year}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-primary/10 text-primary border-0 mb-4 font-medium">
                <Heart className="w-4 h-4 mr-2" />
                Our Values
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              What We <span className="text-primary">Stand For</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Our values guide every decision we make and shape the community
              we&apos;re building together.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`h-full border ${value.borderColor} shadow-sm hover:shadow-md transition-all duration-300 bg-card`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <value.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-background mb-2"
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-background/60">
              Join thousands who have found their perfect activity companions
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-background/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-background mb-1">
                  {stat.number}
                </p>
                <p className="text-background/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-primary/10 text-primary border-0 mb-4 font-medium">
                <Users className="w-4 h-4 mr-2" />
                Meet The Team
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              The People Behind <span className="text-primary">Meet & Go</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              A passionate team dedicated to connecting people and creating
              unforgettable experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-card group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Social Links */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <a
                          href={member.linkedin}
                          className="w-9 h-9 bg-background rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-foreground" />
                        </a>
                        <a
                          href={member.twitter}
                          className="w-9 h-9 bg-background rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-foreground" />
                        </a>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-semibold text-card-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-border shadow-lg bg-card overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <blockquote className="text-lg md:text-xl text-card-foreground text-center leading-relaxed mb-8">
                  &quot;Meet & Go changed my life. I moved to a new city knowing
                  no one, and within weeks I had a group of friends to explore
                  with. The hiking group I joined through the platform has
                  become my second family.&quot;
                </blockquote>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <p className="font-semibold text-card-foreground">
                      Jessica Davis
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Member since 2022
                    </p>
                  </div>
                  <div className="flex gap-1 sm:ml-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
            >
              Ready to Start Your Next{" "}
              <span className="text-orange-300">Adventure?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto"
            >
              Join Meet & Go today and discover amazing events and people in
              your area.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 px-8 py-6 rounded-full text-base font-semibold transition-all duration-300"
                >
                  Get Started Free
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/20 px-8 py-6 rounded-full text-base font-semibold transition-all duration-300"
                >
                  Browse Events
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="text-primary-foreground/70 mt-6 text-sm"
            >
              ✨ Free to join • 🔒 Secure platform • 🌍 Events worldwide
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
