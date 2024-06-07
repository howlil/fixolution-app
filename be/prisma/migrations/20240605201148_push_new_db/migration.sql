-- CreateEnum
CREATE TYPE "status" AS ENUM ('Pending', 'Diterima', 'Ditolak');

-- CreateEnum
CREATE TYPE "statusBengkel" AS ENUM ('Aktif', 'TidakAktif');

-- CreateTable
CREATE TABLE "superadmin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "superadmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bengkel" (
    "id" TEXT NOT NULL,
    "namaBengkel" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "status" "statusBengkel" NOT NULL,
    "gmapsLink" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bengkel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foto" (
    "id" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "bengkelId" TEXT NOT NULL,

    CONSTRAINT "foto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "noHp" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "kontak" TEXT NOT NULL,
    "bengkel_id" TEXT NOT NULL,

    CONSTRAINT "layanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sukucadang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "stok" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sukucadang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_harga" DOUBLE PRECISION NOT NULL,
    "bukti_pembayaran" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Pending',
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksiSukucadang" (
    "id" TEXT NOT NULL,
    "transaksi_id" TEXT NOT NULL,
    "sukucadang_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "transaksiSukucadang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicetogo" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "kontak" TEXT NOT NULL,

    CONSTRAINT "servicetogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "bengkel_id" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "admin_id" TEXT,
    "bengkel_id" TEXT,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicetogoRequest" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "gmapsLink" TEXT,
    "deskripsi" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servicetogoRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superadmin_username_key" ON "superadmin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "bengkel_username_key" ON "bengkel"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "transaksiSukucadang_transaksi_id_sukucadang_id_key" ON "transaksiSukucadang"("transaksi_id", "sukucadang_id");

-- AddForeignKey
ALTER TABLE "foto" ADD CONSTRAINT "foto_bengkelId_fkey" FOREIGN KEY ("bengkelId") REFERENCES "bengkel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layanan" ADD CONSTRAINT "layanan_bengkel_id_fkey" FOREIGN KEY ("bengkel_id") REFERENCES "bengkel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiSukucadang" ADD CONSTRAINT "transaksiSukucadang_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiSukucadang" ADD CONSTRAINT "transaksiSukucadang_sukucadang_id_fkey" FOREIGN KEY ("sukucadang_id") REFERENCES "sukucadang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_bengkel_id_fkey" FOREIGN KEY ("bengkel_id") REFERENCES "bengkel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "superadmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_bengkel_id_fkey" FOREIGN KEY ("bengkel_id") REFERENCES "bengkel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicetogoRequest" ADD CONSTRAINT "servicetogoRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
