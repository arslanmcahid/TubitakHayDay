import {createContext} from "react";

interface MoneyContextType {
  money: number;
  setMoney: (value: number) => void;
  
}

export const MoneyContext = createContext<MoneyContextType>({
  money: 100,
  setMoney: () => {},
});
