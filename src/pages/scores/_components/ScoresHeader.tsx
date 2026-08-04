import AddPlayer from "@/components/custom/AddPlayer";
import { ClearAll } from "@/components/custom/ClearAll";
import SidebarTrigger from "@/components/custom/SidebarTrigger";

const ScoresHeader = () => {
    return (
        <section className="mt-4 flex w-full items-center gap-4 px-8">
            <SidebarTrigger />
            <h3 className="text-2xl font-semibold text-primary">Scores</h3>
            <div className="ms-auto gap-2 flex w-fit align-middle">
                <ClearAll />
                <AddPlayer />
            </div>
        </section>
    );
};

export default ScoresHeader;
