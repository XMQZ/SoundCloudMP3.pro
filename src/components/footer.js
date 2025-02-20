import Link from "next/link";

export default function Footer() {
    return(
    <footer className="bg-slate-50 mt-6">
        <div className="w-full mx-auto max-w-6xl px-4 py-6 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center ">
                © 2025 <Link href="/" className="hover:underline">SoundCloudMP3</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                <li>
                    <Link href="/about-us" className="mr-4 hover:underline md:mr-6">About us</Link>
                </li>
                <li>
                    <Link href="/terms-of-service" locale={false} className="mr-4 hover:underline md:mr-6">Terms of Service</Link>
                </li>
                <li>
                    <Link href="/privacy-policy" llocale={false} className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/contact" locale={false} className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
    </footer>
    );
}