import axios from "axios";
import { SERVER_URI } from "./uri";

export const fetchAccounts = async (accessToken: string) => {
  await axios.get(`${SERVER_URI}/accounts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
