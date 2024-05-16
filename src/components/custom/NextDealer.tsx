import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";

export default function NextDealer() {
    const [next, setNext] = useState("raazi");

    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);

    useEffect(() => {
        const maxGamesPlayed = scores.reduce(
            (largestNumberOfGames, individualScores) => {
                if (largestNumberOfGames < individualScores.scores.length) {
                    largestNumberOfGames = individualScores.scores.length;
                }
                return largestNumberOfGames;
            },
            0
        );
        setNext(players[maxGamesPlayed % players.length].name);
    }, [players, scores]);

    return (
        <section>
            <p className="ms-2 text-sm text-primary">Next Dealer</p>
            <section className="flex flex-col justify-between rounded bg-secondary p-3">
                <p className="text-lg">{next}</p>
                <small className="opacity-30">
                    Assumed that order of players is order of dealing
                </small>
            </section>
        </section>
    );
}
