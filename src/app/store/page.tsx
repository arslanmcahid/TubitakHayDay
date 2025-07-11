"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { MoneyContext } from "@/contexts/MoneyContext";
import styles from "./store.module.css";

const tohumlar = [
  { id: "papatya", name: "Papatya", price: 10, harvestPrice: 20, image: "/Papatya.png" },
  { id: "lale",    name: "Lale",    price: 20, harvestPrice: 40, image: "/Lale.png"    },
];

export default function StorePage() {
  const { money, setMoney } = useContext(MoneyContext);

  // her ürün için default 0 stok adet
  const [quantities, setQuantities] = useState<number[]>(
    Array(tohumlar.length).fill(0)
  );
  const [stocks, setStocks] = useState<number[]>(
    Array(tohumlar.length).fill(0)
  );

  const increment = (idx: number) =>
    setQuantities(q => {
      const next = [...q];
      next[idx] = next[idx] + 1;
      return next;
    });
  const decrement = (idx: number) =>
    setQuantities(q => {
      const next = [...q];
      next[idx] = Math.max(0, next[idx] - 1);
      return next;
    });

  const buy = (idx: number) => {
    const product = tohumlar[idx];
    const qty = quantities[idx];
    const cost = product.price * qty;
    if (qty === 0 || money < cost) return;

    setMoney(m => m - cost);
    setStocks(s => {
      const next = [...s];
      next[idx] = next[idx] + qty;
      return next;
    });
    setQuantities(q => {
      const next = [...q];
      next[idx] = 0;
      return next;
    });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Marketplace</h1>

      <Link href="/game">
        <button className={styles.backButton}>Back to Game</button>
      </Link>

      <div className={styles.items}>
        {tohumlar.map((p, idx) => {
          const qty = quantities[idx];
          const total = (p.price * qty); 

          return (
            <div key={p.id} className={styles.card}>
                
              <img src={p.image} alt={p.name} className={styles.image} />
              <h2>{p.name}</h2>
              <p>${p.price.toFixed(2)} / adet</p>

              <div className={styles.controls}>
                <button onClick={() => decrement(idx)}>-</button>
                <span>{qty}</span>
                <button onClick={() => increment(idx)}>+</button>
              </div>

              <p>Toplam: ${total}</p>
              <button
                className={styles.buyButton}
                onClick={() => buy(idx)}
                disabled={qty === 0 || p.price * qty > money}
              >
                Tohum Al
              </button>

              <p>Stok: {stocks[idx]}</p>
            </div>
          );
        })}
      </div>

      <p className={styles.balance}>Bakiyeniz: ${money}</p>
    </main>
  );
}
