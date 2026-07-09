'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Sparkles } from 'lucide-react';

const LIVE_LOCATION_URL = 'https://maps.app.goo.gl/pikUWZebfsNYjp4i6?g_st=iw';

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#1b050d_0%,#10030a_100%)] border-t border-[#C9A227]/25 pt-20 pb-8 text-[#f5e6c8]">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.14),transparent_52%)]" />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#C9A227]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#b56f49]/10 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-16 grid grid-cols-1 gap-8">

          {/* Brand/Logo Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center text-center"
          >
            <div className="mb-5 inline-flex items-center justify-center gap-2 self-center rounded-full border border-[#C9A227]/35 bg-white/[0.03] px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#C9A227]">Thank You For Your Blessings</span>
            </div>

            <h2 className="mb-6 font-serif text-5xl font-light tracking-wide text-[#C9A227] md:text-6xl">
              A <span className="text-3xl text-[#f5e6c8]">&</span> I
            </h2>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-[#f5e6c8]/65">
              We look forward to sharing our joy and celebrating our holy union surrounded by the people we love most.
            </p>
            <a
              href={LIVE_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 self-center rounded-full border border-[#C9A227]/45 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A227] transition-colors hover:bg-[#C9A227]/10"
            >
              <MapPin className="h-4 w-4" />
              St. Joseph's Church, Thillanduwa, Malwatra
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="group relative mb-10 flex w-full items-center justify-center overflow-hidden border-y border-[#C9A227]/10 py-10"
        >
          <div className="absolute inset-0 w-[50%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#C9A227]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite]" />

          <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-center font-light tracking-wide bg-gradient-to-r from-[#f5e6c8]/60 via-[#C9A227] to-[#f5e6c8]/60 text-transparent bg-clip-text">
            A New Chapter Begins
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-4 px-4 text-center text-xs font-light tracking-[0.1em] text-[#C9A227] md:flex-row md:text-left">
          <div className="space-y-2">
            <p className="!text-[#C9A227]">
              &copy; {new Date().getFullYear()} ASHAN & IMESHA. All rights reserved.
            </p>
            <p className="!text-[#C9A227]">
              Design and created by <span className="!text-[#C9A227]">InviteMint</span> | Connect WhatsApp: <a href="https://wa.me/94707819074" target="_blank" rel="noopener noreferrer" className="!text-[#C9A227] hover:underline">+94 70 781 9074</a>
            </p>
          </div>
          <p className="flex items-center justify-center gap-1.5 whitespace-nowrap">
            Crafted with <Heart className="h-3 w-3 fill-current text-[#C9A227] animate-pulse" /> for our special day
          </p>
        </div>

      </div>
    </footer>
  );
}
