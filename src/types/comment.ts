import { MeLiked } from "./post";

export interface CreateComment {
    mb_id: string;
    post_id: string;
    comment: string;
}

export interface Comment {
    _id: string;
    comment: string;
    comment_likes: number;
    post_id: string;
    member: any;
    createdAt: Date;
    me_liked: MeLiked[];
};