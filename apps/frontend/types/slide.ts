// ===== PITCH DECK SLIDE TYPE DEFINITIONS =====
// This file contains all TypeScript interfaces and types for the pitch deck slide system
// These types define the data structures used throughout the pitch deck builder application
// They ensure type safety and provide clear contracts for slide content and layout

// ===== POSITION AND SIZE INTERFACES =====
// Basic geometric properties for positioning and sizing slide elements

export interface Position {
  x: number;  // X-coordinate position on the slide
  y: number;  // Y-coordinate position on the slide
}

export interface Size {
  width: number;   // Width of the element
  height: number;  // Height of the element
}

// ===== BASE BLOCK INTERFACE =====
// Common properties that all slide blocks (text, visuals) share
// Provides consistent positioning and sizing across different block types

export interface BaseBlock {
  id: string;        // Unique identifier for the block
  position: Position; // Position coordinates on the slide
  size: Size;        // Dimensions of the block
}

// ===== TEXT BLOCK INTERFACE =====
// Represents text content blocks on slides (headlines, body text, etc.)
// Extends BaseBlock to include text-specific properties

export interface TextBlock extends BaseBlock {
  type: 'text';           // Type identifier for text blocks
  content: string;        // The actual text content
  isEditable: boolean;    // Whether the text can be edited by the user
}

// ===== VISUAL BLOCK INTERFACE =====
// Represents chart, graph, and table visualizations on slides
// Supports multiple chart types with configurable data and styling

export interface VisualBlock {
  type: 'pie' | 'bar' | 'line' | 'scatter' | 'table';  // Supported chart types
  data: any;        // Chart data (varies by chart type)
  config?: any;     // Optional configuration for styling and behavior
}

// ===== VISUAL BLOCK CONTAINER =====
// Wraps VisualBlock with positioning and sizing information
// Allows visual elements to be positioned and sized like other blocks

export interface VisualBlockContainer extends BaseBlock {
  type: 'visual';        // Type identifier for visual blocks
  visual: VisualBlock;   // The actual visual content (chart, table, etc.)
}

// ===== SLIDE BLOCK UNION TYPE =====
// Union type representing any type of block that can appear on a slide
// This allows slides to contain both text and visual elements

export type SlideBlock = TextBlock | VisualBlockContainer;

// ===== SLIDE INTERFACE =====
// Complete slide definition with all possible content and styling options
// This is the main data structure for individual pitch deck slides

export interface Slide {
  title: string;           // Slide title (e.g., "The Problem", "Our Solution")
  content: string;         // Main slide content as text
  design: string;          // Design instructions and styling notes
  blocks: SlideBlock[];    // Array of positioned blocks (text and visuals)
  visuals?: VisualBlock[]; // Legacy visual blocks (deprecated in favor of blocks)
  imageUrl?: string;       // Optional background or content image
  videoUrl?: string;       // Optional embedded video
  theme?: string;          // Optional theme/styling preset
}

// ===== EDITOR SLIDE INTERFACE =====
// Specialized slide interface for the slide editor component
// Makes blocks optional to allow for incremental editing

export interface EditorSlide extends Omit<Slide, 'blocks'> {
  blocks?: SlideBlock[];   // Optional blocks for editor flexibility
} 