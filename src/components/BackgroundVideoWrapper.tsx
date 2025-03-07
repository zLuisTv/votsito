"use client";
import { usePathname } from "next/navigation";
import BackgroundVideo from "./BackgroundVideo";

export default function BackgroundVideoWrapper() {
  const pathname = usePathname();

  // Si la ruta empieza con '/spotify', no renderizamos el video de fondo
  if (pathname.startsWith("/spotify")) {
    return null;
  }
  return <BackgroundVideo />;
}
