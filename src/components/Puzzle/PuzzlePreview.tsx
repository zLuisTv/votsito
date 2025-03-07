'use client';
import Image from 'next/image';

interface PuzzlePreviewProps {
  draggingPiece: number | null;
  dragPos: { x: number; y: number } | null;
}

export default function PuzzlePreview({ draggingPiece, dragPos }: PuzzlePreviewProps) {
  if (draggingPiece === null || !dragPos) return null;
  return (
    <div
      className="pointer-events-none fixed z-50 opacity-75"
      style={{
        top: dragPos.y - 32,
        left: dragPos.x - 32,
        touchAction: 'none',
        width: 64,
        height: 64,
      }}
    >
      <Image
        src={`/puzzle/puz${draggingPiece + 1}.jpg`}
        alt={`Dragging piece ${draggingPiece + 1}`}
        width={64}
        height={64}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
