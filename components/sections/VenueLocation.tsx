'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, MapPin, Navigation, Sparkles } from 'lucide-react';

const LIVE_LOCATION_URL = 'https://maps.app.goo.gl/ZQ8AkFiyS2C2V7Eq6';
const FUNCTION_LOCATION_URL = 'https://maps.app.goo.gl/8M2DwBC29Q7BRrm97';

export default function VenueLocation() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fff9ef_0%,#fff2df_42%,#fde8d4_100%)] px-4 py-24 sm:px-6 lg:px-8 md:py-32"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 55, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[12%] -top-[8%] h-[52vw] w-[52vw] rounded-full bg-gradient-to-br from-[#ffd0d9] to-[#ffe9c9] opacity-75 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -45, 0], y: [0, -45, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-[10%] top-[34%] h-[44vw] w-[44vw] rounded-full bg-gradient-to-tl from-[#eadcff] to-[#ffdfe9] opacity-60 blur-[110px]"
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 11px 11px, rgba(181,124,83,0.38) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: 'spring', stiffness: 100 }}
          className="mb-14 text-center md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8a97d]/45 bg-white/70 px-5 py-2.5 shadow-[0_10px_28px_rgba(195,137,94,0.22)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#c0784e]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#c0784e] sm:text-sm">
              Church & Function Venues
            </span>
          </motion.div>

          <h2 className="font-serif text-4xl font-medium tracking-tight text-[#4a332f] sm:text-5xl md:text-7xl">
            Venue <span className="relative inline-block text-[#c06f58]">
              Location
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#d79c74"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative h-[320px] w-full overflow-hidden rounded-[2rem] border border-[#f2ddc5] bg-white/65 shadow-[0_16px_50px_rgba(184,126,89,0.2)] backdrop-blur-xl sm:h-[420px] md:h-[500px] lg:col-span-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,197,210,0.5),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(226,205,255,0.55),transparent_35%)]" />

            <div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(212,150,103,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(212,150,103,0.55) 1px, transparent 1px)',
                backgroundSize: '42px 42px',
              }}
            />

            <div className="absolute inset-0 hidden md:block opacity-55 text-[#c68461]">
              <svg width="100%" height="100%" viewBox="0 0 1000 700" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M90 420 C200 300, 340 300, 470 370 C610 450, 750 440, 900 320" stroke="currentColor" strokeWidth="6" strokeDasharray="10 12" />
                <path d="M100 520 C260 430, 390 470, 520 540 C670 620, 820 600, 930 500" stroke="currentColor" strokeWidth="3" strokeDasharray="6 10" />
              </svg>
            </div>

            <div className="absolute left-1/2 top-[48%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/90 bg-white/85 shadow-[0_0_35px_rgba(201,121,138,0.4)]"
              >
                <MapPin className="h-10 w-10 text-[#d55374]" />
                <div className="absolute bottom-[-6px] h-3 w-3 rounded-full bg-[#d55374] shadow-[0_0_12px_#d55374]" />
              </motion.div>
              <div className="absolute top-1/2 -z-10 h-24 w-24 -translate-y-1/2 rounded-full border border-[#dba6b5]/80" />
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.75, 0] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: 'easeOut' }}
                className="absolute top-1/2 -z-10 h-24 w-24 -translate-y-1/2 rounded-full bg-[#e3aab8]"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 to-transparent p-4 pt-16 sm:p-6 md:p-8">
              <a
                href={LIVE_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#efdcc8] bg-white/85 px-4 py-3 shadow-[0_10px_30px_rgba(183,127,92,0.16)] transition-all hover:bg-white sm:px-5 sm:py-4"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#be7f56]">Live Location</p>
                  <h4 className="mt-1 font-serif text-lg text-[#4d3732] sm:text-2xl">St. Joseph's Church, Thillanduwa</h4>
                </div>
                <motion.div whileHover={{ scale: 1.08 }} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ca7c57] text-white shadow-md">
                  <Navigation className="h-5 w-5" />
                </motion.div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <div className="h-full rounded-[2rem] border border-[#f1dcc5] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,245,232,0.8)_100%)] p-6 shadow-[0_16px_45px_rgba(183,127,92,0.14)] backdrop-blur-xl md:p-7">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#deb792]/40 bg-white/70 px-4 py-2">
                <MapPin className="h-4 w-4 text-[#c0784e]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c0784e]">Venue Details</span>
              </div>

              <div className="mt-2 rounded-2xl border border-[#ead2b9]/60 bg-white/75 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#b78058]">Church Venue</p>
                <h4 className="mt-2 font-serif text-xl text-[#4d3732]">St. Joseph's Church, Thillanduwa</h4>
                <p className="mt-2 text-xs text-[#7a6258]">Tuesday, August 11, 2026 at 9:30 AM</p>
                <a
                  href={LIVE_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b96f4d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(185,111,77,0.3)] transition-transform hover:scale-[1.02]"
                >
                  Open Church Location
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="mt-3 break-all text-xs text-[#7a6258]">maps.app.goo.gl/ZQ8AkFiyS2C2V7Eq6</p>
              </div>

              <div className="mt-5 rounded-2xl border border-[#ead2b9]/60 bg-white/75 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#b78058]">Reception Venue</p>
                <h4 className="mt-2 font-serif text-xl text-[#4d3732]">Grandeeza Hotel, Kurana</h4>
                <p className="mt-2 text-xs text-[#7a6258]">Saturday, August 15, 2026 at 7:00 PM</p>
                <a
                  href={FUNCTION_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b96f4d] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(185,111,77,0.3)] transition-transform hover:scale-[1.02]"
                >
                  Open Hotel Location
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="mt-3 break-all text-xs text-[#7a6258]">maps.app.goo.gl/8M2DwBC29Q7BRrm97</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
