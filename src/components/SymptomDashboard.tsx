
import { useState } from 'react';
import { 
  Camera, 
  Mic, 
  User, 
  RefreshCw, 
  History, 
  Download, 
  Plus,
  Eye,
  Filter,
  FileText,
  Clock,
  Brain,
  Target,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SymptomDashboard = ({ onNavigate, onBack, currentAnalysis }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for demonstration
  const mockHistory = [
    {
      id: 1,
      date: '2025-06-01',
      time: '3:45 PM',
      symptomType: 'Skin Rash',
      remedy: 'Aloe Vera + Cold Compress',
      urgency: 'Medium',
      urgencyColor: 'bg-yellow-500'
    },
    {
      id: 2,
      date: '2025-05-28',
      time: '11:20 AM',
      symptomType: 'Swelling',
      remedy: 'Ice Pack + Elevation',
      urgency: 'High',
      urgencyColor: 'bg-red-500'
    },
    {
      id: 3,
      date: '2025-05-23',
      time: '2:15 PM',
      symptomType: 'Minor Burn',
      remedy: 'Aloe + Cool Gel',
      urgency: 'Low',
      urgencyColor: 'bg-green-500'
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getUrgencyVariant = (urgency) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">AI Symptom Analysis Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              History View
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - User Summary & Recent Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Summary Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-lg font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">John Doe</h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Last Scan: Today, 3:45 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onNavigate('upload')} className="bg-blue-600 hover:bg-blue-700">
                      <Camera className="h-4 w-4 mr-2" />
                      New Photo Scan
                    </Button>
                    <Button onClick={() => onNavigate('voice')} className="bg-green-600 hover:bg-green-700">
                      <Mic className="h-4 w-4 mr-2" />
                      Voice Input
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Recent Analysis Card */}
            {currentAnalysis && (
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    Recent Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Analysis Results */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Image Preview */}
                    {currentAnalysis.imageUrl && (
                      <div>
                        <h4 className="font-medium mb-2">Uploaded Image</h4>
                        <img 
                          src={currentAnalysis.imageUrl} 
                          alt="Symptom scan" 
                          className="w-full h-40 object-cover rounded-lg border"
                        />
                      </div>
                    )}

                    {/* Voice Description */}
                    {currentAnalysis.voiceInput && (
                      <div>
                        <h4 className="font-medium mb-2">Voice Description</h4>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-blue-800 italic">"{currentAnalysis.voiceInput}"</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Results */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Condition</h5>
                        <p className="font-semibold text-gray-900">{currentAnalysis.condition}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Suggested Remedy</h5>
                        <p className="text-green-700 font-medium">{currentAnalysis.remedy}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Urgency Level</h5>
                        <Badge variant={getUrgencyVariant(currentAnalysis.urgency)}>
                          {currentAnalysis.urgency} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* AI Explanation */}
                  <div>
                    <h4 className="font-medium mb-2">AI Explanation</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{currentAnalysis.explanation}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      View Detailed Analysis
                    </Button>
                  </div>

                  {currentAnalysis.seekMedicalAttention && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                      <p className="text-amber-800 text-sm font-medium">
                        ⚠️ Recommended follow-up if no improvement in 2 days.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - AI Confidence & Quick Stats */}
          <div className="space-y-6">
            {/* AI Confidence Card */}
            {currentAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    AI Confidence Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Condition Detection</span>
                        <span className="text-sm font-bold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Remedy Match</span>
                        <span className="text-sm font-bold">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Urgency Assessment</span>
                        <span className="text-sm font-bold">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('upload')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Symptom Scan
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('history')}
                >
                  <History className="h-4 w-4 mr-2" />
                  View Full History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analysis History Table */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analysis History</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Symptom Type</TableHead>
                  <TableHead>Remedy Suggested</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.date}</div>
                        <div className="text-sm text-gray-500">{item.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.symptomType}</TableCell>
                    <TableCell>{item.remedy}</TableCell>
                    <TableCell>
                      <Badge variant={getUrgencyVariant(item.urgency)}>
                        {item.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomDashboard;
