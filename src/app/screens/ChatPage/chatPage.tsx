import "../../../css/chat.css";
import { ChatPageSidebar } from "../../components/sidebars/chat_page_sidebar";
import { useEffect, useState } from "react";
import ChatApiService from "../../apiServices/chatApiService";
import { Chats, ChosenChat } from "../../../types/chat";
import { MemberChats } from "./memberChats";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setSelectedChat } from "./slice";
import { SelectedChat } from "./selectedChat";
import { retrieveSelectedChat } from "./selector";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setSelectedChat: (data: ChosenChat) => dispatch(setSelectedChat(data))
});

// REDUX SELECTOR
const chosenChatRetriever = createSelector(
    retrieveSelectedChat, 
    (selectedChat) => ({
        selectedChat
    })
);

export function ChatPage() {
    const history = useHistory();
    const [chats, setChats] = useState<Chats[]>();
    const { setSelectedChat } = actionDispatch(useDispatch());
    const { selectedChat } = useSelector(chosenChatRetriever);

    const handleSelectChat = async (chat_id: any) => {
        try {
            const chatService = new ChatApiService();
            const selectedChat = await chatService.getSelectedChat(chat_id);
            setSelectedChat(selectedChat); 
            history.push(`/chat/${chat_id}`); 
            // console.log("selectedChat::::", selectedChat)
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
    };

    // useEffect(() => {
    //     const chatService = new ChatApiService();
    //     const socket = new WebSocket(`ws://${serverApi}`);

    //     socket.onmessage = async (e: any) => {
    //         const newData = JSON.parse(e.data);
    //         setChats(newData);
    //     }
    //     const findMyChats = async () => {
    //         try{
    //             const myChats = await chatService.findMyChats();
    //             setChats(myChats);
    //             console.log("myChats", myChats);
    //         } catch(err) {
    //             console.log(" ERROR: findMyChats", err);
    //         }
    //     };

    
    //     findMyChats();
    //     return () => {
    //         socket.close();
    //     }
    // },[]); 

    useEffect(() => {
        const findMyChats = async () => {
            try {
                const chatService = new ChatApiService();
                const myChats = await chatService.findMyChats();
                setChats(myChats);
                console.log("myChats ::", myChats);
            } catch (error) {
                console.error("ERROR handleMemberSelect ::", error);
            }
        };
    
        findMyChats();
    },[]);
    

    return(
        <div>
            <ChatPageSidebar />
                <div className="big_chat_container">
                    <div className="chat_container">

                        <MemberChats 
                            chats={chats}
                            handleSelectChat={handleSelectChat}
                        />

                        <SelectedChat 
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                        
                    </div>
                    
                </div>
        </div>
    )
}