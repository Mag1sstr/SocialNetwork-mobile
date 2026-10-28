import bcrypt from "bcryptjs";
import { pool } from "../db/pool.js";
import { createToken, setAuthCookie, clearAuthCookie } from "../utils/token.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PUBLIC_USER_FIELDS = `
  id,
  username,
  email,
  avatar_url AS "avatarUrl",
  bio,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body ?? {};

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Укажите никнейм, email и пароль",
      });
    }

    const cleanUsername = normalizeUsername(username);
    const cleanEmail = normalizeEmail(email);

    if (!/^[a-z0-9_]{3,50}$/.test(cleanUsername)) {
      return res.status(400).json({
        message: "Никнейм: от 3 до 50 символов, латиница, цифры и _",
      });
    }

    if (cleanEmail.length > 255 || !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        message: "Укажите корректный email",
      });
    }

    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({
        message: "Пароль должен содержать от 8 до 72 символов",
      });
    }

    // Хешируем пароль до записи в базу.
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING ${PUBLIC_USER_FIELDS}`,
      [cleanUsername, cleanEmail, passwordHash],
    );

    const user = result.rows[0];
    const token = createToken(user.id);

    setAuthCookie(res, token);

    return res.status(201).json({
      message: "Регистрация прошла успешно",
      user,
    });
  } catch (error) {
    // PostgreSQL: нарушение UNIQUE.
    if (error.code === "23505") {
      if (error.constraint === "users_username_key") {
        return res.status(409).json({
          message: "Этот никнейм уже занят",
          code: "USERNAME_TAKEN",
        });
      }

      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          message: "Этот email уже зарегистрирован",
          code: "EMAIL_TAKEN",
        });
      }

      return res.status(409).json({
        message: "Пользователь с такими данными уже существует",
        code: "DUPLICATE_USER",
      });
    }

    next(error);
  }
}

// POST /api/auth/login
// Можно войти по никнейму ИЛИ по email.
export async function login(req, res, next) {
  try {
    const { login: loginValue, password } = req.body ?? {};

    if (
      typeof loginValue !== "string" ||
      typeof password !== "string" ||
      !loginValue.trim() ||
      password.length === 0 ||
      password.length > 72
    ) {
      return res.status(400).json({
        message: "Укажите никнейм или email и пароль",
      });
    }

    const identifier = loginValue.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, username, email, password_hash
       FROM users
       WHERE username = $1 OR email = $1
       LIMIT 1`,
      [identifier],
    );

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        message: "Неверный никнейм/email или пароль",
        code: "INVALID_CREDENTIALS",
      });
    }

    const token = createToken(user.id);
    setAuthCookie(res, token);

    const profile = await pool.query(
      `SELECT ${PUBLIC_USER_FIELDS}
       FROM users
       WHERE id = $1`,
      [user.id],
    );

    return res.json({
      message: "Вход выполнен",
      user: profile.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/logout
export function logout(_req, res) {
  clearAuthCookie(res);

  return res.json({
    message: "Вы вышли из аккаунта",
  });
}

// GET /api/auth/me
export async function getMe(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT ${PUBLIC_USER_FIELDS}
       FROM users
       WHERE id = $1`,
      [req.userId],
    );

    if (!result.rows[0]) {
      clearAuthCookie(res);

      return res.status(401).json({
        message: "Аккаунт не найден",
        code: "UNAUTHORIZED",
      });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
}
