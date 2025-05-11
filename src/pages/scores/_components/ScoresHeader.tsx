import AddPlayer from "@/components/custom/AddPlayer";
import { ClearAll } from "@/components/custom/ClearAll";
import { useAppSelector } from "@/hooks/redux";
import { useAppDispatch } from "@/hooks/redux";
import { setShowLeaderBoard } from "@/store/features/settingsSlice";
import { PanelRightClose } from "lucide-react";

const ScoresHeader = () => {
    const dispatch = useAppDispatch();
    const showLeaderBoard = useAppSelector(
        (state) => state.settings.showLeaderBoard
    );
    return (
        <section className="mt-8 flex w-full gap-4 px-8">
            {showLeaderBoard ? null : (
                <PanelRightClose
                    onClick={() => dispatch(setShowLeaderBoard(true))}
                    className="my-auto text-primary"
                />
            )}
            <h3 className="text-3xl font-semibold text-primary">Scores</h3>
            <div className="ms-auto gap-2 flex w-fit align-middle">
                <ClearAll />
                <AddPlayer />
            </div>
        </section>
    );
};

export default ScoresHeader;
