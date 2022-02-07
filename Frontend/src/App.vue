<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { UserKey } from "@/store/userStore";
import StorageLocal from "@/services/localStorage"
import UserMutatuinTypes from "@/store/userMutatuinTypes"
import { computed, onMounted, onUnmounted, ref } from 'vue';

const router = useRouter()
const store = useStore(UserKey)

if (StorageLocal.getData("token")) {
    store.commit(UserMutatuinTypes.Login)
}
let auth = computed(() => store.state.isAuth)
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value

}

let windowWidth = ref(window.innerWidth)
const onWidthChange = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))
const type = computed(() => {
    if (windowWidth.value < 550) return 'xs'
    if (windowWidth.value >= 550 && windowWidth.value < 1200) return 'md'
    if (windowWidth.value >= 1200) return 'lg'
    return null; // This is an unreachable line, simply to keep eslint happy.
})
const width = computed(() => windowWidth.value)
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="q-header fixed-top q-header--bordered header" height-hint="98">
            <q-tabs shrink v-if="type != 'xs'">
                <q-tab name="home" label="Главная" @click="() => router.push({ name: 'home' })" />
                <q-tab name="blog" label="Блог" @click="() => router.push({ name: 'posts' })" />
                <q-tab
                    v-if="auth"
                    name="admin"
                    label="Администрирование"
                    @click="() => router.push({ name: 'admin' })"
                />
            </q-tabs>
            <q-toolbar shrink v-if="type == 'xs'">
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
            </q-toolbar>
        </q-header>
        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered v-if="type == 'xs'" class="text-center">
            <q-item clickable v-ripple @click="() => router.push({ name: 'home' })">
                <q-item-section>Главная</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="() => router.push({ name: 'posts' })">
                <q-item-section>Блог</q-item-section>
            </q-item>
            <q-item v-if="auth" clickable v-ripple @click="() => router.push({ name: 'admin' })">
                <q-item-section>Администрирование</q-item-section>
            </q-item>
        </q-drawer>
        <q-page-container class="row justify-center q-gutter-md q-pa-md">
            <div class="col-xs-12 col-md-8">
                <router-view />
                <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
                    <q-btn fab icon="keyboard_arrow_up" />
                </q-page-scroller>
            </div>
        </q-page-container>

        <footer>
            <q-toolbar-title class="footer text-white shadow-2">
                <div class="row justify-center">
                    <div class="column">
                        <div class="text-center q-ma-md col-2" style="font-size:1.2em;">Контактная информация</div>
                        <q-btn
                            style="color: #000000; background-color: white;"
                            label="Написать Вконтакте"
                            class="q-mt-md"
                        />
                        <q-btn
                            style="color: #000000; background-color: white;"
                            label="Написать WhatsApp"
                            class="q-mt-md"
                        />
                        <q-btn
                            style="color: #000000; background-color: white;"
                            label="+78005553535"
                            class="q-mt-md"
                        />
                    </div>
                </div>
            </q-toolbar-title>
        </footer>
    </q-layout>
</template>

<style>
.header {
    backdrop-filter: blur(7px);
    background-color: #a5079893;
}
.footer {
    background-color: #a5079893;
    height: 300px;
}
body {
    background-color: rgb(240, 240, 240);
    font-family: 'Montserrat Alternates', sans-serif;
}
.q-tab__label {
    font-weight: bold;
}

</style>
