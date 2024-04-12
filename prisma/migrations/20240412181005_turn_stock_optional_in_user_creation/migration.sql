-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_stock_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "stock_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
