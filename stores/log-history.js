import {defineStore} from 'pinia';
import { Fetch } from '../composables/Fetch'

const logPath = '/devsup/api/log';
export const useLogHistoryStore = defineStore('logHistory', {
    state: () => {
        return {
            logHistoryList:[]
        }
    },
    getters: {
        getLogHistoryList: (state) => state.logHistoryList,
    },
    actions: {
        async loadLogHistory(params){
            try {
                const response = await Fetch(`${logPath}/log-history`, {params});
                this.logHistoryList = response?.resultData;
            }catch (error){
                console.error('Error fetching:', error)
            }
        }
    }
})