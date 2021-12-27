/*
  Warnings:

  - You are about to drop the column `acceptedTerms` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" RENAME COLUMN "acceptedTerms" TO "acceptedTermsAt";
ALTER TABLE "User" RENAME COLUMN "emailVerified" TO "emailVerifiedAt";