import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes: ["/", "/receipt", "/event", "/api/user"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
