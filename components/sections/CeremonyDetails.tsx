'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock3, MapPin, Sparkles, Crown, Heart, Cross } from 'lucide-react';
import Image from 'next/image';

export default function CeremonyDetails() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const detailGroups = [
    {
      key: 'church',
      title: 'Church',
      dateLabel: 'August 11',
      timeLabel: 'Church Time',
      timeValue: '9:30 AM',
      timeSub: 'Holy wedding ceremony',
      venueLabel: 'Church Venue',
      venueValue: "St. Joseph's Church",
      venueSub: 'Thillanduwa, Malwatra',
    },
    {
      key: 'function',
      title: 'Reception',
      dateLabel: 'August 15',
      timeLabel: 'Reception Time',
      timeValue: '7:00 PM',
      timeSub: 'Saturday, August 15, 2026',
      venueLabel: 'Reception Venue',
      venueValue: 'Grandeeza Hotel, Kurana',
      venueSub: 'Live location available',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#1f0610_0%,#451022_45%,#1b050d_100%)] px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-full opacity-[0.07] mix-blend-screen"
          style={{ backgroundImage: `radial-gradient(circle at 20px 20px, #C9A227 1.1px, transparent 1.1px)`, backgroundSize: '36px 36px' }} />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[#d81b3f]/10 blur-[120px]" />
        <motion.div
          animate={{ y: [0, -22, 0], x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-12 h-40 w-40 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 blur-[1px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 md:gap-16 lg:gap-24">

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center perspective-[1000px]"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative h-[420px] sm:h-[520px] md:h-[600px] w-full max-w-[420px] overflow-hidden rounded-[30px] md:rounded-t-[200px] md:rounded-b-[30px] border border-[#C9A227]/60 shadow-[0_20px_50px_rgba(201,162,39,0.2)] bg-[linear-gradient(180deg,#1a0408_0%,#2c0710_55%,#120207_100%)]"
            >
              <div className="absolute -inset-6 rounded-t-[220px] rounded-b-[40px] border border-[#C9A227]/20 hidden md:block" />
              <div className="absolute -inset-3 rounded-t-[210px] rounded-b-[35px] border border-[#C9A227]/40 hidden md:block" />

              <Image
                src="/images/image-02.jpeg"
                alt="Ashan and Imesha"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,2,7,0.2)_0%,rgba(18,2,7,0.75)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.22),transparent_48%)]" />
              <div className="absolute inset-0 opacity-[0.14]"
                style={{ backgroundImage: 'linear-gradient(rgba(201,162,39,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.55) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

              <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-[#f5e6c8]">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0d18b]/40 bg-black/25 px-4 py-1.5 backdrop-blur-sm">
                  <Cross className="h-3.5 w-3.5 text-[#f4ddab]" />
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#f6dd9a] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">Blessed Union</p>
                </div>
                <h3 className="mt-5 font-serif text-4xl text-[#fff7de] drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
                  ASHAN <span className="text-[#f0d18b]">&amp;</span> IMESHA
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#f5e6c8]/80">
                  "As long as we love one another, God will live with us and His love will be completed in us."
                </p>
                <div className="mt-8 h-px w-28 bg-[#C9A227]/50" />
                <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#C9A227]">August 11, 2026</p>
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-2 sm:-right-6 md:-right-10 top-20 md:top-40 flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#2c0710]/80 shadow-[0_0_30px_rgba(201,162,39,0.3)] backdrop-blur-md"
              >
                <div className="text-center">
                  <Heart className="mx-auto h-6 w-6 md:h-8 md:w-8 text-[#C9A227] fill-[#C9A227]/20" />
                  <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.25em] text-[#f5e6c8]">Forever</span>
                </div>
              </motion.div>

              {/* Sparkle effects */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-10 top-20 h-3 w-3 rounded-full bg-[#fdf8f0] blur-[2px]"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute right-20 bottom-32 h-4 w-4 rounded-full bg-[#C9A227] blur-[2px]"
              />
            </motion.div>
          </motion.div>

          {/* Details Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#C9A227]/30 bg-[#1a0408]/50 px-5 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A227] font-medium">
                The Sacred Celebration
              </span>
            </div>

            <h2 className="mb-8 font-serif text-5xl font-light leading-snug text-[#f5e6c8] md:text-7xl">
              Wedding <br />
              <span className="italic text-[#C9A227]">Ceremony</span>
            </h2>

            <p className="mb-12 text-lg leading-relaxed text-[#f5e6c8]/70 max-w-lg">
              With immense joy in our hearts, we invite you to share our happiness as we exchange our vows before God. Join us for a sacred Christian celebration of faith, love, and lifelong commitment.
            </p>

            <div className="flex flex-col gap-5">
              {detailGroups.map((group, index) => {
                return (
                  <motion.div
                    key={group.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 10, backgroundColor: 'rgba(201,162,39,0.08)' }}
                    className="group relative overflow-hidden rounded-2xl border border-[#C9A227]/25 bg-[linear-gradient(120deg,rgba(44,7,16,0.72)_0%,rgba(62,13,25,0.55)_100%)] p-5 shadow-lg backdrop-blur-md transition-all cursor-default"
                  >
                    <div className="absolute left-0 top-0 w-1 h-full bg-[#C9A227] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />

                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]/70">{group.title} Details</p>
                      <span className="rounded-full bg-gradient-to-r from-[#C9A227]/20 to-[#C9A227]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f0d18b] border border-[#C9A227]/30 shadow-[0_0_10px_rgba(201,162,39,0.15)]">
                        {group.dateLabel}
                      </span>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/30 bg-gradient-to-br from-[#4a0f18] to-[#1a0408] shadow-inner">
                          <Clock3 className="h-5 w-5 text-[#C9A227]" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]/70 mb-1">{group.timeLabel}</p>
                          <h3 className="font-serif text-2xl text-[#f5e6c8]">{group.timeValue}</h3>
                          <p className="text-sm text-[#f5e6c8]/50 mt-1">{group.timeSub}</p>
                        </div>
                      </div>

                      <div className="h-px w-full bg-[#C9A227]/20" />

                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/30 bg-gradient-to-br from-[#4a0f18] to-[#1a0408] shadow-inner">
                          <MapPin className="h-5 w-5 text-[#C9A227]" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]/70 mb-1">{group.venueLabel}</p>
                          <h3 className="font-serif text-2xl text-[#f5e6c8]">{group.venueValue}</h3>
                          <p className="text-sm text-[#f5e6c8]/50 mt-1">{group.venueSub}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}