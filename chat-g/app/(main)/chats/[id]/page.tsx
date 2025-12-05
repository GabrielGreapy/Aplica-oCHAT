'use client'

import { useParams } from "next/navigation"
import ChatWindow from "../chatComponents/chatWindow";


export default function ChatPage(){
    const params = useParams()
    const chatId = params.id as string;
    return <ChatWindow chatId={chatId} />
}