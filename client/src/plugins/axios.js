import axios from "axios";
import { ALIS_API_URL, ALIS_APP_ID } from "@/config/env";

const axiosInstance = axios.create({
  baseURL: `${ALIS_API_URL}/${ALIS_APP_ID}`,
});

export default axiosInstance;
