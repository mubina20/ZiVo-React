import { Member } from "./user";

export interface MeLiked{
    mb_id: string;
    like_ref_id: string;
    my_favorite: boolean;
};

export interface Post {
    member: any;
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
    post_bg_color: string;
    post_align: string;
    post_text_color: string;
    me_liked: MeLiked[];
};

export interface UploadPost {
    post_title?: string ;
    post_content: string ;
    post_bg_color?: string;
    post_text_color?: string;
    post_align?: string;
    post_type?: string;
};

export interface UpdatePost{
    post_id: string;
    post_status: string;
    post_type: string;
}

