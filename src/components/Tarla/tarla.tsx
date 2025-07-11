"use client";

import React from "react";
import style from "./tarla.module.css";
const TARLA_SIZE = 4;

export default function Tarla() {
    const tarlaHucreler = Array.from({ length: TARLA_SIZE * TARLA_SIZE }, (_, i) => i);
    return (
        <div className={style.menuGrid}>
        {tarlaHucreler.map((id) => (
            <button key={id} className={style.tarlaHucre}>
            +
            </button>
        ))}
        </div>
  );
}
