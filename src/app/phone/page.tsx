'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Page() {
  const gridSize = 3;

  // Estado para el orden de piezas (se genera solo en el cliente)
  const [pieces, setPieces] = useState<number[] | null>(null);
  useEffect(() => {
    const ordenAleatorio = [...Array(gridSize * gridSize).keys()].sort(() => Math.random() - 0.5);
    setPieces(ordenAleatorio);
  }, []);

  // Estado para las piezas colocadas en el tablero: cada posición almacena el id de la pieza o null
  const [placedPieces, setPlacedPieces] = useState<(number | null)[]>(Array(gridSize * gridSize).fill(null));

  // Estado para la pieza que se está arrastrando y su posición
  const [draggingPiece, setDraggingPiece] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const handlePointerDown = (piece: number, e: React.PointerEvent) => {
    e.preventDefault();
    setDraggingPiece(piece);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleBoardPointerUp = (index: number, e: React.PointerEvent) => {
    e.preventDefault();
    if (draggingPiece !== null) {
      // Si la pieza arrastrada corresponde a la celda correcta (por ejemplo, pieza 3 en celda 3)
      if (draggingPiece === index) {
        const newPlacedPieces = [...placedPieces];
        newPlacedPieces[index] = draggingPiece;
        setPlacedPieces(newPlacedPieces);
      }
      setDraggingPiece(null);
      setDragPos(null);
    }
  };

  useEffect(() => {
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
  }, [draggingPiece]);

  useEffect(() => {
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
  }, [draggingPiece]);

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
          {/* Carrusel superior: piezas en orden aleatorio */}
          <div className="w-full overflow-x-auto flex space-x-2 p-2 bg-white shadow-md rounded-md mb-4 scrollbar-hide">
            {pieces.map(piece =>
              (!placedPieces.includes(piece) && draggingPiece !== piece) && (
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
              )
            )}
          </div>
  
          {/* Tablero del puzzle */}
          <div className="grid grid-cols-3 gap-1 w-[300px] h-[300px] border border-gray-700 bg-white">
            {Array.from({ length: gridSize * gridSize }, (_, index) => (
              <div
                key={index}
                onPointerUp={(e) => handleBoardPointerUp(index, e)}
                className="board-cell relative w-[100px] h-[100px] border border-gray-500 bg-gray-200"
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
  
      {/* Preview de la pieza arrastrada */}
      {draggingPiece !== null && dragPos && (
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
