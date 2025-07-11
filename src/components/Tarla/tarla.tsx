"use client";

import React, { useState, useEffect, useContext } from "react";
import Tohum, { HucreStage } from "../tohum/tohum";
import styles from "./tarla.module.css";
import { MoneyContext } from "../../contexts/MoneyContext";

const TARLA_SIZE = 4;
const stageOrder: HucreStage[] = [
  "boş",
  "tohum",
  "fidan",
  "bitki",
  "çiçek",
  "kurumuş çiçek",
];

export default function Tarla() {

  const { money, setMoney } = useContext(MoneyContext);

  const [stages, setStages] = useState<HucreStage[]>(
    Array(TARLA_SIZE * TARLA_SIZE).fill("boş")
  );
  const [tick, setTick] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setStages(prev =>
        // state updates can be asenchronous,
        // so we need to use the previous state
        //setINterval içinceki closure kapanış yolu eski bir değer tutabilir
        // with functional form we can access the previous and live state
        // yeni state önceki state in bir fonksiyonu
        // React setState API
      prev.map(s => {
        const i = stageOrder.indexOf(s);
        if (s === "boş" || s === "kurumuş çiçek") return s;
        if (s === "çiçek") {
          return tick % 2 === 1 ? "kurumuş çiçek" : s;
        }
        if (i >= 1 && i < stageOrder.length - 2) {
          return stageOrder[i + 1];
        }
        return s;
      })
    );
  }, [tick]);

  useEffect(() => {
    if (
      !gameOver &&
      money < 10 &&
      stages.every(s => s === "boş" || s === "kurumuş çiçek")
    ) {
      setGameOver(true);
      alert("Oyun bitti! Son bakiye: " + money);
    }
  }, [money, stages, gameOver]);

  const handleClick = (idx: number) => {
    if (gameOver) return;
    const current = stages[idx];

    if (current === "boş" && money >= 5) {
      setMoney(m => m - 5);
      setStages(prev => {
        const copy = [...prev];
        copy[idx] = "tohum";
        return copy;
      });
    } else if (current === "çiçek") {
      setMoney(m => m + 10);
      setStages(prev => {
        const copy = [...prev];
        copy[idx] = "boş";
        return copy;
      });
    } else if (current === "kurumuş çiçek") {
      setStages(prev => {
        const copy = [...prev];
        copy[idx] = "boş";
        return copy;
      });
    }
  };

  if (gameOver) {
    return (
      <div className={styles.gameOver}>
        <h2>Oyun Bitti bişi yapamadın!</h2>
      </div>
    );
  }

  return (
    <>
      <div className={styles.balance}>Bakiye: {money}</div>
      <div className={styles.menuGrid}>
        {stages.map((stage, idx) => (
          <Tohum key={idx} stage={stage} onClick={() => handleClick(idx)} />
        ))}
      </div>
    </>
  );
}
