"use client";
import React, { useState } from "react";
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
