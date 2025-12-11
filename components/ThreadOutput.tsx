import React, { useState } from 'react';
import { GeneratedThreadResponse } from '../types';
import { Copy, Check, FileText } from 'lucide-react';

interface ThreadOutputProps {
  data: GeneratedThreadResponse;
}

const ThreadOutput: React.FC<ThreadOutputProps> = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="text-blue-500" />
          Hasil Generator
        </h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
        >
          {isCopied ? (
            <>
              <Check size={16} />
              Tersalin!
            </>
          ) : (
            <>
              <Copy size={16} />
              Salin Semua
            </>
          )}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="prose prose-slate max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-800 text-base leading-relaxed">
            {data.content}
          </pre>
        </div>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-sm text-orange-700">
        <strong>Tips:</strong> Anda bisa langsung copy-paste teks di atas ke Notepad atau langsung ke Twitter/X. Edit sedikit jika diperlukan agar lebih personal!
      </div>
    </div>
  );
};

export default ThreadOutput;
