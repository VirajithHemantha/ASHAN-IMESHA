'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, PenLine, Send, Stars, UserRound, Sparkles, Quote } from 'lucide-react';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { useSearchParams } from 'next/navigation';

interface Blessing {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const initialBlessings: Blessing[] = [];

function BlessingsSectionContent() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const searchParams = useSearchParams();
  const urlName = searchParams.get('name');

  const [blessings, setBlessings] = useState<Blessing[]>(initialBlessings);
  const [newBlessing, setNewBlessing] = useState('');
  const [visitorName, setVisitorName] = useState('');

  useEffect(() => {
    if (urlName) {
      setVisitorName(urlName);
    }
  }, [urlName]);

  const [submitted, setSubmitted] = useState(false);
  const [isHoveringSend, setIsHoveringSend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const floatingParticles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 5 + 3,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 4,
      })),
    []
  );

  const handleAddBlessing = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (newBlessing.trim() && visitorName.trim()) {
      setIsSubmitting(true);
      try {
        await submitToGoogleSheets({
          formType: 'wish',
          name: visitorName.trim(),
          message: newBlessing.trim(),
        });

        const blessing: Blessing = {
          id: Date.now().toString(),
          name: visitorName.trim(),
          message: newBlessing.trim(),
          timestamp: 'just now',
        };

        setBlessings([blessing, ...blessings]);
        setNewBlessing('');
        setVisitorName(urlName || '');
        setSubmitted(true);

        setTimeout(() => setSubmitted(false), 3000);
      } catch (error) {
        setSubmitError('Unable to submit right now. Please try again.');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8ee_0%,#fff1df_45%,#fbe7d2_100%)] px-4 py-24 sm:px-6 lg:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[10%] top-[20%] h-[40vw] w-[40vw] rounded-full bg-gradient-to-tr from-[#ffdce1] to-[#ffeacc] opacity-70 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-bl from-[#ece2ff] to-[#ffe2ea] opacity-60 blur-[100px]"
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 10px 10px, rgba(190,126,84,0.4) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-[#d39a7a]/55"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles size={particle.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -5 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="relative mx-auto mb-8 h-32 w-32 rounded-full border-8 border-white bg-white p-[2px] shadow-[0_18px_42px_rgba(189,126,84,0.3)] md:h-44 md:w-44"
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(244,207,171,0.74),rgba(255,255,255,0.95))]">
              <Heart className="h-12 w-12 text-[#be7752] fill-[#be7752]/20" />
            </div>
            <Sparkles className="absolute -right-4 -top-2 h-8 w-8 animate-pulse text-[#d28a64]" />
            <Sparkles className="absolute -bottom-4 -left-2 h-6 w-6 animate-pulse text-[#baa7df]" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#deaf88]/45 bg-white/70 px-5 py-2.5 shadow-[0_10px_30px_rgba(191,126,84,0.18)] backdrop-blur-md"
          >
            <Heart className="h-5 w-5 text-[#bf7752] fill-[#bf7752]/20" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf7752]">
              Shared With Love
            </span>
          </motion.div>

          <h2 className="font-serif text-5xl font-medium tracking-tight text-[#4d3732] md:text-7xl">
            Blessings &{' '}
            <span className="relative inline-block text-[#c06f58]">
              Wishes
              <motion.svg
                className="absolute -bottom-2 left-0 w-full md:-bottom-4"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
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

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#7b6258]">
            Share your prayers and heartfelt blessings for our new life together in Christ.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -10 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="relative perspective-[1000px]"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#edd8bf] bg-[linear-gradient(150deg,rgba(255,255,255,0.86)_0%,rgba(255,244,228,0.8)_100%)] p-6 shadow-[0_20px_52px_rgba(191,126,84,0.18)] backdrop-blur-xl md:p-10">
              <div className="absolute -right-[10%] -top-[10%] h-[150px] w-[150px] rounded-full bg-[#f1c79d]/30 blur-[40px]" />
              <div className="absolute -bottom-[10%] -left-[10%] h-[150px] w-[150px] rounded-full bg-[#c8b6ff]/28 blur-[40px]" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#bf7752] text-white shadow-md">
                    <Stars className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-3xl font-medium text-[#4a3b3c]">Leave a Message</h3>
                </div>

                <motion.form onSubmit={handleAddBlessing} className="space-y-6">
                  <label className="group block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#bf7752]">Your Name</span>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#d5b193] transition-colors group-focus-within:text-[#bf7752]" />
                      <input
                        type="text"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="John & Jane Doe"
                        className="h-14 w-full rounded-2xl border border-[#efdcc9] bg-white/65 pl-12 pr-4 text-[#4a3b3c] placeholder-[#d9b89e] outline-none transition-all duration-300 focus:border-[#bf7752] focus:bg-white focus:shadow-[0_10px_20px_rgba(191,119,82,0.12)] group-hover:bg-white/90"
                        required
                      />
                    </div>
                  </label>

                  <label className="group block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#bf7752]">Your Blessing</span>
                    <div className="relative">
                      <PenLine className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-[#d5b193] transition-colors group-focus-within:text-[#bf7752]" />
                      <textarea
                        value={newBlessing}
                        onChange={(e) => setNewBlessing(e.target.value)}
                        placeholder="Share your sweetest wishes..."
                        rows={4}
                        className="w-full resize-none rounded-[1.5rem] border border-[#efdcc9] bg-white/65 px-4 py-4 pl-12 text-[#4a3b3c] placeholder-[#d9b89e] outline-none transition-all duration-300 focus:border-[#bf7752] focus:bg-white focus:shadow-[0_10px_20px_rgba(191,119,82,0.12)] group-hover:bg-white/90"
                        required
                      />
                    </div>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHoveringSend(true)}
                    onHoverEnd={() => setIsHoveringSend(false)}
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#bf7752] bg-[#bf7752] px-6 py-4 text-white shadow-[0_10px_20px_rgba(191,119,82,0.35)] transition-all hover:bg-[#ab6240] hover:shadow-[0_15px_30px_rgba(171,98,64,0.42)]"
                  >
                    <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">{isSubmitting ? 'Sending...' : 'Send Blessing'}</span>
                    <motion.div
                      animate={isHoveringSend ? { x: [0, 5, 0], y: [0, -5, 0] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10"
                    >
                      <Send className="h-5 w-5" />
                    </motion.div>
                    <div className="absolute inset-0 z-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                      <div className="relative h-full w-12 bg-white/30" />
                    </div>
                  </motion.button>

                  {submitError && (
                    <p className="text-center text-sm font-medium text-[#9f3a2f]">{submitError}</p>
                  )}

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="overflow-hidden rounded-2xl border border-[#bf7752]/20 bg-[#bf7752]/10 px-4 py-3 text-center"
                      >
                        <p className="flex items-center justify-center gap-2 text-sm font-medium text-[#bf7752]">
                          <Heart className="h-4 w-4 fill-[#bf7752]" />
                          Message received! Thank you.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              </div>
            </div>
          </motion.div>

          <div className="relative space-y-6 pt-4">
            <div className="pointer-events-none absolute inset-x-0 bottom-[-2rem] z-20 h-20 bg-gradient-to-t from-[#fff8ee] to-transparent" />

            <AnimatePresence mode="popLayout">
              {blessings.map((blessing, index) => (
                <motion.div
                  layout
                  key={blessing.id}
                  initial={{ opacity: 0, y: 30, scale: 0.8, rotate: Math.random() * 4 - 2 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-[#efdcc9] bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-[0_15px_30px_rgba(191,119,82,0.2)] md:p-8"
                >
                  <div className="absolute -right-[10px] -top-[10px] opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <Quote className="h-24 w-24 fill-current text-[#d58e67]" />
                  </div>

                  <div className="relative z-10">
                    <p className="mb-4 text-lg font-light leading-relaxed text-[#4a3b3c]">"{blessing.message}"</p>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e3bf9a] to-[#bf7752] text-white shadow-sm">
                          <span className="font-serif font-bold tracking-widest">{blessing.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-[#4a3b3c]">{blessing.name}</h4>
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#bf7752]">{blessing.timestamp}</p>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="cursor-pointer text-[#d7b08f] hover:text-[#bf7752]">
                        <Heart className="h-6 w-6 fill-current transition-colors" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlessingsSection() {
  return (
    <Suspense fallback={
      <section className="min-h-[50vh] flex items-center justify-center bg-[linear-gradient(180deg,#fff8ee_0%,#fff1df_45%,#fbe7d2_100%)]">
        <Sparkles className="animate-spin text-[#c07a54]" />
      </section>
    }>
      <BlessingsSectionContent />
    </Suspense>
  );
}
