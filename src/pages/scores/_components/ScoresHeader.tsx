import AddPlayer from "@/components/custom/AddPlayer";
import { ClearAll } from "@/components/custom/ClearAll";
import SidebarTrigger from "@/components/custom/SidebarTrigger";

const ScoresHeader = () => {
    return (
        <section className="relative mt-4 flex w-full items-center px-4">
            <SidebarTrigger className="absolute top-1/2 -translate-y-1/2" />
            <h3 className="pl-8 font-display text-2xl font-semibold text-foreground">
                Scores
            </h3>
            <div className="ms-auto gap-2 flex w-fit align-middle">
                <ClearAll />
                <AddPlayer />
            </div>
        </section>
    );
};

export default ScoresHeader;