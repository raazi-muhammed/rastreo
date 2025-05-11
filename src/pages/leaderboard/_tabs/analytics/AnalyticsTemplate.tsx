import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

const AnalyticsTemplate = ({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) => {
    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    <p className="text-lg font-semibold mb-2 flex align-middle gap-1">
                        {title}
                        <ChevronRight className="my-auto" size={20} />
                    </p>
                </DrawerTrigger>
                <DrawerContent className="p-6 max-h-[90vh]">
                    {children}
                </DrawerContent>
            </Drawer>
            {children}
        </>
    );
};

export default AnalyticsTemplate;
