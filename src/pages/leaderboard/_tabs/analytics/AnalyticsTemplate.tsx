import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

const AnalyticsTemplate = ({
    children,
    expanded,
    title,
}: {
    children: ReactNode;
    expanded?: ReactNode;
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
                <DrawerContent className="flex h-[90vh] max-h-[90vh] flex-col p-6">
                    <div className="min-h-0 flex-1">{expanded ?? children}</div>
                </DrawerContent>
            </Drawer>
            {children}
        </>
    );
};

export default AnalyticsTemplate;
