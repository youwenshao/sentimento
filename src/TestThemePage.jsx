import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';

export default function TestThemePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-primary text-primary p-8 transition-colors duration-300 font-sans">
      <h1 className="text-3xl font-bold mb-8">Theme Test Page</h1>
      
      <div className="mb-8">
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-md"
        >
          Toggle Theme ({theme.toUpperCase()})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Text Colors Test */}
        <div className="space-y-4 border border-tertiary/20 p-6 rounded-lg bg-surface transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-primary border-b border-tertiary/10 pb-2">Text Colors</h2>
          <div className="space-y-4">
            <div>
              <p className="text-primary text-2xl font-bold">Primary Text</p>
              <p className="text-xs font-mono opacity-60">Class: text-primary | Light: #1A202C | Dark: #F7FAFC</p>
            </div>
            <div>
              <p className="text-secondary text-lg font-medium">Secondary Text</p>
              <p className="text-xs font-mono opacity-60">Class: text-secondary | Light: #2D3748 | Dark: #EDF2F7</p>
            </div>
            <div>
              <p className="text-tertiary text-base">Tertiary Text</p>
              <p className="text-xs font-mono opacity-60">Class: text-tertiary | Light: #4A5568 | Dark: #E2E8F0</p>
            </div>
          </div>
        </div>

        {/* Background Colors Test */}
        <div className="space-y-4 border border-tertiary/20 p-6 rounded-lg bg-surface transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-primary border-b border-tertiary/10 pb-2">Background Colors</h2>
          
          <div className="p-6 bg-primary border border-tertiary/10 rounded shadow-sm transition-colors duration-300">
            <p className="text-primary font-medium">Primary Background (Page Default)</p>
            <p className="text-xs text-secondary mt-1">Class: bg-primary | Light: #FAFAFA | Dark: #0c0a09</p>
          </div>

          <div className="p-6 bg-surface border border-tertiary/10 rounded shadow-sm transition-colors duration-300">
            <p className="text-primary font-medium">Surface Background</p>
            <p className="text-xs text-secondary mt-1">Class: bg-surface | Light: #F5F5F5 | Dark: #1c1917</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 border border-tertiary/20 rounded-lg bg-surface/50">
        <h3 className="text-lg font-medium mb-2 text-primary">Validation Instructions</h3>
        <ul className="list-disc pl-5 text-secondary space-y-2 text-sm">
          <li>Click the <strong>Toggle Theme</strong> button above to switch between Light and Dark modes.</li>
          <li><strong>Light Mode Check:</strong> Ensure text is dark gray (almost black) and background is off-white.</li>
          <li><strong>Dark Mode Check:</strong> Ensure text is light gray (almost white) and background is deep black/brown.</li>
          <li><strong>Persistence Check:</strong> Refresh the page. The theme should remain in the state you left it.</li>
        </ul>
      </div>
    </div>
  );
}
