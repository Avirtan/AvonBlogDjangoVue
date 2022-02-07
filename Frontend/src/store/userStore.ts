import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import types from "./userMutatuinTypes";
import authService from "@/services/authService";
import StorageLocal from "@/services/localStorage";

export interface User {
    isAuth: boolean;
    posts: [];
    index: number;
}
export const UserKey: InjectionKey<Store<User>> = Symbol();

export const UserStore = createStore<User>({
    state: {
        isAuth: false,
        posts: [] as any,
        index: 0,
    },
    mutations: {
        [types.Login](state) {
            state.isAuth = true;
        },
        [types.Logout](state) {
            state.isAuth = false;
        },
        setPost(state, data) {
            state.posts = data;
        },
        setIndex(state, data) {
            state.index = data;
        },
    },
    actions: {
        async [types.Login](context, data: any) {
            try {
                const resp = await authService.login(data);
                if (resp.status == 200) {
                    StorageLocal.setData("token", resp.data.auth_token);
                    context.commit(types.Login, true);
                    return Promise.resolve(resp);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        [types.Logout](context) {
            StorageLocal.delKey("token");
            context.commit(types.Logout);
        },
        async [types.CheckToken](context) {
            try {
                const resp = await authService.checkToken();
                if (resp.status == 200) {
                    context.commit(types.Login);
                    return Promise.resolve(resp);
                }
            } catch (error) {
                context.dispatch(types.Logout);
                return Promise.reject(error);
            }
        },
    },
});
