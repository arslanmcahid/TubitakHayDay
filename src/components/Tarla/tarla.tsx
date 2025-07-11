"use client";
import React, { useEffect, useState } from "react";
import Tohum, { HucreStage } from "../tohum/tohum";
import styles from "./tarla.module.css";

const TARLA_SIZE = 4;
// Evreleri sıralı tutan dizi
const stageOrder: HucreStage[] = [
  "boş",
  "tohum",
  "fidan",
  "bitki",
  "çiçek",
  "kurumuş çiçek",
];

export default function Tarla() {
  const [stages, setStages] = useState<HucreStage[]>(
    Array(TARLA_SIZE * TARLA_SIZE).fill("boş")
  );
  const [tick, setTick] = useState(0);

 useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);


  useEffect(() => {
    setStages(prev =>
      prev.map(s => {
            // state updates can be asenchronous,
            // so we need to use the previous state
            //setINterval içinceki closure kapanış yolu eski bir değer tutabilir
            // with functional form we can access the previous and live state
            // yeni state önceki state in bir fonksiyonu
            // React setState API
        const i = stageOrder.indexOf(s);
        if (s === "boş" || s === "kurumuş çiçek") return s;
        if (s === "çiçek") {
          return tick % 2 === 0 ? s : "kurumuş çiçek";
        }
        if (i >= 1 && i < stageOrder.length - 2) {
          return stageOrder[i + 1];
        }
        return s;
      })
    );
  }, [tick]);

  const handleClick = (idx: number) => {
    setStages((prev) => {
      const current = prev[idx];
      const i = stageOrder.indexOf(current);
      const copy = [...prev];
      if (i === stageOrder.length - 1) {
        // kurumuş çiçekte başa dön
        copy[idx] = stageOrder[0];
      } else {
        // next stage e gec
        copy[idx] = stageOrder[i + 1];
      }
      return copy;
    });
  };

  return (
    <div className={styles.menuGrid}>
      {stages.map((stage, idx) => (
        <Tohum
          key={idx}
          stage={stage}
          onClick={() => handleClick(idx)}
        />
      ))}
    </div>
  );
}
