import React from "react";
import { OfficeProvider } from "../contexts/OfficeContext";
import { CustomThemeProvider } from "../styles/ThemeProvider";
import { ExcelGuard } from "./ExcelGuard";
import { TaskPane } from "./Taskpane";

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <div className="App">
        <OfficeProvider>
          <ExcelGuard>
            <TaskPane />
          </ExcelGuard>
        </OfficeProvider>
      </div>
    </CustomThemeProvider>
  );
};

export default App;
