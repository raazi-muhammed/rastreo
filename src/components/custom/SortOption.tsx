import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { SortOptions, changeSortOption } from "@/store/features/settingsSlice";

export default function SortOption() {
    const settings = useAppSelector((state) => state.settings);
    const { sortOption } = settings;
    const dispatch = useAppDispatch();

    return (
        <>
            <section className="flex justify-between gap-4 rounded bg-secondary px-3 py-2">
                <p className="my-auto">Who wins</p>
                <Select
                    defaultValue={sortOption}
                    onValueChange={(value) => {
                        dispatch(changeSortOption(value as SortOptions));
                    }}>
                    <SelectTrigger className="-me-1 h-8 w-fit bg-secondary">
                        <SelectValue placeholder="none" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={SortOptions.TO_HIGH}>
                            Lowest
                        </SelectItem>
                        <SelectItem value={SortOptions.TO_LOW}>
                            Highest
                        </SelectItem>
                    </SelectContent>
                </Select>
            </section>
        </>
    );
}
