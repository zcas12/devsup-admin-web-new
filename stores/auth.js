import { defineStore } from 'pinia'
import { useNuxtApp } from 'nuxt/app'

const authPath = '/devsup/api/auth';

export const useAuthStore = defineStore('auth', {
    id: 'auth', // 고유한 식별자로 설정
    state: () => {
        return {
            token:"",
        }
    },
    getters: {
        getToken: (state) => state.token,
    },
    actions: {
        actionsTest(){
            console.log("actionsTest")
        },
        async login(account){
            try {
                const { $axios } = useNuxtApp();
                const {data} = await $axios.post(`${authPath}/login`, account)
                localStorage.setItem('accessToken', data.token);
                this.token = data.token
                return data
            } catch (error) {
                console.error('Error fetching:', error)
                return error
            }
        }
    }
})