import { $fetch } from 'ofetch'

export function Fetch(url, options) {
    const token = localStorage.getItem('accessToken');
    const fetch = $fetch.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return fetch(url, options);
}
