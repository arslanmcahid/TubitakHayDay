"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  function handleSignup() {
    router.push("/signup");
  }

  return (
    <>
      <button onClick={handleSignup}>Oyuna Hazır mısın</button>
    </>
  );
}
