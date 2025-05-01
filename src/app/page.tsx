'use client'

import { useState, useEffect } from 'react';
import clsx from "clsx";
import { IoHeart } from 'react-icons/io5';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [active, setActive] = useState(false);
  const radius = 80;
  const [stars, setStars] = useState<
    { top: string; left: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    const generatedStars = [...Array(60)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setStars(generatedStars);
  }, []);

  const socials = [
    { label: 'Spotify', href: '/spotify', img: '/icons/spotify.png', hoverColor: 'rgba(29, 185, 84, 1)' },
    { label: 'Instagram', href: '/instagram', img: '/icons/instagram.png', hoverColor: 'rgba(225, 48, 108, 1)' },
    { label: 'Puzzle', href: '/puzzle', img: '/icons/puzzle.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'Love', href: '/love', img: '/icons/love.png', hoverColor: 'rgba(255, 0, 0, 1)' },
    { label: 'Photos', href: '/photos', img: '/icons/photos.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'Contact', href: '/contactme', img: '/icons/contactme.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'Donation', href: '/donation', img: '/icons/donation.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'TikTok', href: '/tiktok', img: '/icons/tiktok.png', hoverColor: 'rgba(0, 0, 0, 1)' },
  ];

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-4 px-10 py-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-yellow-300 rounded-full animate-[twinkle_5s_infinite]"
            style={star}
          />
        ))}
      </div>

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">

        <div className="relative text-center">
          <h1 className="text-5xl font-dancing font-bold relative">Bienvenida</h1>
          <h2 className='text-yellow-500 text-3xl font-dancing font-bold animate-[pulseText_5s_infinite]'>Mi Amor</h2>
        </div>

        <div className="relative h-[200px] w-[200px]">
          {/* Central Heart Button */}
          <button
            onClick={() => setActive(v => !v)}
            className={clsx(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[60px] h-[60px] items-center justify-center rounded-full bg-white text-[2rem] text-black z-10',
              'transition-all duration-[1500ms]',
              active && 'rotate-[360deg] shadow-[0_6px_8px_rgba(0,0,0,0.15),0_0_0_1px_#333,0_0_0_6px_#fff]',
            )}
          >
            <IoHeart />
          </button>

          {/* Circle Menu Items */}
          <ul className="absolute inset-0 list-none m-0 p-0">
            {socials.map(({ label, href, img }, i) => {
              const theta = (2 * Math.PI * i) / socials.length;
              const x = active ? radius * Math.cos(theta) : 0;
              const y = active ? radius * Math.sin(theta) : 0;
              const transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${active ? 1 : 0})`;
              const delay = `${i * 60}ms`;


              return (
                <li
                  key={label}
                  style={{ top: '50%', left: '50%', transform, transitionDelay: delay }}
                  className="absolute transition-all duration-700 ease-in-out"
                >
                  <Link href={href} className={`relative w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[110%] hover:shadow-[0_0_0_1px_rgba(0,0,0),0_0_0_3px_#fff]`}>
                    <Image
                      src={img}
                      alt={label}
                      height={25}
                      width={25}
                      unoptimized
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
