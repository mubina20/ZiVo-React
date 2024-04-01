import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Follower, Following, FollowSearchObj } from "../../types/follow";
import { Definer } from "../../lib/definer";
import { Comment } from "../../types/comment";

class CommentApiService {
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

    // public async findChosenPostComments(data: Comment): Promise<Comment[]> {
    //     try {
    //         const url = `/follow/followers?mb_id=${data.mb_id}`;

    //         const result = await axios.get(this.path + url, {withCredentials: true});

    //         assert.ok(result?.data, Definer.general_err1);
    //         assert.ok(result?.data?.state != "fail", result?.data?.message);
    //         console.log("getMemberFollowers STATE ::", result.data.state);

    //         const followers: Follower[] = result.data.data;
    //         return followers;
    //     } catch (err: any) {
    //         console.log(`ERROR :: getMemberFollowers ${err.message}`);
    //         throw err;
    //     }
    // };

    
};

export default CommentApiService;