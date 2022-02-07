<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import PostService from "@/services/postService";

const router = useRouter()
const name = ref("")
const text = ref("")
const file = ref(null as any)
async function onSubmit() {
    let formData = new FormData();
    const data = {
        "name": name.value,
        "text": text.value
    }
    formData.append('name', name.value);
    formData.append('text', text.value);
    formData.append('file', file.value);
    console.log(formData)
    try {
        const resp = await PostService.CreatePost(formData)
        if (resp?.status == 201) {
            router.push({ name: `admin` })
        }
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <q-page>
        <div class="row items-top justify-center" style="min-height: inherit;">
            <q-form @submit="onSubmit" class="col-xs-11 col-sm-12">
                <q-input
                    v-model="name"
                    filled
                    autogrow
                    class="q-mt-md"
                    :rules="[val => val && val.length > 0 || 'Поле пустое']"
                    label="Название статьи"
                />
                <q-editor
                    v-model="text"
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
                    <q-btn label="Добавить" type="submit" color="primary" />
                </div>
            </q-form>
        </div>
    </q-page>
</template>