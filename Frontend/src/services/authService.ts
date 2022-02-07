import CreateAxios from "./httpCommon";
import { AxiosInstance } from "axios";
import StorageLocal from "@/services/localStorage";

class Authentication {
    client: AxiosInstance;
    headerAuth: any;

    constructor() {
        this.client = CreateAxios("/api/auth");
        this.headerAuth = {
            "Content-type": "application/json",
            Authorization: "Token " + StorageLocal.getData("token"),
        };
    }
    login(data: any): Promise<any> {
        return this.client.post("/token/login", data);
    }
    checkToken(): Promise<any> {
        return this.client.get("/users/me/", {
            headers: {
                "Content-type": "application/json",
                Authorization: "Token " + StorageLocal.getData("token"),
            },
        });
    }
}

export default new Authentication();
