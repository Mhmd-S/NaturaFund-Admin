import { lazy, Suspense } from "react";
import AuthRouter from "@/routes/AuthRouter";

const DefaultApp = lazy(() => import("@/apps/App"));

export default function LoadApp() {
    const isLoggedIn = true;
    if (!isLoggedIn) return <AuthRouter />;
    else {
        return <DefaultApp />;
    }
}
