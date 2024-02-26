BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Credits] (
    [ID] VARCHAR(50) NOT NULL,
    [Credits] INT NOT NULL
);

-- CreateTable
CREATE TABLE [dbo].[CreditsT] (
    [ID] VARCHAR(50) NOT NULL,
    [Credits] INT NOT NULL
);

-- CreateTable
CREATE TABLE [dbo].[ShopItems] (
    [ID] SMALLINT NOT NULL IDENTITY(1,1),
    [CategoryID] SMALLINT NOT NULL,
    [SubCategoryID] SMALLINT NOT NULL,
    [ItemCode] VARCHAR(50) NOT NULL,
    [ItemName] VARCHAR(50) NOT NULL,
    [Price] SMALLINT NOT NULL,
    [ItemImage] VARCHAR(64) NOT NULL
);

-- CreateTable
CREATE TABLE [dbo].[ShopItemsTime] (
    [ID] SMALLINT NOT NULL IDENTITY(1,1),
    [CategoryID] SMALLINT NOT NULL,
    [SubCategoryID] SMALLINT NOT NULL,
    [ItemCode] VARCHAR(50) NOT NULL,
    [ItemName] VARCHAR(50) NOT NULL,
    [Price] SMALLINT NOT NULL,
    [ItemImage] VARCHAR(64) NOT NULL
);

-- CreateTable
CREATE TABLE [dbo].[Pedidos] (
    [id] SMALLINT NOT NULL IDENTITY(1,1),
    [customer] NVARCHAR(1000) NOT NULL,
    [name] VARCHAR(50) NOT NULL,
    [billingType] NVARCHAR(1000),
    [value] NVARCHAR(1000),
    CONSTRAINT [Pedidos_customer_key] UNIQUE NONCLUSTERED ([customer])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
