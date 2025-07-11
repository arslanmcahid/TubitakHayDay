"use client";

export type HucreStage = "boş" | "tohum" | "fidan" | "bitki" | "çiçek" | "kurumuş çiçek";
type LabelMap = { [K in HucreStage]: string };
interface TohumProps {
    stage: HucreStage;
    onClick: () => void;
}

export default function Tohum({ stage, onClick }: TohumProps) {
    
    const labelMap: LabelMap = {
    boş: "+",
    tohum: "tohum",
    fidan: "fidan",
    bitki: "bitki",
    çiçek: "çiçek",
    "kurumuş çiçek": "kurumuş çiçek",
  };


    return (
        <button onClick={onClick}>
            {labelMap[stage]}
        </button>
    )

}
