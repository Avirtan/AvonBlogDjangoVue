<script setup lang="ts">
import vBlogCard from "@/components/vBlogCard.vue";
import PostService from "@/services/postService";
import { onMounted, ref } from "vue";

const posts = ref([] as any)
const current = ref(1)
const countPage = ref(1)
onMounted(async () => {
    document.title = 'Блог'
    const data: any = await PostService.GetPostsPage()
    posts.value = data["posts"]
    countPage.value = data["countPage"]
});

async function onLoad(index: any, done: () => void) {
    current.value = index
    if (countPage.value > 0 && index < countPage.value) {  
        current.value+=1
        console.log(current.value)
        const data: any = await PostService.GetPostsPage(current.value.toString())
        posts.value.push(...data["posts"])
        done()
    }
}
</script>

<template>
    <q-page>
        <q-infinite-scroll @load="onLoad" :offset="250" id="scroll">
            <!-- <div class="text-center text-h3 q-mt-xl" v-if="posts.lenght == undefined">Нет статей</div> -->
            <div class="q-pt-md q-gutter-lg row justify-center">
                <vBlogCard :post="post" :id="post.id" v-for="(post, index) in posts" :key="index" />
            </div>
            <template v-slot:loading v-if="current < countPage">
                <div class="row justify-center">
                    <q-spinner-dots color="primary" size="40px" />
                </div>
            </template>
        </q-infinite-scroll>
    </q-page>
</template>

<style>

</style>