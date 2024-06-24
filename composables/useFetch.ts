import { useFetch } from 'nuxt/app';

export function UseFetch(url: string, options: any = {}) {
    const token = localStorage.getItem('accessToken');

    // 옵션 객체에 헤더 추가
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    };

    // useFetch 호출
    return useFetch(url, options);
}