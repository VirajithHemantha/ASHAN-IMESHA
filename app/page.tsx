'use client';

import { useState, useEffect } from 'react';
import { EnvelopeOpener } from '@/components/envelope-opener';
import HeroSection from '@/components/sections/HeroSection';
import CeremonyDetails from '@/components/sections/CeremonyDetails';
import CountdownSection from '@/components/sections/CountdownSection';
import GallerySection from '@/components/sections/GallerySection';
import VenueLocation from '@/components/sections/VenueLocation';
import RSVPSection from '@/components/sections/RSVPSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import FooterSection from '@/components/sections/FooterSection';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Persistent floating music player */}
      <MusicPlayer />

      {!isOpened ? (
        <EnvelopeOpener onEnvelopeOpen={() => setIsOpened(true)} />
      ) : (
        <>
          <HeroSection />
          <CeremonyDetails />
          <CountdownSection />
          <GallerySection />
          <VenueLocation />
          <RSVPSection />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
