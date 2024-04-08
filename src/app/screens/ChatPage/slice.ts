import { createSlice } from "@reduxjs/toolkit";
import { ChatPageState } from "../../../types/screen";

const initialState: ChatPageState = {
    findMyChats: []
};

const chatPageSlice = createSlice({
    name: "chatPage",
    initialState,
    reducers: {
        setFindMyChats: (state, action) => {
            state.findMyChats = action.payload;
        }
    }
});

export const { setFindMyChats } = chatPageSlice.actions;

const ChatPageReducer = chatPageSlice.reducer;
export default ChatPageReducer;