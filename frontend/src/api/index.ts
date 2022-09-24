import axios from "axios";
import { item } from "../types";

const init = (): Promise<boolean> =>
  axios.get(`${import.meta.env.VITE_BASE_URL}/init`);
const items = (): Promise<item[]> =>
  axios.get(`${import.meta.env.VITE_BASE_URL}/items`);

export { init, items };
