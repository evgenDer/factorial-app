export class ExcelUtils {
  static async triggerRecalculation(): Promise<void> {
    await Excel.run(async (context) => {
      context.workbook.application.calculate(Excel.CalculationType.fullRebuild);
      await context.sync();
    });
  }
}
