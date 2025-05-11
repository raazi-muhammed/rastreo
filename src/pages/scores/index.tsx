import { Separator } from "@/components/ui/separator";
import AddPlayer from "@/components/custom/AddPlayer";
import { useAppSelector } from "@/hooks/redux";
import NumberOfGameIndex from "./_components/NumberOfGameIndex";
import ScoresHeader from "./_components/ScoresHeader";
import ScoresTable from "./_components/ScoresTable";
import MessageTemplate from "@/components/template/MessageTemplate";

export default function ScoresPage() {
    const players = useAppSelector((state) => state.players);
    const showLeaderBoard = useAppSelector(
        (state) => state.settings.showLeaderBoard
    );
    const isFitEveryoneOn = useAppSelector(
        (state) => state.settings.isFitEveryoneOn
    );

    return (
        <section
            className={`h-screen ${
                showLeaderBoard ? "w-[calc(100vw-20rem)]" : "w-[100vw]"
            } `}>
            <ScoresHeader />
            <Separator className="my-2" />
            {players.length !== 0 ? (
                <div className="h-screen w-full overflow-auto px-2 pb-44">
                    <section
                        className={`flex gap-1 text-primary min-w-full ${
                            isFitEveryoneOn ? "" : "w-max"
                        }`}>
                        <NumberOfGameIndex />
                        <ScoresTable />
                    </section>
                </div>
            ) : (
                <>
                    <MessageTemplate
                        className="mt-24"
                        title="No player yet"
                        description="Add a player to start tracking">
                        <AddPlayer variant="lg" />
                    </MessageTemplate>
                </>
            )}
        </section>
    );
}
