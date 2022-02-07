<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";

import PostService from "@/services/postService";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { UserKey } from "@/store/userStore";
import UserMutatuinTypes from "@/store/userMutatuinTypes"

const router = useRouter()
const store = useStore(UserKey)
const select = ref([] as any)
const columns = [
    {
        name: 'name',
        label: 'Название статьи',
        field: 'name',
        sortable: true,
    },
    {
        name: 'created',
        label: 'Дата создания',
        field: 'created',
        //format: (val: any) => `${val.substr(0, 150)}...`,
    },
]
const posts = ref([] as any)

onMounted(async () => {
    document.title = 'Администрирование'
    try {
        const resp = await store.dispatch(UserMutatuinTypes.CheckToken)
        PostService.SetHeader()
    } catch (error) {
        router.push({ name: "home" })
    }
    posts.value = await PostService.GetPosts()
});
function editPost(evt: any, row: any, index: any) {
    router.push({ name: 'editPost', params: { id: row.id } });
}
async function deletePost() {
    if (select.value.length == 0) {
        console.log("Нужно выбрать")
    } else {
        const post = select.value[0]
        try {
            const resp = await PostService.DeletePost(post.id)
            console.log(resp)
            if (resp?.status == 204) {
                posts.value.splice(posts.value.indexOf(post), 1)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<template>
    <q-page padding>
        <div>
            <q-table
                title="Posts"
                :rows="posts"
                :columns="columns"
                row-key="name"
                @row-click="editPost"
                v-model:selected="select"
                selection="single"
            >
                <template v-slot:top>
                    <q-btn
                        color="primary"
                        label="Добавить статью"
                        @click="() => router.push({ name: 'createPost' })"
                    />
                    <q-btn
                        class="q-ma-sm"
                        color="primary"
                        label="Удалить статью"
                        @click="deletePost"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>
