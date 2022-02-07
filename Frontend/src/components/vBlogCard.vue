<script setup lang="ts">
import { useRouter } from 'vue-router'


const router = useRouter()
const props = defineProps({
    post: Object as any,
    id: Number,
    scroll: Object as any
})
</script>

<template>
    <div class="col-xs-8 col-sm-5 col-md-5">
        <q-card class="full-height" style="display: flex; flex-direction: column; justify-content: space-between">
            <div>
                <img :src="props.post.img" style="object-fit:contain;width: 100%;"/>
                <q-card-section>
                    <div class="text-h6">{{ props.post.name }}</div>
                </q-card-section>
                 <q-card-section v-html="props.post.text" id="TEXT" />
            </div>
           
            <q-card-actions>
                <q-btn
                    flat
                    color="primary"
                    class="col"
                    @click="() => router.push({ name: 'post', params: { id: props.id } })"
                >Читать</q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>
<style lang="scss">
#TEXT {
    span {
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        display: -webkit-box;
    }
}

</style>