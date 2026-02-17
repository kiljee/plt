export const SERBIAN_MOBILE_PREFIXES = ["60", "61", "62", "63", "64", "65", "66", "68", "69", "677", "678"] as const;

const DIGITS_ONLY = /\D/g;

export const formatSerbianMobile = (value: string): string => {
  const digits = value.replace(DIGITS_ONLY, "");
  if (digits.length === 0) return "";
  if (digits.startsWith("381")) {
    const rest = digits.slice(3);
    return formatDigits(rest);
  }
  if (digits.startsWith("0")) {
    return formatDigits(digits.slice(1));
  }
  return formatDigits(digits);
};

const formatDigits = (digits: string): string => {
  if (digits.length === 0) return "";
  const is677or678 = digits.startsWith("677") || digits.startsWith("678");
  if (is677or678) {
    if (digits.length <= 3) return `0${digits}`;
    if (digits.length <= 6) return `0${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  if (digits.length <= 2) return `0${digits}`;
  if (digits.length <= 5) return `0${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 8) return `0${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  return `0${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)}`;
};

export const parseSerbianMobile = (value: string): string => {
  const digits = value.replace(DIGITS_ONLY, "");
  if (digits.startsWith("381")) return digits.slice(3);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
};

export const isValidSerbianMobile = (value: string): boolean => {
  const digits = parseSerbianMobile(value);
  if (digits.length !== 9) return false;
  if (!digits.startsWith("6")) return false;
  const prefix2 = digits.slice(0, 2);
  const prefix3 = digits.slice(0, 3);
  if (prefix3 === "677" || prefix3 === "678") return true;
  return SERBIAN_MOBILE_PREFIXES.includes(prefix2 as (typeof SERBIAN_MOBILE_PREFIXES)[number]);
};
