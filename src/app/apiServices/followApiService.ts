import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Follower, Following, FollowSearchObj } from "../../types/follow";
import { Definer } from "../../lib/definer";

class FollowApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
        try {
            const url = `/follow/followers?mb_id=${data.mb_id}`;

            const result = await axios.get(this.path + url, {withCredentials: true});

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message);
            console.log("getMemberFollowers STATE ::", result.data.state);

            const followers: Follower[] = result.data.data;
            return followers;
        } catch (err: any) {
            console.log(`ERROR :: getMemberFollowers ${err.message}`);
            throw err;
        }
    };

    public async getMemberFollowings(data: FollowSearchObj): Promise<Following[]> {
        try {
            let url = `/follow/followings?mb_id=${data.mb_id}`;
        
            const result = await axios.get(this.path + url, {withCredentials: true});

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message);
            console.log("getMemberFollowings STATE ::", result.data.state);
        
            const followings: Following[] = result.data.data;
            return followings;
        } catch (err: any) {
            console.log(`ERROR :: getMemberFollowings ${err.message}`);
            throw err;
        }
    };

    public async subscribe(mb_id: string): Promise<Boolean> {
        try {
            const result = await axios.post(
                this.path + "/follow/subscribe",
                { mb_id: mb_id },
                {withCredentials: true}
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "muvaffaqiyatsiz!", result?.data?.message);
            console.log("subscribe STATE ::", result.data.state);
        
            return result.data.data === "subscribed";
        } catch (err: any) {
            console.log(`ERROR :: subscribe ${err.message}`);
            throw err;
        }
    };

    public async unsubscribe(mb_id: string): Promise<Boolean> {
        try {
            const result = await axios.post(
                this.path + "/follow/unsubscribe",
                { mb_id: mb_id },
                {withCredentials: true}
            );
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message);
            console.log("state:::", result.data.state);
        
            return result.data.data === "unsubscribed";
        } catch (err: any) {
            console.log(`ERROR :: unsubscribe ${err.message}`);
            throw err;
        }
    };
};

export default FollowApiService;