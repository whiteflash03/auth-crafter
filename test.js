import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  rotateRefreshToken,
} from "./src/lib/tokens/jwt-utils.js";

async function test() {
  const secret =
    "Qecg3yGbPpCxdgecm1hsxos/lDYnfAxUlE0fyfa3PfMdivsoqwWrMUlas/aFqmdM";

  const user = { id: "user123", role: "admin", email: "admin@example.com" };

  // 1. Create tokens
  const accessToken = createAccessToken(user, secret);
  const refreshToken = createRefreshToken(user, secret);

  console.log("✅ Access Token:", accessToken);
  console.log("🔁 Refresh Token:", refreshToken);

  // 2. Verify access token
  const verified = verifyToken(accessToken, secret);
  console.log("🔍 Verified Token:", verified);

  // 3. Simulate rotation
  const rotated = await rotateRefreshToken(refreshToken, refreshToken, secret);
  console.log("♻️ Rotated Tokens:");
  console.log("   ➤ New Access Token:", rotated.accessToken);
  console.log("   ➤ New Refresh Token:", rotated.refreshToken);
}

test();
