'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  let resumeTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const handleUserInteraction = () => {
      // Solo en móviles
      if (window.innerWidth <= 768 && videoRef.current) {
        videoRef.current.pause();
        clearTimeout(resumeTimer);
        // Reanuda después de 1 segundo sin interacción
        resumeTimer = setTimeout(() => {
          videoRef.current?.play();
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('touchmove', handleUserInteraction);

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      clearTimeout(resumeTimer);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/background_web.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
  );
}
