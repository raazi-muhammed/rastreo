import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    REDUX_PERSIST_STORAGE_KEY,
    THEME_STORAGE_KEY,
} from "@/lib/storage-keys";

type Props = {
    children: ReactNode;
};

type State = {
    error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Uncaught error in app tree:", error, info.componentStack);
    }

    handleClearAndReload = () => {
        localStorage.removeItem(REDUX_PERSIST_STORAGE_KEY);
        localStorage.removeItem(THEME_STORAGE_KEY);
        window.location.reload();
    };

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        return (
            <div className="flex min-h-screen w-screen items-center justify-center bg-secondary p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Something went wrong</CardTitle>
                        <CardDescription>
                            The app crashed, most likely because saved data on
                            this device is out of date or corrupted. Clearing
                            local data will reset scores, players, and
                            settings back to a blank slate and reload the
                            app.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <details className="text-xs text-muted-foreground">
                            <summary className="cursor-pointer select-none">
                                Error details
                            </summary>
                            <pre className="mt-2 whitespace-pre-wrap break-words">
                                {error.message}
                            </pre>
                        </details>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button
                            variant="destructive"
                            onClick={this.handleClearAndReload}>
                            Clear local data & reload
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}>
                            Just reload
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}
