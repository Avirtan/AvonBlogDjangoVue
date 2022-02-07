<script setup lang="ts">
import { onMounted, ref } from "vue";
import PostService from "@/services/postService";
import { useRouter } from "vue-router";


const router = useRouter()
const posts = ref([] as any)
onMounted(async () => {
    document.title = 'Главная'
    const data: any = await PostService.GetPostsPage()
    //console.log(posts.value.lenght)
    posts.value = data["posts"]
});
const name = ref("")
const secondName = ref("")
const email = ref("")
const phone = ref("")
const date = ref("")
const index = ref("")
const address = ref("")
async function onSubmit() {
    const data = {
        "name": name.value,
        "secondName": secondName.value,
        "email": email.value,
        "phone": phone.value,
        "date": date.value,
        "index": index.value,
        "address": address.value,
    }
    const resp = await PostService.SendEmail(data)
    //console.log(resp)
    name.value = ""
    secondName.value = ""
    email.value = ""
    phone.value = ""
    date.value = ""
    index.value = ""
    address.value = ""
}
</script>

<template>
    <q-page class="q-pa-md">
        <q-parallax
            :speed="1"
            :height="300"
            src="https://sun9-2.userapi.com/impg/uxUg86WBXepvb1vx25i7Tn8hickq-pODHgbPVA/6EwUkGybYZI.jpg?size=1280x720&quality=96&sign=860f9ba702086a6bcbf5123f58bcdf10&type=album"
        >
            <template v-slot:content="scope">
                <div class="absolute column items-center">
                    <div class="text-h1 text-white text-center">Avon</div>
                    <div class="text-h6 text-grey-3 text-center">Ваш Avon координатор</div>
                </div>
            </template>
        </q-parallax>
        <div>
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <div class="column justify-evenly items-center q-ma-md full-height">
                        <span
                            class="text-center text-h4 "
                        >Обо мне</span>
                        <span
                            class
                            style="font-size: 20px;"
                        >Proident sint eiusmod reprehenderit exercitation eiusmod excepteur exercitation dolor ex laboris dolore ipsum ullamco. Deserunt fugiat non aliqua nostrud ut incididunt. Ullamco aliqua quis mollit et. Anim reprehenderit ullamco reprehenderit qui excepteur ullamco. Sit consequat veniam culpa laborum excepteur irure enim do mollit labore esse ullamco. Laborum est ullamco qui proident magna in proident consequat nostrud.</span>
                        <q-btn
                            style="background: #a50799; color: white"
                            label="Каталог Avon"
                            size="lg"
                            class="full-width"
                        />
                        <q-btn
                            style="background: #a50799; color: white"
                            label="Связаться в WhatsApp"
                            size="lg"
                            class="full-width"
                        />
                        <q-btn
                            style="background: #a50799; color: white"
                            label="Вконтакте"
                            size="lg"
                            class="full-width"
                        />
                    </div>
                </div>
                <div class="col q-ma-md">
                    <q-parallax
                        :height="600"
                        :speed="2"
                        src="https://avonkatalogs.ru/012022/1_m.jpg"
                    ></q-parallax>
                </div>
            </div>
        </div>
        <div>
            <div class="text-center text-h4 q-ma-xl">Заполните анкету, чтобы присоединиться к AVON</div>
            <q-form @submit="onSubmit" class="q-gutter-md row justify-center">
                <q-input
                    filled
                    v-model="name"
                    label="Имя *"
                    class="col-xs-8 col-sm-5 col-md-5"
                    :dense="false"
                    :rules="[val => val && val.length > 0 || 'Введите имя']"
                />
                <q-input
                    filled
                    v-model="secondName"
                    label="Фамилия *"
                    class="col-xs-8 col-sm-5 col-md-5"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите Фамилию']"
                />
                <q-input
                    filled
                    type="email"
                    v-model="email"
                    label="Email *"
                    class="col-xs-8 col-sm-5 col-md-5"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите email']"
                />
                <q-input
                    filled
                    v-model="phone"
                    label="Номер телефона *"
                    mask="+7-###-###-##-##"
                    class="col-xs-8 col-sm-5 col-md-5"
                    type="tel"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите номер']"
                />
                <q-input
                    v-model="date"
                    filled
                    type="date"
                    hint="Дата рождения"
                    class="col-xs-8 col-sm-5 col-md-5"
                    :rules="[val => val && val.length > 0 || 'Выберите дату']"
                />
                <q-input
                    filled
                    v-model="index"
                    label="Индекс *"
                    lazy-rules
                    class="col-xs-8 col-sm-5 col-md-5"
                    :rules="[val => val && val.length > 0 || 'Введите индекс']"
                />
                <q-input
                    filled
                    v-model="address"
                    label="Адрес *"
                    class="col-xs-8 col-sm-5 col-md-5"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите адрес']"
                    hint="Формат(Архангельская обл. г.Архангельск ул.Гагарина д.5)"
                />
                <q-btn
                    style="background: #a50799; color: white"
                    label="Отправить"
                    type="submit"
                    size="lg"
                    class="col-xs-8 col-sm-5 col-md-5"
                />
            </q-form>
        </div>
        <div class="text-center text-h3 q-ma-xl">Мой блог</div>
        <div class="q-gutter-xl row justify-around">
            <div class="col-xs-11 col-sm-5 col-md-5" v-for="(post, index) in posts" :key="index">
                <q-card
                    class="full-width"
                    style="display: flex; flex-direction: column; justify-content: space-between"
                >
                    <div>
                        <img :src="post.img" style="object-fit:contain;width: 100%;" />
                        <q-card-section>
                            <div class="text-h6">{{ post.name }}</div>
                        </q-card-section>
                    </div>

                    <q-card-actions>
                        <q-btn
                            flat
                            color="primary"
                            class="col"
                            @click="() => router.push({ name: 'post', params: { id: post.id } })"
                        >Читать</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<style></style>