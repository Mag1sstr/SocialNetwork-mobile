import { pool } from "../db/pool.js";

const PUBLIC_USER_FIELDS = `
  id,
  username,
  email,
  avatar_url AS "avatarUrl",
  bio,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

// GET /api/users/me
export async function getMyProfile(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT ${PUBLIC_USER_FIELDS}
       FROM users
       WHERE id = $1`,
      [req.userId],
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/users/me
export async function updateMyProfile(req, res, next) {
  try {
    const { username, email, password_hash, id, ...body } = req.body ?? {};

    // Разрешаем менять только эти поля.
    const allowedFields = ["bio", "avatarUrl"];
    const keys = Object.keys(body);

    if (keys.length === 0 || keys.some((key) => !allowedFields.includes(key))) {
      return res.status(400).json({
        message: "Можно изменить только bio и avatarUrl",
      });
    }

    let bio = null;
    let avatarUrl = null;

    if ("bio" in body) {
      if (typeof body.bio !== "string" || body.bio.length > 500) {
        return res.status(400).json({
          message: "Описание должно содержать не более 500 символов",
        });
      }

      bio = body.bio.trim();
    }

    if ("avatarUrl" in body) {
      if (
        body.avatarUrl !== null &&
        body.avatarUrl !== "" &&
        (typeof body.avatarUrl !== "string" ||
          body.avatarUrl.length > 2048 ||
          !/^https?:\/\/\S+$/i.test(body.avatarUrl))
      ) {
        return res.status(400).json({
          message: "Укажите корректный URL аватара",
        });
      }

      avatarUrl = body.avatarUrl || null;
    }

    const result = await pool.query(
      `UPDATE users
       SET
         bio = CASE WHEN $2::boolean THEN $3 ELSE bio END,
         avatar_url = CASE WHEN $4::boolean THEN $5 ELSE avatar_url END,
         updated_at = NOW()
       WHERE id = $1
       RETURNING ${PUBLIC_USER_FIELDS}`,
      [req.userId, "bio" in body, bio, "avatarUrl" in body, avatarUrl],
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    return res.json({
      message: "Профиль обновлён",
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/users/search?q=daniil&page=1&limit=20
export async function searchUsers(req, res, next) {
  try {
    const q =
      typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";

    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 20),
    );
    const offset = (page - 1) * limit;

    if (q.length > 50) {
      return res.status(400).json({
        message: "Поисковый запрос слишком длинный",
      });
    }

    if (!q) {
      return res.json({
        users: [],
        page,
        limit,
      });
    }

    const result = await pool.query(
      `SELECT
         id,
         username,
         avatar_url AS "avatarUrl",
         bio
       FROM users
       WHERE username LIKE $1
         AND id <> $2
       ORDER BY username
       LIMIT $3 OFFSET $4`,
      [`%${q}%`, req.userId, limit, offset],
    );

    return res.json({
      users: result.rows,
      page,
      limit,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/users/:id
export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    // BIGINT приходит из PostgreSQL как строка.
    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        message: "Некорректный ID пользователя",
      });
    }

    const result = await pool.query(
      `SELECT
         id,
         username,
         avatar_url AS "avatarUrl",
         bio,
         created_at AS "createdAt"
       FROM users
       WHERE id = $1`,
      [id],
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        username,
        avatar_url AS "avatarUrl",
        bio,
        created_at AS "createdAt"
      FROM users
      ORDER BY created_at DESC
    `);

    res.json({ users: rows });
  } catch (error) {
    next(error);
  }
}
