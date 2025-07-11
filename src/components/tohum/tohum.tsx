"use client";

type hucreStages = "boş" | "tohum" ;
// | "fidan" | "bitki" | "çiçek" | "kurumuş çiçek";

interface TohumProps {
    stage: hucreStages;
    onClick: () => void;
}

export default function Tohum({ stage, onClick }: TohumProps) {
    return (
        <button onClick={onClick}>

            {stage === "boş" ? "+": "tohum"}
        </button>
    )
    

}
