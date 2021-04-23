import { createContext, useCallback, useState, FC } from "react";

export const LayoutContext = createContext<{
  layout: string;
  toggleLayout: () => void;
}>({
  layout: "grid",
  toggleLayout: () => {},
});

export const LayoutProvider: FC = ({ children }) => {
  const [layout, setLayout] = useState("grid");
  const toggleLayout = useCallback(
    () => setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid")),
    []
  );
  return (
    <LayoutContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};
