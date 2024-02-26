/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNumber]` on the table `Pedidos` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Pedidos] ADD CONSTRAINT [Pedidos_invoiceNumber_key] UNIQUE NONCLUSTERED ([invoiceNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
