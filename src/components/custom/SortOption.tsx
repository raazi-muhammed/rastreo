import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { SortOptions, changeSortOption } from "@/store/features/settingsSlice";
import SettingIconTemplate from "../template/SettingIconTemplate";
export default function SortOption() {
    const settings = useAppSelector((state) => state.settings);
    const { sortOption } = settings;
    const dispatch = useAppDispatch();

    return (
        <>
            <SettingIconTemplate label="Who wins">
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
            </SettingIconTemplate>
        </>
    );
}
