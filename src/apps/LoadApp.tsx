import { lazy, Suspense } from "react";
import { useAuthContext } from "@context/AuthContext";
import AuthRouter from "@routes/AuthRouter";

const DefaultApp = lazy(() => import("@apps/App"));

export default function LoadApp() {
    const { state } = useAuthContext();

    const { isLoggedIn } = state;

    if (!isLoggedIn) return <AuthRouter />;
    else {
        return <DefaultApp />;
    }
}
