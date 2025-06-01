
import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const PhotoUpload = ({ onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast({
        title: "Image uploaded successfully",
        description: "Ready for analysis"
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Mock AI analysis - replace with actual AI service
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockResults = [
        {
          condition: "Minor skin irritation",
          remedy: "Apply cold compress for 10-15 minutes. Use aloe vera gel. Keep area clean and dry.",
          urgency: "Low",
          explanation: "Based on the image, this appears to be a minor skin irritation. The redness and slight swelling suggest a localized reaction.",
          seekMedicalAttention: false,
          imageUrl: previewUrl
        },
        {
          condition: "Possible allergic reaction",
          remedy: "Take antihistamine, apply cold compress, avoid known allergens.",
          urgency: "Medium",
          explanation: "The pattern and appearance suggest an allergic reaction. Monitor for spreading or worsening symptoms.",
          seekMedicalAttention: true,
          imageUrl: previewUrl
        },
        {
          condition: "Superficial cut",
          remedy: "Clean with antiseptic, apply bandage, keep dry. Change bandage daily.",
          urgency: "Low",
          explanation: "This appears to be a superficial cut that should heal with proper care and hygiene.",
          seekMedicalAttention: false,
          imageUrl: previewUrl
        }
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      onAnalysisComplete(result);
      
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Camera className="h-6 w-6 text-blue-600" />
                Photo Analysis
              </CardTitle>
              <CardDescription>
                Upload a clear photo of your symptom for AI-powered analysis
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">Image ready for analysis</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your image here</p>
                      <p className="text-gray-600">or click to browse</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                disabled={isAnalyzing}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Analysis Button */}
              {selectedFile && (
                <Button
                  onClick={analyzeImage}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </Button>
              )}

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Tips for better analysis:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Take photo directly above the affected area</li>
                  <li>• Include surrounding healthy skin for comparison</li>
                  <li>• Use a clean, clear background</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
