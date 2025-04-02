import React from 'react';
import { PatternUpload } from './PatternUpload';
import { PatternFileList } from './PatternFileList';

export function PatternFilesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Pattern Files</h1>
      
      <div className="grid gap-8">
        <PatternUpload />
        <PatternFileList />
      </div>
    </div>
  );
}