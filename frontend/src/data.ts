export interface Reaction { emoji: string; count: number; }
export interface Quote { from: string; text: string; }
export interface Message {
  id: number; from: 'me' | 'them';
  text?: string; photo?: boolean;
  quote?: Quote; time: string;
  reactions: Reaction[]; read: boolean;
}
export interface Chat {
  id: number; name: string; av: string; online: boolean;
  muted: boolean; pinned: boolean; unread: number;
  time: string; last: string; typing: boolean;
}
export interface Friend {
  id: number; name: string; av: string; online: boolean;
  email: string; mutuals: number;
}

export const CHAT_MESSAGES: Record<number, Message[]> = {
  1: [
    { id:1, from:'them', text:"Hey! Just checked the new designs — they look incredible 🔥", time:'7:20 PM', reactions:[{emoji:'🔥',count:2}], read:true },
    { id:2, from:'me',   text:"Thanks! Spent all morning on them. What do you think about the colors?", time:'7:21 PM', reactions:[], read:true },
    { id:3, from:'them', text:"The teal accent is perfect. Especially in dark mode", time:'7:22 PM', reactions:[{emoji:'❤️',count:1}], read:true },
    { id:4, from:'me',   text:"Glad you like it! Can you send the font link we talked about?", time:'7:23 PM', reactions:[], read:true },
    { id:5, from:'them', text:"Sure! Outfit — geometric grotesque, great for UI", time:'7:24 PM', reactions:[], read:true },
    { id:6, from:'them', photo:true, time:'7:28 PM', reactions:[{emoji:'😍',count:3}], read:true },
    { id:7, from:'me',   text:"This looks almost production-ready. Show the team?", time:'7:30 PM', reactions:[], read:true },
    { id:8, from:'them', text:"That's the plan. Meeting Friday at 3pm", time:'7:31 PM', reactions:[], read:true },
    { id:9, from:'me',   quote:{from:'Alina',text:'Meeting Friday at 3pm'}, text:"Got it, see you tomorrow 👍", time:'7:42 PM', reactions:[], read:false },
  ],
  2: [
    { id:1, from:'them', text:"New mockups are ready for review!", time:'6:50 PM', reactions:[], read:true },
    { id:2, from:'me',   text:"Where can I find them?", time:'6:52 PM', reactions:[], read:true },
    { id:3, from:'them', text:"Shared in the Figma link ☝️", time:'6:54 PM', reactions:[{emoji:'👍',count:4}], read:true },
    { id:4, from:'me',   text:"Checking now", time:'7:00 PM', reactions:[], read:true },
    { id:5, from:'them', text:"Igor: new mockups are ready", time:'7:10 PM', reactions:[], read:true },
  ],
  3: [
    { id:1, from:'them', text:"Hey, did you get my email?", time:'5:10 PM', reactions:[], read:true },
    { id:2, from:'me',   text:"Yes! Just replied", time:'5:15 PM', reactions:[], read:true },
    { id:3, from:'them', text:"Great, thanks!", time:'5:20 PM', reactions:[], read:true },
    { id:4, from:'me',   text:"No problem 😊", time:'6:00 PM', reactions:[], read:true },
    { id:5, from:'them', text:"Saw it, thanks!", time:'6:33 PM', reactions:[], read:true },
  ],
  4: [
    { id:1, from:'them', text:"When are you coming back?", time:'5:55 PM', reactions:[], read:true },
    { id:2, from:'me',   text:"Probably next week, why?", time:'6:00 PM', reactions:[], read:true },
    { id:3, from:'them', text:"We're planning a dinner 🍕", time:'6:05 PM', reactions:[{emoji:'❤️',count:1}], read:true },
  ],
  5: [
    { id:1, from:'me',   text:"Will update by tomorrow morning", time:'4:10 PM', reactions:[], read:true },
    { id:2, from:'them', text:"Ok, sounds good", time:'4:20 PM', reactions:[], read:true },
    { id:3, from:'me',   text:"I'll update it by morning", time:'4:20 PM', reactions:[], read:true },
  ],
  6: [
    { id:1, from:'me',   text:"Heading to the presentation now", time:'2:00 PM', reactions:[], read:true },
    { id:2, from:'them', text:"Good luck with the presentation!", time:'3:10 PM', reactions:[{emoji:'🔥',count:1}], read:true },
    { id:3, from:'me',   text:"Thanks! 🙏", time:'3:15 PM', reactions:[], read:true },
  ],
  7: [
    { id:1, from:'me',   text:"Article link: medium.com/design-systems", time:'Mon', reactions:[], read:true },
  ],
};

export const CHATS: Chat[] = [
  { id:1, name:'Alina Morozova', av:'AM', online:true,  muted:false, pinned:true,  unread:3,  time:'7:42 PM',  last:"Got it, see you tomorrow 👍",   typing:false },
  { id:2, name:'Design Team',    av:'DT', online:false, muted:false, pinned:true,  unread:12, time:'7:10 PM',  last:'Igor: new mockups are ready',   typing:true  },
  { id:3, name:'Max Kuznetsov',  av:'MK', online:true,  muted:false, pinned:false, unread:0,  time:'6:33 PM',  last:'Saw it, thanks!',                typing:false },
  { id:4, name:'Nastya',         av:'NA', online:false, muted:true,  pinned:false, unread:0,  time:'5:55 PM',  last:'When are you coming back?',      typing:false },
  { id:5, name:'Work Chat',      av:'WC', online:false, muted:false, pinned:false, unread:1,  time:'4:20 PM',  last:"You: I'll update it by morning", typing:false },
  { id:6, name:'Dima Volkov',    av:'DV', online:false, muted:false, pinned:false, unread:0,  time:'Yesterday',last:'Good luck!',                     typing:false },
  { id:7, name:'Saved',          av:'★',  online:false, muted:false, pinned:false, unread:0,  time:'Mon',      last:'Article link',                   typing:false },
];

export const FRIENDS: Friend[] = [
  { id:1, name:'Alina Morozova', av:'AM', online:true,  email:'alina@example.com',  mutuals:3 },
  { id:2, name:'Max Kuznetsov',  av:'MK', online:true,  email:'max@example.com',    mutuals:7 },
  { id:3, name:'Dima Volkov',    av:'DV', online:false, email:'dima@example.com',   mutuals:2 },
  { id:4, name:'Nastya Ivanova', av:'NI', online:false, email:'nastya@example.com', mutuals:5 },
  { id:5, name:'Sergey Petrov',  av:'SP', online:true,  email:'sergey@example.com', mutuals:1 },
  { id:6, name:'Elena Smirnova', av:'ES', online:false, email:'elena@example.com',  mutuals:4 },
];
