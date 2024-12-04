-- Up Migration
create table tokens (
    id serial primary key,
    token text default gen_random_uuid() not null unique,
    user_id integer not null references users
);
-- Down Migration
drop table tokens;
