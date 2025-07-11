"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  function handleSignup() {
    router.push("/signup");
  }

  return (
    <>
      <button onClick={handleSignup}>Sign Up</button>
    </>
  );
}
