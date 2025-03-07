"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Lrc } from 'lrc-kit';

const tracks = [
    {
        title: "Frances Limon",
        artist: "Los Enanitos Verdes",
        src: "/music/Frances Limon.mp3",
        cover: "/music_bg.png",
        lrc: `
[00:00.00]La, la, la, la, la, la, la, la, la, la, la, la
[00:04.00]La, la, la, la, la, la, la, la, la, la, la, la
[00:08.00]La, la, la, la, la, la, la, la, la, lo
[00:14.00]♪ ♪ ♪

[00:46.00]Todo tiene el color
[00:54.00]De tus ojos, ¿cómo ves?
[01:02.00]Todo cambia, no así tu voz
[01:09.00]Cuando me hablas en francés limón

[01:15.00]En un barco de papel, yo volveré
[01:23.00]Por ti, mi amor, francés limón
[01:31.00]Las luces de la ciudad se apagarán
[01:38.00]Te besaré, me besarás 

[01:48.00]Me encanta tu actitud
[01:55.00]Dios conserve tu salud
[02:03.00]Sólo por mirarte comprendí
[02:10.00]Para qué yo vine aquí

[02:16.00]En un barco de papel, yo volveré
[02:24.00]Por ti, mi amor, francés limón
[02:31.00]Las luces de la ciudad se apagarán
[02:39.00]Te besaré, me besarás 

[02:47.00]♪ ♪ ♪
[03:18.00]La, la, la, la, la, la, la, la, la, la, la, la
[03:22.00]La, la, la, la, la, la, la, la, la, la, la, la
[03:26.00]La, la, la, la, la, la, la, la, la, la

[03:34.00]Me encanta tu actitud
[03:42.00]Y tus ojos, ¿cómo ves?
[03:49.00]Todo cambia, no así tu voz
[03:57.00]Cuando me hablas en francés limón

[04:03.00]En un barco de papel, yo volveré
[04:11.00]Por ti, mi amor, francés limón
[04:18.00]Las luces de la ciudad se apagarán
[04:26.00]Te besaré, me besarás

[04:34.00]♪ ♪ ♪

[05:10.00]Fin`
    },
    {
        title: "Amores Lejanos",
        artist: "Los Enanitos Verdes",
        src: "/music/Amores Lejanos.mp3",
        cover: "/music_bg.png",
        lrc: `
[00:00.00]♪

[00:17.00]Esta tarde no pasa nada
[00:21.00]Las calles parecen desiertas
[00:25.00]Carmencita se fue de viaje
[00:29.00]Y quizás nunca más la vea

[00:33.00]Yo mirando por la ventana
[00:37.00]El asfalto brillando perlas
[00:41.00]Los lugares que frecuentaba
[00:45.00]No me atraen ni me interesan

[00:50.00]Y aunque hoy no estás, voy planificando
[00:58.00]Una y otra vez, amores lejanos
[01:07.00]Y aunque hoy no estás, te abro mis brazos
[01:14.00]Yo me quedaré aquí esperando

[01:20.00]♪ ♪ ♪

[01:39.00]Esta tarde no pasa nada
[01:43.00]0No me puedo olvidar de ella
[01:47.00]Hace un mes que la estoy pensando
[01:51.00]Y no sé si de mí se acuerda

[01:55.00]Mi futuro es algo incierto
[01:59.00]Pero ese no es el problema
[02:03.00]¿Dónde pongo mis sentimientos?
[02:07.00]Si esta noche hay Luna llena

[02:12.00]Y aunque hoy no estás, voy planificando
[02:20.00]Una y otra vez, amores lejanos
[02:28.00]Y aunque hoy no estás, te abro mis brazos
[02:36.00]Yo me quedaré aquí esperando

[02:44.00]♪ ♪ ♪

[03:16.00]Y aunque hoy no estás, voy planificando
[03:24.00]Una y otra vez, amores lejanos
[03:32.00]Y aunque hoy no estás, te abro mis brazos
[03:40.00]Yo me quedaré aquí esperando

[03:49.00]Oh, oh
[03:53.00]Oh, oh
[03:57.00]Oh (oh)
[04:01.00]Oh

[04:12.00]Y aunque hoy no estás, voy planificando
[04:20.00]Una y otra vez, amores lejanos
[04:28.00]Y aunque hoy no estás, te abro mis brazos
[04:36.00]Yo me quedaré aquí esperando
`
    },
];

export default function MusicPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Cuando cambia la pista, parseamos las letras
    useEffect(() => {
        const currentTrack = tracks[currentTrackIndex];
        if (currentTrack.lrc) {
            // Parsea el LRC y obtén el array de líneas desde la propiedad 'lyrics'
            const parsed = Lrc.parse(currentTrack.lrc) as unknown as { lyrics: { timestamp: number; content: string }[] };
            // Mapea cada línea para que tenga las propiedades 'time' y 'text'
            setLyrics(parsed.lyrics.map(line => ({ time: line.timestamp, text: line.content })));
        } else {
            setLyrics([]);
        }
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

    // Calcula el índice de la línea activa
    const activeIndex = lyrics.findIndex((line, index) => {
        const next = lyrics[index + 1];
        return line.time <= currentTime && (!next || next.time > currentTime);
    });
    const clampedActiveIndex = activeIndex === -1 ? 0 : activeIndex;

    // Queremos mostrar tres líneas: la anterior, la activa y la siguiente.
    // Si el índice activo es mayor que 0, usamos clampedActiveIndex - 1; de lo contrario, iniciamos en 0.
    const startIndex = clampedActiveIndex > 0 ? clampedActiveIndex - 1 : 0;
    const displayLyrics = lyrics.slice(startIndex, startIndex + 3);

    // Suponemos que cada línea tiene una altura fija
    const lineHeight = 40; // px

    // Queremos que el contenedor tenga altura suficiente para 3 líneas (por ejemplo, 140px) y que la línea activa quede centrada.
    // Calculamos el top deseado para la línea activa:
    const containerHeight = 140; // px
    const desiredActiveTop = (containerHeight - lineHeight) / 2; // en este ejemplo, (140-40)/2 = 50px
    // El top actual de la línea activa dentro del slice es: offset = clampedActiveIndex - startIndex
    const offset = clampedActiveIndex - startIndex;
    // Calculamos el translateY necesario:
    const translateY = desiredActiveTop - (offset * lineHeight);

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
            {/* <div className="fixed bottom-0 left-0 w-full bg-green-600 text-black text-center py-4 text-lg font-semibold">
                {currentLyric || "♪"}
            </div> */}

            <div className="mt-6 w-full h-[140px] overflow-hidden">
                <div
                    className="transition-all duration-300"
                    style={{ transform: `translateY(${translateY}px)` }}
                >
                    {displayLyrics.map((line, index) => (
                        <p
                            key={index}
                            className={`text-center text-lg transition-all duration-300  font-quicksand ${index === offset ? "text-white font-bold" : "text-white opacity-50"
                                }`}
                            style={{ height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }}
                        >
                            {line.text}
                        </p>
                    ))}
                </div>
            </div>
            {/* Botón para regresar a Home */}
            <div className="fixed top-4 right-4">
                <Link
                    href="/"
                    className="bg-gray-800 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700 transition"
                >
                    Regresar
                </Link>
            </div>
        </div>

    );
}
