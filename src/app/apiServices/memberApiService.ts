import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Member } from "../../types/user";
import { MemberLiken } from "../../types/like";

class MemberApiService {
    static getChosenMember(arg0: string) {
        throw new Error("Method not implemented.");
    }
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async loginRequest(login_data: any): Promise<Member> {
        try {
            const result = await axios.post(
                this.path + "/login", 
                login_data, 
                {withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("Login STATE :: ", result.data.state);

            const member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            console.log("Login MEMBER :: ", member);

            return member;
        } catch (err: any) {
            console.log(`ERROR :: loginRequest: ${err.message}`);
            throw err;
        }
    };

    public async signupRequest(signup_data: any): Promise<Member> {
        try {
            const result = await axios.post(
                this.path + "/signup", 
                signup_data, 
                {withCredentials: true}
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("Signup STATE ::", result.data.state);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            console.log("Signup MEMBER :: ", member);

            return member;
        } catch (err: any) {
            console.log(`ERROR :: signupRequest: ${err.message}`);
            throw err;
        }
    };

    public async logOutRequest() {
        try {
            const result = await axios.post(
                this.path + "/logout", 
                { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
        
            const logout_result = result.data.state;
            return logout_result === "success";
        } catch (err: any) {
            console.log(`ERROR :: logOutRequest: ${err.message}`);
            throw err;
        }
    };

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

    public async getAllMembers() {
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

    public async memberLikeTarget(data: any): Promise<MemberLiken> {
        try {
            const url = "/member-liked";
            const result = await axios.post(
                this.path + url, 
                data, 
                { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);

            console.log("memberLikeTarget STATE ::", result.data.data);
            const like_result: MemberLiken = result.data.data;

            return like_result;
        } catch (err: any) {
            console.log(`ERROR :: memberLikeTarget: ${err.message}`);
            throw err;
        }
    };
};

export default MemberApiService;