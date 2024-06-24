import {defineStore} from 'pinia'
import { Fetch } from '~/composables/Fetch'

const dashboardPath = '/devsup/api/dashboard';
export const useDashboardStore = defineStore('dashboard', {
    state: () => {
        return {
            categoryCnt: [],
            totalCnt: 0,
            riseCnt: 0,
            searchCnt: 0,
            rankData: [],
            timezoneData: []
        }
    },
    getters: {
        getCategoryCnt: (state) => state.categoryCnt,
        getTotalCnt: (state) => state.totalCnt,
        getRiseCnt: (state) => state.riseCnt,
        getSearchCnt: (state) => state.searchCnt,
        getRankData: (state) => state.rankData,
        getTimezoneData: (state) => state.timezoneData,
    },
    actions: {
        async loadExec(params){
            try {
                const response = await Fetch(`${dashboardPath}/exec`, {params});
                const result = response?.resultData;
                this.totalCnt = result.totalCnt;
                this.riseCnt = result.totalCnt - result.beforeCnt ? result.totalCnt - result.beforeCnt : 0;
                console.log()
                this.categoryCnt = result.categoryCnt;
                this.searchCnt = result.searchCnt;

            } catch (error) {
                console.error('Error fetching:', error)
            }
        },
        async loadRank(params){
            try {

                const response = await Fetch(`${dashboardPath}/rank`, {params});
                this.rankData = response.resultData
            } catch (error) {
                console.error('Error fetching:', error)
            }
        },
      async loadTimezone(params){
            try {
                const response = await Fetch(`${dashboardPath}/timezone`, {params});
                this.timezoneData = response?.resultData

            } catch (error) {
                console.error('Error fetching:', error)
            }
        }
    }
})
