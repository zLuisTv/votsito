"use client";

import { useRouter } from "next/navigation";

export default function HomeButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/")}
            className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
        >
            Inicio
        </button>
    );
}
