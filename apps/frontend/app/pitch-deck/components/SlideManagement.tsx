// ===== SLIDE MANAGEMENT COMPONENT =====
// This component provides a visual grid interface for managing pitch deck slides
// It displays all slides in a card-based layout with edit capabilities
// Each slide card shows title, content preview, design notes, and edit button
// This translates to a professional slide management interface similar to PowerPoint

import React from 'react';

// ===== SLIDE TYPE DEFINITION =====
// Interface defining the structure of a pitch deck slide
export type Slide = {
  title: string;           // Slide title (e.g., "The Problem", "Our Solution")
  content?: string;        // Main slide content and text
  design?: string;         // Design instructions and styling notes
  imageUrl?: string;       // Optional image attachment
  videoUrl?: string;       // Optional video attachment
  comments?: string[];     // User comments and notes
};

// ===== COMPONENT PROPS =====
// Props interface for the slide management component
type Props = {
  slides: Slide[];                    // Array of all slides in the pitch deck
  onEditSlide?: (index: number) => void; // Callback to edit a specific slide
};

export default function SlideManagement({ slides, onEditSlide }: Props) {
  // ===== EMPTY STATE =====
  // Display message when no slides have been generated yet
  if (!slides || slides.length === 0) {
    return <div className="text-gray-400 text-center py-8">No slides generated yet.</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ===== SLIDE CARDS ===== */}
      {/* Render each slide as a card in a responsive grid layout */}
      {slides.map((slide, idx) => (
        <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm relative">
          {/* ===== STATUS BADGE ===== */}
          {/* Shows the current status of the slide (final, draft, etc.) */}
          <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">final</div>
          
          {/* ===== SLIDE TITLE ===== */}
          {/* The main title of the slide */}
          <h4 className="font-semibold mb-2">{slide.title}</h4>
          
          {/* ===== CONTENT PREVIEW ===== */}
          {/* Show a preview of the slide content if available */}
          {slide.content && <div className="text-gray-700 text-sm mb-2">{slide.content}</div>}
          
          {/* ===== DESIGN NOTES ===== */}
          {/* Display design instructions and styling notes */}
          {slide.design && <div className="text-gray-500 text-xs">{slide.design}</div>}
          
          {/* ===== EDIT BUTTON ===== */}
          {/* Button to open the slide editor for this specific slide */}
          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => onEditSlide && onEditSlide(idx)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
} 