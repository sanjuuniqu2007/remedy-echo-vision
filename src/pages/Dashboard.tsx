
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Camera, 
  Mic, 
  BookOpen, 
  FileText, 
  LogOut,
  Heart,
  Activity,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MedixoChatbot from '@/components/MedixoChatbot';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const quickActions = [
    {
      title: 'Upload Symptom Photo',
      description: 'Take or upload a photo for AI analysis',
      icon: Camera,
      color: 'bg-blue-500',
      path: '/upload'
    },
    {
      title: 'Voice Symptom Scan',
      description: 'Describe your symptoms using voice input',
      icon: Mic,
      color: 'bg-green-500',
      path: '/voice-scan'
    },
    {
      title: 'Home Remedies',
      description: 'Browse natural remedies by category',
      icon: BookOpen,
      color: 'bg-purple-500',
      path: '/home-remedy'
    },
    {
      title: 'Health Journal',
      description: 'Track your symptoms and medications',
      icon: FileText,
      color: 'bg-orange-500',
      path: '/journal'
    }
  ];

  const stats = [
    { label: 'Total Scans', value: '12', icon: Activity, color: 'text-blue-500' },
    { label: 'This Month', value: '4', icon: Calendar, color: 'text-green-500' },
    { label: 'Accuracy', value: '94%', icon: TrendingUp, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">EchoRemedy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-500">Health Dashboard</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}!
          </h2>
          <p className="text-gray-600">How can Medixo help you today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Choose how you'd like to analyze your symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest health interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <Camera className="h-8 w-8 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Skin rash analysis completed</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <BookOpen className="h-8 w-8 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Viewed ginger tea remedy</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
                <Badge variant="secondary">Viewed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medixo Chatbot */}
      {showChatbot && (
        <MedixoChatbot onClose={() => setShowChatbot(false)} />
      )}

      {/* Floating Chat Button */}
      {!showChatbot && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
          onClick={() => setShowChatbot(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
