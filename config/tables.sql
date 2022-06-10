CREATE TABLE "users" (
   "id" SERIAL PRIMARY KEY,
   "name" TEXT NOT NULL,
   "email" TEXT NOT NULL UNIQUE
   "password" TEXT NOT NULL
)

CREATE TABLE "sessions" (
   "id" SERIAL PRIMARY KEY,
   "token" TEXT NOT NULL UNIQUE,
   "userId" INTEGER NOT NULL
)

CREATE TABLE "shortsUrls" (
   "id" SERIAL PRIMARY KEY,
   "url" TEXT NOT NULL,
   "userId" INTEGER NOT NULL
   "views" INTEGER NOT NULL DEFAULT 0
)

-- --------------------------------------------------
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "shortsUrls" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"views" integer NOT NULL DEFAULT 0,
	"shortUrl" TEXT NOT NULL,
	CONSTRAINT "shortsUrls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "shortsUrls" ADD CONSTRAINT "shortsUrls_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");