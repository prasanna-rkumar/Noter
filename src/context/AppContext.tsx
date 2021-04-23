import { createContext, useCallback, useState, FC } from "react";

export const AppContext = createContext<{
  layout: string;
  toggleLayout: () => void;
}>({
  layout: "grid",
  toggleLayout: () => {},
});

export const AppProvider: FC = ({ children }) => {
  const [layout, setLayout] = useState("grid");
  const toggleLayout = useCallback(
    () => setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid")),
    []
  );
  return (
    <AppContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </AppContext.Provider>
  );
};
