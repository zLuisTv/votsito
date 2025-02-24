'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Page() {
  const gridSize = 3;

  // Detección de móvil según el ancho de la ventana
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Genera el orden aleatorio de piezas solo en el cliente
  const [pieces, setPieces] = useState<number[] | null>(null);
  useEffect(() => {
    const ordenAleatorio = [...Array(gridSize * gridSize).keys()].sort(() => Math.random() - 0.5);
    setPieces(ordenAleatorio);
  }, []);

  // Estado para las piezas colocadas en el tablero (cada celda contiene el id o null)
  const [placedPieces, setPlacedPieces] = useState<(number | null)[]>(Array(gridSize * gridSize).fill(null));

  // draggingPiece se usa tanto para la pieza arrastrada en PC como para la seleccionada en móvil
  const [draggingPiece, setDraggingPiece] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  // HANDLERS PARA PC (drag & drop)
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
      // Si la pieza es la correcta para esa celda
      if (draggingPiece === index) {
        const newPlacedPieces = [...placedPieces];
        newPlacedPieces[index] = draggingPiece;
        setPlacedPieces(newPlacedPieces);
      }
      setDraggingPiece(null);
      setDragPos(null);
    }
  };

  // HANDLERS PARA MÓVIL (click para seleccionar)
  const handleSelectMobile = (piece: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) {
      setDraggingPiece(piece);
    }
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
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
      };
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
      return () => {
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [draggingPiece, isMobile]);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-4"
      style={{ touchAction: 'none' }}
    >
      <h1 className="text-2xl font-bold mb-4">Puzzle</h1>
      {!pieces ? (
        <div>Cargando...</div>
      ) : (
        <>
          {/* Carrusel de piezas */}
          <div className="w-full overflow-x-auto flex space-x-2 p-2 bg-white shadow-md rounded-md mb-4 scrollbar-hide">
            {pieces.map(piece => {
              if (placedPieces.includes(piece)) return null;
              if (isMobile) {
                // En móvil, mostramos todas las piezas no colocadas.
                // Si la pieza está seleccionada, se resalta con un borde azul.
                const isSelected = draggingPiece === piece;
                return (
                  <div
                    key={piece}
                    onClick={(e) => handleSelectMobile(piece, e)}
                    className={`cursor-pointer flex-shrink-0 border ${isSelected ? 'border-blue-500' : 'border-gray-400'}`}
                    style={{ width: 64, height: 64 }}
                  >
                    <Image
                      src={`/puz${piece + 1}.jpg`}
                      alt={`Puzzle piece ${piece + 1}`}
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                );
              } else {
                // En PC, no mostramos la pieza seleccionada (se ve en preview)
                if (draggingPiece === piece) return null;
                return (
                  <div
                    key={piece}
                    onPointerDown={(e) => handlePointerDown(piece, e)}
                    className="cursor-grab flex-shrink-0 border border-gray-400"
                    style={{ width: 64, height: 64 }}
                  >
                    <Image
                      src={`/puz${piece + 1}.jpg`}
                      alt={`Puzzle piece ${piece + 1}`}
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                );
              }
            })}
          </div>
  
          {/* Tablero del puzzle */}
          <div className="grid grid-cols-3 gap-1 w-[300px] h-[300px] border border-gray-700 bg-white">
            {Array.from({ length: gridSize * gridSize }, (_, index) => (
              <div
                key={index}
                className="board-cell relative w-[100px] h-[100px] border border-gray-500 bg-gray-200 flex items-center justify-center"
                onClick={isMobile ? (e) => handleBoardClick(index, e) : undefined}
                onPointerUp={!isMobile ? (e) => handleBoardPointerUp(index, e) : undefined}
              >
                {placedPieces[index] !== null && (
                  <Image
                    src={`/puz${placedPieces[index]! + 1}.jpg`}
                    alt={`Placed piece ${placedPieces[index]! + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
  
      {/* Preview de la pieza arrastrada (solo en PC) */}
      {!isMobile && draggingPiece !== null && dragPos && (
        <div
          className="pointer-events-none fixed z-50 opacity-75"
          style={{ top: dragPos.y - 32, left: dragPos.x - 32, touchAction: 'none', width: 64, height: 64 }}
        >
          <Image
            src={`/puz${draggingPiece + 1}.jpg`}
            alt={`Dragging piece ${draggingPiece + 1}`}
            width={64}
            height={64}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
}
