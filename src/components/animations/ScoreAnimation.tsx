import { motion } from "framer-motion";
import { ReactNode } from "react";

const ScoreAnimation = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{
                scale: 0.7,
                height: 0,
            }}
            animate={{
                scale: 1,
                height: "auto",
            }}
            exit={{
                opacity: 0,
                scale: 0,
                height: 0,
            }}
            whileHover={{
                scale: 1.05,
            }}>
            {children}
        </motion.div>
    );
};

export default ScoreAnimation;
