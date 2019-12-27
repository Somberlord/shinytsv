CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    site VARCHAR(30),
    nbwhip integer NOT NULL DEFAULT 0,
    nbwarning integer NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'En Cours'::varchar,
    friendcode text COLLATE pg_catalog."default",
    note text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to shinytsv;
