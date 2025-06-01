
import { AlertTriangle, CheckCircle, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AnalysisResult = ({ result, onBack }) => {
  if (!result) return null;

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'High':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Medium':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Main Result Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{result.condition}</CardTitle>
                  <div className="flex items-center gap-3">
                    {getUrgencyIcon(result.urgency)}
                    <Badge variant={getUrgencyColor(result.urgency)}>
                      {result.urgency} Priority
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Image Preview */}
              {result.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={result.imageUrl} 
                    alt="Symptom analysis" 
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}

              {/* Voice Input */}
              {result.voiceInput && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Your Description:</h4>
                  <p className="text-blue-800 italic">"{result.voiceInput}"</p>
                </div>
              )}

              <Separator />

              {/* AI Explanation */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Analysis</h3>
                <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
              </div>

              <Separator />

              {/* Recommended Remedy */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Recommended Remedy
                </h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800">{result.remedy}</p>
                </div>
              </div>

              {/* Medical Attention Warning */}
              {result.seekMedicalAttention && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-900 mb-1">Medical Attention Recommended</h4>
                        <p className="text-amber-800 text-sm">
                          While this remedy may provide relief, we recommend consulting with a healthcare 
                          professional for proper diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={onBack} variant="outline" className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Save to History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Important Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  This analysis is for informational purposes only
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  Always consult a healthcare professional for serious concerns
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  Seek immediate medical attention if symptoms worsen
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  Emergency services: Call 911 for life-threatening situations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
