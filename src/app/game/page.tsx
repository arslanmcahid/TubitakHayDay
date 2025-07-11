"use client";
import Tarla from "@/components/Tarla/tarla";

import { useState } from "react";
import { MoneyContext } from "../../contexts/MoneyContext";

export default function GamePage() {
    const [money, setMoney] = useState(100);
    return (
        <MoneyContext.Provider value={{ money, setMoney }}>
            <h1>Hayday Tarla Oyunu</h1>
            <Tarla />
        </MoneyContext.Provider>
    );
}