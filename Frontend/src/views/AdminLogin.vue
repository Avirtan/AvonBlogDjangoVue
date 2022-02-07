<script setup lang="ts">
import { useStore } from 'vuex'
import { UserKey } from "@/store/userStore";
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserMutatuinTypes from "@/store/userMutatuinTypes"

const login = ref("")
const password = ref("")
const isPwd = ref(true)
const router = useRouter()
const store = useStore(UserKey)
async function onSubmit() {
    const data = {
        "username": login.value,
        "password": password.value
    }
    try {
        const resp = await store.dispatch(UserMutatuinTypes.Login, data)
        console.log(resp)
        router.push({ name: "admin" })
    } catch (error) {
        console.log(error);
    }
}
function onReset() {
    login.value = ""
    password.value = ""
}
</script>

<template>
    <q-page>
        <div class="row items-center justify-center" style="min-height: inherit;">
            <q-form @submit="onSubmit" @reset="onReset" class="col-xs-8 col-sm-4">
                <q-input
                    class="q-mb-sm"
                    filled
                    v-model="login"
                    label="Ващ логин *"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите логин']"
                />
                <q-input
                    class="q-mb-sm"
                    :type="isPwd ? 'password' : 'text'"
                    filled
                    v-model="password"
                    label="Ваш пароль *"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите пароль']"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>

                <div>
                    <q-btn label="Войти" type="submit" color="primary" />
                    <q-btn label="Сброс" type="reset" color="negative" class="q-ml-sm" />
                </div>
            </q-form>
        </div>
    </q-page>
</template>