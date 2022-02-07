<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import PostService from "@/services/postService";

const route = useRoute()
const id: number = Number(route.params.id as String)
const post = ref(null as any)
const isload = ref(false)
onMounted(async () => {
    post.value = await PostService.GetPost(id)
    console.log(post.value.img)
    isload.value = true
    document.title = 'Статья: '+post.value.name
});
</script>

<template>
    <q-page padding v-if="isload">
        <div class="q-pa-md row">
            <q-img :src="post.img" class="col" style="height: 250px; max-width: 100%"></q-img>
        </div>
        <div class="q-pa-md row" v-if="isload">
            <q-card bordered class="bg-whate-9 my-card col">
                <q-card-section>
                    <div class="text-h6">{{ post.name }}</div>
                </q-card-section>
                <q-separator />
                <q-separator dark inset />

                <q-card-section v-html="post.text"></q-card-section>
            </q-card>
        </div>
    </q-page>
</template>