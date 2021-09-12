import axios, { AxiosInstance } from "axios";

class TMDB_API {
    tmdbRequest: AxiosInstance;

    constructor() {
        this.tmdbRequest = axios.create({
            baseURL: 'https://api.jikan.moe/v3',
            timeout: 50000,
            headers: {}
        });
      }
}