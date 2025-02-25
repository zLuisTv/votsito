'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HomeButton from "@/components/HomeButton";

const phrases = [
  "No",
  "¿Segura?",
  "Super segura?",
  "Creo que deberías pensarlo",
  "Yo creo que te estás equivocando",
  "Piensalo de nuevo",
  "Otra chance",
  "Pero yo te quiero",
  "Vamos Nikole di que sí",
  "Que te pasa Vot",
  "Por eso eres Nuv",
  "Pues serás mía sí o sí.",
  "Te voy hacer un amarre"
];

export default function Page() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noPhraseIndex, setNoPhraseIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ top: "50%", left: "60%" });

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Función para mover el botón "No" (solo en PC)
  const moveNoButton = () => {
    if (!isMobile) {
      const top = Math.floor(Math.random() * 70 + 10) + "%";
      const left = Math.floor(Math.random() * 70 + 10) + "%";
      setNoButtonPos({ top, left });
    }
  };

  // En PC, al pasar el mouse sobre "No", se mueve
  const handleNoMouseEnter = () => {
    moveNoButton();
  };

  // Al hacer click en "No", se cambia la frase y se incrementa el tamaño del botón "Sí"
  const handleNoClick = () => {
    setNoPhraseIndex((prev) => (prev + 1) % phrases.length);
    setYesScale((prev) => prev + 0.1);
    moveNoButton();
  };

  // Acción para el botón "Sí"
  const handleYesClick = () => {
    alert("¡Gracias! ¡Sabía que sí!");
  };


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">

      <h1 className="text-4xl font-bold mb-8">¿Me quieres?</h1>
      <div className="relative w-full h-64">
        <button
          onClick={handleYesClick}
          style={{ transform: `scale(${yesScale})` }}
          className="absolute left-1/4 top-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        >
          Sí
        </button>
        <button
          onMouseEnter={handleNoMouseEnter}
          onClick={handleNoClick}
          style={{ position: "absolute", top: noButtonPos.top, left: noButtonPos.left }}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          {phrases[noPhraseIndex]}
        </button>
      </div>

      <HomeButton />
    </div>
  );
}
