-- Up Migration
create table tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id)
);

-- Down Migration
drop table tokens;
