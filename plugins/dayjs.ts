import {defineNuxtPlugin} from "nuxt/app";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('dayjs', dayjs)
})