import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MapPin, Search, Loader2, AlertCircle, Building, Shield, Stethoscope, Navigation } from 'lucide-react';
import Markdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function LocalHelp() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapLinks, setMapLinks] = useState<{title: string, uri: string}[]>([]);

  const getLocation = () => {
    setLoadingLocation(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoadingLocation(false);
        },
        (err) => {
          console.error(err);
          setError("Location access deny ho gaya. Kripya browser settings mein location allow karein.");
          setLoadingLocation(false);
        }
      );
    } else {
      setError("Aapka browser location support nahi karta.");
      setLoadingLocation(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (!location) {
      setError("Pehle apni location set karein.");
      return;
    }

    setLoadingResults(true);
    setError(null);
    setResults(null);
    setMapLinks([]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Mujhe apne aas-paas ke ${query} ki jaankari chahiye. Simple Hindi (Hinglish) mein batao.`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: location.lat,
                longitude: location.lng
              }
            }
          }
        },
      });

      if (response.text) {
        setResults(response.text);
        
        // Extract map links if available
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const links = chunks
            .filter((chunk: any) => chunk.maps?.uri && chunk.maps?.title)
            .map((chunk: any) => ({
              title: chunk.maps.title,
              uri: chunk.maps.uri
            }));
          
          // Remove duplicates
          const uniqueLinks = Array.from(new Set(links.map(a => a.uri)))
            .map(uri => {
              return links.find(a => a.uri === uri)
            }) as {title: string, uri: string}[];
            
          setMapLinks(uniqueLinks);
        }
      } else {
        setError("Koi result nahi mila. Kripya thodi der baad try karein.");
      }
    } catch (err) {
      console.error("Error fetching local help:", err);
      setError("Kuch technical problem aa gayi hai. Kripya thodi der baad try karein.");
    } finally {
      setLoadingResults(false);
    }
  };

  const quickSearches = [
    { name: 'Police Station', icon: Shield },
    { name: 'Hospital', icon: Stethoscope },
    { name: 'Govt Office', icon: Building },
    { name: 'CSC Center', icon: Navigation },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Local Help Finder</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Apne aas-paas ke zaruri jagahon ki jaankari payein. Jaise Police Station, Hospital, ya Sarkari Daftar.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 mb-8">
          {/* Location Section */}
          <div className="mb-8 p-6 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Aapki Location</h3>
                <p className="text-slate-600 text-sm">
                  {location ? "Location set ho gayi hai ✅" : "Sahi results ke liye location allow karein"}
                </p>
              </div>
            </div>
            <button 
              onClick={getLocation}
              disabled={loadingLocation || location !== null}
              className={`px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2 ${
                location 
                  ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
              }`}
            >
              {loadingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {location ? 'Location Set' : 'Location Allow Karein'}
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
              <div className="pl-6 text-slate-400">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kya dhoondh rahe hain? (e.g., 'Nazdiki Police Station')"
                className="w-full py-4 pl-4 pr-32 text-lg text-slate-900 bg-transparent border-none focus:ring-0 placeholder:text-slate-400"
                disabled={!location}
              />
              <button
                type="submit"
                disabled={!location || loadingResults || !query.trim()}
                className="absolute right-2 top-2 bottom-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                {loadingResults ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Khojein'}
              </button>
            </div>
          </form>

          {/* Quick Searches */}
          <div className="flex flex-wrap gap-3 mb-8">
            {quickSearches.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setQuery(item.name);
                    if (location) {
                      // Trigger search immediately if location is set
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      setQuery(item.name);
                      // We need to wait for state to update, so we can't call handleSearch directly here easily without a ref or useEffect.
                      // For simplicity, just set the query and let the user click search.
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-orange-300 hover:text-orange-600 transition-colors text-sm font-medium"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 mb-8">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="border-t border-slate-100 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Aapke aas-paas ki jaankari:</h2>
              
              <div className="prose prose-slate prose-orange max-w-none mb-8
                prose-headings:font-bold prose-headings:text-slate-900
                prose-p:text-slate-600
                prose-li:text-slate-600 prose-li:marker:text-orange-500
                prose-strong:text-slate-900
              ">
                <Markdown>{results}</Markdown>
              </div>

              {mapLinks.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-500" /> Google Maps Links
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mapLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-300 hover:shadow-sm transition-all group"
                      >
                        <span className="font-medium text-slate-700 group-hover:text-orange-600 truncate mr-4">
                          {link.title}
                        </span>
                        <Navigation className="h-4 w-4 text-slate-400 group-hover:text-orange-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
