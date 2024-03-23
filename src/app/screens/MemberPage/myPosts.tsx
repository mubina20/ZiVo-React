import { useEffect, useState } from "react";
import "../../../css/visitPage.css";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { verifiedMemberData } from "../../apiServices/verify";

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
    // const {allPosts} = props;
    console.log("props > allPosts", allPosts);
    const filteredPosts = allPosts.filter(post => post.member._id === verifiedMemberData._id);
    console.log("filteredPosts", filteredPosts)

    return (
        <div className="page_bottom">
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    <div key={post._id}>
                        <div className="post">
                            {/* <img src={post?.post_content} alt="" width="300px"/> */}
                            {post.post_content}
                        </div>
                    </div>
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