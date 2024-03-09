import { Member } from "./user";

export interface MeLiked{
    mb_id: string;
    like_ref_id: string;
    my_favorite: boolean;
};

export interface Post {
    _id: string;
    post_title: string,
    post_status: string;
    post_type: string;
    post_content: string;
    post_views: number;
    post_likes: number;
    post_comment: string;
    mb_id: string;
    createdAt: Date;
    member_data: Member;
    me_liked: MeLiked[];
};