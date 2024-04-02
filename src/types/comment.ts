import { MeLiked } from "./post";

export interface Comment {
    _id: string;
    comment: string;
    comment_likes: number;
    post_id: string;
    member: any;
    createdAt: Date;
    me_liked: MeLiked[];
};