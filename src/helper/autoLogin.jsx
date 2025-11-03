import { useMyContext } from "../context";
import api from "./apiService";

export const autoLogin = async (setUser, setLoading) => {
  if (setLoading) setLoading(true);
  try {
    const response = await api.post("/auth/autoLogin");
    // console.log(response.data.decoded);
    if (setUser) setUser(response.data.decoded);
  } catch (err) {
    // console.log(err);
  } finally {
    if (setLoading) setLoading(false);
  }
};
