"use client";
import Tarla from "@/components/Tarla/tarla";
import { useRouter } from "next/navigation";
// s
export default function GamePage() {
    // const {money} = useContext(MoneyContext);
    const router = useRouter();
    const goStore = () =>{
        router.push("/store");
    }
    return (
        <>
            <h1>Hayday Tarla Oyunu</h1>
            <button onClick={goStore}>Store</button>
            <Tarla />
        </>
    );
}