"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "./ui/button";
import { Send, User as UserIcon } from "lucide-react";
import { Input } from "./ui/input";

type ChatBoxProps = {
    travelPlanId: string;
    user: {
        id: string;
        name: string;
    } | undefined;
};

type Message = {
    senderId: string;
    senderName: string;
    message: string;
    timestamp: string;
};

export default function ChatBox({ travelPlanId, user }: ChatBoxProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom whenever messages update
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!user) return;

        // Connect to Socket.io server
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        socketRef.current = io(backendUrl, {
            withCredentials: true,
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to chat server");
            // Join the trip room
            socketRef.current?.emit("joinTripRoom", travelPlanId);
        });

        socketRef.current.on("receiveMessage", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [travelPlanId, user]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || !user || !socketRef.current) return;

        const messageData = {
            travelPlanId,
            senderId: user.id,
            senderName: user.name,
            message: inputMessage,
        };

        socketRef.current.emit("sendMessage", messageData);
        setInputMessage("");
    };

    if (!user) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trip Chat</h3>
                <p className="text-gray-500">Please login to view and participate in the trip chat.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-primary/5 p-4 border-b border-primary/10">
                <h3 className="font-bold text-gray-900">Trip Discussion</h3>
                <p className="text-xs text-gray-500">Real-time chat with other travelers</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                        <p>No messages yet.</p>
                        <p className="text-sm">Be the first to say hello!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isMe = msg.senderId === user.id;
                        return (
                            <div
                                key={idx}
                                className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                    <UserIcon className="w-4 h-4 text-gray-500" />
                                </div>
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${isMe
                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                            : "bg-gray-100 text-gray-900 rounded-tl-sm"
                                        }`}
                                >
                                    <p className="text-xs opacity-75 mb-1">{isMe ? "You" : msg.senderName}</p>
                                    <p className="text-sm">{msg.message}</p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-1 rounded-full border-gray-300 focus-visible:ring-primary"
                    />
                    <Button
                        type="submit"
                        className="rounded-full w-12 h-12 p-0 flex-shrink-0 shadow-md"
                        disabled={!inputMessage.trim()}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
