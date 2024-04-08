import axios from "axios";
import { serverApi } from "../../lib/config";
import { Chats } from "../../types/chat";
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
};

export default ChatApiService;