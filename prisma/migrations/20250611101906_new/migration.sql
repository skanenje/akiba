/*
  Warnings:

  - You are about to drop the column `projectId` on the `MpesaTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `paybill` on the `Project` table. All the data in the column will be lost.

*/
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MpesaTransaction" ("amount", "checkoutRequestId", "createdAt", "id", "merchantRequestId", "mpesaReceiptNumber", "phoneNumber", "resultCode", "resultDesc", "transactionDate", "updatedAt") SELECT "amount", "checkoutRequestId", "createdAt", "id", "merchantRequestId", "mpesaReceiptNumber", "phoneNumber", "resultCode", "resultDesc", "transactionDate", "updatedAt" FROM "MpesaTransaction";
DROP TABLE "MpesaTransaction";
ALTER TABLE "new_MpesaTransaction" RENAME TO "MpesaTransaction";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL DEFAULT 0,
    "donations" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Project" ("active", "amount", "category", "description", "donations", "id", "name") SELECT "active", "amount", "category", "description", "donations", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
