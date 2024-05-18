import axios from "axios";
import { serverApi } from "../../lib/config";
import { Chats, ChosenChat, CreateChat } from "../../types/chat";
import assert from "assert";
import { Definer } from "../../lib/definer";


class ChatApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async findMyChats(){
        try{
            const abortController = new AbortController();
            const signal = abortController.signal;

            const url = "/chat",
                result = await axios.get(this.path + url, { signal, withCredentials: true });
            assert.ok(result, Definer.general_err1);

            const myChats: Chats[] = result.data.data;
            // console.log("myChats::", myChats);

            return myChats;
        } catch (err: any) {
            console.log(`ERROR :: findMyChats ${err.message}`);
            throw err;
        }
    }

    public async getSelectedChat(id: string): Promise<ChosenChat> {
        try {
            const abortController = new AbortController();
            const signal = abortController.signal;
    
            const url = `/chat/${id}`;
            const result = await axios.get(this.path + url, { signal, withCredentials: true });
    
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            // console.log("getSelectedChat DATA ::", result.data.data);
    
            const chat: ChosenChat = result.data.data;
            return chat;
        } catch (err: any) {
            console.log(`ERROR :: getSelectedChat: ${err.message}`);
            throw err;
        }
    };
    

    public async createMessage(data: any) {
        try {
            const abortController = new AbortController();
            const signal = abortController.signal;

            const url = "/chat/message";
            const result = await axios.post(
                this.path + url, 
                data, 
                { signal, withCredentials: true }
            );
            // console.log("data", data);

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);

            // console.log("createMessage STATE ::", result.data.data);
            const message_result = result.data.data;

            return message_result;
        } catch (err: any) {
            console.log(`ERROR :: createMessage: ${err.message}`);
            throw err;
        }
    };

    public async createChat(data: CreateChat) {
        try {
            const result = await axios.post(
                this.path + "/chat/create", 
                data,
                {withCredentials: true}
            );
    
            // console.log(data);
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
    
            const chat = result.data.data;
            // console.log("chat result::", chat);
            return chat;
        } catch (err: any) {
            console.log(`ERROR :: createChat: ${err.message}`);
            throw err;
        }
    };
};

export default ChatApiService;