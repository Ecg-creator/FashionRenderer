import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FiFile, FiDownload, FiFolder, FiExternalLink } from 'react-icons/fi';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Skeleton } from '../ui/skeleton';

interface PatternFile {
  name: string;
  originalName: string;
  size: number;
  createdAt: string;
  path: string;
  type: string;
}

interface PatternFilesResponse {
  files: PatternFile[];
}

const fetchPatternFiles = async (): Promise<PatternFilesResponse> => {
  const response = await fetch('/api/patterns/files');
  if (!response.ok) {
    throw new Error('Failed to fetch pattern files');
  }
  return response.json();
};

export function PatternFileList() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const { data, isLoading, error } = useQuery<PatternFilesResponse>({
    queryKey: ['patterns', 'files'],
    queryFn: fetchPatternFiles,
    refetchInterval: 30000, // Refetch every 30 seconds to keep the list updated
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPatternTypeBadgeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'shirt':
        return 'bg-blue-100 text-blue-800';
      case 'pants':
        return 'bg-green-100 text-green-800';
      case 'jacket':
        return 'bg-purple-100 text-purple-800';
      case 'dress':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FiFolder className="text-blue-600" /> 
            Pattern Files
          </CardTitle>
          <CardDescription>
            Uploaded garment pattern files
          </CardDescription>
        </div>
        <Tabs defaultValue="grid" className="w-auto" value={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
          <TabsList className="grid w-24 grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-md">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-800 rounded-md">
            Failed to load pattern files. Please try again.
          </div>
        ) : data?.files.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <FiFile className="mx-auto h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No pattern files uploaded yet</p>
            <p className="mt-1 text-sm">Upload your first pattern file using the uploader above</p>
          </div>
        ) : (
          <div>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.files.map((file) => (
                  <div 
                    key={file.name} 
                    className="p-4 border rounded-md hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium truncate flex-1" title={file.originalName}>
                        {file.originalName}
                      </p>
                      <Badge className={getPatternTypeBadgeColor(file.type)}>
                        {file.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{formatFileSize(file.size)}</p>
                    <p className="text-sm text-gray-500 mb-4">{formatDate(file.createdAt)}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a href={file.path} download={file.originalName}>
                          <FiDownload className="mr-1 h-4 w-4" /> Download
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a href={file.path} target="_blank" rel="noopener noreferrer">
                          <FiExternalLink className="mr-1 h-4 w-4" /> Open
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {data?.files.map((file) => (
                  <div 
                    key={file.name} 
                    className="p-3 border rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <FiFile className="h-5 w-5 text-gray-400 mr-3" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" title={file.originalName}>
                        {file.originalName}
                      </p>
                      <div className="flex text-sm text-gray-500 gap-3">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{formatDate(file.createdAt)}</span>
                      </div>
                    </div>
                    <Badge className={`mr-3 ${getPatternTypeBadgeColor(file.type)}`}>
                      {file.type}
                    </Badge>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <a href={file.path} download={file.originalName}>
                          <FiDownload className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <a href={file.path} target="_blank" rel="noopener noreferrer">
                          <FiExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}