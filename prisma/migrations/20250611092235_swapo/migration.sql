/*
  Warnings:

  - Added the required column `projectId` to the `MpesaTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN "paybill" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MpesaTransaction" (
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
    "updatedAt" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL
);
INSERT INTO "new_MpesaTransaction" ("amount", "checkoutRequestId", "createdAt", "id", "merchantRequestId", "mpesaReceiptNumber", "phoneNumber", "resultCode", "resultDesc", "transactionDate", "updatedAt") SELECT "amount", "checkoutRequestId", "createdAt", "id", "merchantRequestId", "mpesaReceiptNumber", "phoneNumber", "resultCode", "resultDesc", "transactionDate", "updatedAt" FROM "MpesaTransaction";
DROP TABLE "MpesaTransaction";
ALTER TABLE "new_MpesaTransaction" RENAME TO "MpesaTransaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
