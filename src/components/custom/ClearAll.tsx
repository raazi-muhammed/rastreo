import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { deleteAllScores } from "@/store/features/scoreSlice";
import { ListX } from "lucide-react";

export function ClearAll() {
    const dispatch = useAppDispatch();

    function handleClearAll() {
        dispatch(deleteAllScores());
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="my-auto ms-auto">
                    <ListX size="1em" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Clear all scores</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClearAll}
                        className="bg-destructive">
                        Clear all
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
