import { useState } from "react";
import { createContext } from "react";

export const RefContext = createContext(null);

export default function RefContextProvider({ children }) {
  const [preserveLink, setLinkWallet] = useState();
  const [open, setOpen] = useState(false);
  return (
    <RefContext.Provider value={{ preserveLink, setLinkWallet, open, setOpen }}>
      {children}
    </RefContext.Provider>
  );
}
