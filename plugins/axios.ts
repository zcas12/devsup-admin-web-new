import { defineNuxtPlugin } from 'nuxt/app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const axiosInstance = axios.create({
        baseURL: '/',
    })
    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (error) => {
            // 요청 오류가 있는 작업 수행
            return Promise.reject(error)
        }
    )
    nuxtApp.provide('axios', axiosInstance);
})
