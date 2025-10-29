// utils/session.ts
export function makeRandomSessionId(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++)
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

export function isValidSessionId(value: string) {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length >= 6 && trimmed.length <= 20;
}
