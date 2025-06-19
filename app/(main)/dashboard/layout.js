import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
return (
    <div className="px-5">
        <div className="flex items-center justify-between mb-5">
            <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
                Dashboard
            </h1>
        </div>
        <Suspense
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
            <DashboardPage />
        </Suspense>
    </div>
);
}