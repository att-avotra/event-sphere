"use client";

import React, { useState } from "react";
import FoulPartyImage from "@/assets/tommorow-land.png";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar1, MapPin, Timer } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FooterClient from "@/components/footer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CommentNode = {
  id: number;
  name: string;
  avatar: string;
  date: string;
  text: string;
  replies: CommentNode[];
};

type CommentThreadProps = {
  comment: CommentNode;
  depth?: number;
  activeReplyId: number | null;
  replyText: string;
  setReplyText: (value: string) => void;
  onReplyStart: (commentId: number) => void;
  onCancelReply: () => void;
  onSubmitReply: (parentId: number) => void;
};

function CommentThread({
  comment,
  depth = 0,
  activeReplyId,
  replyText,
  setReplyText,
  onReplyStart,
  onCancelReply,
  onSubmitReply,
}: CommentThreadProps) {
  return (
    <div className="flex flex-col gap-3 bg-white/90 p-3">
      <div className="flex items-start gap-3">
        <Avatar className={depth > 0 ? "h-7 w-7" : "h-8 w-8"}>
          <AvatarImage src={comment.avatar} alt={comment.name} />
          <AvatarFallback>{comment.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold ${depth > 0 ? "text-sm" : "text-sm"}`}
            >
              {comment.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {comment.date}
            </span>
          </div>
          <p className="text-sm mt-1 leading-6">{comment.text}</p>
          <button
            type="button"
            className="text-xs text-primary mt-2 font-medium hover:underline w-fit"
            onClick={() => onReplyStart(comment.id)}
          >
            Reply
          </button>

          {activeReplyId === comment.id && (
            <div className="mt-2 flex flex-col items-end gap-2 w-full">
              <Textarea
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                placeholder={`Reply to ${comment.name}`}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="px-4 py-2"
                  onClick={onCancelReply}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="px-4 py-2"
                  onClick={() => onSubmitReply(comment.id)}
                >
                  Post reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="flex flex-col gap-4">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              depth={depth >= 1 ? 1 : depth + 1}
              activeReplyId={activeReplyId}
              replyText={replyText}
              setReplyText={setReplyText}
              onReplyStart={onReplyStart}
              onCancelReply={onCancelReply}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CalendarPage() {
  const initialComments: CommentNode[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://github.com/shadcn.png",
      date: "2 days ago",
      text: "Can't wait for the keynote! The lineup looks incredible this year.",
      replies: [
        {
          id: 101,
          name: "Organizer",
          avatar: "https://github.com/shadcn.png",
          date: "1 day ago",
          text: "We're excited to have you! The schedule is fully packed with surprises.",
          replies: [
            {
              id: 102,
              name: "Alex Johnson",
              avatar: "https://github.com/shadcn.png",
              date: "30 min ago",
              text: "Thanks! I’m looking forward to it too.",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "https://github.com/shadcn.png",
      date: "5 hours ago",
      text: "Does anyone know if there will be a shuttle from the downtown station?",
      replies: [],
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://github.com/shadcn.png",
      date: "1 hour ago",
      text: "I'm looking forward to the networking sessions. See you all there!",
      replies: [],
    },
  ];

  const [comments, setComments] = useState<CommentNode[]>(initialComments);
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const addReplyToComment = (
    items: CommentNode[],
    targetId: number,
    newReply: CommentNode,
  ): CommentNode[] =>
    items.map((item) => {
      if (item.id === targetId) {
        return { ...item, replies: [...item.replies, newReply] };
      }

      if (item.replies.length > 0) {
        return {
          ...item,
          replies: addReplyToComment(item.replies, targetId, newReply),
        };
      }

      return item;
    });

  const handleSubmitReply = (parentId: number) => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    const newReply: CommentNode = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: "You",
      avatar: "https://github.com/shadcn.png",
      date: "just now",
      text: trimmed,
      replies: [],
    };

    setComments((prev) => addReplyToComment(prev, parentId, newReply));
    setReplyText("");
    setActiveReplyId(null);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#FAF8FF]">
      <section
        className="flex flex-col  items-center px-6 py-12
      "
      >
        <div className="flex flex-col items-center text-center w-full max-w-7xl border-b-2 p-4">
          <div
            className="relative w-full h-full overflow-hidden pb-7"
            style={{ height: "38rem" }}
          >
            <Image
              src={FoulPartyImage}
              alt="Event"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            {/* Overlay blanc avec dégradé  */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/90 to-transparent" />

            {/* Contenu texte */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-black text-left">
              <div className="flex items-center gap-2">
                <span className="bg-[#778093] text-white text-xs px-2.5 py-1 rounded-full">
                  Music
                </span>
              </div>
              <h3 className="text-3xl font-semibold mt-2">
                Sonic Horizon: Global Tour 2024
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center px-4 py-8 md:px-6 md:py-12 mb-14">
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-nowrap lg:items-start gap-4 md:gap-6 w-full max-w-7xl">
          {/* left section */}
          <div className="flex flex-col gap-4 w-full md:w-full lg:w-[65%]">
            <div className="flex flex-wrap gap-2 items-stretch w-full md:*:flex-1 md:*:min-w-55 lg:*:flex-none">
              <Card
                size="sm"
                className="w-full sm:w-[48%] xl:w-[32%] max-w-none"
              >
                <CardHeader className="flex flex-row items-center md:justify-center gap-3">
                  <Calendar1 className="h-5 w-5 text-primary" />
                  <div className="flex items-start flex-col">
                    <CardTitle className="uppercase">Date</CardTitle>
                    <CardDescription>Octobre 24,2026</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card
                size="sm"
                className="w-full sm:w-[48%] xl:w-[32%] max-w-none"
              >
                <CardHeader className="flex flex-row items-center md:justify-center">
                  <Timer className="h-5 w-5 text-primary" />
                  <div className="flex items-start flex-col">
                    <CardTitle className="uppercase">Time</CardTitle>
                    <CardDescription> 10:00 PM - 4:00 AM</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card
                size="sm"
                className="w-full sm:w-[48%] xl:w-[32%] max-w-none"
              >
                <CardHeader className="flex flex-row items-center md:justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="flex items-start flex-col">
                    <CardTitle className="uppercase">LOCATION</CardTitle>
                    <CardDescription>San Francisco, CA</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
            {/*Aboout  */}
            <div className="flex flex-col text-left w-full gap-4 px-2">
              <p className="text-xl font-bold">A propos de cet évennement</p>
              <p className="text-sm text-muted-foreground">
                Join us for an immersive day of exploration where the brightest
                minds in technology and design converge. The Future Tech Summit
                2024 is designed to challenge your perceptions of artificial
                intelligence and explore its role as a partner in human
                creativity.
              </p>
              <p className="text-sm text-muted-foreground">
                Our keynote speakers will delve into the ethics of generative
                AI, the future of the decentralized web, and the next frontier
                of human-computer interaction. Whether you&apos;re a developer,
                a designer, or a tech enthusiast, this summit offers a unique
                opportunity to network with industry leaders and gain hands-on
                experience with emerging tools.
              </p>
            </div>
            <div className="bg-blue-100 w-full text-blue-700 dark:bg-blue-950 dark:text-blue-300 p-3 italic text-sm rounded-xl border-l-2 border-blue-800 ">
              <p className="">
                &quot;Technology is most powerful when it empowers us to do
                things we never thought possible.&quot; — Dr. Sarah Chen,
                Keynote Speaker
              </p>
            </div>
            {/* Map */}
            <div className="flex flex-col text-left w-full gap-4 px-2">
              <p className="text-xl font-bold">Map</p>
              <div className="w-full h-48 rounded-lg ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086769195061!2d-122.41941508468193!3d37.77492977975959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b8c6e7b%3A0x7e5c5b5e5c5b5e5c!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sfr!4v1697040000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              {/* Discussionn */}
              <div className="flex flex-col text-left w-full gap-4 px-2">
                <p className="text-xl font-bold">Discussion</p>
                <div className="flex items-start gap-2 w-full">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn1.png"
                      alt="@shadcn"
                      className="grayscale"
                    />
                    <AvatarFallback>JN</AvatarFallback>
                  </Avatar>
                  <div className="w-full flex flex-col items-end gap-2">
                    <Textarea placeholder="Type your message here." />
                    <Button className=" px-4 py-2">Post</Button>
                  </div>
                </div>

                {/* Liste des commentaires */}
                <div className="mt-8 flex flex-col gap-6 w-full">
                  {comments.map((comment) => (
                    <CommentThread
                      key={comment.id}
                      comment={comment}
                      activeReplyId={activeReplyId}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      onReplyStart={(commentId) => {
                        setActiveReplyId(commentId);
                        setReplyText("");
                      }}
                      onCancelReply={() => {
                        setActiveReplyId(null);
                        setReplyText("");
                      }}
                      onSubmitReply={handleSubmitReply}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* right section  */}
          <div className="flex flex-col gap-6 bg-white w-full md:w-full lg:w-[35%] p-4 md:p-6 shadow rounded-xl self-start">
            <header className="flex justify-between items-center">
              <p className="text-primary">$10.96</p>
              <p className="text-muted-foreground">Standard entry</p>
            </header>
            <p className="text-muted-foreground text-left text-sm">
              Price includes all-day sessions, networking lunch, and exclusive
              digital resources.
            </p>
            <div className="flex flex-col w-full gap-3">
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-muted-foregroud">42 spot left</p>

                  <p className="text-muted-foreground">70% filled</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full bg-[#F2F3FF] cursor-pointer">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ticket</SelectLabel>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <SelectItem
                        key={index}
                        value={index.toString()}
                        className="cursor-pointer"
                      >
                        {index + 1} Ticket
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className="w-full">Register for events</Button>
              <p className="text-center text-muted-foreground text-sm">
                No hidden fees. Refundable up to 7 days before event.
              </p>
            </div>

            {/* already attendign images */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-left">Already attending</p>

              <div className="flex items-center -space-x-3">
                <Avatar className="h-8 w-8 ring-2 ring-white">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Attendee 1"
                  />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ring-2 ring-white">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Attendee 2"
                  />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ring-2 ring-white">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Attendee 3"
                  />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>

                <span className="text-xs text-muted-foreground ml-3">
                  +128 going
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterClient />
    </div>
  );
}

export default CalendarPage;
