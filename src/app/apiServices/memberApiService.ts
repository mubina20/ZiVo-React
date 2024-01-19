import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Member } from "../../types/user";

class MemberApiService {
    static getChosenMember(arg0: string) {
        throw new Error("Method not implemented.");
    }
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getChosenMember(id: string): Promise<Member> {
        try {
            const url = `/member/${id}`;
            const result = await axios.get(this.path + url, {withCredentials: true});

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("getChosenMember DATA ::", result.data.data);

            const member: Member = result.data.data;
            return member;
        } catch (err: any) {
            console.log(`ERROR :: getChosenMember: ${err.message}`);
            throw err;
        }
    };

    public async getAllMembers(): Promise<Member[]> {
        try {
            const result = await axios.get(
                this.path + "/members", 
                { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("getAllMembers STATE ::", result.data.state);

            const member: Member[] = result.data.data;

            console.log("getAllMembers MEMBER :: ", member);

            return member;
        } catch (err: any) {
            console.log(`ERROR :: getAllMembers: ${err.message}`);
            throw err;
        }
    };
};

export default MemberApiService;