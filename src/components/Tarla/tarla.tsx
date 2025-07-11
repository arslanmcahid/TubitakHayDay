"use client";

import React from "react";
import style from "./tarla.module.css";
import { useState } from "react";
import Tohum from "../tohum/tohum";
const TARLA_SIZE = 4;
type Stage = "boş" | "tohum";;

export default function Tarla() {

    const [stages, setStages] = useState<Stage[]>(
    Array.from({ length: TARLA_SIZE * TARLA_SIZE }, () => "boş")
  );

  const handlePlant = (index: number) => {
    setStages((prev) => {
      if (prev[index] !== "boş") return prev;
      const copy = [...prev];
      copy[index] = "tohum";
      return copy;
    });
  };

  return (
    <div className={style.menuGrid}>
      {stages.map((stage, id) => (
        <Tohum
          key={id}
          stage={stage}
          onClick={() => handlePlant(id)}
        />
      ))}
    </div>
  );
}