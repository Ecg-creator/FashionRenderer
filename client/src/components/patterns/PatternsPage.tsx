import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PatternList } from './PatternList';
import { PatternDetail } from './PatternDetail';

export function PatternsPage() {
  return (
    <Routes>
      <Route path="/" element={<PatternList />} />
      <Route path="/:patternId" element={<PatternDetail />} />
    </Routes>
  );
}