
import { useState, useEffect } from 'react';
import { Camera, Mic, History, User, Upload, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PhotoUpload from '@/components/PhotoUpload';
import VoiceInput from '@/components/VoiceInput';
import SymptomHistory from '@/components/SymptomHistory';
import AuthModal from '@/components/AuthModal';
import AnalysisResult from '@/components/AnalysisResult';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    // Check if user is authenticated (mock for now)
    const user = localStorage.getItem('echoremedy_user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setCurrentView('result');
    
    // Add to symptom history
    const newSymptom = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...result
    };
    
    const updatedSymptoms = [newSymptom, ...symptoms];
    setSymptoms(updatedSymptoms);
    localStorage.setItem('echoremedy_symptoms', JSON.stringify(updatedSymptoms));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage 
            onNavigate={setCurrentView}
            onShowAuth={() => setShowAuthModal(true)}
          />
        );
      case 'upload':
        return <PhotoUpload onAnalysisComplete={handleAnalysisComplete} />;
      case 'voice':
        return <VoiceInput onAnalysisComplete={handleAnalysisComplete} />;
      case 'history':
        return <SymptomHistory symptoms={symptoms} />;
      case 'result':
        return <AnalysisResult result={analysisResult} onBack={() => setCurrentView('landing')} />;
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">EchoRemedy</h1>
                  <p className="text-gray-600">AI-powered symptom analysis and remedy suggestions</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {isAuthenticated ? 'Profile' : 'Sign In'}
                </Button>
              </div>

              {/* Disclaimer */}
              <Card className="mb-8 border-amber-200 bg-amber-50">
                <CardContent className="flex items-start gap-3 pt-6">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800 text-sm">
                      <strong>Medical Disclaimer:</strong> This app provides general information and suggestions only. 
                      Always consult with a qualified healthcare professional for proper medical diagnosis and treatment.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Main Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('upload')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Camera className="h-6 w-6 text-blue-600" />
                      </div>
                      Photo Analysis
                    </CardTitle>
                    <CardDescription>
                      Upload a photo of your symptom for AI-powered analysis and remedy suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('voice')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mic className="h-6 w-6 text-green-600" />
                      </div>
                      Voice Input
                    </CardTitle>
                    <CardDescription>
                      Describe your symptoms using voice input for personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Mic className="h-4 w-4 mr-2" />
                      Start Recording
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* History Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <History className="h-5 w-5" />
                    Recent Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {symptoms.length > 0 ? (
                    <div className="space-y-3">
                      {symptoms.slice(0, 3).map((symptom) => (
                        <div key={symptom.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{symptom.condition}</p>
                            <p className="text-sm text-gray-600">{new Date(symptom.date).toLocaleDateString()}</p>
                          </div>
                          <Badge variant={symptom.urgency === 'High' ? 'destructive' : symptom.urgency === 'Medium' ? 'default' : 'secondary'}>
                            {symptom.urgency}
                          </Badge>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCurrentView('history')}
                      >
                        View All History
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No analysis history yet. Start by uploading a photo or using voice input.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {(currentView !== 'landing' && currentView !== 'home') && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('landing')}
              className="mb-2"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      )}
      
      {renderContent()}
      
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={() => {
            setIsAuthenticated(true);
            setShowAuthModal(false);
          }}
        />
      )}
    </>
  );
};

export default Index;
