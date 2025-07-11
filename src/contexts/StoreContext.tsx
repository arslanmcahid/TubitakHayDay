import {createContext} from 'react';

interface StoreContextType {
  stocks: number[];
  setStocks: (s: number[]) => void;
}
export const StoreContext = createContext<StoreContextType>({
  stocks: [],
  setStocks: () => {},
});