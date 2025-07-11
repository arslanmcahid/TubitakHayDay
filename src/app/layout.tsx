"use client";
import {useState} from "react";
import { MoneyContext } from "@/contexts/MoneyContext";
import { StoreContext } from "@/contexts/StoreContext";
import { tohumlar } from "./store/page";

interface Props{
  children: React.ReactNode;
}

export default function Home({children}: Props) {
  const [money, setMoney] = useState(100);
  const [stocks, setStocks] = useState<number[]>(Array(tohumlar.length).fill(0));

  return (
    <html>
      <body>  
        <MoneyContext.Provider value={{ money, setMoney }}>
          <StoreContext.Provider value={{ stocks, setStocks }}>
            {children}
          </StoreContext.Provider>
        </MoneyContext.Provider>
      </body>
    </html>
  );

}