import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "./hooks/redux";
import ReactGa from "react-ga";
import LeaderboardPage from "./pages/leaderboard";
import ScoresPage from "./pages/scores";

export default function App() {
    const showLeaderBoard = useAppSelector(
        (state) => state.settings.showLeaderBoard
    );
    ReactGa.pageview("/");

    return (
        <main className="flex min-h-screen w-screen overflow-hidden bg-secondary">
            <AnimatePresence>
                {showLeaderBoard && <LeaderboardPage />}
            </AnimatePresence>
            <ScoresPage />
        </main>
    );
}
