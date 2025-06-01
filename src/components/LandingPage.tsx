
import { useState } from 'react';
import { Camera, Mic, User, Upload, Brain, Clock, Shield, Home, Heart, ChevronRight, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onShowAuth: () => void;
}

const LandingPage = ({ onNavigate, onShowAuth }: LandingPageProps) => {
  return (
    <div 
      className="min-h-screen text-white overflow-x-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #1a0033 0%, #2d1b69 25%, #4c1d95 50%, #7c3aed 75%, #a855f7 100%)'
      }}
    >
      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">EchoRemedy</h1>
          </div>
          <Button
            variant="outline"
            onClick={onShowAuth}
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <User className="h-4 w-4 mr-2" />
            Login / Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            First Aid, Smarter. Safer. Sooner.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
            Scan a symptom. Speak a concern. Get instant AI-backed remedies at home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => onNavigate('upload')}
              className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Symptom Photo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('voice')}
              className="border-white bg-white/10 text-white hover:bg-white/20 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <Mic className="h-5 w-5 mr-2" />
              Try Voice Scan
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="bg-white/30 rounded-lg p-4 mb-4">
                <Camera className="h-12 w-12 text-white mx-auto mb-2" />
                <p className="text-sm text-white">AI analyzing symptom...</p>
              </div>
              <div className="text-left">
                <div className="bg-green-500/30 rounded-lg p-3 mb-2 border border-green-400/50">
                  <p className="text-sm font-medium text-white">Minor cut detected</p>
                  <p className="text-xs text-green-100">Urgency: Low</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Step 1: Upload or Speak</h3>
            <p className="text-white/80">Use photo or voice input to describe your symptom</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Step 2: AI Analysis</h3>
            <p className="text-white/80">AI analyzes and scores urgency level instantly</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Step 3: Get Remedies</h3>
            <p className="text-white/80">Receive instant remedy suggestions with explanations</p>
          </div>
        </div>
      </section>

      {/* Why EchoRemedy */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">Why EchoRemedy?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Brain, title: 'AI-Powered Accuracy', desc: 'Advanced AI models for precise symptom analysis' },
            { icon: Clock, title: 'Real-Time Detection', desc: 'Instant urgency scoring and recommendations' },
            { icon: Mic, title: 'Voice-Friendly Interface', desc: 'Speak your symptoms naturally and clearly' },
            { icon: Home, title: 'Home-Based Remedies', desc: 'Safe, effective treatments you can do at home' },
            { icon: Shield, title: 'Private & Secure', desc: 'Your health data stays protected and private' },
            { icon: Heart, title: 'Health Expert Backed', desc: 'Developed with medical professionals' }
          ].map((feature, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 border border-white/30">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Try Live Demo</h2>
          <p className="text-white/80 mb-8">Experience our AI analysis with a sample image</p>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-md p-8 shadow-lg">
            <div className="bg-white/20 rounded-lg p-6 mb-6 border border-white/30">
              <div className="w-32 h-32 bg-white/30 rounded-lg mx-auto mb-4 flex items-center justify-center border border-white/40">
                <Camera className="h-16 w-16 text-white" />
              </div>
              <Button 
                variant="outline" 
                className="border-white bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                onClick={() => onNavigate('upload')}
              >
                <Play className="h-4 w-4 mr-2" />
                Try Demo Scan
              </Button>
            </div>
            <p className="text-sm text-white/70">This is anonymous, no data is stored</p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">What People Say</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              quote: "Helped me treat my son's rash before it worsened! The AI was surprisingly accurate.",
              author: "Sarah M."
            },
            {
              quote: "Saved me a late-night hospital visit. Quick, reliable, and easy to use.",
              author: "James T."
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-white/70 font-medium">— {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* App Screenshots */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">App Preview</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Scan Screen', desc: 'Upload and analyze symptoms' },
            { title: 'AI Results', desc: 'Get instant remedy suggestions' },
            { title: 'History Dashboard', desc: 'Track your health journey' }
          ].map((screen, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md shadow-lg">
              <CardContent className="p-6">
                <div className="bg-white/20 rounded-lg h-48 mb-4 flex items-center justify-center border border-white/30">
                  <Camera className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{screen.title}</h3>
                <p className="text-white/80">{screen.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Join the Health Revolution</h2>
          <p className="text-xl text-white/80 mb-8">
            Start diagnosing smarter. Get instant AI-backed health insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('upload')}
              className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Launch Web App
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white hover:bg-white/20 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-black/30 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-bold text-white">EchoRemedy</span>
              </div>
              <p className="text-white/70 text-sm">
                AI-powered health insights for everyone
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/70 text-sm">
              Built with ❤️ by AI & Health Experts © 2024 EchoRemedy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
