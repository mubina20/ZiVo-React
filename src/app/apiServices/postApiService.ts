import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { UploadPost } from "../../types/post";

class PostApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async createPhotoPost(data: FormData) {
        try {
            const result = await axios.post(
                this.path + "/post/create/photo", 
                    data, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
            );
    
            console.log(data);
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("createPhotoPost STATE :: ", result.data.state);
    
            return result;
        } catch (err: any) {
            console.log(`ERROR :: createPhotoPost: ${err.message}`);
            throw err;
        }
    };

    public async createVideoPost(data: FormData) {
        try {
            const result = await axios.post(
                this.path + "/post/create/video", 
                    data, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
            );
    
            console.log(data);
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("createPhotoPost STATE :: ", result.data.state);
    
            return result;
        } catch (err: any) {
            console.log(`ERROR :: createPhotoPost: ${err.message}`);
            throw err;
        }
    };
    public async createArticlePost(data: UploadPost) {
        try {
            const result = await axios.post(
                this.path + "/post/create/article", 
                data,
                {withCredentials: true}
            );
    
            console.log(data);
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            console.log("createArticlePost STATE :: ", result.data.state);
    
            return result;
        } catch (err: any) {
            console.log(`ERROR :: createArticlePost: ${err.message}`);
            throw err;
        }
    };
    
};

export default PostApiService;