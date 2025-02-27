import { lstat } from "fs";
import { url } from "inspector";
import Link from "next/link";

// This will create button that switches to the second page
function Button() {
  return (
    <Link href="/layer2" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Switch to the second page
    </Link>
  );
}

// This is the first section of the page
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <section className="text-center">
        <title className="text-center text-4x1 width-20px height-20px">StarGame</title>
        <h1 className="text-6x1 font-bold">Welcome to StarGame!</h1>
      </section>
      <Button />
    </main>
  );
}