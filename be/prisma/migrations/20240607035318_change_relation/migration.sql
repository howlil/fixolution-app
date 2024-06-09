-- DropForeignKey
ALTER TABLE "foto" DROP CONSTRAINT "foto_bengkelId_fkey";

-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_bengkel_id_fkey";

-- DropForeignKey
ALTER TABLE "layanan" DROP CONSTRAINT "layanan_bengkel_id_fkey";

-- DropForeignKey
ALTER TABLE "servicetogoRequest" DROP CONSTRAINT "servicetogoRequest_user_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_bengkel_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksi" DROP CONSTRAINT "transaksi_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksiSukucadang" DROP CONSTRAINT "transaksiSukucadang_sukucadang_id_fkey";

-- DropForeignKey
ALTER TABLE "transaksiSukucadang" DROP CONSTRAINT "transaksiSukucadang_transaksi_id_fkey";

-- AddForeignKey
ALTER TABLE "foto" ADD CONSTRAINT "foto_bengkelId_fkey" FOREIGN KEY ("bengkelId") REFERENCES "bengkel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layanan" ADD CONSTRAINT "layanan_bengkel_id_fkey" FOREIGN KEY ("bengkel_id") REFERENCES "bengkel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiSukucadang" ADD CONSTRAINT "transaksiSukucadang_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiSukucadang" ADD CONSTRAINT "transaksiSukucadang_sukucadang_id_fkey" FOREIGN KEY ("sukucadang_id") REFERENCES "sukucadang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_bengkel_id_fkey" FOREIGN KEY ("bengkel_id") REFERENCES "bengkel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "superadmin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_bengkel_id_fkey" FOREIGN KEY ("bengkel_id") REFERENCES "bengkel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicetogoRequest" ADD CONSTRAINT "servicetogoRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
