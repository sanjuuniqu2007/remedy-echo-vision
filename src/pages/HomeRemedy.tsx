
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Search, Leaf, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeRemedy {
  id: string;
  category: string;
  title: string;
  ingredients: string[];
  preparation_steps: string[];
  precautions: string[];
}

const HomeRemedy = () => {
  const navigate = useNavigate();
  const [remedies, setRemedies] = useState<HomeRemedy[]>([]);
  const [filteredRemedies, setFilteredRemedies] = useState<HomeRemedy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Common Cold', 'Headache', 'Fever', 'Digestive Issues'];

  useEffect(() => {
    fetchRemedies();
  }, []);

  useEffect(() => {
    filterRemedies();
  }, [remedies, selectedCategory, searchTerm]);

  const fetchRemedies = async () => {
    try {
      const { data, error } = await supabase
        .from('home_remedies')
        .select('*')
        .order('category');

      if (error) throw error;
      setRemedies(data || []);
    } catch (error) {
      console.error('Error fetching remedies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRemedies = () => {
    let filtered = remedies;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(remedy => remedy.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(remedy =>
        remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        remedy.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredRemedies(filtered);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Common Cold': 'bg-blue-100 text-blue-800',
      'Headache': 'bg-purple-100 text-purple-800',
      'Fever': 'bg-red-100 text-red-800',
      'Digestive Issues': 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-8 w-8 animate-spin mx-auto mb-4 text-green-500" />
          <p>Loading natural remedies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-900">Natural Home Remedies</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search remedies or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remedies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRemedies.map((remedy) => (
            <Card key={remedy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{remedy.title}</CardTitle>
                    <Badge className={getCategoryColor(remedy.category)}>
                      {remedy.category}
                    </Badge>
                  </div>
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Ingredients
                  </h4>
                  <ul className="space-y-1">
                    {remedy.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        • {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation Steps */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Preparation
                  </h4>
                  <ol className="space-y-2">
                    {remedy.preparation_steps.map((step, index) => (
                      <li key={index} className="text-sm text-gray-700 flex gap-3">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Precautions */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Important Precautions
                  </h4>
                  <ul className="space-y-1">
                    {remedy.precautions.map((precaution, index) => (
                      <li key={index} className="text-sm text-amber-800">
                        • {precaution}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRemedies.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No remedies found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Card className="mt-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Medical Disclaimer</h4>
                <p className="text-sm text-amber-800">
                  These home remedies are for informational purposes only and are not intended to replace professional medical advice. 
                  Always consult with a healthcare provider before trying new treatments, especially if you have existing medical conditions 
                  or are taking medications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeRemedy;
