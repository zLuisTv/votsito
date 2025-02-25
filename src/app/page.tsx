import Image from "next/image";
import Link from "next/link";
import InstagramLink from '@/components/InstagramLink';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-10 py-4 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1 className="font-pixel text-4xl font-bold">Bienvenida</h1>
        <Image
          className="rounded-3xl border-2 border-white"
          src="/foto1.jpg"
          alt="Logo"
          width={400}
          height={258}
          priority
        />
        <p className="font-[family-name:var(--font-geist-mono)] text-xl font-bold">Tops Apodos</p>
        <ol className="list-inside list-disc text-lg  sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Vot.</li>
          <li className="mb-2">Nuv.</li>
          <li className="mb-2">Caramelito.</li>
          <li className="mb-2">Manco.</li>
          <li className="mb-2">Tochino.</li>
          <li className="mb-2">Puerco.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <InstagramLink />

          <Link
            className="rounded-full border border-solid border-black/[.08] bg-white bg-opacity-20 dark:border-white transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-base sm:text-base h-10 sm:h-12 p-4 sm:px-5 sm:min-w-44"
            href="/puzzle"
            rel="noopener noreferrer"
          >
            Puzzle
          </Link>
        </div>
      </main>
    </div>
  );
}
