BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Pedidos] ADD [dueDate] NVARCHAR(1000),
[invoiceNumber] NVARCHAR(1000),
[pago] BIT CONSTRAINT [Pedidos_pago_df] DEFAULT 0,
[payload] NVARCHAR(1000),
[status] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH