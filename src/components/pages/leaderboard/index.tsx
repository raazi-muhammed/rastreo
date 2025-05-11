import LeaderBoard from "@/components/custom/LeaderBoard";
import { setShowLeaderBoard } from "@/store/features/settingsSlice";
import { motion } from "framer-motion";
import { PanelLeftClose } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";

const LeaderboardPage = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="relative">
            <PanelLeftClose
                onClick={() => dispatch(setShowLeaderBoard(false))}
                size="1.2em"
                className="absolute right-4 top-4 my-auto ms-auto text-primary"
            />
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{
                    x: -300,
                    position: "absolute",
                }}>
                <LeaderBoard />
            </motion.div>
        </div>
    );
};

export default LeaderboardPage;
