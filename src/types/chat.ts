import { Member } from "./user";

export interface Chats {
    _id: string;
    sender_id: Member;
    receiver_id: Member;
    createdAt: Date;
}