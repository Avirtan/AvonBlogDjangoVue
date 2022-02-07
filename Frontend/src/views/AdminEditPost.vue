<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import PostService from "@/services/postService";

const route = useRoute()
const router = useRouter()
const id: number = Number(route.params.id as String)
const post = ref(null as any)
const file = ref(null as any)
const isload = ref(false)
onMounted(async () => {
    post.value = await PostService.GetPost(id)
    // console.log(post.value)
    isload.value = true
});
async function onSubmit() {
    let formData = new FormData();
    formData.append('name', post.value.name);
    formData.append('text', post.value.text);
    if (file.value != null) formData.append('file', file.value);
    else formData.append('file', post.value.img.split("/media/")[1]);
    try {
        // console.log(formData.get("file"))
        const resp = await PostService.EditPost(formData, post.value.id)
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <q-page>
        <div class="row items-top justify-center" style="min-height: inherit;">
            <q-form @submit="onSubmit" class="col-xs-11 col-sm-12" v-if="isload">
                <q-input
                    v-model="post.name"
                    filled
                    autogrow
                    class="q-mt-md"
                    label="Название статьи"
                    :rules="[val => val && val.length > 0 || 'Поле пустое']"
                />
                <q-editor
                    v-model="post.text"
                    min-height="5rem"
                    class="q-mt-md"
                    :toolbar="[
                        ['bold', 'italic', 'strike', 'underline'],
                        ['upload', 'save'],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                    
                    ]"
                />
                <q-file
                    v-model="file"
                    label="Выберете изображение"
                    filled
                    counter
                    style="max-width: 300px"
                    class="q-mt-md"
                />
                <div>
                    <q-btn label="Обновить" type="submit" color="primary" class="q-mt-md" />
                </div>
            </q-form>
        </div>
    </q-page>
</template>