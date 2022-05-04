import cookie from "cookie";

export function parseCookies(req: { headers: { cookie: any } }) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function compareByCreatedAt(
  a: { createdAt?: Date | string },
  b: { createdAt?: Date | string }
): number {
  if (!a.createdAt || !b.createdAt) return 0;

  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}
