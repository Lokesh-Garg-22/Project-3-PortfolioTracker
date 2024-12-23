DROP TABLE IF EXISTS "users";

CREATE SEQUENCE IF NOT EXISTS users_id_seq MINVALUE 0;

CREATE TABLE
    "users" (
        "id" bigint DEFAULT nextval ('users_id_seq') NOT NULL,
        "name" text,
        "username" text NOT NULL,
        "password" text NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );