import React, { useState, useEffect } from 'react';
import SentimentoPage from '../SentimentoPage.jsx';
import TestThemePage from './TestThemePage.jsx';

export default function App() {
  const [isTest, setIsTest] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsTest(params.get('test') === 'true');
  }, []);

  if (isTest) {
    return <TestThemePage />;
  }

  return <SentimentoPage />;
}
