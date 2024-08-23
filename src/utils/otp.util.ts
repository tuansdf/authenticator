import * as OTPAuth from "otpauth";

export const createOtp = (
  secret: string,
): {
  generateToken: () => string;
  getRemainingTime: () => number;
  period: number;
} => {
  let totp: OTPAuth.TOTP;
  try {
    if (secret.startsWith(`otpauth://totp`)) {
      totp = OTPAuth.URI.parse(secret) as OTPAuth.TOTP;
    } else {
      totp = new OTPAuth.TOTP({
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret,
      });
    }
  } catch {
    totp = new OTPAuth.TOTP({
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret,
    });
  }
  return {
    generateToken: () => totp.generate(),
    getRemainingTime: () => {
      return totp.period - (Math.floor(Date.now() / 1000) % totp.period);
    },
    period: totp.period,
  };
};
