import {defineNuxtPlugin} from "nuxt/app";
import _ from 'lodash';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            _,
        }
    };
})