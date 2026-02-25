import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { ArrowLeft, AlertCircle, Loader2, CheckCircle2, FileText, MapPin, Clock, Link as LinkIcon } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Solution() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [solution, setSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchSolution = async () => {
      setLoading(true);
      setError(null);
      try {
        const prompt = `
          You are an expert helper for Indian citizens. The user has a problem: "${query}".
          Provide a step-by-step guide to solve this problem in simple Hindi written in English alphabet (Hinglish) mixed with simple English.
          Do NOT use technical jargon.
          
          Format the response using Markdown with the following structure:
          
          ## Kya Problem Hai? (What is the problem?)
          [Briefly explain the problem and why it happens]

          ## Kya Documents Lagenge? (Required Documents)
          - [Document 1]
          - [Document 2]
          
          ## Kahan Jaana Hai? (Where to go?)
          [Mention the exact office, department, or website]
          
          ## Online Link (If available)
          [Provide official website links if any, else say 'Online available nahi hai']
          
          ## Time & Cost
          - **Time:** [Estimated time]
          - **Cost:** [Estimated cost or 'Free']
          
          ## Step-by-Step Process
          1. [Step 1]
          2. [Step 2]
          3. [Step 3]
          
          ## Common Mistakes (Dhyan Rakhein)
          - [Mistake to avoid 1]
          - [Mistake to avoid 2]
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        if (response.text) {
          setSolution(response.text);
        } else {
          setError("Sorry, humein is problem ka solution nahi mil paya. Kripya dobara try karein.");
        }
      } catch (err) {
        console.error("Error fetching solution:", err);
        setError("Kuch technical problem aa gayi hai. Kripya thodi der baad try karein.");
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [query]);

  if (!query) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Koi problem search nahi ki gayi</h2>
        <Link to="/" className="text-orange-600 hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Home par wapas jayein
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-8 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4" />
          Wapas Jayein (Back)
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Aapki Problem: <span className="text-orange-600">"{query}"</span>
            </h1>
            <p className="text-slate-600 font-medium">Neeche diya gaya step-by-step solution padhein.</p>
          </div>

          <div className="p-8 md:p-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
                <p className="text-lg font-medium">Solution dhoondh rahe hain... Kripya wait karein.</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-red-500 text-center">
                <AlertCircle className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-xl font-semibold mb-2">Oops!</p>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-2 bg-orange-100 text-orange-700 rounded-full font-medium hover:bg-orange-200 transition-colors"
                >
                  Dobara Try Karein
                </button>
              </div>
            ) : solution ? (
              <div className="prose prose-slate prose-orange max-w-none
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-li:text-slate-600 prose-li:marker:text-orange-500
                prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900
              ">
                <Markdown>{solution}</Markdown>
              </div>
            ) : null}
          </div>
          
          {!loading && !error && (
            <div className="bg-slate-50 p-8 border-t border-slate-100 text-center">
              <p className="text-slate-600 font-medium mb-4">Kya is jaankari se aapki madad hui?</p>
              <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm">
                  <CheckCircle2 className="h-5 w-5" /> Haan (Yes)
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-red-500 hover:text-red-600 transition-colors shadow-sm">
                  <AlertCircle className="h-5 w-5" /> Nahi (No)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
