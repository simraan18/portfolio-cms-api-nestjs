-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "education" TEXT NOT NULL,
    "visaStatus" TEXT,
    "aboutProfile" TEXT NOT NULL,
    "topSkills" TEXT[],
    "roles" TEXT[],

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
