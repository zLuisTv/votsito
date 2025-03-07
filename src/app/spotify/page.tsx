"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Lrc } from 'lrc-kit';

const tracks = [
    {
        title: "Frances Limon",
        artist: "Artista 1",
        src: "/music/Frances Limon.mp3",
        cover: "/music_bg.png",
        lrc: `
        [00:00.00]La, la, la, la, la, la, la, la, la, la, la, la
[00:08.00]La, la, la, la, la, la, la, la, la, la, la, la
[00:16.00]La, la, la, la, la, la, la, la, la, la, lo

[00:24.00]Todo tiene el color
[00:28.00]De tus ojos, ¿cómo ves?
[00:32.00]Todo cambia, no así tu voz
[00:36.00]Cuando me hablas en francés limón

[00:40.00]En un barco de papel, yo volveré
[00:44.00]Por ti, mi amor, francés limón
[00:48.00]Las luces de la ciudad se apagarán
[00:52.00]Te besaré, me besarás

[00:58.00]Me encanta tu actitud
[01:02.00]Dios conserve tu salud
[01:06.00]Sólo por mirarte comprendí
[01:10.00]Para qué yo vine aquí

[01:16.00]En un barco de papel, yo volveré
[01:20.00]Por ti, mi amor, francés limón
[01:24.00]Las luces de la ciudad se apagarán
[01:28.00]Te besaré, me besarás

[01:34.00]La, la, la, la, la, la, la, la, la, la, la, la
[01:42.00]La, la, la, la, la, la, la, la, la, la, la, la
[01:50.00]La, la, la, la, la, la, la, la, la, la

[02:00.00]Me encanta tu actitud
[02:04.00]Y tus ojos, ¿cómo ves?
[02:08.00]Todo cambia, no así tu voz
[02:12.00]Cuando me hablas en francés limón

[02:18.00]En un barco de papel, yo volveré
[02:22.00]Por ti, mi amor, francés limón
[02:26.00]Las luces de la ciudad se apagarán
[02:30.00]Te besaré, me besarás

[02:40.00]Instrumental...

[05:10.00]Fin`
    },
    {
        title: "Amores Lejanos",
        artist: "Artista 2",
        src: "/music/Amores Lejanos.mp3",
        cover: "/music_bg.png",
        lrc: `[00:00.00] Comienza la canción
[00:04.00] Primera parte de la letra
[00:12.00] Segunda parte de la letra
[00:20.00] Tercera parte de la letra
[00:28.00] Fin`
    },
];

export default function MusicPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentLyric, setCurrentLyric] = useState("");
    const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Cuando cambia la pista, parseamos las letras
    useEffect(() => {
        const currentTrack = tracks[currentTrackIndex];
        if (currentTrack.lrc) {
            const parsed = Lrc.parse(currentTrack.lrc) as unknown as { time: number; text: string }[];
            setLyrics(parsed); // parsed.lines es un array de objetos con { time, text }
        } else {
            setLyrics([]);
        }
        // Reiniciamos la letra al cambiar de pista
        setCurrentLyric("");
    }, [currentTrackIndex]);

    // Actualizamos el tiempo actual del audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    // Seleccionamos la línea activa según el tiempo actual
    useEffect(() => {
        if (!lyrics.length) return;

        // Buscamos la última línea cuyo timestamp sea menor o igual al currentTime
        const activeLine = lyrics.reduce((prev, curr) => {
            return curr.time <= currentTime ? curr : prev;
        }, { time: 0, text: "" });
        setCurrentLyric(activeLine.text);
    }, [currentTime, lyrics]);

    const handlePlayPause = () => {
        if (!isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handlePrev = () => {
        const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <div className="flex flex-col items-center p-6 pt-12 bg-gray-900 text-white w-full max-w-md mx-auto shadow-lg min-h-screen">
            {/* Portada */}
            <div className="relative w-64 h-64 mb-4">
                <Image
                    src={tracks[currentTrackIndex].cover}
                    alt={tracks[currentTrackIndex].title}
                    fill
                    className="object-cover rounded-full"
                    unoptimized
                />
            </div>
            {/* Título y Artista */}
            <h2 className="text-2xl font-bold mb-1">{tracks[currentTrackIndex].title}</h2>
            <p className="text-gray-400 mb-4">{tracks[currentTrackIndex].artist}</p>

            {/* Barra de progreso */}
            <div className="w-full h-1 bg-gray-600 rounded-full mb-4 relative">
                <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                        width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%`,
                    }}
                ></div>
            </div>

            {/* Controles */}
            <div className="flex gap-4 mb-4">
                <button onClick={handlePrev} className="bg-gray-800 px-4 py-2 rounded">
                    ⏮
                </button>
                <button
                    onClick={handlePlayPause}
                    className="bg-green-500 px-6 py-2 rounded text-black font-bold"
                >
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button onClick={handleNext} className="bg-gray-800 px-4 py-2 rounded">
                    ⏭
                </button>
            </div>

            <audio ref={audioRef} src={tracks[currentTrackIndex].src} onEnded={handleNext} />

            {/* Visualización de letra sincronizada */}
            <div className="fixed bottom-0 left-0 w-full bg-green-600 text-black text-center py-4 text-lg font-semibold">
                {currentLyric || "♪"}
            </div>
        </div>

    );
}
