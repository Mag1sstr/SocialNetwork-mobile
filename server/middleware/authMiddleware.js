import { COOKIE_NAME, verifyToken } from "../utils/token.js";

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      message: "Необходимо войти в аккаунт",
      code: "UNAUTHORIZED",
    });
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;

    next();
  } catch {
    return res.status(401).json({
      message: "Сессия истекла. Войдите снова",
      code: "INVALID_TOKEN",
    });
  }
}
