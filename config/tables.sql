CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
) WITH ( 
  OIDS=FALSE
);

CREATE TABLE "shortsUrls" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"url" TEXT NOT NULL,
	"userId" INTEGER NOT NULL,
	"views" INTEGER NOT NULL DEFAULT 0,
	"shortUrl" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
) WITH (
  OIDS=FALSE
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"userId" INTEGER NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
) WITH (
  OIDS=FALSE
);

ALTER TABLE "shortsUrls" ADD CONSTRAINT "shortsUrls_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
