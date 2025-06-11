
import { Camera, Mic, History, User, ArrowRight, Shield, Brain, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onShowAuth: () => void;
  user?: any;
  onSignOut?: () => void;
}

const LandingPage = ({ onNavigate, onShowAuth, user, onSignOut }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EchoRemedy</h1>
              <p className="text-sm text-gray-600">AI Health Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Welcome, {user.email?.split('@')[0]}</span>
                <Button
                  variant="outline"
                  onClick={onSignOut}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={onShowAuth}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Health Analysis
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload photos or describe symptoms to get instant AI-powered analysis and personalized remedy suggestions
        </p>
        
        {user ? (
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('upload')}
              className="flex items-center gap-2"
            >
              <Camera className="h-5 w-5" />
              Upload Photo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('voice')}
              className="flex items-center gap-2"
            >
              <Mic className="h-5 w-5" />
              Voice Input
            </Button>
          </div>
        ) : (
          <Button 
            size="lg" 
            onClick={onShowAuth}
            className="flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className={`text-center ${!user ? 'opacity-75' : 'hover:shadow-lg transition-shadow cursor-pointer'}`} 
                onClick={() => user ? onNavigate('upload') : onShowAuth()}>
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Upload & Analyze</CardTitle>
              <CardDescription>
                Take a photo of your symptoms and get instant AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user && (
                <p className="text-sm text-amber-600 font-medium">Sign in required</p>
              )}
            </CardContent>
          </Card>

          <Card className={`text-center ${!user ? 'opacity-75' : 'hover:shadow-lg transition-shadow cursor-pointer'}`}
                onClick={() => user ? onNavigate('voice') : onShowAuth()}>
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Voice Description</CardTitle>
              <CardDescription>
                Describe your symptoms using voice input for detailed analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user && (
                <p className="text-sm text-amber-600 font-medium">Sign in required</p>
              )}
            </CardContent>
          </Card>

          <Card className={`text-center ${!user ? 'opacity-75' : 'hover:shadow-lg transition-shadow cursor-pointer'}`}
                onClick={() => user ? onNavigate('history') : onShowAuth()}>
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <History className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Track History</CardTitle>
              <CardDescription>
                Keep track of all your health analyses and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user && (
                <p className="text-sm text-amber-600 font-medium">Sign in required</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose EchoRemedy?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Secure & Private</h4>
              <p className="text-gray-600">Your health data is encrypted and kept completely private</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">AI-Powered</h4>
              <p className="text-gray-600">Advanced machine learning provides accurate analysis</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Instant Results</h4>
              <p className="text-gray-600">Get immediate analysis and remedy suggestions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-600 mb-8">Join thousands of users who trust EchoRemedy for health insights</p>
          <Button size="lg" onClick={onShowAuth} className="flex items-center gap-2 mx-auto">
            Sign Up Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            <strong>Medical Disclaimer:</strong> EchoRemedy provides general information only. 
            Always consult with qualified healthcare professionals for proper medical diagnosis and treatment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
