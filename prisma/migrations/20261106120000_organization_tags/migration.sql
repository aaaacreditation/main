-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
