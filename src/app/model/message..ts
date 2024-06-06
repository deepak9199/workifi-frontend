// Define a model for the message
export interface Message {
    type: 'incoming' | 'outgoing'; // Type of the message
    text: string; // Text content of the message
    time: string; // Time of the message
    date: string; // Date of the message
    img?: string; // Optional image URL for the avatar
}

// Define a model for the conversation
export interface Conversation {
    uid: string
    cid: string
    cname: string; // Customer name
    phoneno: string; // Customer phone number
    messages: Message[]; // Array of messages exchanged in the conversation
    lastmessagedatetime: string
}
export interface Conversation_detail {
    id: string
    uid: string
    cid: string
    cname: string; // Customer name
    phoneno: string; // Customer phone number
    messages: Message[]; // Array of messages exchanged in the conversation
    lastmessagedatetime: string
}
