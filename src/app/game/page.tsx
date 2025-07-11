"use client";
import Tarla from "@/components/Tarla/tarla";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function GamePage() {
    const router = useRouter();
    const goStore = () =>{
        router.push("/store");
    }
    return (
        <>
            <h1>Hayday Tarla Oyunu</h1>
            <button onClick={goStore} className={styles.storeButton}>Store</button>
            <Tarla />
        </>
    );
}