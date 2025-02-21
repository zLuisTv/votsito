import Image from "next/image";

export default function Page() {
    return <div>
        <main className="items-center justify-items-center">
            <div className="mt-[250px] m-8 p-10 border rounded-xl items-center justify-items-center">
                <div className="pb-4">
                    <p>Usted ya lo tiene</p>
                </div>
                <div>
                    <a href="/">
                        <Image
                            className="border rounded-full p-4 dark:invert"
                            src="/arrow_left.png"
                            alt="Back"
                            width={75}
                            height={75}
                            priority
                        />
                    </a>
                </div>
            </div>
        </main>
    </div>
}