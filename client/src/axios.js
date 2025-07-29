import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_SERVER_URL || "https://techivantaserver.onrender.com",
});

export default instance;
