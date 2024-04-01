export interface Comment {
    _id: string;
    comment_likes: number;
    post_id: string;
    member: any;
    createdAt: Date;
};