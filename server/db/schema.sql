
CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    bio VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT posts_content_not_empty
        CHECK (LENGTH(TRIM(content)) > 0)
);

CREATE TABLE IF NOT EXISTS chats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type VARCHAR(10) NOT NULL DEFAULT 'direct'
        CHECK (type IN ('direct', 'group')),
    title VARCHAR(100),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_members (
    chat_id BIGINT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    chat_id BIGINT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    edited_at TIMESTAMPTZ,

    CONSTRAINT messages_content_not_empty
        CHECK (LENGTH(TRIM(content)) > 0)
);

-- Посты конкретного пользователя и общая лента
CREATE INDEX IF NOT EXISTS idx_posts_user_created
    ON posts(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_created
    ON posts(created_at DESC);

-- Быстрый поиск чатов пользователя
CREATE INDEX IF NOT EXISTS idx_chat_members_user
    ON chat_members(user_id, chat_id);

-- Сообщения внутри чата в хронологическом порядке
CREATE INDEX IF NOT EXISTS idx_messages_chat_created
    ON messages(chat_id, created_at DESC);
