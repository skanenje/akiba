-- CreateTable
CREATE TABLE "MpesaTransaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "checkoutRequestId" TEXT,
    "merchantRequestId" TEXT,
    "resultCode" INTEGER,
    "resultDesc" TEXT,
    "transactionDate" DATETIME,
    "mpesaReceiptNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
