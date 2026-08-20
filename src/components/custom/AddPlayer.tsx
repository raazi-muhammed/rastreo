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
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserRoundPlusIcon as AddPersonIcon } from "@hugeicons/core-free-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPersons } from "@/store/features/playerSlice";
import { initializePersons } from "@/store/features/scoreSlice";
import { touchPlayersModified } from "@/store/features/playersMetaSlice";
import { v4 as uuidv4 } from "uuid";

const FormSchema = z.object({
    playerNames: z.string().min(2, {
        message: "Enter at least one player name.",
    }),
});

export default function AddPlayer({ variant }: { variant?: "default" | "lg" }) {
    const dispatch = useAppDispatch();
    const isLocked = useAppSelector((state) => state.settings.isLocked);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            playerNames: "",
        },
    });

    function handleAddPersons(namesText: string) {
        const names = namesText
            .split("\n")
            .map((name) => name.trim())
            .filter((name) => name.length >= 2);
        if (names.length === 0) return;

        const newPlayers = names.map((name) => ({ id: uuidv4(), name }));
        dispatch(addPersons(newPlayers));
        dispatch(initializePersons(newPlayers.map((p) => p.id)));
        dispatch(touchPlayersModified());
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleAddPersons(data.playerNames);
        form.reset();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {variant ? (
                    <Button
                        disabled={isLocked}
                        className="mx-auto my-auto flex size-16 shadow-md"
                        size="icon"
                        onClick={() => {
                            form.reset();
                        }}>
                        <HugeiconsIcon icon={AddPersonIcon} size="1.35em" />
                    </Button>
                ) : (
                    <Button
                        disabled={isLocked}
                        className="mx-auto my-auto flex shadow-md"
                        variant="default"
                        onClick={() => {
                            form.reset();
                        }}>
                        <HugeiconsIcon icon={AddPersonIcon} size="1.35em" className="" />
                        <span className="hidden sm:block ms-2">Add</span>
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-screen flex h-svh w-full flex-col justify-center bg-background sm:h-fit sm:max-w-lg">
                <Form {...form}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add players</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="playerNames"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Enter player names, one per line
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={
                                                "Alice\nBob\nCharlie"
                                            }
                                            rows={6}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit">
                                    <HugeiconsIcon
                                        icon={AddPersonIcon}
                                        size="1.25em"
                                        className="me-1"
                                    />
                                    Add players
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
