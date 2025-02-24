'use client';
import Image from 'next/image';

interface PuzzleBoardProps {
  gridSize: number;
  placedPieces: (number | null)[];
  isMobile: boolean;
  onBoardClick: (index: number, e: React.MouseEvent) => void;
  onBoardPointerUp: (index: number, e: React.PointerEvent) => void;
  // Opcional: índices de celdas en error
  errorCells?: number[];
}

export default function PuzzleBoard({
  gridSize,
  placedPieces,
  isMobile,
  onBoardClick,
  onBoardPointerUp,
  errorCells = [],
}: PuzzleBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-1 w-[340px] h-[350px] p-4 rounded-lg bg-gray-200 bg-opacity-30 border border-gray-500">
      {Array.from({ length: gridSize * gridSize }, (_, index) => {
        const isError = errorCells.includes(index);
        return (
          <div
            key={index}
            className={`board-cell relative w-[100px] h-[100px] flex items-center justify-center transition-all duration-300 ${errorCells.includes(index)
                ? 'border-red-500 animate-bounce'
                : 'border border-gray-500'
              } bg-gray-200`}
            onClick={isMobile ? (e) => onBoardClick(index, e) : undefined}
            onPointerUp={!isMobile ? (e) => onBoardPointerUp(index, e) : undefined}
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

        );
      })}
    </div>
  );
}
