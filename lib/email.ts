// Consumer mailbox providers. The contact form is for business enquiries, so
// these are rejected in favour of a company domain.
//
// Shared by the client form (instant feedback) and the /api/contact route
// handler (the check that actually counts — the client one is bypassable).
export const personalEmailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "mail.ru",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
  "tutanota.com",
  "tuta.com",
  "fastmail.com",
  "hey.com",
  "rediffmail.com",
  "qq.com",
  "163.com",
  "126.com",
]);

export const workEmailMessage =
  "Please use your work email — we can't accept personal addresses.";

export function isPersonalEmail(value: string) {
  const domain = value.split("@").pop()?.trim().toLowerCase();
  return domain ? personalEmailDomains.has(domain) : false;
}

export function looksLikeEmail(value: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
}
