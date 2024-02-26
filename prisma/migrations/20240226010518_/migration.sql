BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Pedidos] ALTER COLUMN [username] VARCHAR(50) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
