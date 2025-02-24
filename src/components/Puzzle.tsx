'use client';

import { useState, useEffect } from 'react';
import PuzzleCarousel from './PuzzleCarousel';
import PuzzleBoard from './PuzzleBoard';
import PuzzlePreview from './PuzzlePreview';
import HomeButton from "@/components/HomeButton";
import Image from 'next/image';

export default function Puzzle() {
  const gridSize = 3;

  // Detección de móvil (umbral 768px, ajustable)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Genera el orden aleatorio de piezas (solo en cliente)
  const [pieces, setPieces] = useState<number[] | null>(null);
  useEffect(() => {
    const ordenAleatorio = [...Array(gridSize * gridSize).keys()].sort(() => Math.random() - 0.5);
    setPieces(ordenAleatorio);
  }, []);

  // Estado para las piezas colocadas en el tablero
  const [placedPieces, setPlacedPieces] = useState<(number | null)[]>(Array(gridSize * gridSize).fill(null));

  // Estado para la pieza en "drag" o seleccionada (para móvil)
  const [draggingPiece, setDraggingPiece] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  // Handlers para PC (drag & drop)
  const handlePointerDown = (piece: number, e: React.PointerEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setDraggingPiece(piece);
      setDragPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleBoardPointerUp = (index: number, e: React.PointerEvent) => {
    if (!isMobile && draggingPiece !== null) {
      e.preventDefault();
      if (draggingPiece === index) {
        const newPlacedPieces = [...placedPieces];
        newPlacedPieces[index] = draggingPiece;
        setPlacedPieces(newPlacedPieces);
      }
      setDraggingPiece(null);
      setDragPos(null);
    }
  };

  // Handlers para móvil (click para seleccionar y luego click en celda)
  const handleSelectMobile = (piece: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) setDraggingPiece(piece);
  };

  const handleBoardClick = (index: number, e: React.MouseEvent) => {
    if (isMobile && draggingPiece !== null) {
      e.preventDefault();
      if (draggingPiece === index) {
        const newPlacedPieces = [...placedPieces];
        newPlacedPieces[index] = draggingPiece;
        setPlacedPieces(newPlacedPieces);
      }
      setDraggingPiece(null);
      setDragPos(null);
    }
  };

  // Solo en PC: actualizar la posición del preview mientras se arrastra
  useEffect(() => {
    if (!isMobile) {
      const handlePointerMove = (e: PointerEvent) => {
        e.preventDefault();
        if (draggingPiece !== null) {
          setDragPos({ x: e.clientX, y: e.clientY });
        }
      };
      if (draggingPiece !== null) {
        window.addEventListener('pointermove', handlePointerMove);
      }
      return () => window.removeEventListener('pointermove', handlePointerMove);
    }
  }, [draggingPiece, isMobile]);

  // Solo en PC: cancelar el arrastre si se suelta fuera del tablero
  useEffect(() => {
    if (!isMobile) {
      const handlePointerUp = (e: PointerEvent) => {
        if (draggingPiece !== null) {
          if (!(e.target as HTMLElement).classList.contains('board-cell')) {
            setDraggingPiece(null);
            setDragPos(null);
          }
        }
      };
      if (draggingPiece !== null) {
        window.addEventListener('pointerup', handlePointerUp);
      }
      return () => window.removeEventListener('pointerup', handlePointerUp);
    }
  }, [draggingPiece, isMobile]);

  // Verificamos si el puzzle está completo
  const isComplete = pieces !== null && placedPieces.every(piece => piece !== null);

  // Función para reiniciar el puzzle
  const handleReset = () => {
    const newOrder = [...Array(gridSize * gridSize).keys()].sort(() => Math.random() - 0.5);
    setPieces(newOrder);
    setPlacedPieces(Array(gridSize * gridSize).fill(null));
    setDraggingPiece(null);
    setDragPos(null);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4" style={{ touchAction: 'none' }}>
        <h1 className="text-2xl font-bold mb-4">Puzzle</h1>
        {!pieces ? (
          <div>Cargando...</div>
        ) : (
          <>
            <PuzzleCarousel
              pieces={pieces}
              placedPieces={placedPieces}
              isMobile={isMobile}
              draggingPiece={draggingPiece}
              onSelectMobile={handleSelectMobile}
              onPointerDown={handlePointerDown}
            />
            <PuzzleBoard
              gridSize={gridSize}
              placedPieces={placedPieces}
              isMobile={isMobile}
              onBoardClick={handleBoardClick}
              onBoardPointerUp={handleBoardPointerUp}
            />
          </>
        )}
        {!isMobile && <PuzzlePreview draggingPiece={draggingPiece} dragPos={dragPos} />}

        {/* Overlay con la foto original y botón de reinicio cuando el puzzle está completo */}
        {isComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
            <h2 className="text-white text-3xl mb-4">¡Puzzle Completado!</h2>
            <Image
              src="/foto1.jpg"
              alt="Foto original"
              width={300}
              height={300}
              style={{ objectFit: 'cover' }}
            />
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Comenzar de nuevo
            </button>
          </div>
        )}
      </div>
      <HomeButton />

    </>
  );
}
