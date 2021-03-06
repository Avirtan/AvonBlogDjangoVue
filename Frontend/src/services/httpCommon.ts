import axios, { AxiosInstance } from "axios";

const addres = import.meta.env.MODE == "development" ? "192.168.1.185" : "work-craft.ru";

export default function CreateAxios(url: string, headers = { "Content-type": "application/json" }): AxiosInstance {
    //console.log(import.meta.env.MODE)
    const apiClient: AxiosInstance = axios.create({
        baseURL: "https://" + addres + url,
        headers,
    });
    return apiClient;
}
