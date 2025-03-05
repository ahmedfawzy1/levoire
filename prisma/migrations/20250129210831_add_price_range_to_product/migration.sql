/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "maxPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "minPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
