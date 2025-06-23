// ===== SIDEBAR NAVIGATION COMPONENT =====
// This component provides the main navigation sidebar for the entire FounderHQ.ai platform
// It includes links to all major modules: Dashboard, Pitch Deck Builder, Market Research, etc.
// The sidebar highlights the active page and provides consistent navigation across the platform
// This translates to a professional SaaS navigation that helps users move between different tools

'use client'; 

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ===== NAVIGATION ITEMS =====
// Define all the major modules and features available in the FounderHQ.ai platform
// Each item represents a different tool or section that startup founders need
const navItems = [
  { name: 'Dashboard', icon: '🏠', route: '/dashboard' },           // Main command center
  { name: 'Pitch Deck Builder', icon: '📊', route: '/pitch-deck' }, // Core AI pitch deck tool
  { name: 'Market Research', icon: '🔍', route: '/market-research' }, // TAM/SAM analysis
  { name: 'Investor CRM', icon: '👥', route: '/investor-crm' },     // Investor relationship management
  { name: 'Legal Docs', icon: '📄', route: '/legal-docs' },        // Legal document automation
  { name: 'Financial Modeling', icon: '💹', route: '/financial-modeling' }, // Financial projections
  { name: 'AI Co-Pilot', icon: '🤖', route: '/ai-co-pilot' },      // 24/7 AI startup mentor
];

export default function Sidebar() {
  // Get current pathname to highlight active navigation item
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* ===== BRAND HEADER ===== */}
      {/* Company logo and branding at the top of the sidebar */}
      <div className="h-20 flex items-center px-6 border-b">
        <Link href="/home" legacyBehavior>
          <a className="font-bold text-xl text-blue-700 hover:underline">FounderHQ.ai</a>
        </Link>
      </div>
      
      {/* ===== NAVIGATION MENU ===== */}
      {/* Main navigation links to all platform modules */}
      <nav className="flex-1 py-6 px-2 space-y-1">
        {navItems.map((item) => {
          // Determine if this navigation item is currently active
          const isActive = pathname === item.route;
          return (
            <Link href={item.route} key={item.name} legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer mb-1 text-gray-700 hover:bg-blue-50 transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
              >
                {/* Icon for visual identification of each module */}
                <span className="mr-3 text-lg">{item.icon}</span>
                {/* Module name */}
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 