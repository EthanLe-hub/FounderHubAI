// ===== AI ANALYSIS CARD COMPONENT =====
// This component displays AI-generated analysis of pitch deck quality and provides access to detailed feedback
// It shows a numerical score (1-10) and allows users to view comprehensive AI recommendations
// This translates to an intelligent quality assessment tool that helps founders improve their presentations

import React from 'react';

// ===== COMPONENT PROPS =====
// Props interface for the AI analysis card
type Props = {
  score: number | null;           // AI-generated quality score (0-100, converted to 1-10)
  onShowFeedback: () => void;     // Callback to display detailed AI feedback modal
  analysisLoading: boolean;       // Loading state while AI is analyzing the pitch deck
};

export default function AIAnalysisCard({ score, onShowFeedback, analysisLoading }: Props) {
  // Convert the 0-100 score to a 1-10 scale for easier understanding
  const displayScore = score !== null ? Math.round(score / 10) : null;
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      {/* ===== CARD HEADER ===== */}
      <h3 className="font-semibold mb-2">AI Analysis</h3>
      
      {/* ===== SCORE DISPLAY ===== */}
      {/* Shows the AI-generated quality score on a 1-10 scale */}
      <div className="flex items-center mb-2">
        <span className="text-2xl font-bold text-red-500 mr-2">{displayScore !== null ? displayScore : '--'}</span>
        <span className="text-gray-500">/ 10</span>
      </div>
      
      {/* ===== FEEDBACK BUTTON ===== */}
      {/* Button to access detailed AI feedback and recommendations */}
      <button 
        className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 disabled:opacity-50" 
        onClick={onShowFeedback}
        disabled={analysisLoading}
      >
        {analysisLoading ? 'Generating feedback...' : 'Show AI Feedback'}
      </button>
    </div>
  );
} 