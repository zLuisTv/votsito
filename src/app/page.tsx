'use client'

import { useState, useEffect } from 'react';
import clsx from "clsx";
import { IoHeart } from 'react-icons/io5';
import Image from "next/image";
import Link from "next/link";
import Script from 'next/script';
import * as mojs from '@mojs/core'; 

export default function Home() {

  const [active, setActive] = useState(false);

  const radius = 80;
  const [stars, setStars] = useState(
    [] as { top: string; left: string; animationDelay: string; animationDuration: string; color: string }[]
  );

  useEffect(() => {
    const colors = ['bg-yellow-300', 'bg-white', 'bg-blue-400']
    const generatedStars = Array.from({ length: 90 }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const animationDelay = `${(Math.random() * 5).toFixed(2)}s`
      const animationDuration = `${(3 + Math.random() * 4).toFixed(2)}s`
      return {
        top: `${(Math.random() * 100).toFixed(2)}%`,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        animationDelay,
        animationDuration,
        color,
      }
    })
    setStars(generatedStars)
  }, [])

  useEffect(() => {
    const mojsGlobal = (window as unknown as { mojs: typeof mojs }).mojs;
    if (!mojsGlobal || !mojsGlobal.Burst) return;
  
    const burst = new mojsGlobal.Burst({
      radius: { 0: 100 },
      count: 10,
      children: {
        shape: 'circle',
        radius: 20,
        fill: { cyan: 'yellow' },
        duration: 2000,
      },
    });
  
    const button = document.getElementById('heart-button');
    const handleClick = () => {
      burst
        .tune({ x: button!.offsetLeft + 30, y: button!.offsetTop + 30 })
        .replay();
    };
  
    if (button) button.addEventListener('click', handleClick);
    return () => {
      if (button) button.removeEventListener('click', handleClick);
    };
  }, []);
  

  const pages = [
    { label: 'Spotify', href: '/spotify', img: '/icons/spotify.png', hoverColor: 'rgba(29, 185, 84, 1)' },
    { label: 'Instagram', href: '/instagram', img: '/icons/instagram.png', hoverColor: 'rgba(225, 48, 108, 1)' },
    { label: 'Puzzle', href: '/puzzle', img: '/icons/puzzle.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'Love', href: '/love', img: '/icons/love.png', hoverColor: 'rgba(255, 0, 0, 1)' },
    { label: 'Photos', href: '/photos', img: '/icons/photos.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'Contact', href: '/contactme', img: '/icons/contactme.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'Donation', href: '/donation', img: '/icons/donation.png', hoverColor: 'rgba(51, 51, 51, 1)' },
    { label: 'TikTok', href: '/tiktok', img: '/icons/tiktok.png', hoverColor: 'rgba(0, 0, 0, 1)' },
  ];

  const styleLine = `fill-none stroke-[#ffffff] `;
  const lttr = `fill-[#a5b9c7]`;

  return (
    <div className="relative min-h-screen overflow-hidden p-4 sm:p-20 text-center">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <div
            key={i}
            className={`absolute w-[2px] h-[2px] rounded-full ${s.color}`}
            style={{
              top: s.top,
              left: s.left,
              animation: `twinkle ${s.animationDuration} linear ${s.animationDelay} infinite`,
              boxShadow: `0 0 6px rgba(255,255,255,0.7), 0 0 10px rgba(255,255,255,0.9)`,
            }}
          />
        ))}
      </div>

      <div className="relative mt-10 text-center">
        <h1 className="text-5xl font-dancing font-bold relative">Bienvenida</h1>
        <h2 className='hidden text-violet-400 text-4xl font-dancing font-bold animate-[pulseText_5s_infinite]'>Mi Amor</h2>
      </div>


      <div className="relative mx-auto mt-16 h-[200px] w-[200px]">
        <button
          onClick={() => setActive(v => !v)}
          className={clsx(
            'text-violet-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[60px] h-[60px] items-center justify-center rounded-full bg-white text-[2rem] text-black z-10',
            'transition-all duration-[1500ms]',
            active && 'rotate-[360deg] shadow-[0_6px_8px_rgba(0,0,0,0.15),0_0_0_1px_#333,0_0_0_6px_#fff]',
          )}
        >
          <IoHeart />
        </button>

        <ul className="absolute inset-0">
          {pages.map((p, i) => {
            const theta = (2 * Math.PI * i) / pages.length;
            const x = active ? radius * Math.cos(theta) : 0;
            const y = active ? radius * Math.sin(theta) : 0;
            const transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${active ? 1 : 0})`;
            const delay = `${i * 60}ms`;


            return (
              <li
                key={p.href}
                style={{
                  top: '50%',
                  left: '50%',
                  transform,
                  transitionDelay: delay
                }}
                className="absolute transition-all duration-700 ease-in-out"
              >
                <Link
                  href={p.href}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_0_1px_rgba(0,0,0),0_0_0_3px_#fff]`}
                >
                  <Image
                    src={p.img}
                    alt={p.label}
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

      {/* Animación SVG I LOVE YOU */}
      <div className="relative w-full mx-auto mt-16 z-10  flex items-center justify-center">
        <svg className="block w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
          <line
            className={`${styleLine} line--left`}
            style={
              {
                strokeWidth: '8',
                strokeLinecap: 'round',
                strokeMiterlimit: '30'
              }
            }
            x1="10" y1="17" x2="10" y2="183" />
          <line
            className={`${styleLine} line--rght`}
            style={
              {
                strokeWidth: '8',
                strokeLinecap: 'round',
                strokeMiterlimit: '30'
              }
            }
            x1="490" y1="17" x2="490" y2="183" />
          <g>
            <path className={`${lttr} lttr--I`} d="M42.2,73.9h11.4v52.1H42.2V73.9z" />
            <path className={`${lttr} lttr--L`} d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z" />
            <path className={`${lttr} lttr--O`} d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100zM166.9,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C160.1,116.5,166.9,109.2,166.9,100z" />
            <path className={`${lttr} lttr--V`} d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z" />
            <path className={`${lttr} lttr--E`} d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z" />
            <path className={`${lttr} lttr--Y`} d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z" />
            <path className={`${lttr} lttr--O2`} d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9c15.5,0,27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9C360.5,126.9,348.8,115.2,348.8,100z M391.8,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C385,116.5,391.8,109.2,391.8,100z" />
            <path className={`${lttr} lttr--U`} d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z" />
          </g>
        </svg>
        <div className="mo-container absolute inset-0 flex items-center justify-center pointer-events-none" />
      </div>

      {/* Audio and Sound Toggle */}
      <audio className="blup" style={{ display: 'none' }}>
        <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg" />
      </audio>
      <audio className="blop" style={{ display: 'none' }}>
        <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg" />
      </audio>

      <div className="sound fixed text-white text-[1.6rem] bottom-4 right-4 underline cursor-pointer">sound</div>

      <Script src="https://cdn.jsdelivr.net/mojs/latest/mo.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/script.js" strategy="afterInteractive" />

    </div>
  );
}
