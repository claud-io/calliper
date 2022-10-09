import axios from "axios";
import { Item, Comment } from "../types";

const init = (): Promise<boolean> =>
  axios.get(`${import.meta.env.VITE_BASE_URL}/init`);
const items = (): Promise<Item[]> =>
  axios.get(`${import.meta.env.VITE_BASE_URL}/items`);
const comments = (itemId: number): Promise<Comment[]> =>
  axios.get(`${import.meta.env.VITE_BASE_URL}/items/${itemId}/comments`);
const addComment = (itemId: number, comment: Comment): Promise<void> =>
  axios.put(
    `${import.meta.env.VITE_BASE_URL}/items/${itemId}/comments/add`,
    comment
  );

export { init, items, comments, addComment };
