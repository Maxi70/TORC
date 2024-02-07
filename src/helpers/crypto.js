import SHA256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

function bufferToString(buffer) {
  const CHARSET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const state = [];
  for (let i = 0; i < buffer.byteLength; i += 1) {
    const index = buffer[i] % CHARSET.length;
    state.push(CHARSET[index]);
  }
  return state.join("");
}

function base64URL(str) {
  return str
    .toString(Base64)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function generateRandom(size) {
  const CHARSET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const buffer = new Uint8Array(size);

  for (let i = 0; i < size; i += 1) {
    // eslint-disable-next-line no-bitwise
    buffer[i] = (Math.random() * CHARSET.length) | 0;
  }

  return bufferToString(buffer);
}

export function generateChallenge(code) {
  return base64URL(SHA256(code));
}
