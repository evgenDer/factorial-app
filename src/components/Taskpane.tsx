import React, { useState, useEffect } from "react";
import {
  RadioGroup,
  Radio,
  Label,
  Card,
  CardHeader,
  CardFooter,
  Button,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import { useOfficeStorage } from "../hooks/useOfficeStorage";
import { ExcelUtils } from "../utils/excelUtils";
import { Orientation } from "../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    borderRadius: "12px",
    boxShadow: tokens.shadow2,
    padding: "12px",
  },
  header: {
    marginBottom: "8px",
  },
  footer: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "flex-end",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    marginTop: "8px",
  },
});

export const TaskPane = () => {
  const styles = useStyles();
  const [orientation, setOrientation] = useOfficeStorage("orientation", "row");
  const [error, setError] = useState<string | null>(null);

  const toggleOrientation = async (value: Orientation) => {
    try {
      setError(null);
      await setOrientation(value);
      await ExcelUtils.triggerRecalculation();
    } catch (err) {
      setError("Failed to save orientation setting");
      console.error("Error saving orientation:", err);
    }
  };

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.header}
          header={<Label weight="semibold">Output orientation</Label>}
        />
        <RadioGroup
          value={orientation}
          onChange={(_, data) => toggleOrientation(data.value as Orientation)}
        >
          <Radio value="row" label="Row" />
          <Radio value="column" label="Column" />
        </RadioGroup>

        {error && <Text className={styles.errorText}>{error}</Text>}

        <CardFooter className={styles.footer}>
          <Button
            appearance="primary"
            onClick={() =>
              toggleOrientation(
                orientation === Orientation.Row ? Orientation.Column : Orientation.Row
              )
            }
          >
            Change orientation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
