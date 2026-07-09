'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Heart, Mail, User, Users, Coffee, Sparkles } from 'lucide-react';
import { submitToGoogleSheets } from '@/lib/googleSheets';

export default function RSVPSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    dietary: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      await submitToGoogleSheets({
        formType: 'rsvp',
        name: formData.name,
        guests: formData.guests,
        dietary: formData.dietary,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', guests: '1', dietary: '' });
      }, 4000);
    } catch (error) {
      setSubmitError('Unable to submit right now. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8ee_0%,#fff1de_45%,#fbe7d2_100%)] px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      {/* Premium Ambient Backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, -45, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-10%] top-[-10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-bl from-[#ffd0d8] to-[#ffe8c8] opacity-70 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute left-[-10%] bottom-[-10%] h-[40vw] w-[40vw] rounded-full bg-gradient-to-tr from-[#e9dbff] to-[#ffdfe9] opacity-60 blur-[100px]"
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 10px 10px, rgba(188,125,83,0.38) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative RSVP Crest */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: -5 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="relative mx-auto mb-8 w-32 h-32 md:w-44 md:h-44 rounded-full border-8 border-white bg-white shadow-[0_20px_42px_rgba(189,126,86,0.3)] p-[2px] z-10 block"
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(244,206,169,0.75),rgba(255,255,255,0.95))]">
              <Mail className="h-12 w-12 text-[#bd6f4e]" />
            </div>

            {/* Tiny floating decorative elements around the image */}
            <Sparkles className="absolute -top-2 -right-4 h-8 w-8 text-[#d28a63] animate-pulse" />
            <Sparkles className="absolute -bottom-4 -left-2 h-6 w-6 text-[#b79bde] animate-pulse" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dcb08a]/45 bg-white/70 px-5 py-2.5 shadow-[0_10px_30px_rgba(197,135,95,0.18)] backdrop-blur-md"
          >
            <Mail className="h-5 w-5 text-[#bf7752]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf7752]">
              Join the Celebration
            </span>
          </motion.div>

          <h2 className="font-serif text-5xl font-medium tracking-tight text-[#4d3732] md:text-7xl">
            You are <span className="relative inline-block text-[#c16f58]">
              Invited
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#d79b73"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg text-[#7b6259] leading-relaxed">
            Please respond by August 1, 2026. We would be honored to have you join our Christian wedding celebration.
            <br/><br/>
            RSVP: DERICK 077 8016052 | MADU 076 2645328
          </p>
        </motion.div>

        {/* 3D Glassmorphic Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="relative perspective-[1000px]"
        >
          {/* Animated Background Envelope Flap Shape */}
          <div className="absolute -top-10 left-1/2 h-32 w-[90%] -translate-x-1/2 rounded-[2rem] bg-white/30 blur-md pointer-events-none" />

          <div className="relative overflow-hidden rounded-[3rem] border border-[#edd8bf] bg-[linear-gradient(150deg,rgba(255,255,255,0.84)_0%,rgba(255,244,228,0.78)_100%)] p-6 md:p-12 shadow-[0_20px_55px_rgba(192,128,88,0.2)] backdrop-blur-2xl">

            {/* Cute internal accents */}
            <div className="absolute left-[-20%] top-[-20%] h-[300px] w-[300px] rounded-full bg-[#f2c59d]/25 blur-[60px]" />
            <div className="absolute right-[-20%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-[#cfbfec]/25 blur-[60px]" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-8"
                >
                  <div className="grid grid-cols-1 gap-8">
                    {/* Name Input */}
                    <div className="group relative">
                      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">
                        <User className="h-4 w-4" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John & Jane Doe"
                        className="w-full rounded-2xl border border-[#efdcc9] bg-white/65 px-5 py-4 text-[#4a3b3c] placeholder-[#d5ab90]/70 outline-none transition-all duration-300 focus:border-[#c07a54] focus:bg-white focus:shadow-[0_10px_20px_rgba(192,122,84,0.12)] group-hover:bg-white/90"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Guests Select */}
                    <div className="group relative">
                      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">
                        <Users className="h-4 w-4" /> Guests
                      </label>
                      <div className="relative">
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-2xl border border-[#efdcc9] bg-white/65 px-5 py-4 pr-12 text-[#4a3b3c] outline-none transition-all duration-300 focus:border-[#c07a54] focus:bg-white focus:shadow-[0_10px_20px_rgba(192,122,84,0.12)] group-hover:bg-white/90 cursor-pointer"
                        >
                          <option value="1">1 Guest (Just Me)</option>
                          <option value="2">2 Guests (Couple)</option>
                          <option value="3">3 Guests (Plus One)</option>
                          <option value="4">4 Guests (Family)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#c07a54]">
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Dietary Input */}
                    <div className="group relative">
                      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">
                        <Coffee className="h-4 w-4" /> Dietary Notes
                      </label>
                      <input
                        type="text"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        placeholder="Allergies, Vegan, etc."
                        className="w-full rounded-2xl border border-[#efdcc9] bg-white/65 px-5 py-4 text-[#4a3b3c] placeholder-[#d5ab90]/70 outline-none transition-all duration-300 focus:border-[#c07a54] focus:bg-white focus:shadow-[0_10px_20px_rgba(192,122,84,0.12)] group-hover:bg-white/90"
                      />
                    </div>
                  </div>

                  {/* Creative Submit Button */}
                  <div className="mt-10 flex justify-center pt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHoveringSubmit(true)}
                      onHoverEnd={() => setIsHoveringSubmit(false)}
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full bg-[#bf7752] px-12 py-5 text-white shadow-[0_10px_30px_rgba(191,119,82,0.38)] transition-all hover:bg-[#ab6240] hover:shadow-[0_15px_40px_rgba(171,98,64,0.45)] border border-[#bf7752]"
                    >
                      <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-sm">
                        {isSubmitting ? 'Sending...' : 'Send RSVP'}
                      </span>

                      {/* Animated Send Icon */}
                      <motion.div
                        animate={isHoveringSubmit ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                      >
                        <Send className="h-5 w-5" />
                      </motion.div>

                      {/* Cool Shine Effect */}
                      <div className="absolute inset-0 z-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                        <div className="relative h-full w-12 bg-white/30" />
                      </div>
                    </motion.button>
                  </div>

                  {submitError && (
                    <p className="text-center text-sm font-medium text-[#9f3a2f]">{submitError}</p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="relative z-10 flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(191,119,82,0.28)]"
                  >
                    <Heart className="h-12 w-12 text-[#bf7752] fill-[#bf7752]" />
                  </motion.div>
                  <h3 className="font-serif text-4xl font-medium text-[#4a3b3c] mb-4">
                    Yay! We got it
                  </h3>
                  <p className="max-w-md text-lg text-[#7b6259]">
                    Thank you so much for confirming, {formData.name || 'dear guest'}! We are so excited to celebrate with you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner cute dots */}
            <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-[#e2b48f]" />
            <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-[#c6b6e8]" />
            <div className="absolute left-6 bottom-6 h-2 w-2 rounded-full bg-[#c6b6e8]" />
            <div className="absolute right-6 bottom-6 h-2 w-2 rounded-full bg-[#e2b48f]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
