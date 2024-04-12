import { Member } from "./user";

export interface Chats {
    _id: string;
    members: any;
    createdAt: Date;
}

export interface ChosenChat {
    _id: string;
    sender_id: Member;
    chat_id: string;
    members: Member;
    message: string;
    message_reaction: string;
    createdAt: Date
}

export interface CreateMessage {
    sender_id: string;
    chat_id: string;
    message: string;
}