import { MeFollowed } from "./follow";
import { MeLiked } from "./post";

export interface Member {
    _id: string;
    mb_name: string;
    mb_surname: string;
    mb_birthday: number;
    mb_gender: string;
    mb_nick: string;
    mb_email: string;
    mb_phone: string;
    mb_password: string;
    mb_type:string;
    mb_status:string;
    mb_address?: string;
    mb_description?: string;
    mb_country?: string;
    mb_profile_image?: string;
    mb_views: number;
    mb_likes: number;
    mb_notification: number;
    mb_follow_count: number;
    mb_subscriber_count: number;
    createdAt: Date;
    me_liked: MeLiked[];
    me_followed: MeFollowed[];
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

export interface MemberUpdateData {
    mb_name?: string | null;
    mb_surname?: string | null;
    mb_nick?: string | null;
    mb_birthday?: number | null;
    mb_gender?: string | null;
    mb_email?: string | null;
    mb_phone?: string | null;
    mb_address?: string | null;
    mb_description?: string | null;
    mb_country?: string | null;
    mb_profile_image?: string | null;
};