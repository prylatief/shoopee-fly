import React, { useState } from 'react';
import { ThreadInputData, ThreadStyle, EmojiDensity, CtaStyle, ThreadLength } from '../types';
import { Sparkles, ShoppingBag, Loader2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: ThreadInputData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ThreadInputData>({
    product_name: '',
    product_description: '',
    shopee_link: '',
    target_audience: '',
    price_range: '',
    style: ThreadStyle.InfluencerStyle,
    length: ThreadLength.Four,
    tone_level: 2,
    emoji_density: EmojiDensity.Medium,
    cta_style: CtaStyle.Soft,
    include_price: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
          <ShoppingBag size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Detail Produk</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
              <input
                type="text"
                name="product_name"
                required
                value={formData.product_name}
                onChange={handleChange}
                placeholder="Contoh: Blender Portable Juicer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Shopee Affiliate</label>
              <input
                type="url"
                name="shopee_link"
                required
                value={formData.shopee_link}
                onChange={handleChange}
                placeholder="https://shope.ee/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience (Opsional)</label>
              <input
                type="text"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                placeholder="Contoh: Mahasiswa, Ibu muda"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk</label>
              <textarea
                name="product_description"
                required
                rows={5}
                value={formData.product_description}
                onChange={handleChange}
                placeholder="Jelaskan fitur utama, keunggulan, dan manfaat produk..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Konfigurasi Thread</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gaya Bahasa (Style)</label>
              <select
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {Object.values(ThreadStyle).map((style) => (
                  <option key={style} value={style}>
                    {style.replace(/_/g, ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Panjang Thread</label>
                <select
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value={3}>3 Tweets (Quick)</option>
                  <option value={4}>4 Tweets (Standard)</option>
                  <option value={6}>6 Tweets (Deep)</option>
                  <option value={8}>8 Tweets (Story)</option>
                </select>
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone Level</label>
                <select
                  name="tone_level"
                  value={formData.tone_level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value={1}>1 - Formal</option>
                  <option value={2}>2 - Campuran</option>
                  <option value={3}>3 - Casual/Gaul</option>
                </select>
              </div>
            </div>

             <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                <select
                  name="emoji_density"
                  value={formData.emoji_density}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value={EmojiDensity.Minimal}>Minimal</option>
                  <option value={EmojiDensity.Medium}>Medium</option>
                  <option value={EmojiDensity.Banyak}>Banyak</option>
                </select>
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gaya CTA</label>
                <select
                  name="cta_style"
                  value={formData.cta_style}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value={CtaStyle.Soft}>Soft (Halus)</option>
                  <option value={CtaStyle.Hard}>Hard (Direct)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kisaran Harga (Opsional)</label>
              <input
                type="text"
                name="price_range"
                value={formData.price_range}
                onChange={handleChange}
                placeholder="Contoh: 50rb - 100rb"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="include_price"
                name="include_price"
                checked={formData.include_price}
                onChange={handleChange}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="include_price" className="ml-2 block text-sm text-gray-900">
                Sebutkan harga/kisaran di dalam thread?
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Sedang Meracik Thread...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Thread Sekarang
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
