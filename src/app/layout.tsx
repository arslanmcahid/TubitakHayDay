"use client";
import {useState} from "react";
import { MoneyContext } from "@/contexts/MoneyContext";

export default function Home({children}: {children: React.ReactNode}) {
  const [money, setMoney] = useState(100);

  return (
    <html>
      <body>  
        <MoneyContext.Provider value={{ money, setMoney }}>
          {children}
        </MoneyContext.Provider>
      </body>
    </html>
  );

}