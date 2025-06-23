// ===== PITCH DECK BUILDER PAGE COMPONENT =====
// This is the main pitch deck builder interface - the core feature of FounderHQ.ai
// It provides an AI-powered interface for creating, editing, and analyzing pitch decks
// The page includes slide management, AI content generation, design suggestions, and export capabilities
// This translates to a professional pitch deck creation tool that helps founders create compelling presentations

// ===== FRONTEND-BACKEND INTEGRATION OVERVIEW =====
// This component integrates with the FastAPI backend (http://localhost:8000) to provide AI-powered functionality:
//
// BACKEND ENDPOINTS USED:
// 1. POST /generate-slides - Creates complete pitch deck from problem/solution descriptions
//    - Input: { problem: string, solution: string }
//    - Output: { slides: string[] } - Array of slide content
//    - Purpose: AI generates structured pitch deck content based on startup description
//
// 2. POST /analyze-pitch-deck - Provides AI analysis of pitch deck quality
//    - Input: { slides: Slide[], metricScales: object, getFeedback: boolean }
//    - Output: { score: number, narrative_flow: string, visual_design: string, data_credibility: string, feedback?: string }
//    - Purpose: Evaluates pitch deck quality and provides actionable feedback
//
// 3. POST /generate-suggestion - Offers AI-powered content and design suggestions
//    - Input: { slide_title: string, content: string, design: string, type: 'Content' | 'Design' }
//    - Output: { suggestion: string } - AI-generated improvement suggestion
//    - Purpose: Provides real-time guidance for improving individual slides
//
// 4. POST /export-pdf - Exports pitch deck as PDF
//    - Input: { slides: Slide[] }
//    - Output: PDF file download
//    - Purpose: Generates professional PDF presentation for sharing
//
// 5. POST /export-ppt - Exports pitch deck as PowerPoint
//    - Input: { slides: Slide[] }
//    - Output: PPTX file download
//    - Purpose: Generates editable PowerPoint presentation
//
// DATA FLOW:
// - Frontend maintains slide state in React state and sessionStorage
// - Backend processes AI requests and returns structured data
// - Real-time updates occur as users interact with AI features
// - Export functions generate downloadable files from slide data
//
// ERROR HANDLING:
// - API calls include try-catch blocks for network errors
// - Loading states prevent multiple simultaneous requests
// - User-friendly error messages for failed operations
// - Graceful fallbacks when AI services are unavailable

'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DeckInfoCard from './components/DeckInfoCard';
import AIAnalysisCard from './components/AIAnalysisCard';
import MetricsCard from './components/MetricsCard';
import UpcomingPresentationsCard from './components/UpcomingPresentationsCard';
import SlideManagement from './components/SlideManagement';
import AIGenerateModal from './components/AIGenerateModal';
import VisualBlockComponent from './components/VisualBlock';
import ManualEditModal from './components/ManualEditModal';
import { TextBlock, VisualBlockContainer, SlideBlock, Slide, VisualBlock, BaseBlock, EditorSlide } from '../../types/slide';

/* ===== AI IMPLEMENTATION CONSTANTS ===== */
// Define standard slide types that are commonly used in pitch decks
// These provide a structured approach to creating comprehensive presentations
const STANDARD_SLIDES = [
  'The Problem',
  'Our Solution',
  'Product Demo',
  'Market Opportunity',
  'Traction',
  'Customer Love',
  'Competitive Landscape',
  'Business Model',
  'Financial Projections',
  'Go-to-Market Strategy',
  'Team',
  'Funding Ask',
  'Thank You'
] as const;

// ===== SAMPLE DATA GENERATOR =====
// Provides sample data for different chart types to help users visualize their data
// This makes it easy for founders to add professional charts without needing design skills
function getSampleData(type: string) {
  switch (type) {
    case 'pie':
      return [
        { name: 'Founders', value: 60 },
        { name: 'Investors', value: 20 },
        { name: 'ESOP', value: 20 },
      ];
    case 'bar':
      return [
        { name: 'Q1', value: 100 },
        { name: 'Q2', value: 300 },
        { name: 'Q3', value: 700 },
        { name: 'Q4', value: 1200 },
      ];
    case 'line':
      return [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 45 },
        { name: 'Mar', value: 60 },
        { name: 'Apr', value: 80 },
      ];
    case 'scatter':
      return [
        { x: 10, y: 20 },
        { x: 25, y: 40 },
        { x: 40, y: 30 },
        { x: 55, y: 60 },
      ];
    case 'table':
      return {
        columns: ['Feature', 'Status', 'ETA'],
        rows: [
          ['User Onboarding', 'Complete', 'N/A'],
          ['AI Suggestions', 'In Progress', 'Q3'],
          ['Team Collaboration', 'Planned', 'Q4'],
        ],
      };
    default:
      return [];
  }
}

