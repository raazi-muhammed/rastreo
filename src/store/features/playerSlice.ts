import { arrayMove } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PlayerList = {
    id: string;
    name: string;
    hidden?: boolean;
}[];

const initialState: PlayerList = [];

export const counterSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        addPerson: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            const data = action.payload;
            state.push(data);
        },
        addPersons: (
            state,
            action: PayloadAction<{ id: string; name: string }[]>
        ) => {
            state.push(...action.payload);
        },
        setPlayerHidden: (
            state,
            action: PayloadAction<{ id: string; hidden: boolean }>
        ) => {
            const { id, hidden } = action.payload;
            const player = state.find((p) => p.id === id);
            if (player) player.hidden = hidden;
        },
        setAllPlayersHidden: (state, action: PayloadAction<boolean>) => {
            state.forEach((player) => {
                player.hidden = action.payload;
            });
        },
        deleteAllPersons: () => {
            return [];
        },
        editPerson: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            const { id, name } = action.payload;
            state = state.map((p) => {
                if (p.id == id) p.name = name;
                return p;
            });
        },
        deletePerson: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state = state.filter((p) => p.id !== id);
            return state;
        },
        reorderPersons: (
            state,
            action: PayloadAction<{ oldIndex: number; newIndex: number }>
        ) => {
            const { oldIndex, newIndex } = action.payload;
            return arrayMove(state, oldIndex, newIndex);
        },
        setPlayers: (_state, action: PayloadAction<PlayerList>) => {
            return action.payload;
        },
    },
});

export const {
    addPerson,
    addPersons,
    setPlayerHidden,
    setAllPlayersHidden,
    deleteAllPersons,
    editPerson,
    deletePerson,
    reorderPersons,
    setPlayers,
} = counterSlice.actions;

export default counterSlice.reducer;
