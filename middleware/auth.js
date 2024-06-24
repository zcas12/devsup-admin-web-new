export default defineNuxtRouteMiddleware(async (to, from) => {
    const {$axios} = useNuxtApp();
    if (import.meta.client) {
        try {
            await $axios.get('/devsup/api/auth/session-check');
        } catch (e) {
            console.log(e.response?.status)
            if (to.path !== '/login') {
                return navigateTo('/login')
            }
        }
    }
});