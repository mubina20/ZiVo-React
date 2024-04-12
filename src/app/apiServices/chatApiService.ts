import axios from "axios";
import { serverApi } from "../../lib/config";
import { Chats, ChosenChat } from "../../types/chat";
import assert from "assert";
import { Definer } from "../../lib/definer";


class ChatApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async findMyChats(){
        try{
            const url = "/chat",
                result = await axios.get(this.path + url, { withCredentials: true });
            assert.ok(result, Definer.general_err1);

            const myChats: Chats[] = result.data.data;
            console.log("myChats::", myChats);

            return myChats;
        } catch (err: any) {
            console.log(`ERROR :: findChosenPostComments ${err.message}`);
            throw err;
        }
    }

    public async getSelectedChat(id: string): Promise<ChosenChat> {
        try {
            const url = `/chat/${id}`;
            const result = await axios.get(this.path + url, {withCredentials: true});

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            // console.log("getSelectedChat DATA ::", result.data.data);

            const chat: ChosenChat = result.data.data;
            return chat;
        } catch (err: any) {
            console.log(`ERROR :: getChosenArticlePost: ${err.message}`);
            throw err;
        }
    };

    public async createMessage(data: any) {
        try {
            const url = "/chat/message";
            const result = await axios.post(
                this.path + url, 
                data, 
                { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);

            console.log("createMessage STATE ::", result.data.data);
            const like_result = result.data.data;

            return like_result;
        } catch (err: any) {
            console.log(`ERROR :: createMessage: ${err.message}`);
            throw err;
        }
    };
};

export default ChatApiService;