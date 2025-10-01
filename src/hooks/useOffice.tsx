import { useContext } from "react";
import { OfficeContext, OfficeContextType } from "../contexts/OfficeContext";

export const useOffice = (): OfficeContextType => {
  const context = useContext(OfficeContext);
  if (!context) {
    throw new Error("useOffice must be used within an OfficeProvider");
  }
  return context;
};
