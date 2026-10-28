import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret || secret.length < 32) {
  throw new Error("JWT_SECRET должен содержать минимум 32 символа");
}

export const COOKIE_NAME = "social_token";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: COOKIE_MAX_AGE,
};

export function createToken(userId) {
  return jwt.sign({ userId: String(userId) }, secret, {
    expiresIn: "7d",
    issuer: "social-network",
    audience: "social-network-client",
  });
}

export function verifyToken(token) {
  const payload = jwt.verify(token, secret, {
    issuer: "social-network",
    audience: "social-network-client",
  });

  if (typeof payload === "string" || typeof payload.userId !== "string") {
    throw new Error("Некорректный токен");
  }

  return payload;
}

export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, cookieOptions);
}

export function clearAuthCookie(res) {
  const { maxAge, ...options } = cookieOptions;
  res.clearCookie(COOKIE_NAME, options);
}
