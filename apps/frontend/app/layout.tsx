// ===== ROOT LAYOUT COMPONENT =====
// This is the main layout wrapper for the entire pitch deck generator application
// It provides the basic HTML structure and global styling that applies to all pages
// The layout uses a clean, professional design with a light gray background
// Sidebar navigation is handled at the individual page level for flexibility

import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* Main Content Only - Sidebar handled at page level */}
        {/* This layout provides a clean, minimal structure that allows each page to define its own navigation */}
        {/* The bg-gray-50 class gives a subtle, professional background color */}
        {/* min-h-screen ensures the layout takes up at least the full viewport height */}
        <main>{children}</main>
      </body>
    </html>
  );
} 