export default function PitchDeckBuilder() {
  // ===== STATE MANAGEMENT =====
  // Core deck information
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);

  /* START OF OMIT - Placeholder implementation state */
  // const [showEditModal, setShowEditModal] = useState(false);
  /* END OF OMIT */

  /* ===== AI IMPLEMENTATION STATE ===== */
  // AI-powered slide management and editing
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  /* END OF AI IMPLEMENTATION */

  // ===== ANALYSIS AND FEEDBACK STATE =====
  // AI analysis metrics and feedback for pitch deck quality
  const [metrics, setMetrics] = useState({
    score: 0,
    narrative_flow: 'Not analyzed',
    visual_design: 'Not analyzed',
    data_credibility: 'Not analyzed'
  });
  const [aiFeedback, setAiFeedback] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [slidesModified, setSlidesModified] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [lastFeedbackSlidesHash, setLastFeedbackSlidesHash] = useState('');

  // ===== LIFECYCLE EFFECTS =====
  // Load state from sessionStorage on initial render to persist user work
  useEffect(() => {
    const savedSlides = sessionStorage.getItem('slides');
    const savedMetrics = sessionStorage.getItem('metrics');
    const savedAiFeedback = sessionStorage.getItem('aiFeedback');
    const savedDeckTitle = sessionStorage.getItem('deckTitle');
    const savedDeckDescription = sessionStorage.getItem('deckDescription');

    if (savedSlides) {
      const parsedSlides = JSON.parse(savedSlides);
      setSlides(parsedSlides);
      setLastFeedbackSlidesHash(generateSlidesHash(parsedSlides));
    }
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
    if (savedAiFeedback) {
      setAiFeedback(savedAiFeedback);
    }
    if (savedDeckTitle) {
      setDeckTitle(savedDeckTitle);
    }
    if (savedDeckDescription) {
      setDeckDescription(savedDeckDescription);
    }
  }, []);

  // Save state to sessionStorage whenever it changes to prevent data loss
  useEffect(() => {
    sessionStorage.setItem('slides', JSON.stringify(slides));
    sessionStorage.setItem('metrics', JSON.stringify(metrics));
    sessionStorage.setItem('aiFeedback', aiFeedback);
    sessionStorage.setItem('deckTitle', deckTitle);
    sessionStorage.setItem('deckDescription', deckDescription);
  }, [slides, metrics, aiFeedback, deckTitle, deckDescription]);

  // ===== DATA PERSISTENCE & SYNCHRONIZATION =====
  // This section explains how data flows between frontend and backend
  // 
  // FRONTEND DATA STORAGE:
  // - sessionStorage: Temporary storage for current session (cleared on browser close)
  // - React State: In-memory state for real-time UI updates
  // - Purpose: Maintains user work during browser refresh and navigation
  // 
  // BACKEND DATA STORAGE:
  // - user_data.json: Persistent storage for user pitch decks
  // - Caching: AI analysis results cached to avoid redundant processing
  // - Purpose: Long-term storage and sharing across devices
  // 
  // SYNCHRONIZATION STRATEGY:
  // 1. Frontend maintains working copy in sessionStorage and React state
  // 2. Backend stores final versions in user_data.json
  // 3. Export functions send current state to backend for processing
  // 4. AI analysis results cached on backend to improve performance
  // 5. Real-time updates occur as users interact with AI features
  // 
  // DATA FLOW PATTERNS:
  // - READ: Frontend loads from sessionStorage → Backend loads from user_data.json
  // - WRITE: Frontend updates React state → sessionStorage → Backend API calls
  // - EXPORT: Frontend sends current state → Backend generates files
  // - ANALYSIS: Frontend sends slides → Backend AI processes → Returns scores/feedback
  // 
  // ERROR HANDLING:
  // - Network failures: Frontend continues working with local state
  // - Data corruption: Fallback to sessionStorage or backend data
  // - AI service issues: Graceful degradation with cached results

  // ===== TYPE DEFINITIONS =====
  // Type definitions for AI analysis metrics to ensure data consistency
  type NarrativeFlow = 'Really Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  type VisualDesign = 'Amateur' | 'Basic' | 'Decent' | 'Polished' | 'Professional';
  type DataCredibility = 'Low' | 'Average' | 'High';

  // ===== UTILITY FUNCTIONS =====
  // Function to generate a hash of slides content to detect changes for AI analysis
  const generateSlidesHash = (slidesToHash: Slide[]) => {
    return slidesToHash.map(slide => `${slide.title}:${slide.content}:${slide.design}`).join('|');
  };

  // Function to check if slides have been modified since last feedback generation
  const hasSlidesChanged = () => {
    const currentHash = generateSlidesHash(slides);
    return currentHash !== lastFeedbackSlidesHash;
  };

  // ===== AI ANALYSIS FUNCTIONS =====
  // Consolidated function to update AI analysis and feedback
  // This is the core AI functionality that provides intelligent insights on pitch deck quality
  // 
  // BACKEND INTEGRATION DETAILS:
  // - Endpoint: POST http://localhost:8000/analyze-pitch-deck
  // - Backend processes slides through AI models to evaluate quality
  // - Returns structured metrics and optional detailed feedback
  // - Uses caching to avoid redundant analysis of unchanged content
  const updateAIAnalysis = async (slidesToAnalyze: Slide[], getFeedback: boolean = false) => {
    setAnalysisLoading(true);
    try {
      // ===== BACKEND API CALL =====
      // Send slide data to backend for AI analysis
      // The backend will process each slide through multiple AI models:
      // 1. Content analysis for narrative flow and messaging
      // 2. Design evaluation for visual appeal and professionalism
      // 3. Data credibility assessment for factual accuracy
      const response = await fetch('http://localhost:8000/analyze-pitch-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // Transform slides to backend-expected format
          slides: slidesToAnalyze.map(s => ({ 
            title: s.title, 
            content: s.content || '' 
          })),
          // Define metric scales for consistent AI evaluation
          metricScales: {
            narrative_flow: ['Really Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'],
            visual_design: ['Amateur', 'Basic', 'Decent', 'Polished', 'Professional'],
            data_credibility: ['Low', 'Average', 'High']
          },
          getFeedback // Flag to request detailed feedback text
        }),
      });

      // ===== ERROR HANDLING =====
      // Handle HTTP errors and provide user-friendly messages
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to analyze pitch deck');
      }

      // ===== RESPONSE PROCESSING =====
      // Parse backend response and update frontend state
      const data = await response.json();
      
      // Update metrics with AI-generated scores and assessments
      // These scores come from the backend's AI analysis of slide content
      setMetrics({
        score: data.score || 0,                                    // Overall quality score (0-100)
        narrative_flow: (data.narrative_flow as NarrativeFlow) || 'Not analyzed',     // Story flow quality
        visual_design: (data.visual_design as VisualDesign) || 'Not analyzed',        // Design professionalism
        data_credibility: (data.data_credibility as DataCredibility) || 'Not analyzed' // Factual accuracy
      });

      // Update feedback if requested - provides actionable insights for improvement
      // The backend generates detailed, contextual feedback based on slide content
      if (getFeedback && data.feedback) {
        setAiFeedback(data.feedback);
        // Update the hash to mark that feedback has been generated for current slides
        // This prevents unnecessary API calls for unchanged content
        setLastFeedbackSlidesHash(generateSlidesHash(slidesToAnalyze));
      }

      return data;
    } catch (error) {
      // ===== ERROR RECOVERY =====
      // Log error for debugging and reset metrics to safe defaults
      console.error('Analysis error:', error);
      setMetrics({
        score: 0,
        narrative_flow: 'Not analyzed',
        visual_design: 'Not analyzed',
        data_credibility: 'Not analyzed'
      });
      if (getFeedback) {
        setAiFeedback('Failed to generate feedback. Please try again.');
      }
      throw error;
    } finally {
      // ===== CLEANUP =====
      // Always reset loading state, regardless of success/failure
      setAnalysisLoading(false);
    }
  };

  // ===== DESIGN PARSING FUNCTION =====
  // Converts AI-generated design suggestions into CSS classes and visual elements
  // This allows the AI to suggest design improvements that can be automatically applied
  function parseDesign(design: string) {
    const cues = {
      bgColor: '',
      textColor: '',
      layout: '',
      visuals: [],
      headline: '',
    };
    if (!design) return cues;
    if (/blue background/i.test(design)) cues.bgColor = 'bg-blue-600';
    if (/white text/i.test(design)) cues.textColor = 'text-white';
    if (/two columns|2 columns/i.test(design)) cues.layout = 'grid grid-cols-2 gap-4';
    if (/pie chart/i.test(design)) cues.visuals.push('pie');
    if (/bar chart/i.test(design)) cues.visuals.push('bar');
    if (/bold.*headline|large font/i.test(design)) cues.headline = 'font-bold text-2xl';
    return cues;
  }

  /* START OF OMIT - Placeholder AI suggestions logic */
  // const defaultSuggestions = [
  //   { type: 'Content', text: 'Add more specific metrics to strengthen credibility' },
  //   { type: 'Content', text: 'Consider including customer testimonial quote' },
  //   { type: 'Design', text: 'Simplify the visual layout for better readability' },
  //   { type: 'Design', text: 'Add competitive differentiation callout' },
  // ];

  // async function fetchAISuggestion(type: 'Content' | 'Design'): Promise<{ type: string; text: string }> {
  //   // Simulate fetching a new suggestion of the given type
  //   if (type === 'Content') {
  //     return { type: 'Content', text: 'Add a compelling statistic to the slide' };
  //   } else {
  //     return { type: 'Design', text: 'Use a blue background with white text for emphasis' };
  //   }
  // }
  // async function fetchAISuggestions(slideIdx: number) {
  //   setAiSuggestions(defaultSuggestions);
  // }
  /* END OF OMIT */

  /* ===== AI SUGGESTIONS IMPLEMENTATION ===== */
  // AI-powered suggestions for improving slide content and design
  // This provides real-time guidance to help founders create better pitch decks
  // 
  // BACKEND INTEGRATION DETAILS:
  // - Endpoint: POST http://localhost:8000/generate-suggestion
  // - Backend uses AI to analyze current slide and generate contextual suggestions
  // - Suggestions are specific to the slide's content and purpose
  // - Real-time generation ensures fresh, relevant advice
  const [aiSuggestions, setAiSuggestions] = useState<{ type: string; text: string }[]>([]);
  
  // ===== INDIVIDUAL SUGGESTION FETCHER =====
  // Fetches AI-generated suggestions for content or design improvements
  // 
  // BACKEND INTEGRATION:
  // - Sends slide context to backend AI model
  // - Backend analyzes slide title, content, and design
  // - Returns contextual suggestion based on slide type and current content
  // - Handles both content improvements and design recommendations
  async function fetchAISuggestion(type: 'Content' | 'Design', slide: Slide): Promise<{ type: string; text: string }> {
    // ===== BACKEND API CALL =====
    // Send slide data to backend for AI suggestion generation
    const response = await fetch('http://localhost:8000/generate-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slide_title: slide.title,    // Context for slide type (e.g., "The Problem", "Financial Projections")
        content: slide.content,      // Current slide content for analysis
        design: slide.design,        // Current design notes for improvement suggestions
        type,                        // Request type: 'Content' or 'Design'
      }),
    });
    
    // ===== ERROR HANDLING =====
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to fetch suggestion');
    }
    
    // ===== RESPONSE PROCESSING =====
    const data = await response.json();
    return { type, text: data.suggestion };
  }
  
  // ===== BATCH SUGGESTION FETCHER =====
  // Fetches both content and design suggestions for a specific slide
  // 
  // DATA FLOW:
  // 1. User selects a slide for editing
  // 2. Frontend calls this function with slide index
  // 3. Two parallel API calls to backend for content and design suggestions
  // 4. Frontend combines suggestions and displays them to user
  // 5. User can click suggestions to apply them to the slide
  async function fetchAISuggestions(slideIdx: number) {
    if (slideIdx >= 0 && slideIdx < slides.length) {
      const slide = slides[slideIdx];
      const suggestions = [];
      
      // ===== PARALLEL API CALLS =====
      // Get content suggestion - AI analyzes current text and suggests improvements
      const contentSuggestion = await fetchAISuggestion('Content', slide);
      suggestions.push(contentSuggestion);
      
      // Get design suggestion - AI analyzes current design and suggests visual improvements
      const designSuggestion = await fetchAISuggestion('Design', slide);
      suggestions.push(designSuggestion);
      
      // Update frontend state with new suggestions
      setAiSuggestions(suggestions);
    }
  }
  
  // ===== SUGGESTION APPLICATION HANDLER =====
  // Handles when a user clicks on an AI suggestion to apply it to their slide
  // 
  // INTEGRATION FLOW:
  // 1. User clicks suggestion button
  // 2. Frontend applies suggestion to slide content/design
  // 3. Slide is marked as modified
  // 4. New suggestion is fetched to replace the used one
  // 5. UI updates to reflect changes
  const handleSuggestionClick = async (suggestion: { type: string; text: string }, idx: number) => {
    let updatedSlides = [...slides];
    if (selectedSlide === null) return;
    let slide = updatedSlides[selectedSlide];
    
    // ===== SUGGESTION PROCESSING =====
    // Detect if suggestion is for a visual element (chart, table, etc.)
    const visualType = getVisualTypeFromSuggestion(suggestion.text);
    if (visualType) {
      // For visuals, append the suggestion to the content textbox for now (or handle as needed)
      slide.content = (slide.content || '') + '\n' + suggestion.text;
    } else if (suggestion.type === 'Content') {
      // Append suggestion to content textbox only
      slide.content = (slide.content || '') + '\n' + suggestion.text;
    } else if (suggestion.type === 'Design') {
      // Append suggestion to design textbox only
      slide.design = (slide.design || '') + '\n' + suggestion.text;
    }
    
    // ===== STATE UPDATE =====
    updatedSlides[selectedSlide] = { ...slide };
    setSlides(updatedSlides);
    setSlidesModified(true); // Mark slides as modified for AI analysis
    
    // ===== SUGGESTION REPLACEMENT =====
    // Replace only the clicked suggestion with a new one of the same type
    // This ensures users always have fresh suggestions available
    const newSuggestion = await fetchAISuggestion(suggestion.type as 'Content' | 'Design', slide);
    setAiSuggestions(prev => prev.map((s, i) => (i === idx ? newSuggestion : s)));
  };
  /* END OF AI IMPLEMENTATION */

  // ===== EVENT HANDLERS =====
  /* START OF OMIT - Placeholder implementation handler */
  // const handleGenerateSlides = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('http://localhost:8000/generate-slides', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         problem: deckTitle,
  //         solution: deckDescription,
  //       }),
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Failed to generate slides');
  //     }
      
  //     const data = await response.json();
  //     // For placeholder, extract problem/solution from first two slides
  //     setSlides(data.slides.map((title: string) => {
  //       if (title.startsWith('The Problem:')) {
  //         return { title: 'The Problem', content: title.replace('The Problem:', '').trim() };
  //       } else if (title.startsWith('Our Solution:')) {
  //         return { title: 'Our Solution', content: title.replace('Our Solution:', '').trim() };
  //       }
  //       return { title, content: '' };
  //       }));
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : 'An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  /* END OF OMIT */

  /* ===== AI SLIDE GENERATION HANDLER ===== */
  // Core function that generates a complete pitch deck from problem and solution descriptions
  // This is the main AI feature that creates structured, professional pitch decks
  // 
  // BACKEND INTEGRATION DETAILS:
  // - Endpoint: POST http://localhost:8000/generate-slides
  // - Backend uses AI to create comprehensive pitch deck content
  // - Generates content for all standard slide types (Problem, Solution, Market, etc.)
  // - Returns structured content that frontend organizes into editable slides
  // 
  // COMPLETE FLOW:
  // 1. User enters problem and solution descriptions
  // 2. Frontend sends to backend AI for content generation
  // 3. Backend returns structured slide content
  // 4. Frontend organizes content into editable slide blocks
  // 5. Design suggestions are generated for each slide
  // 6. AI analysis is performed on the complete deck
  const handleGenerateSlides = async () => {
    setLoading(true);
    setError(null);
    try {
      // ===== PRIMARY SLIDE GENERATION =====
      // Send problem and solution to backend AI for comprehensive pitch deck creation
      // The backend AI analyzes the startup description and generates content for all standard slides
      const response = await fetch('http://localhost:8000/generate-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: deckTitle,        // The problem the startup is solving
          solution: deckDescription, // The startup's solution to the problem
        }),
      });
      
      // ===== ERROR HANDLING =====
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate slides');
      }
      
      // ===== RESPONSE PROCESSING =====
      const data = await response.json();
      
      // ===== CONTENT ORGANIZATION =====
      // Initialize content map for each standard slide type
      // This ensures we have a structured approach to organizing the AI-generated content
      const contentMap = STANDARD_SLIDES.reduce((acc, slideTitle) => {
        acc[slideTitle] = [];
        return acc;
      }, {} as Record<string, string[]>);

      // Group AI-generated content by slide type for better organization
      // The backend returns a flat array of content strings, so we need to categorize them
      data.slides.forEach((item: string) => {
        for (const slideTitle of STANDARD_SLIDES) {
          if (item.toLowerCase().includes(slideTitle.toLowerCase())) {
            // Remove the slide title if it exists at the start
            const content = item.replace(new RegExp(`^${slideTitle}:?\\s*`, 'i'), '').trim();
            if (content) {
              contentMap[slideTitle].push(content);
            }
            break;
          }
        }
      });

      // ===== SLIDE CREATION =====
      // Create slides with editable text blocks from AI-generated content
      // Each slide gets individual text blocks for better editing experience
      const newSlides = STANDARD_SLIDES.map(slideTitle => {
        const contents = contentMap[slideTitle];
        const combinedContent = contents.join('\n\n');
        
        // Create individual text blocks for each content piece
        // This allows users to edit specific sections independently
        const blocks: SlideBlock[] = contents.map((content, index) => ({
          id: `text-${Math.random().toString(36).substr(2, 9)}`,
          type: 'text' as const,
          content: content,
          position: { x: 50, y: 50 + (index * 100) },
          size: { width: 500, height: 80 },
          isEditable: true
        }));

        return {
          title: slideTitle,
          content: combinedContent,
          design: '',
          blocks: blocks.length > 0 ? blocks : [{
            id: `text-${Math.random().toString(36).substr(2, 9)}`,
            type: 'text' as const,
            content: '',
            position: { x: 50, y: 50 },
            size: { width: 500, height: 80 },
            isEditable: true
          }]
        };
      });

      // ===== STATE UPDATE =====
      setSlides(newSlides);
      setSlidesModified(true);
      
      // ===== POST-GENERATION ANALYSIS =====
      // Update analysis with feedback for the newly generated deck
      // This provides immediate quality assessment and improvement suggestions
      await updateAIAnalysis(newSlides, true);

      // ===== DESIGN SUGGESTION GENERATION =====
      // Generate design suggestions for each slide to enhance visual appeal
      // This creates a complete, professional-looking pitch deck
      for (const slide of newSlides) {
        try {
          // ===== DESIGN SUGGESTION API CALL =====
          // Send slide context to backend for design recommendations
          const designResponse = await fetch('http://localhost:8000/generate-design-suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              problem: deckTitle,           // Context for overall theme
              solution: deckDescription,    // Context for visual style
              slide_title: slide.title,     // Specific slide type
              current_content: slide.content, // Content to design around
            }),
          });
          
          // ===== DESIGN APPLICATION =====
          // Apply design suggestions to each slide
          if (designResponse.ok) {
            const designData = await designResponse.json();
            setSlides(prevSlides => 
              prevSlides.map(s => 
                s.title === slide.title 
                  ? { ...s, design: designData.suggestions }
                  : s
              )
            );
          }
        } catch (error) {
          // ===== ERROR RECOVERY =====
          // Log design generation errors but don't fail the entire process
          console.error(`Error generating design for slide ${slide.title}:`, error);
        }
      }
    } catch (error) {
      // ===== ERROR HANDLING =====
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      // ===== CLEANUP =====
      setLoading(false);
    }
  };

  // Handle editing a text block
  const handleEditBlock = (slideIndex: number, blockIndex: number, newContent: string) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const slide = { ...newSlides[slideIndex] };
      const blocks = [...slide.blocks];
      const block = blocks[blockIndex];
      
      if (block.type === 'text') {
        blocks[blockIndex] = {
          ...block,
          content: newContent
        };
      }
      
      slide.blocks = blocks;
      slide.content = blocks
        .filter((b): b is TextBlock => b.type === 'text')
        .map(b => b.content)
        .join('\n\n');
      newSlides[slideIndex] = slide;
      return newSlides;
    });
  };

  const handleGenerateContent = async (slideIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slide-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: deckTitle,
          solution: deckDescription,
          slide_title: slides[slideIndex]?.title,
          current_content: slides[slideIndex]?.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate content');
      }

      const data = await response.json();
      setSlides(prevSlides => {
        const newSlides = [...prevSlides];
        newSlides[slideIndex] = {
          ...newSlides[slideIndex],
          content: data.content,
        };
        return newSlides;
      });
      setSlidesModified(true); // Mark slides as modified
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDesign = async (slideIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-design-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: deckTitle,
          solution: deckDescription,
          slide_title: slides[slideIndex]?.title,
          current_content: slides[slideIndex]?.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate design');
      }

      const data = await response.json();
      setSlides(prevSlides => {
        const newSlides = [...prevSlides];
        newSlides[slideIndex] = {
          ...newSlides[slideIndex],
          design: data.suggestions,
        };
        return newSlides;
      });
      setSlidesModified(true); // Mark slides as modified
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  /* END OF AI IMPLEMENTATION */

  // Update handleAIGenerate to use the new functionality (works for both placeholder and AI implementation).
  const handleAIGenerate = async (problem: string, solution: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, solution }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate slides');
      }

      const data = await response.json();
      const newSlides = data.slides.map((slideContent: string, index: number) => ({
        title: STANDARD_SLIDES[index] || `Slide ${index + 1}`,
        content: slideContent,
        design: '',
        imageUrl: '',
        videoUrl: '',
        comments: [],
        blocks: [],
        visuals: []
      }));

      setSlides(newSlides);
      setDeckTitle(problem);
      setDeckDescription(solution);
      setSlidesModified(true); // Mark slides as modified
      setShowAIModal(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  /* START OF OMIT - Placeholder implementation handler */
  const handleEditSlide = (index: number) => {
    setSelectedSlide(index);
    setShowEditModal(true);
  };
  /* END OF OMIT */

  /* START OF OMIT - Placeholder local/dev-only upload logic */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || selectedSlide === null) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const updatedSlides = [...slides];
    if (file.type.startsWith('image/')) {
      updatedSlides[selectedSlide] = {
        ...updatedSlides[selectedSlide],
        imageUrl: url,
        videoUrl: undefined,
      };
    } else if (file.type.startsWith('video/')) {
      updatedSlides[selectedSlide] = {
        ...updatedSlides[selectedSlide],
        videoUrl: url,
        imageUrl: undefined,
      };
    }
    setSlides(updatedSlides);
  };
  /* END OF OMIT - Placeholder local/dev-only upload logic */

  // Add state for manual edit modal
  const [showManualEditModal, setShowManualEditModal] = useState(false);

  // ===== EXPORT FUNCTION =====
  // Handles export of pitch deck to PDF or PowerPoint format
  // 
  // BACKEND INTEGRATION DETAILS:
  // - Endpoints: POST /export-pdf and POST /export-ppt
  // - Backend uses reportlab (PDF) and python-pptx (PowerPoint) libraries
  // - Generates professional presentations with proper formatting
  // - Returns downloadable files for sharing and presenting
  // 
  // EXPORT FLOW:
  // 1. User clicks export button (PDF or PPT)
  // 2. Frontend sends slide data to backend
  // 3. Backend generates formatted document
  // 4. Frontend receives file blob and triggers download
  // 5. User gets professional presentation file
  const handleExport = async (type: 'pdf' | 'ppt') => {
    setError(null);
    
    // ===== VALIDATION =====
    // Ensure slides exist before attempting export
    if (!slides || slides.length === 0) {
      setError('No slides have been generated yet.');
      return;
    }
    
    try {
      // ===== BACKEND API CALL =====
      // Determine endpoint based on export type
      const endpoint = type === 'pdf' ? '/export-pdf' : '/export-ppt';
      
      // Send slide data to backend for document generation
      // Backend will create professionally formatted PDF or PowerPoint
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // Transform slides to backend-expected format
          slides: slides.map(s => ({ 
            title: s.title, 
            content: s.content || '' 
          })) 
        }),
      });
      
      // ===== ERROR HANDLING =====
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Export failed');
      }
      
      // ===== FILE DOWNLOAD =====
      // Convert response to blob and create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary download link
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'pdf' ? 'pitch_deck.pdf' : 'pitch_deck.pptx';
      
      // Trigger download and cleanup
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      // ===== ERROR RECOVERY =====
      setError(error instanceof Error ? error.message : 'Export failed');
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/get-slides?userId=demo')
      .then(res => res.json())
      .then(data => setSlides(data.slides || []));
  }, []);

  // ===== AI FEEDBACK HANDLER =====
  // Manages the display of AI-generated feedback for pitch deck improvements
  // Only generates new feedback if slides have changed to avoid unnecessary API calls
  const handleShowAIFeedback = async () => {
    // Check if slides have changed since last feedback
    if (!hasSlidesChanged() && aiFeedback) {
      // If slides haven't changed and we have existing feedback, just show the modal
      setShowFeedbackModal(true);
      return;
    }

    try {
      await updateAIAnalysis(slides, true);
      setSlidesModified(false);
      setShowFeedbackModal(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // ===== VISUAL TYPE DETECTION =====
  // Helper function to detect chart/table suggestions from AI text
  // This allows the system to automatically create visual elements based on AI suggestions
  function getVisualTypeFromSuggestion(suggestion: string): VisualBlock['type'] | null {
    if (/pie chart/i.test(suggestion)) return 'pie';
    if (/bar graph|bar chart/i.test(suggestion)) return 'bar';
    if (/line graph|line chart/i.test(suggestion)) return 'line';
    if (/scatter ?plot|scatter ?chart/i.test(suggestion)) return 'scatter';
    if (/table/i.test(suggestion)) return 'table';
    return null;
  }

  // ===== MAIN UI RENDER =====
  // The complete pitch deck builder interface with all AI-powered features
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navigation sidebar for platform-wide navigation */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header with deck title and user actions */}
        <Header />
        <main className="flex-1 p-6 md:p-10 space-y-6">
          {/* ===== TOP SECTION: DECK INFO & AI ANALYSIS ===== */}
          {/* This section provides an overview of the current deck and AI-generated insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Deck information card showing title, description, and basic stats */}
              <DeckInfoCard deckTitle={deckTitle} deckDescription={deckDescription} />
            </div>
            <div>
              {/* AI analysis card showing pitch deck quality score and feedback */}
              <AIAnalysisCard
                score={metrics.score}
                onShowFeedback={handleShowAIFeedback}
                analysisLoading={analysisLoading}
              />
            </div>
          </div>
          
          {/* ===== SLIDE MANAGEMENT SECTION ===== */}
          {/* Core interface for creating, editing, and organizing pitch deck slides */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Slide Management</h2>
              <div className="flex gap-2">
                {/* AI Generate button - creates entire pitch deck from problem/solution */}
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setShowAIModal(true)}
                >
                  AI Generate
                </button>
                {/* Export buttons for sharing and presenting */}
                <button
                  className="bg-gray-200 px-4 py-2 rounded text-gray-700"
                  onClick={() => handleExport('pdf')}
                >
                  Export PDF
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded text-gray-700"
                  onClick={() => handleExport('ppt')}
                >
                  Export PPT
                </button>
              </div>
            </div>
            {/* Slide management component for organizing and editing individual slides */}
            <SlideManagement slides={slides} onEditSlide={handleEditSlide} />
          </div>
        </main>
      </div>
      
      {/* ===== AI GENERATE MODAL ===== */}
      {/* Modal for inputting problem and solution to generate a complete pitch deck */}
      <AIGenerateModal
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={handleAIGenerate}
        loading={loading}
      />
      
      {/* ===== SLIDE EDIT MODAL ===== */}
      {/* Comprehensive slide editing interface with AI-powered suggestions and actions */}
      {showEditModal && selectedSlide !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl relative overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-2">Edit Slide</h3>
            <div className="text-xs text-gray-500 mb-4">{slides[selectedSlide]?.title || ''} • Status: final</div>
            
            {/* ===== CONTENT EDITING SECTION ===== */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Slide Content</label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[120px]"
                value={slides[selectedSlide]?.content || ''}
                onChange={e => {
                  const updatedSlides = [...slides];
                  updatedSlides[selectedSlide] = {
                    ...updatedSlides[selectedSlide],
                    content: e.target.value,
                  };
                  setSlides(updatedSlides);
                }}
                placeholder="Edit slide content here..."
              />
            </div>
            
            {/* ===== DESIGN CUSTOMIZATION SECTION ===== */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Design</label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[80px]"
                value={slides[selectedSlide]?.design || ''}
                onChange={e => {
                  const updatedSlides = [...slides];
                  updatedSlides[selectedSlide] = {
                    ...updatedSlides[selectedSlide],
                    design: e.target.value,
                  };
                  setSlides(updatedSlides);
                }}
                placeholder="Describe or customize the slide design (layout, colors, visuals, etc.)"
              />
            </div>
            
            {/* ===== MEDIA UPLOAD SECTION ===== */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Add Image or Video</label>
              <input
                type="file"
                accept="image/*,video/*"
                className="mb-2"
                onChange={handleFileChange}
              />
              {slides[selectedSlide]?.imageUrl && (
                <img src={slides[selectedSlide].imageUrl} alt="Preview" className="max-h-40 rounded mb-2" />
              )}
              {slides[selectedSlide]?.videoUrl && (
                <video src={slides[selectedSlide].videoUrl} controls className="max-h-40 rounded mb-2" />
              )}
              <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer text-gray-400">
                <span className="text-3xl mb-2">🖼️</span>
                <span>Click to upload image or video</span>
                <span className="text-xs mt-1">PNG, JPG, MP4 up to 10MB</span>
              </div>
            </div>
            
            {/* ===== LIVE PREVIEW SECTION ===== */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-1">Preview</label>
              {(() => {
                const design = slides[selectedSlide]?.design || '';
                const cues = parseDesign(design);
                const visuals = slides[selectedSlide]?.visuals || [];
                return (
                  <div className={`rounded-lg flex flex-col items-center justify-center py-8 min-h-[120px] ${cues.bgColor} ${cues.textColor} ${cues.layout} relative`}>
                    <span className={`mb-2 ${cues.headline}`}>{slides[selectedSlide]?.title}</span>
                    {slides[selectedSlide]?.content && (
                      <div className="text-left" dangerouslySetInnerHTML={{ __html: slides[selectedSlide].content }} />
                    )}
                    {visuals.map((visual, idx) => (
                      <div key={idx} className="my-2">
                        <VisualBlockComponent
                          type={visual.type}
                          data={visual.data || getSampleData(visual.type)}
                          config={visual.config}
                        />
                      </div>
                    ))}
                    {/* Manual edit button for advanced customization */}
                    <button
                      className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 shadow"
                      onClick={() => setShowManualEditModal(true)}
                    >
                      <span role="img" aria-label="magic-wand">✨</span> Edit
                    </button>
                  </div>
                );
              })()}
            </div>
            
            {/* ===== COMMENT SECTION ===== */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Add Comment</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Add a comment..."
                value={''}
                onChange={() => {}}
              />
            </div>
            
            {/* ===== AI ASSISTANCE SECTION ===== */}
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-6">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                {/* AI Suggestions - real-time recommendations for improving the slide */}
                <div className="bg-blue-50 rounded-lg p-3 mb-1">
                  <div className="font-semibold text-blue-700 mb-1">AI Suggestions</div>
                  <div className="flex flex-col gap-2">
                    {aiSuggestions.map((s, i) => (
                      <button
                        key={i}
                        className="bg-blue-100 rounded p-2 text-sm text-left hover:bg-blue-200 transition flex items-center gap-2"
                        onClick={() => handleSuggestionClick(s, i)}
                      >
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${s.type === 'Content' ? 'bg-green-200 text-green-800' : 'bg-purple-200 text-purple-800'}`}>{s.type}</span>
                        <span>{s.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* AI Actions - automated content and design generation */}
                <div className="bg-white rounded-lg p-3 flex flex-col gap-2">
                  <div className="font-semibold text-gray-700 mb-1">AI Actions</div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        // Generate content
                        const contentResponse = await fetch('http://localhost:8000/generate-slide-content', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                          }),
                        });
                        if (!contentResponse.ok) {
                          const errorData = await contentResponse.json();
                          throw new Error(errorData.detail || 'Failed to generate content');
                        }
                        const contentData = await contentResponse.json();
                        // Generate design
                        const designResponse = await fetch('http://localhost:8000/generate-design-suggestions', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            current_content: contentData.content,
                          }),
                        });
                        let design = '';
                        if (designResponse.ok) {
                          const designData = await designResponse.json();
                          design = designData.suggestions;
                        }
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: contentData.content,
                            design,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Generating...' : 'Generate Content'}
                  </button>
                  <button
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const response = await fetch('http://localhost:8000/optimize-for-investors', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            content: slides[selectedSlide]?.content,
                          }),
                        });
                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.detail || 'Failed to optimize for investors');
                        }
                        const data = await response.json();
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: data.content,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Optimizing...' : 'Optimize for Investors'}
                  </button>
                  <button
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const response = await fetch('http://localhost:8000/add-data-visualization', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            content: slides[selectedSlide]?.content,
                          }),
                        });
                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.detail || 'Failed to add data visualization');
                        }
                        const data = await response.json();
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: data.content,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Adding...' : 'Add Data Visualization'}
                  </button>
                  <button
                    className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:opacity-60"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      setError(null);
                      try {
                        const response = await fetch('http://localhost:8000/improve-messaging', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            problem: deckTitle,
                            solution: deckDescription,
                            slide_title: slides[selectedSlide]?.title,
                            content: slides[selectedSlide]?.content,
                          }),
                        });
                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.detail || 'Failed to improve messaging');
                        }
                        const data = await response.json();
                        setSlides(prevSlides => {
                          const newSlides = [...prevSlides];
                          newSlides[selectedSlide] = {
                            ...newSlides[selectedSlide],
                            content: data.content,
                          };
                          return newSlides;
                        });
                        setSlidesModified(true); // Mark slides as modified
                      } catch (error) {
                        setError(error instanceof Error ? error.message : 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading ? 'Improving...' : 'Improve Messaging'}
                  </button>
                </div>
                <div className="bg-white rounded-lg p-3 flex flex-col gap-2">
                  <div className="font-semibold text-gray-700 mb-1">Templates</div>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">B2B SaaS Template</button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">Consumer App Template</button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">Hardware Startup Template</button>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/2 md:items-end md:justify-end mt-4 md:mt-0">
                <button className="w-full md:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button
                  className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={async () => {
                    if (selectedSlide === null) return;
                    const updatedSlides = [...slides];
                    // If blocks exist, extract content and visuals from blocks
                    const blocks = updatedSlides[selectedSlide].blocks;
                    let content = updatedSlides[selectedSlide].content || '';
                    let visuals = updatedSlides[selectedSlide].visuals || [];
                    if (blocks && Array.isArray(blocks)) {
                      content = '';
                      visuals = [];
                      blocks.forEach(block => {
                        if (block.type === 'text') {
                          let html = block.content || '';
                          if (html.startsWith('<p>') && html.endsWith('</p>')) {
                            const inner = html.slice(3, -4);
                            if (!inner.includes('<p>') && !inner.includes('</p>')) {
                              html = inner;
                            }
                          }
                          content += html + '\n';
                        } else if (block.type === 'visual') {
                          visuals.push(block.visual);
                        }
                      });
                      content = content.trim();
                    }
                    updatedSlides[selectedSlide] = {
                      ...updatedSlides[selectedSlide],
                      content,
                      visuals,
                    };
                    setSlides(updatedSlides);
                    setSlidesModified(true);
                    setShowEditModal(false);
                    // Persist updated slides to backend
                    await fetch('http://localhost:8000/save-slides', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        userId: 'demo', // Replace with real user/session ID if you have auth
                        slides: updatedSlides,
                      }),
                    });
                  }}
                >
                  Save Changes
                </button>
                <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded">Share</button>
              </div>
            </div>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>
        </div>
      )}
      {/* END OF AI IMPLEMENTATION - Slide Edit Modal with AI actions */}
      {/* Manual Edit Modal */}
      {showManualEditModal && selectedSlide !== null && (
        <ManualEditModal
          slide={{
            ...slides[selectedSlide],
            blocks: [
              {
                id: `text-${Math.random().toString(36).substr(2, 9)}`,
                type: 'text',
                content: slides[selectedSlide].title,
                position: { x: 50, y: 50 },
                size: { width: 500, height: 80 },
                isEditable: true
              } as TextBlock,
              ...(slides[selectedSlide].content ? [{
                id: `text-${Math.random().toString(36).substr(2, 9)}`,
                type: 'text',
                content: slides[selectedSlide].content,
                position: { x: 50, y: 150 },
                size: { width: 500, height: 80 },
                isEditable: true
              } as TextBlock] : []),
              ...(slides[selectedSlide].visuals?.map((v, i) => ({
                id: `visual-${i}`,
                type: 'visual',
                visual: v,
                position: { x: 50, y: 250 + (i * 100) },
                size: { width: 500, height: 80 }
              } as VisualBlockContainer)) || [])
            ]
          } as EditorSlide}
          onClose={() => setShowManualEditModal(false)}
          onSave={async updatedSlide => {
            const updatedSlides = [...slides];
            updatedSlides[selectedSlide] = {
              ...updatedSlide,
              title: updatedSlide.blocks?.find(b => b.type === 'text')?.content || slides[selectedSlide].title,
              content: updatedSlide.blocks
                ?.filter((b): b is TextBlock => b.type === 'text')
                .slice(1) // Skip the title block
                .map(b => b.content)
                .join('\n\n') || '',
              design: updatedSlide.design || '',
              blocks: updatedSlide.blocks || [],
              visuals: updatedSlide.blocks
                ?.filter(b => b.type === 'visual')
                .map(b => (b as VisualBlockContainer).visual) || []
            } as Slide;
            setSlides(updatedSlides);
            setSlidesModified(true);
            setShowManualEditModal(false);
            
            // Persist updated slides to backend
            await fetch('http://localhost:8000/save-slides', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: 'demo',
                slides: updatedSlides,
              }),
            });

            // Update analysis with feedback
            await updateAIAnalysis(updatedSlides, true);
          }}
        />
      )}
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>
            {analysisLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Generating feedback...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">Overall Score</h4>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-blue-600 mr-2">{metrics.score}</span>
                    <span className="text-gray-600">/ 100</span>
                  </div>
                </div>

                {/* Narrative Flow */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-green-700">Narrative Flow</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{metrics.narrative_flow}</p>
                </div>

                {/* Visual Design */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-blue-700">Visual Design</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{metrics.visual_design}</p>
                </div>

                {/* Data Credibility */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-yellow-700">Data Credibility</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{metrics.data_credibility}</p>
                </div>

                {/* Specific Feedback and Suggestions */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2 text-purple-700">Specific Feedback & Suggestions</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{aiFeedback}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
              disabled={analysisLoading}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 