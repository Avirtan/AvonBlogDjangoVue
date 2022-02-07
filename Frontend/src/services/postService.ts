import CreateAxios from "./httpCommon";
import { AxiosInstance } from "axios";
import { ref } from "vue";
import StorageLocal from "@/services/localStorage";

class PostService {
    client: AxiosInstance;
    headerAuth: any;
    constructor() {
        this.client = CreateAxios("/api/post");
        this.headerAuth = {
            "Content-type": "application/json",
            Authorization: "Token " + StorageLocal.getData("token"),
        };
    }
    SetHeader() {
        this.headerAuth = {
            "Content-type": "application/json",
            Authorization: "Token " + StorageLocal.getData("token"),
        };
    }
    async GetPostsPage(numPage: string = "1") {
        let data = {
            posts: [] as any,
            countPage: 0,
        };
        try {
            const resp = await this.client.get("/?p=" + numPage);
            data["countPage"] = resp.data.total_pages;
            data["posts"] = resp.data.posts;
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async GetPost(id: number) {
        let post = [] as any;
        try {
            const resp = await this.client.get("/" + id);
            post = resp.data;
            return post;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async GetPosts() {
        let post = [] as any;
        try {
            const resp = await this.client.get("/admin", { headers: this.headerAuth });
            post = resp.data;
            return post;
        } catch (error) {
            console.log(error.response.data);
        }
    }
    async EditPost(data: any, id: any) {
        try {
            const resp = await this.client.patch("/admin/" + id + "/", data, { headers: this.headerAuth });
        } catch (error) {
            console.log(error.response.data);
        }
    }
    async CreatePost(data: any) {
        try {
            console.log(data);
            const resp = await this.client.post("/admin/", data, { headers: this.headerAuth });
            return resp;
        } catch (error) {
            console.log(error.response.data);
        }
    }
    async DeletePost(id: any) {
        try {
            const resp = await this.client.delete("/admin/" + id + "/", { headers: this.headerAuth });
            return resp;
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async SendEmail(data:any){
        try {
            const resp = await this.client.post("/email/", data=data);
            return resp;
        } catch (error) {
            console.log(error.response.data);
        }
    }
}

export default new PostService();
