import { useEffect, useState } from "react";
import "../../../css/visitPage.css";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";

export function MyPosts() {
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    /** HANDLERS **/
    useEffect(() => {
        const allPostsData = async () => {
            try {
                const postService = new PostApiService();
                const allPostsData = await postService.getAllPosts();
                setAllPosts(allPostsData);
            } catch (err) {
                console.error('Error while fetching members:', err);
            }
        };

        allPostsData();
    }, []);
    // console.log("allPosts", allPosts);
    console.log("props > allPosts", allPosts);
    const filteredPosts = allPosts.filter(post => post.member._id === verifiedMemberData._id);
    console.log("filteredPosts", filteredPosts)

    return (
        <div className="page_bottom">
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    post.post_type === "photo" ? (
                        // Photo Post
                        <div key={post._id}>
                            <div className="post">
                                <img src={`${serverApi}/${post?.post_content}`} alt="" width="300px"/>
                                {post.post_title}
                                {/* {post.post_content} */}
                            </div>
                        </div>
                    ) : post.post_type === "article" ? (
                        // Article Post
                        <p>This is Article</p>
                    ) : (
                        // Video Post
                        <div key={post._id}>
                            <div className="post">
                                <video
                                    loop
                                    // playsInline
                                    controls
                                    width={"100%"}
                                >
                                    <source
                                        src={`${serverApi}/${post?.post_content}`}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <div>Post hali yo'q</div>
            )}



            {/* <div className="post">
                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
            </div>
            <div className="post">
                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
            </div>
            <div className="post">
                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
            </div>
            <div className="post">
                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
            </div>
            <div className="post">
                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
            </div> */}
        </div>
    )
}