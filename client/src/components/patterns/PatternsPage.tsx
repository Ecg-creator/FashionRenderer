import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PatternList } from './PatternList';
import { PatternDetail } from './PatternDetail';
import { PatternNFTMarketplace } from './PatternNFTMarketplace';
import { PatternCustomizerPage } from './PatternCustomizerPage';
import { PatternFilesPage } from './PatternFilesPage';

export function PatternsPage() {
  return (
    <Routes>
      <Route path="/" element={<PatternNFTMarketplace />} />
      <Route path="/list" element={<PatternList />} />
      <Route path="/files" element={<PatternFilesPage />} />
      <Route path="/:patternId" element={<PatternDetail />} />
      <Route path="/:patternId/customize" element={<PatternCustomizerPage />} />
    </Routes>
  );
}