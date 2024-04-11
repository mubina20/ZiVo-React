import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectChatPage = (state: AppRootState) => state.chatPage;

export const retrieveFindMyChats = createSelector(
    selectChatPage,
    (ChatPage) => ChatPage.findMyChats
);
export const retrieveSelectedChat = createSelector(
    selectChatPage,
    (ChatPage) => ChatPage.selectedChat
);