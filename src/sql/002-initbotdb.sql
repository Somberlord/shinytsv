CREATE TABLE public.botreactionmessage
(
    id SERIAL PRIMARY KEY,
    message_id VARCHAR(30),
    channel_id VARCHAR(30),
    guild_id VARCHAR(30)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.botreactionmessage
    OWNER to shinytsv;
