import { createSlice } from "@reduxjs/toolkit";
import { ChatPageState } from "../../../types/screen";

const initialState: ChatPageState = {
    findMyChats: [],
    selectedChat: null
};

const chatPageSlice = createSlice({
    name: "chatPage",
    initialState,
    reducers: {
        setFindMyChats: (state, action) => {
            state.findMyChats = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    }
});

export const { 
    setFindMyChats,
    setSelectedChat
} = chatPageSlice.actions;

const ChatPageReducer = chatPageSlice.reducer;
export default ChatPageReducer;