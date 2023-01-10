import { default as baseAxios } from "axios";
import { API_URL } from "./constants";

export const axios = baseAxios.create({ baseURL: API_URL });
