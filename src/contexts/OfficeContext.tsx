import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface OfficeContextType {
  isOfficeReady: boolean;
  isExcel: boolean;
  hostInfo: {
    host: string;
    platform: string;
  } | null;
}

export const OfficeContext = createContext<OfficeContextType | undefined>(undefined);

interface OfficeProviderProps {
  children: ReactNode;
}

export const OfficeProvider: React.FC<OfficeProviderProps> = ({ children }) => {
  const [isOfficeReady, setIsOfficeReady] = useState<boolean>(false);
  const [isExcel, setIsExcel] = useState<boolean>(false);
  const [hostInfo, setHostInfo] = useState<{
    host: string;
    platform: string;
  } | null>(null);

  useEffect(() => {
    if (typeof Office !== "undefined") {
      Office.onReady((info) => {
        setIsOfficeReady(true);
        setIsExcel(info.host === Office.HostType.Excel);
        setHostInfo({
          host: info.host?.toString() ?? null,
          platform: info.platform?.toString() ?? null,
        });
      });
    } else {
      setIsOfficeReady(false);
      setIsExcel(false);
      setHostInfo(null);
    }
  }, []);

  const value: OfficeContextType = {
    isOfficeReady,
    isExcel,
    hostInfo,
  };

  return <OfficeContext.Provider value={value}>{children}</OfficeContext.Provider>;
};
