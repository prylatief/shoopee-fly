import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ThreadOutput from './components/ThreadOutput';
import { generateThreadContent } from './services/geminiService';
import { ThreadInputData, GeneratedThreadResponse } from './types';
import { Zap, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [generatedData, setGeneratedData] = useState<GeneratedThreadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: ThreadInputData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedData(null);

    try {
      const result = await generateThreadContent(formData);
      setGeneratedData(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat menghubungi AI. Pastikan API Key valid atau coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-2 rounded-lg">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">
                Shopee Thread Gen
              </h1>
              <p className="text-xs text-gray-500 font-medium">Powered by Gemini 2.5</p>
            </div>
          </div>
          {/* Optional: Add user/settings icon here */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="text-center space-y-2 mb-8">
           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
             Bikin Thread Affiliate <span className="text-orange-600">Tanpa Mikir</span>
           </h2>
           <p className="text-gray-600 max-w-lg mx-auto">
             Generate konten Twitter/X yang engaging, natural, dan siap viral dalam hitungan detik.
           </p>
        </div>

        {/* Input Form */}
        <section>
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3 animate-fade-in">
            <AlertCircle className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Oops! Ada masalah.</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Output Section */}
        {generatedData && (
          <section id="result" className="scroll-mt-24">
            <ThreadOutput data={generatedData} />
          </section>
        )}
      </main>
      
      <footer className="text-center text-gray-400 text-sm py-8">
        &copy; {new Date().getFullYear()} Shopee Affiliate Thread Generator.
      </footer>
    </div>
  );
};

export default App;
