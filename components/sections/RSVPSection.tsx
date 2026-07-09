'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Heart, Mail, User, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { useSearchParams } from 'next/navigation';

function RSVPFormContent() {
  const searchParams = useSearchParams();
  const urlName = searchParams.get('name');

  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
  });

  useEffect(() => {
    if (urlName) {
      setFormData((prev) => ({ ...prev, name: urlName }));
    }
  }, [urlName]);

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
        attending: formData.attending,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: urlName || '', attending: 'yes' });
      }, 4000);
    } catch (error) {
      setSubmitError('Unable to submit right now. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

          <div className="mb-8">
            <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c07a54]">
              <CheckCircle2 className="h-4 w-4" /> Will you attend?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-5 py-4 font-semibold transition-all duration-300 ${
                  formData.attending === 'yes'
                    ? 'border-[#c07a54] bg-[#c07a54] text-white shadow-[0_10px_20px_rgba(192,122,84,0.25)]'
                    : 'border-[#efdcc9] bg-white/65 text-[#4a3b3c] hover:bg-white/90'
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                  className="hidden"
                />
                <CheckCircle2 className={`h-5 w-5 ${formData.attending === 'yes' ? 'text-white' : 'text-[#c07a54]'}`} />
                Joyfully Accept
              </label>
              
              <label
                className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-5 py-4 font-semibold transition-all duration-300 ${
                  formData.attending === 'no'
                    ? 'border-[#7b6259] bg-[#7b6259] text-white shadow-[0_10px_20px_rgba(123,98,89,0.25)]'
                    : 'border-[#efdcc9] bg-white/65 text-[#4a3b3c] hover:bg-white/90'
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                  className="hidden"
                />
                <XCircle className={`h-5 w-5 ${formData.attending === 'no' ? 'text-white' : 'text-[#7b6259]'}`} />
                Regretfully Decline
              </label>
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

              <motion.div
                animate={isHoveringSubmit ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Send className="h-5 w-5" />
              </motion.div>

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
            Thank you so much for confirming, {formData.name || 'dear guest'}!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function RSVPSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

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

            {/* Tiny floating decorative elements */}
            <Sparkles className="absolute -top-2 -right-4 h-8 w-8 text-[#d28a63] animate-pulse" />
            <Heart className="absolute -bottom-2 -left-2 h-6 w-6 text-[#bd6f4e] animate-bounce" style={{ animationDuration: '3s' }} />
          </motion.div>

          <h2 className="font-serif text-5xl md:text-6xl font-light text-[#4a3b3c] drop-shadow-sm mb-4">
            Be Our Guest
          </h2>
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#c07a54] to-transparent mb-6" />
          <p className="mx-auto max-w-2xl text-[#7b6259] md:text-lg">
            We can't wait to celebrate with you. Please let us know if you can make it by August 5th.
          </p>
        </motion.div>

        {/* Elegant Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto max-w-2xl rounded-[3rem] border border-white/60 bg-white/40 p-8 shadow-[0_30px_60px_rgba(189,126,86,0.12)] backdrop-blur-xl sm:p-12 md:p-16"
        >
          {/* Cute internal accents */}
          <div className="absolute left-[-20%] top-[-20%] h-[300px] w-[300px] rounded-full bg-[#f2c59d]/25 blur-[60px]" />
          <div className="absolute right-[-20%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-[#cfbfec]/25 blur-[60px]" />

          <Suspense fallback={<div className="h-40 flex items-center justify-center"><Sparkles className="animate-spin text-[#c07a54]" /></div>}>
            <RSVPFormContent />
          </Suspense>

          {/* Corner cute dots */}
          <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-[#e2b48f]" />
          <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-[#c6b6e8]" />
          <div className="absolute left-6 bottom-6 h-2 w-2 rounded-full bg-[#c6b6e8]" />
          <div className="absolute right-6 bottom-6 h-2 w-2 rounded-full bg-[#e2b48f]" />
        </motion.div>
      </div>
    </section>
  );
}
