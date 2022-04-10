import cookie from "cookie";

export function parseCookies(req: { headers: { cookie: any; }; }) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
