import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Internxt</h1>
      <Image src="/logo.svg" alt="Internxt" width={200} height={200} />
    </main>
  );
}
