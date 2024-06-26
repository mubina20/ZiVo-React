import assert from "assert";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Post, UpdatePost, UploadPost } from "../../types/post";
import { CreateComment } from "../../types/comment";

class PostApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async createPhotoPost(data: UploadPost) {
        try {
            const formData = new FormData();
            // formData.append("post_title", data.post_title);
            formData.append("post_title", data.post_title || "");
            formData.append("post_type", data.post_type || "");
            formData.append("post_content", data.post_content);

            const result = await axios(`${this.path}/post/create/photo`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
    
            return result;
        } catch (err: any) {
            console.log(`ERROR :: createPhotoPost: ${err.message}`);
            throw err;
        }
    };

    public async createVideoPost(data: UploadPost) {
        try {
            const formData = new FormData();
            // formData.append("post_title", data.post_title);
            formData.append("post_title", data.post_title || "");
            formData.append("post_type", data.post_type || "");
            formData.append("post_content", data.post_content);

            const result = await axios(`${this.path}/post/create/video`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
    
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
    
            return result;
        } catch (err: any) {
            console.log(`ERROR :: createArticlePost: ${err.message}`);
            throw err;
        }
    };

    public async getAllPosts(): Promise<Post[]> {
        try {
            const result = await axios.get(
                this.path + "/post/all-posts", 
                { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);

            const posts: Post[] = result.data.data;

            return posts;
        } catch (err: any) {
            console.log(`ERROR :: getAllgetAllPostsMembers: ${err.message}`);
            throw err;
        }
    };

    public async getChosenPost(id: string, postType: string): Promise<Post> {
        try {
            const url = `/post/${postType}/${id}`;
            const result = await axios.get(this.path + url, {withCredentials: true});

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);

            const post: Post = result.data.data;
            return post;
        } catch (err: any) {
            console.log(`ERROR :: getChosenArticlePost: ${err.message}`);
            throw err;
        }
    };

    public async createComment(data: CreateComment) {
        try {
            const result = await axios.post(
                this.path + "/comment/createComment", 
                data,
                {withCredentials: true}
            );
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
    
            const comment = result.data.data;
            return comment;
        } catch (err: any) {
            console.log(`ERROR :: createArticlePost: ${err.message}`);
            throw err;
        }
    };   
    
    public async editPost(data: UpdatePost) {
        try {
            const result = await axios.post(
                this.path + "/post/edit", 
                data,
                {withCredentials: true}
            );
    
            assert.ok(result?.data, Definer.post_error1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
    
            const updatedPost = result.data.data;
            return updatedPost;
        } catch (err: any) {
            console.log(`ERROR :: createArticlePost: ${err.message}`);
            throw err;
        }
    };   
};

export default PostApiService;