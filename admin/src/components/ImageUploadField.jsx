import React, { useState } from 'react';
import { UploadCloud, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { uploadFileApi, resolveImageUrl } from '../lib/api/adminApi';

const ImageUploadField = ({ label, value, onChange, placeholder = 'https://... or upload below' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const res = await uploadFileApi(file);
      if (res.data?.url) {
        onChange(res.data.url);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none placeholder:text-slate-600"
        />

        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors shrink-0">
          <UploadCloud className="w-4 h-4 text-indigo-400" />
          <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {value && (
        <div className="flex items-center gap-3 pt-1">
          <div className="w-12 h-12 rounded-lg border border-slate-800 bg-slate-950 overflow-hidden shrink-0">
            <img
              src={resolveImageUrl(value)}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <span className="text-xs text-slate-400 truncate max-w-xs">{value}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
