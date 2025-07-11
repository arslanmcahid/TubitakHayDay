"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "./tarla.module.css";
import { MoneyContext } from "@/contexts/MoneyContext";
import { StoreContext } from "@/contexts/StoreContext";
import { tohumlar } from "@/app/store/page";

type HucreStage = "boş" | "tohum" | "fidan" | "bitki" | "çiçek" | "kurumuş çiçek";

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
  const { money, setMoney }     = useContext(MoneyContext);
  const { stocks, setStocks }   = useContext(StoreContext);

  const [selectedSeed, setSelectedSeed] = useState<number>(0);
  const [stages, setStages]             = useState<HucreStage[]>(
    Array(TARLA_SIZE * TARLA_SIZE).fill("boş")
  );
  const [species, setSpecies]           = useState<number[]>(
    Array(TARLA_SIZE * TARLA_SIZE).fill(-1)
  );

  const [tick, setTick]       = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setStages(prev =>
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
    const noStoreSeeds = stocks.every(n => n === 0);
    const allWithered  = stages.every(s => s === "boş" || s === "kurumuş çiçek");
    if (!gameOver && money < 10 && noStoreSeeds && allWithered) {
      setGameOver(true);
      alert("Oyun bitti! Son bakiye: " + money);
    }
  }, [money, stocks, stages, gameOver]);

  const handleCellClick = (idx: number) => {
    if (gameOver) return;
    const current = stages[idx];

    if (current === "boş" && stocks[selectedSeed] > 0) {
      setStocks(s => {
        const next = [...s];
        next[selectedSeed]--;
        return next;
      });
      setStages(s => {
        const next = [...s];
        next[idx] = "tohum";
        return next;
      });
      setSpecies(s => {
        const next = [...s];
        next[idx] = selectedSeed;
        return next;
      });
      return;
    }

    if (current === "çiçek") {
      const prodIdx = species[idx];
      const gain    = tohumlar[prodIdx].harvestPrice;
      setMoney(m => m + gain);
      setStages(s => {
        const next = [...s];
        next[idx] = "boş";
        return next;
      });
      setSpecies(s => {
        const next = [...s];
        next[idx] = -1;
        return next;
      });
      return;
    }

    if (current === "kurumuş çiçek") {
      setStages(s => {
        const next = [...s];
        next[idx] = "boş";
        return next;
      });
      setSpecies(s => {
        const next = [...s];
        next[idx] = -1;
        return next;
      });
    }
  };

  if (gameOver) {
    return (
      <div className={styles.gameOver}>
        <h2>Oyun Bitti! Tekrar deneyin.</h2>
      </div>
    );
  }

  const stageClass = (stage: HucreStage, idx: number) => {
    switch (stage) {
      case "boş":            return styles.empty;
      case "tohum":          return styles.seeding;
      case "fidan":          return styles.fidan;
      case "bitki":          return styles.bitki;
      case "çiçek":         
        return species[idx] === 0 
          ? styles.flowerDaisy 
          : styles.flowerTulip;
      case "kurumuş çiçek":  return styles.withered;
      default:               return "";
    }
  };

  return (
    <>
      <div className={styles.toolbar}>
        {tohumlar.map((p, idx) => (
          <button
            key={p.id}
            className={`${styles.seedButton} ${
              selectedSeed === idx ? styles.selected : ""
            }`}
            onClick={() => setSelectedSeed(idx)}
          >
            {p.name} ({stocks[idx]})
          </button>
        ))}
      </div>

      <div className={styles.balance}>Bakiye: {money}</div>

      <div className={styles.menuGrid}>
        {stages.map((stage, idx) => (
          <button
            key={idx}
            className={`${styles.cellButton} ${stageClass(stage, idx)}`}
            onClick={() => handleCellClick(idx)}
          />
        ))}
      </div>
    </>
  );
}
