/*
  Warnings:

  - The `encodedImage` column on the `Pedidos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Pedidos] DROP COLUMN [encodedImage];
ALTER TABLE [dbo].[Pedidos] ADD [encodedImage] VARBINARY(max);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
