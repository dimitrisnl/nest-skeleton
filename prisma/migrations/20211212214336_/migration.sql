/*
  Warnings:

  - Added the required column `interval` to the `BillingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intervalCount` to the `BillingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membershipLimit` to the `BillingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trialDays` to the `BillingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanInterval" AS ENUM ('MONTH', 'YEAR');

-- AlterTable
ALTER TABLE "BillingPlan" ADD COLUMN     "interval" "PlanInterval" NOT NULL,
ADD COLUMN     "intervalCount" INTEGER NOT NULL,
ADD COLUMN     "membershipLimit" INTEGER NOT NULL,
ADD COLUMN     "trialDays" INTEGER NOT NULL;
