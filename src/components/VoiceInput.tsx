
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const VoiceInput = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Speech recognition error",
          description: "Please try again",
          variant: "destructive"
        });
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Setup audio level monitoring
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setAudioLevel(average);
        
        if (isRecording) {
          animationRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      setIsRecording(true);
      setTranscript('');
      updateAudioLevel();
      
      toast({
        title: "Recording started",
        description: "Speak clearly about your symptoms"
      });

    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setAudioLevel(0);
    
    toast({
      title: "Recording stopped",
      description: "Processing your voice input..."
    });
  };

  const analyzeSymptoms = async () => {
    if (!transcript.trim()) {
      toast({
        title: "No speech detected",
        description: "Please record your symptoms first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Mock NLP analysis - replace with actual AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis based on transcript keywords
      const mockResults = [
        {
          condition: "Headache symptoms",
          remedy: "Rest in a dark, quiet room. Apply cold compress to forehead. Stay hydrated. Consider over-the-counter pain relief.",
          urgency: "Low",
          explanation: `Based on your description: "${transcript.slice(0, 100)}...", this appears to be a common headache.`,
          seekMedicalAttention: false,
          voiceInput: transcript
        },
        {
          condition: "Respiratory symptoms",
          remedy: "Rest, stay hydrated, use humidifier. Honey and warm tea can help soothe throat.",
          urgency: "Medium",
          explanation: `Your symptoms suggest a respiratory issue. Monitor for fever or difficulty breathing.`,
          seekMedicalAttention: true,
          voiceInput: transcript
        },
        {
          condition: "Digestive discomfort",
          remedy: "Stay hydrated with clear fluids. BRAT diet (Bananas, Rice, Applesauce, Toast). Rest.",
          urgency: "Low",
          explanation: `Based on your description, this appears to be digestive discomfort.`,
          seekMedicalAttention: false,
          voiceInput: transcript
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2 className="h-6 w-6 text-green-600" />
                Voice Symptom Analysis
              </CardTitle>
              <CardDescription>
                Describe your symptoms clearly for AI-powered analysis
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Recording Interface */}
              <div className="text-center space-y-6">
                {/* Audio Visualizer */}
                <div className="relative mx-auto w-32 h-32">
                  <div 
                    className={`absolute inset-0 rounded-full border-4 transition-all duration-200 ${
                      isRecording 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    style={{
                      transform: isRecording ? `scale(${1 + audioLevel / 500})` : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isRecording ? (
                      <MicOff className="h-12 w-12 text-green-600" />
                    ) : (
                      <Mic className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="space-y-4">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      variant="destructive"
                    >
                      <Square className="h-5 w-5 mr-2" />
                      Stop Recording
                    </Button>
                  )}

                  {isRecording && (
                    <p className="text-sm text-green-600 animate-pulse">
                      Listening... Speak clearly about your symptoms
                    </p>
                  )}
                </div>
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Your symptoms:</h4>
                  <p className="text-gray-700">{transcript}</p>
                </div>
              )}

              {/* Analysis Button */}
              {transcript && !isRecording && (
                <Button
                  onClick={analyzeSymptoms}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              )}

              {/* Tips */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Tips for better analysis:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Speak clearly and at a normal pace</li>
                  <li>• Describe location, intensity, and duration</li>
                  <li>• Mention when symptoms started</li>
                  <li>• Include any triggers or patterns you've noticed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
