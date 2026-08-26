import { Separator } from "@/components/ui/separator";
import AddPlayer from "@/components/custom/AddPlayer";
import { useAppSelector } from "@/hooks/redux";
import NumberOfGameIndex from "./_components/NumberOfGameIndex";
import ScoresHeader from "./_components/ScoresHeader";
import ScoresTable from "./_components/ScoresTable";
import MessageTemplate from "@/components/template/MessageTemplate";

export default function ScoresPage() {
    const players = useAppSelector((state) => state.players);
    const isFitEveryoneOn = useAppSelector(
        (state) => state.settings.isFitEveryoneOn
    );

    return (
        <section className="flex h-screen w-full flex-col">
            <ScoresHeader />
            <Separator className="my-2 bg-transparent" />
            {players.length !== 0 ? (
                <div className="min-h-0 flex-1 w-full overflow-auto pl-2 pr-4 pb-44">
                    <section
                        className={`flex gap-1 text-foreground min-w-full ${
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
