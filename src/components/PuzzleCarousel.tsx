'use client';
import Image from 'next/image';

interface PuzzleCarouselProps {
  pieces: number[];
  placedPieces: (number | null)[];
  isMobile: boolean;
  draggingPiece: number | null;
  onSelectMobile: (piece: number, e: React.MouseEvent) => void;
  onPointerDown: (piece: number, e: React.PointerEvent) => void;
}

export default function PuzzleCarousel({
  pieces,
  placedPieces,
  isMobile,
  draggingPiece,
  onSelectMobile,
  onPointerDown,
}: PuzzleCarouselProps) {
  return (
    <div className="w-full overflow-x-auto flex space-x-2 p-2 bg-white shadow-md rounded-md mb-4 scrollbar-hide">
      {pieces.map(piece => {
        if (placedPieces.includes(piece)) return null;
        if (isMobile) {
          const isSelected = draggingPiece === piece;
          return (
            <div
              key={piece}
              onClick={(e) => onSelectMobile(piece, e)}
              className={`cursor-pointer flex-shrink-0 border-4 ${
                isSelected ? 'border-blue-500' : 'border-gray-400'
              }`}
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
          if (draggingPiece === piece) return null;
          return (
            <div
              key={piece}
              onPointerDown={(e) => onPointerDown(piece, e)}
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
  );
}
