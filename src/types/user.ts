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
    mb_hobby?: string;
    mb_school?: string;
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
    me_followed: MeFollowed;
    follow: string;
};

export interface MemberUpdateData {
    mb_name?: string | null;
    mb_surname?: string | null;
    mb_school?: string | null;
    mb_description?: string | null;
    mb_hobby?: string | null;
    mb_country?: string | null;
    mb_profile_image?: string | null;
};