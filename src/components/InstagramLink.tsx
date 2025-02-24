import Image from "next/image";
import Link from "next/link";

export default function InstagramLink() {
    return (
        <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#545454] dark:hover:bg-[#ccc] text-xl sm:text-base h-10 sm:h-12 px-4 py-6 sm:px-5"
            href="https://www.instagram.com/luiwi.i/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert dark:invert-0"
              src="/ig_logo.png"
              alt="IG logo"
              width={30}
              height={30}
            />
            Instagram
          </Link>
    );
}
