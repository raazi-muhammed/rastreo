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
import { UserRoundPlus as AddPersonIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export default function AddPlayer({
    handleAddPerson,
    variant,
}: {
    variant?: "default" | "lg";
    handleAddPerson: (name: string) => void;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    });
    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleAddPerson(data.username);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="min-w-24">
                {variant ? (
                    <Button
                        className="mx-auto my-auto flex size-16 shadow-md"
                        size="icon"
                        onClick={() => {
                            form.reset();
                            form.setFocus("username");
                        }}>
                        <AddPersonIcon size="1.35em" />
                    </Button>
                ) : (
                    <Button
                        className="mx-auto my-auto flex shadow-md"
                        variant="default"
                        onClick={() => {
                            form.reset();
                            form.setFocus("username");
                        }}>
                        <AddPersonIcon size="1.35em" className="me-2" />
                        Add
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-screen flex h-svh w-full flex-col justify-center bg-white sm:h-fit sm:max-w-lg">
                <Form {...form}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add an player</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter player name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit">
                                    <AddPersonIcon
                                        size="1.25em"
                                        className="me-1"
                                    />
                                    Add person
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
