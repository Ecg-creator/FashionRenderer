import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { FiUpload, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { RiFileLine } from 'react-icons/ri';
import { useQueryClient } from '@tanstack/react-query';

interface UploadedFile {
  fileName: string;
  originalName: string;
  size: number;
  path: string;
}

export function PatternUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if it's a zip file
      if (!file.name.endsWith('.zip')) {
        setError('Please select a ZIP file');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
      setUploadSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('patternFile', selectedFile);

    try {
      const response = await fetch('/api/patterns/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      setUploadSuccess(data);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFile(null);
      
      // Invalidate the patterns/files query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['patterns', 'files'] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiUpload className="text-blue-600" /> 
          Upload Pattern File
        </CardTitle>
        <CardDescription>
          Upload your garment pattern files in ZIP format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="pattern-file">Pattern File (ZIP)</Label>
            <Input
              id="pattern-file"
              ref={fileInputRef}
              type="file"
              accept=".zip"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center text-sm">
                <RiFileLine className="mr-2 text-gray-500" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className="text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
            )}
          </div>
          
          {error && (
            <Alert variant="destructive">
              <FiAlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {uploadSuccess && (
            <Alert className="bg-green-50 border-green-200">
              <FiCheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Upload Successful</AlertTitle>
              <AlertDescription className="text-green-700">
                File {uploadSuccess.originalName} ({formatFileSize(uploadSuccess.size)}) has been uploaded successfully.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Pattern'}
        </Button>
      </CardFooter>
    </Card>
  );
}