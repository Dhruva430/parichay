CREATE TABLE
  "users" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "posts" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES users (id),
    content TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    num_likes INT DEFAULT 0,
    num_comments INT DEFAULT 0
  );

CREATE TABLE
  "comments" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    post_id UUID NOT NULL REFERENCES posts (id),
    user_id UUID NOT NULL REFERENCES users (id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "bookmarks" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id),
    post_id UUID NOT NULL REFERENCES posts (id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, post_id)
  );

CREATE TABLE
  "likes" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id),
    post_id UUID NOT NULL REFERENCES posts (id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, post_id)
  );

CREATE TABLE
  "follows" (
    follow_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    follower_id UUID NOT NULL REFERENCES users (id),
    following_id UUID NOT NULL REFERENCES users (id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (follower_id, following_id)
  );