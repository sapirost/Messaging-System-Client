export interface Message {
    creationDate?: Date | string;
    id?: number;
    message: string;
    receiver: string;
    sender: string;
    subject: string;
}
