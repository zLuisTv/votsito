import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1 className="font-pixel text-2xl font-bold">Para Caramelito</h1>
        <Image
          className="rounded-3xl"
          src="/foto1.jpg"
          alt="Logo"
          width={400}
          height={258}
          priority
        />
        <p className="font-[family-name:var(--font-geist-mono)]">Tops Apodos</p>
        <ol className="list-inside list-decimal text-sm  sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Vot.</li>
          <li className="mb-2">Nuv.</li>
          <li className="mb-2">Caramelito.</li>
          <li className="mb-2">Manco.</li>
          <li className="mb-2">Tochino.</li>
          <li className="mb-2">Puerco.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#545454] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://www.instagram.com/luiwi.i/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert dark:invert-0"
              src="/ig_logo.png"
              alt="IG logo"
              width={20}
              height={20}
            />
            Instagram
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/phone"
            rel="noopener noreferrer"
          >
            Puzzle
          </Link>
        </div>
      </main>
    </div>
  );
}
