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

CREATE TABLE public.botparticipants
(
    message_id VARCHAR(30),
    user_id VARCHAR(30),
    guild_id VARCHAR(30),
    participation VARCHAR(20)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.botreactionmessage
    OWNER to shinytsv;

ALTER TABLE public.botparticipants
    ADD CONSTRAINT participant_pkey PRIMARY KEY (message_id, user_id, guild_id);
