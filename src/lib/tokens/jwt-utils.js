import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const DEFAULT_ACCESS_TOKEN_EXPIRY = "1d";
const DEFAULT_REFRESH_TOKEN_EXPIRY = "7d";

export function createAccessToken(
  payload,
  secret,
  expiresIn = DEFAULT_ACCESS_TOKEN_EXPIRY
) {
  return jwt.sign(
    {
      ...payload,
      type: "access",
      jti: randomUUID(),
    },
    secret,
    {
      algorithm: "HS256",
      expiresIn,
    }
  );
}

export function createRefreshToken(
  payload,
  secret,
  expiresIn = DEFAULT_REFRESH_TOKEN_EXPIRY
) {
  return jwt.sign(
    {
      ...payload,
      type: "refresh",
      jti: randomUUID(),
    },
    secret,
    {
      algorithm: "HS256",
      expiresIn,
    }
  );
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret, {
    algorithms: ["HS256"],
  });
}

export async function rotateRefreshToken(
  oldToken,
  storedToken,
  secret,
  expiresIn = DEFAULT_REFRESH_TOKEN_EXPIRY
) {
  const decoded = jwt.verify(oldToken, secret, {
    algorithms: ["HS256"],
  });

  if (decoded.type !== "refresh") throw new Error("Not a refresh token");
  if (storedToken !== oldToken) throw new Error("Invalid refresh token");

  const accessToken = createAccessToken(
    {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    },
    secret
  );

  const refreshToken = createRefreshToken(
    {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    },
    secret,
    expiresIn
  );

  return { accessToken, refreshToken };
}
