'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Copy, CheckCircle2, Sparkles } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  
  const generateLink = () => {
    if (!guestName.trim()) return;
    const url = new URL(window.location.origin);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('name', guestName.trim());
    setGeneratedLink(url.toString());
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const getFullMessage = () => {
    return `Dear ${prefix} ${guestName.trim()} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Ashan & Imesha`;
  };

  const copyToClipboard = async (text: string, type: 'link' | 'message') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-[linear-gradient(180deg,#1f0610_0%,#451022_45%,#1b050d_100%)] text-[#f5e6c8] px-4 py-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ornament */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{ backgroundImage: `radial-gradient(circle at 20px 20px, #C9A227 1.1px, transparent 1.1px)`, backgroundSize: '36px 36px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-xl w-full bg-[linear-gradient(120deg,rgba(44,7,16,0.72)_0%,rgba(62,13,25,0.55)_100%)] rounded-3xl border border-[#C9A227]/30 p-8 sm:p-10 shadow-2xl backdrop-blur-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-black/25 px-4 py-1.5 backdrop-blur-sm mb-4">
            <Sparkles className="h-4 w-4 text-[#C9A227]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227] font-medium">Link Generator</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#fff7de] drop-shadow-md">
            Wedding Invitation
          </h1>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
            <div className="group relative">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">Prefix</label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#C9A227]/30 bg-white/10 px-4 py-3.5 text-[#f5e6c8] outline-none transition-all focus:border-[#C9A227] focus:bg-white/15 cursor-pointer [&>option]:bg-[#2c0710] [&>option]:text-[#f5e6c8]"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>

            <div className="group relative">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full rounded-xl border border-[#C9A227]/30 bg-white/10 px-4 py-3.5 text-[#f5e6c8] placeholder-white/30 outline-none transition-all focus:border-[#C9A227] focus:bg-white/15"
              />
            </div>
          </div>

          <button
            onClick={generateLink}
            disabled={!guestName.trim()}
            className="w-full rounded-xl bg-[linear-gradient(135deg,#b78058_0%,#8b5b3a_100%)] py-4 font-bold uppercase tracking-[0.2em] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(183,128,88,0.2)]"
          >
            Generate Link
          </button>
        </div>

        {generatedLink && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-10 space-y-6 pt-8 border-t border-[#C9A227]/20"
          >
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">Generated Link</p>
              <div className="flex gap-2">
                <div className="flex-1 overflow-x-auto rounded-xl bg-black/40 px-4 py-3 text-sm text-[#f5e6c8]/80 whitespace-nowrap scrollbar-hide">
                  {generatedLink}
                </div>
                <button
                  onClick={() => copyToClipboard(generatedLink, 'link')}
                  className="flex shrink-0 items-center justify-center rounded-xl bg-white/10 px-4 hover:bg-white/20 transition-colors border border-[#C9A227]/20"
                  title="Copy Link Only"
                >
                  {copiedLink ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <Link2 className="h-5 w-5 text-[#C9A227]" />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">Message Preview</p>
              <div className="rounded-xl bg-black/40 p-5 text-sm leading-relaxed text-[#f5e6c8]/80 border border-[#C9A227]/10 whitespace-pre-wrap">
                {getFullMessage()}
              </div>
              
              <button
                onClick={() => copyToClipboard(getFullMessage(), 'message')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-[#C9A227]/40 py-3.5 font-bold uppercase tracking-[0.1em] text-[#C9A227] transition-all hover:bg-white/20"
              >
                {copiedMessage ? (
                  <><CheckCircle2 className="h-5 w-5 text-green-400" /> <span className="text-green-400">Copied Full Message</span></>
                ) : (
                  <><Copy className="h-5 w-5" /> Copy Full Message</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
