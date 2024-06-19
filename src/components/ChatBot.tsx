"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button, Drawer, Modal, Popconfirm, Spin } from "antd";
import { VscSend } from "react-icons/vsc";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [questionCount, setQuestionCount] = useState(0);
  const { data: session } = useSession();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const openDrawerRight = () => {
    if (session?.user) {
      setChat(true);
    } else {
      setOpenModal(true);
    }
  };

  const closeDrawerRight = () => {
    setChat(false);
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const saveMessagesToStorage = (messagesToSave: Message[]) => {
    localStorage.setItem("chatMessages", JSON.stringify(messagesToSave));
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const chatHistory = messages.map((message) => message.text).join("\n");
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD4ks43zw7vnA0oJqiWrUmL5IRW87YRslc",
        {
          contents: [{ parts: [{ text: chatHistory }, { text: question }] }],
        }
      );

      const words = "Bot response".split(" "); // Split the message into words
      let typedMessage = ""; // Initialize typed message

      for (let i = 0; i < words.length; i++) {
        // Append the next word to the typed message
        typedMessage += `${words[i]} `;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: typedMessage, sender: "bot" },
        ]);
        // Wait for a short delay before typing the next word (adjust the delay as needed)
        await new Promise((resolve) => setTimeout(resolve, 400));
      }

      const answer = response.data.candidates[0].content.parts[0].text;

      const newMessage: Message = { text: question, sender: "user" };
      const botMessage: Message = { text: answer, sender: "bot" };

      const updatedMessages = [...messages, newMessage, botMessage];
      setMessages(updatedMessages);
      saveMessagesToStorage(updatedMessages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        text: "Sorry, something went wrong!",
        sender: "bot",
      };
      const updatedMessages = [...messages, errorMessage];
      setMessages(updatedMessages);
      saveMessagesToStorage(updatedMessages);
    }
    setLoading(false);
    setQuestion("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage();
  };

  const renderMessageText = (text: string) => {
    // Check if the message is from the bot and contains asterisks
    if (text && text.includes("*")) {
      // Split the message into parts by asterisks
      const parts = text.split("*");
      return (
        <span>
          {parts.map((part, index) => {
            // Bold the parts of the message between asterisks
            if (index % 2 === 1) {
              return <b key={index}>{part}</b>;
            } else {
              return <span key={index}>{part}</span>;
            }
          })}
        </span>
      );
    } else {
      return text;
    }
  };

  const handleClearChats = () => {
    setMessages([]);
    // setQuestionCount(0);
    localStorage.removeItem("chatMessages");
    toast.success("Chats cleared successfully!");
  };

  const cancel = () => {
    toast.error("You Clicked on No");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div>
      <div
        onClick={openDrawerRight}
        className="bottom-8 right-8 fixed shadow-md bg-white border-2 border-yellow-300 cursor-pointer p-2 rounded-full z-50"
      >
        <Image
          src="/images/chatbot.png"
          alt="chatbot"
          width={40}
          height={40}
          priority
          quality={100}
          className="object-contain animate-bounce"
          loading="eager"
          unoptimized
        />
      </div>
      <div>
        <Drawer
          placement="right"
          open={chat}
          width={450}
          title={
            <div>
              <h1 className="text-center text-lg capitalize font-bold">
                Hello, {session?.user?.name}
              </h1>
              <p className="text-center text-lg capitalize font-medium">
                Interact With KU <span className=" text-yellow-400">Books</span>{" "}
                AI
              </p>
            </div>
          }
          onClose={closeDrawerRight}
          className="z-40 shadow-xl overflow-hidden"
        >
          <div className="flex h-full w-full flex-col overflow-hidden -mt-6">
            <div
              ref={chatContainerRef}
              className="grid gap-y-3 w-full overflow-y-auto pt-5 pb-10 sm:mx-4 px-2"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`grid gap-y-1 items-center bg-slate-50 p-2 rounded-md ${
                    message.sender === "user" ? "user" : "bot"
                  }`}
                >
                  <span className="icon">
                    {message.sender === "user" ? (
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/images/user.png"
                          width={32}
                          height={32}
                          alt="user"
                          objectFit="contain"
                          className="border-2 rounded-full"
                        />
                        <h4 className="font-bold">You</h4>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/images/chatgpt2.png"
                          width={30}
                          height={30}
                          objectFit="contain"
                          alt="user"
                          className="border-2 rounded-full p-1"
                        />
                        <h1 className="font-bold">KU Books AI</h1>
                      </div>
                    )}
                  </span>
                  {renderMessageText(message.text)}
                </div>
              ))}
              {loading && <Spin className="mb-4 text-left" />}
            </div>
            <form
              onSubmit={handleSubmit}
              className=" flex sm:mx-auto left-0 right-0 bottom-0 absolute bg-white border-t-2 border-yellow-400"
            >
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Me About a Book..."
                className="w-full px-4 text-base col-span-2 py-3 h-14 resize-none overflow-auto rounded-none outline-none"
              />
              <button
                type="submit"
                className="py-3 px-4 bg-yellow-40 text-3xl text-center text-black font-semibold"
              >
                <VscSend />
              </button>
            </form>
            {/* {questionCount >= 10 && ( */}
            <Popconfirm
              title="Clear Chats"
              description="Are you sure want to Clear Chats?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "white",
                  }}
                />
              }
              onConfirm={handleClearChats}
              onCancel={cancel}
              color="orange"
              className="text-white"
              okText="Confirm"
              cancelText="Cancel"
            >
              {messages.length > 0 && (
                <button
                  type="button"
                  className="absolute bottom-24 right-4 p-1.5 bg-white border-2 border-yellow-400 z-50 rounded-full"
                >
                  <Image
                    src="/images/dumpster.gif"
                    width={34}
                    height={34}
                    objectFit="contain"
                    alt="user"
                    className=" rounded-full"
                  />
                </button>
              )}
            </Popconfirm>
            {/* )} */}
          </div>
        </Drawer>

        <Modal
          open={openModal}
          closable={false}
          width={400}
          centered
          footer={null}
        >
          <div className="grid gap-4">
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-5 justify-center w-full bg-gray-50 py-2 border text-lg font-bold rounded-lg"
            >
              <Image
                src="/images/googlesvg.png"
                alt="google"
                width={30}
                height={30}
                className="object-contain"
              />
              <h1>Continue with Google</h1>
            </button>
            <button
              onClick={() => signIn("github")}
              className="flex items-center justify-center bg-gray-50 bg-opacity-80 gap-4 py-2 border  text-lg font-bold rounded-lg"
            >
              <Image
                src="/images/github.png"
                alt="github"
                width={36}
                height={36}
                className="object-contain"
              />
              <h1>Continue with Github</h1>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ChatBot;
