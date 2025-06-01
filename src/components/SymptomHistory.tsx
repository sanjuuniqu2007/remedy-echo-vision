
import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const SymptomHistory = ({ symptoms = [] }) => {
  const [filteredSymptoms, setFilteredSymptoms] = useState(symptoms);
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  useEffect(() => {
    let filtered = symptoms;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(symptom => 
        symptom.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.remedy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Urgency filter
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(symptom => symptom.urgency === urgencyFilter);
    }

    setFilteredSymptoms(filtered);
  }, [symptoms, searchTerm, urgencyFilter]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const deleteSymptom = (id) => {
    const updatedSymptoms = symptoms.filter(symptom => symptom.id !== id);
    localStorage.setItem('echoremedy_symptoms', JSON.stringify(updatedSymptoms));
    window.location.reload(); // Simple refresh - in a real app, you'd update state properly
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-purple-600" />
                Symptom History
              </CardTitle>
              <CardDescription>
                Track your health analysis and remedies over time
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search symptoms or remedies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={urgencyFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUrgencyFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={urgencyFilter === 'High' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => setUrgencyFilter('High')}
                  >
                    High
                  </Button>
                  <Button
                    variant={urgencyFilter === 'Medium' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUrgencyFilter('Medium')}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={urgencyFilter === 'Low' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setUrgencyFilter('Low')}
                  >
                    Low
                  </Button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{symptoms.length}</div>
                  <div className="text-sm text-blue-800">Total Analyses</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {symptoms.filter(s => s.urgency === 'High').length}
                  </div>
                  <div className="text-sm text-red-800">High Priority</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {symptoms.filter(s => s.urgency === 'Medium').length}
                  </div>
                  <div className="text-sm text-yellow-800">Medium Priority</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {symptoms.filter(s => s.urgency === 'Low').length}
                  </div>
                  <div className="text-sm text-green-800">Low Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptom List */}
          <div className="space-y-4">
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom) => (
                <Card key={symptom.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{symptom.condition}</h3>
                          <Badge variant={getUrgencyColor(symptom.urgency)}>
                            {symptom.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {formatDate(symptom.date)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteSymptom(symptom.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {symptom.imageUrl && (
                      <div className="mb-4">
                        <img 
                          src={symptom.imageUrl} 
                          alt="Symptom" 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Voice Input Preview */}
                    {symptom.voiceInput && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 italic">
                          "{symptom.voiceInput.slice(0, 100)}..."
                        </p>
                      </div>
                    )}

                    {/* Remedy */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-medium text-green-900 mb-1">Remedy:</h4>
                      <p className="text-sm text-green-800">{symptom.remedy}</p>
                    </div>

                    {/* Medical Attention Flag */}
                    {symptom.seekMedicalAttention && (
                      <div className="mt-3 flex items-center gap-2 text-amber-600">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-sm">Medical attention recommended</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No symptoms found</h3>
                  <p className="text-gray-600">
                    {symptoms.length === 0 
                      ? "Start by analyzing your first symptom using photo or voice input."
                      : "Try adjusting your search or filter criteria."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomHistory;
