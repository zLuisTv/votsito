'use client';

import { useState } from "react";
import HomeButton from "@/components/HomeButton";
import Image from "next/image";

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
  "Te voy hacer un amarre",
  "¿Estás realmente segura?",
  "¡Super segura, ¿no crees?!",
  "Creo que deberías darle otra pensada.",
  "Yo pienso que te estás equivocando.",
  "Vuelve a considerarlo.",
  "Dale otra oportunidad, por favor.",
  "Pero tú sabes que te quiero.",
  "Vamos, di que sí, ¡no te hagas la difícil!",
  "¿Qué te pasa Vot? ¡Anímate!",
  "Al final, serás mía sí o sí."
];

export default function Page() {
  const [yesScale, setYesScale] = useState(1);
  const [noPhraseIndex, setNoPhraseIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const [gifSrc, setGifSrc] = useState("/GifLove.gif");
  const [clickedNoOnce, setClickedNoOnce] = useState(false);


  // Al hacer click en "No", se cambia la frase y se incrementa el tamaño del botón "Sí"
  const handleNoClick = () => {
    if (!clickedNoOnce) {
      setGifSrc("/GifEnojado.gif");
      setClickedNoOnce(true);
    }
    setNoPhraseIndex((prev) => {
      const next = (prev + 1) % phrases.length;
      return next === 0 ? 1 : next;
    });
    setYesScale((prev) => prev + 0.1);
  };


  // Acción para el botón "Sí"
  const handleYesClick = () => {
    setSuccess(true);
  };

  // Botón para regresar a la normalidad (cerrar overlay)
  const handleResetSuccess = () => {
    setSuccess(false);
    // Reinicia valores
    setYesScale(1);
    setNoPhraseIndex(0);
    setGifSrc("/GifLove.gif");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Image
        src={gifSrc}
        alt="Corazón animado"
        width={328}
        height={328}
        unoptimized
        className="mb-4 rounded-full"
      />

      <h1 className="text-5xl font-bebas tracking-wide font-bold mb-8 underline underline-offset-4 decoration-4 decoration-pink-500/70">
        ¿Me quieres?
      </h1>

      {/* Contenedor de los botones en columna */}
      <div className="relative w-full h-64 flex flex-col items-center justify-center gap-4">
        {/* Eliminamos la posición absoluta para que el botón "Sí" no se mueva */}
        <button
          onClick={handleYesClick}
          style={{ transform: `scale(${yesScale})` }}
          className={`z-20 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${success ? "bg-pink-200 hover:bg-pink-300" : "bg-green-500 hover:bg-green-600"
            } `}
        >
          Sí
        </button>
        <button
          onClick={handleNoClick}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          style={{ position: "relative" }}
        >
          {phrases[noPhraseIndex]}
        </button>
      </div>



      {/* Overlay de éxito */}
      {success && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
          <h2
            className="text-6xl font-bebas font-bold text-red-500 mb-4 text-center"
            style={{ textShadow: "6px 6px 4px rgba(0,0,0,0.5)" }}
          >
            Lo sabía mi amor
          </h2>
          <div className="relative w-48 h-48 overflow-hidden rounded-full mb-4">
            <Image
              src="/Heart.png"
              alt="Heart"
              fill
              style={{ objectFit: "cover", objectPosition: "center 10px" }}
            />
          </div>
          <button
            onClick={handleResetSuccess}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600 transition-all duration-300"
          >
            Volver
          </button>
        </div>

      )}

      <HomeButton />
    </div>
  );
}
