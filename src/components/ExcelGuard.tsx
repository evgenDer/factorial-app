import React from "react";
import { makeStyles, Card, Text, Spinner, tokens } from "@fluentui/react-components";
import { ErrorCircle20Regular } from "@fluentui/react-icons";
import { useOffice } from "../hooks/useOffice";

const useStyles = makeStyles({
  guardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
  },

  guardCard: {
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },

  loadingSpinner: {
    height: "50px",
    marginBottom: tokens.spacingVerticalM,
  },

  icon: {
    height: "50px",
    width: "50px",
    display: "block",
    margin: "0 auto",
    marginBottom: tokens.spacingVerticalM,
  },
  errorIcon: {
    color: tokens.colorPaletteRedForeground1,
  },
});

interface ExcelGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  allowDevelopment?: boolean;
}

export const ExcelGuard: React.FC<ExcelGuardProps> = ({ children }) => {
  const styles = useStyles();
  const { isOfficeReady, isExcel, hostInfo } = useOffice();

  if (!isOfficeReady) {
    return (
      <div className={styles.guardContainer}>
        <Card className={styles.guardCard}>
          <div className={styles.loadingSpinner}>
            <Spinner size="large" />
          </div>
          <Text size={500} weight="semibold">
            Initializing Office...
          </Text>
          <Text size={300}>Please wait while we connect to Office</Text>
        </Card>
      </div>
    );
  }

  if (!isExcel) {
    console.log("run");
    return (
      <div className={styles.guardContainer}>
        <Card className={styles.guardCard}>
          <div>
            <ErrorCircle20Regular
              className={styles.icon}
              primaryFill={tokens.colorPaletteRedForeground1}
            />
          </div>
          <Text size={500} weight="semibold">
            Excel Required
          </Text>
          <Text size={300}>
            This add-in requires Microsoft Excel to function properly.
            {hostInfo.host && (
              <>
                Currently running in {hostInfo.host} ({hostInfo.platform}).
              </>
            )}
          </Text>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
