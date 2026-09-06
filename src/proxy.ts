import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// eslint-disable-next-line unicorn/prefer-string-raw
export const config = { matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)" };
