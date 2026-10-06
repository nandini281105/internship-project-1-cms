import React, { useState, useEffect } from 'react';
import { UploadCloud, Copy, Trash2, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import {
  getMediaApi,
  uploadFileApi,
  deleteMediaApi,
  resolveImageUrl,
} from '../lib/api/adminApi';

const MediaPage = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await getMediaApi();
      setMedia(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadFileApi(file);
      loadMedia();
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (item) => {
    const fullUrl = resolveImageUrl(item.url);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this file from storage?')) {
      try {
        await deleteMediaApi(id);
        setMedia((prev) => prev.filter((m) => m.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete media asset');
      }
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Media Library & File Storage</h2>
          <p className="text-xs text-slate-400">Upload images and assets to use across your portfolio projects and blogs</p>
        </div>

        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors">
          <UploadCloud className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Image / Asset'}</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {loading ? (
        <div className="text-slate-400 py-8">Loading media assets...</div>
      ) : media.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-slate-900 border border-slate-800">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No files in media library</h3>
          <p className="text-xs text-slate-400 mt-1">
            Click the button above to upload project thumbnails, banners, or documents.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
            >
              <div className="relative h-32 bg-slate-950 overflow-hidden">
                <img
                  src={resolveImageUrl(item.url)}
                  alt={item.originalName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-3">
                <div className="text-xs font-semibold text-white truncate" title={item.originalName}>
                  {item.originalName}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {formatSize(item.size)}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => copyUrl(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-[10px]"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaPage;
