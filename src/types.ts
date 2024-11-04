export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  channel: {
    name: string;
    avatar: string;
    subscribers: string;
    verified: boolean;
  };
  views: string;
  timestamp: string;
  duration: string;
  description: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  likes: number;
  timestamp: string;
  replies: Comment[];
}