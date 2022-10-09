export interface Item {
  date: string | number;
  value: number;
  commentsCount: number;
}

export interface Comment {
  description: string;
  username: string;
  date: string | number;
}
