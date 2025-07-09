-- CreateTable
CREATE TABLE "Allboy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boyName" TEXT NOT NULL,

    CONSTRAINT "Allboy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllImg" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boyId" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,

    CONSTRAINT "AllImg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AllImg" ADD CONSTRAINT "AllImg_boyId_fkey" FOREIGN KEY ("boyId") REFERENCES "Allboy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
