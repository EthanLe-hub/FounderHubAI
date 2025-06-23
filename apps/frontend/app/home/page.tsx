// ===== HOME PAGE COMPONENT =====
// This is the main landing page for FounderHQ.ai - the AI-powered startup command center
// It showcases all the platform's features and serves as the entry point for new users
// The page includes a hero section, feature highlights, testimonials, and call-to-action
// This translates to a professional SaaS landing page that converts visitors into users

"use client";
import React from 'react';
import Sidebar from '../pitch-deck/components/Sidebar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation sidebar - provides consistent navigation across the platform */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* ===== HERO SECTION ===== */}
        {/* This is the main value proposition section that immediately communicates what FounderHQ.ai does */}
        {/* It includes compelling statistics and a clear call-to-action to drive user engagement */}
        <section className="bg-white py-10 px-4 shadow rounded-lg max-w-5xl mx-auto mt-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              {/* Main headline that positions FounderHQ as the complete startup solution */}
              <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Your AI-Powered<br />Startup Command Center</h1>
              {/* Value proposition explaining the comprehensive nature of the platform */}
              <p className="text-gray-600 mb-4 text-lg">From idea to Series A, FounderHQ.ai is the only platform startup founders need. Get AI-powered guidance, streamlined workflows, and expert insights at every stage of your journey.</p>
              {/* Primary call-to-action button that leads to the pitch deck builder */}
              <div className="flex gap-4 mb-4">
                <Link href="/pitch-deck" legacyBehavior>
                  <a className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Start Your Journey</a>
                </Link>
              </div>
              {/* Social proof statistics to build credibility and trust */}
              <div className="flex gap-8 mt-6">
                <div>
                  <div className="text-2xl font-bold text-blue-700">500+</div>
                  <div className="text-gray-500 text-sm">Startups Funded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">$2.1B</div>
                  <div className="text-gray-500 text-sm">Capital Raised</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">85%</div>
                  <div className="text-gray-500 text-sm">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">40%</div>
                  <div className="text-gray-500 text-sm">Faster Fundraising</div>
                </div>
              </div>
            </div>
            {/* Hero image showcasing the dashboard interface */}
            <div className="flex-1 flex items-center justify-center">
              <img src="/dashboard-hero.png" alt="FounderHQ Dashboard" className="rounded-lg shadow-lg w-full max-w-md" />
            </div>
          </div>
        </section>

        {/* ===== FEATURE HIGHLIGHTS SECTION ===== */}
        {/* This section showcases all the AI-powered tools available in the platform */}
        {/* Each card represents a different module of the FounderHQ ecosystem */}
        <section className="max-w-5xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Everything You Need to Scale Your Startup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI-Powered Pitch Decks - The core feature we're building */}
            <Link href="/pitch-deck" legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold mb-1">AI-Powered Pitch Decks</div>
                <div className="text-gray-600 text-sm">Create compelling investor presentations with AI analysis and optimization</div>
              </a>
            </Link>
            {/* Market Research Hub - Future feature for competitive analysis */}
            <Link href="/market-research" legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">🔍</div>
                <div className="font-semibold mb-1">Market Research Hub</div>
                <div className="text-gray-600 text-sm">Comprehensive TAM/SAM analysis and competitive intelligence</div>
              </a>
            </Link>
            {/* Investor CRM - Future feature for investor relationship management */}
            <Link href="/investor-crm" legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">👥</div>
                <div className="font-semibold mb-1">Investor CRM</div>
                <div className="text-gray-600 text-sm">Smart investor matching and relationship management</div>
              </a>
            </Link>
            {/* Legal Document Center - Future feature for legal compliance */}
            <Link href="/legal-docs" legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">📄</div>
                <div className="font-semibold mb-1">Legal Document Center</div>
                <div className="text-gray-600 text-sm">AI-powered legal templates and compliance tracking</div>
              </a>
            </Link>
            {/* Financial Modeling - Future feature for financial planning */}
            <Link href="/financial-modeling" legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">💹</div>
                <div className="font-semibold mb-1">Financial Modeling</div>
                <div className="text-gray-600 text-sm">Interactive scenario planning and fundraising readiness</div>
              </a>
            </Link>
            {/* AI Co-Pilot - Future feature for 24/7 startup guidance */}
            <Link href="/ai-co-pilot" legacyBehavior>
              <a className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">🤖</div>
                <div className="font-semibold mb-1">AI Co-Pilot</div>
                <div className="text-gray-600 text-sm">24/7 startup mentor with contextual guidance</div>
              </a>
            </Link>
          </div>
        </section>

        {/* ===== TESTIMONIALS SECTION ===== */}
        {/* Social proof from successful founders to build trust and credibility */}
        {/* These testimonials demonstrate the real-world impact of the platform */}
        <section className="bg-white py-10 px-4 shadow rounded-lg max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Trusted by Successful Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Focuses on fundraising success */}
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">"</div>
              <div className="text-gray-700 mb-2">FounderHQ helped us raise our Series A 40% faster. The AI insights were game-changing.</div>
              <div className="font-semibold text-blue-700">Sarah Chen</div>
              <div className="text-xs text-gray-500">CEO & Founder, DataFlow AI</div>
            </div>
            {/* Testimonial 2 - Focuses on pitch deck quality */}
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">"</div>
              <div className="text-gray-700 mb-2">The pitch deck builder alone saved us weeks of work. Investors loved our presentation.</div>
              <div className="font-semibold text-blue-700">Mike Rodriguez</div>
              <div className="text-xs text-gray-500">CTO, TechFlow</div>
            </div>
            {/* Testimonial 3 - Focuses on comprehensive platform value */}
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">"</div>
              <div className="text-gray-700 mb-2">Finally, a platform that understands the startup journey. The AI co-pilot is like having a mentor 24/7.</div>
              <div className="font-semibold text-blue-700">Emily Watson</div>
              <div className="text-xs text-gray-500">Founder, GrowthLab</div>
            </div>
          </div>
        </section>

        {/* ===== CALL TO ACTION SECTION ===== */}
        {/* Final conversion section to encourage users to start using the platform */}
        <section className="max-w-5xl mx-auto px-4 mb-12 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Accelerate Your Startup?</h2>
          <p className="text-gray-600 mb-6">Join thousands of founders who are building the future with AI-powered guidance</p>
          <Link href="/pitch-deck" legacyBehavior>
            <a className="bg-blue-600 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-blue-700 transition">Start Free Today</a>
          </Link>
        </section>

        {/* ===== FOOTER SECTION ===== */}
        {/* Standard footer with navigation links and company information */}
        {/* Provides additional navigation and builds trust through professional presentation */}
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-6 text-sm text-gray-500">
            <div>
              <div className="font-bold text-blue-700 mb-2">FounderHQ.ai</div>
              <div className="mb-2">The AI-powered platform for startup success</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-gray-700">Product</div>
              <div>Dashboard</div>
              <div>Pricing</div>
              <div>Features</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-gray-700">Company</div>
              <div>About</div>
              <div>Blog</div>
              <div>Careers</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-gray-700">Support</div>
              <div>Help Center</div>
              <div>Contact</div>
              <div>Privacy</div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-6">© 2024 FounderHQ.ai. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
} 