import {defineStore} from 'pinia';
import {Fetch} from "../composables/Fetch.js";
import { useNuxtApp } from 'nuxt/app'
const scenarioPath = '/devsup/api/scenario';
export const useScenarioStore = defineStore('scenario',{
    state: () => {
        return {
            scenarioList: [],
            selectedScenario:{}
        }
    },
    getters: {
        getScenarioList: (state) => state.scenarioList,
        getSelectedScenario: (state) => state.selectedScenario,
    },
    actions: {
        setSelectedScenario(val){
          this.selectedScenario = val
        },
        async loadScenario(){
            try {
                const response = await Fetch(`${scenarioPath}`);
                this.scenarioList = response?.resultData;
            }catch (error){
                console.error('Error fetching:', error);
            }
        },
        async selectScenario(params){
            try {
                const response = await Fetch(`${scenarioPath}/detail`,{params});

                this.selectedScenario = response?.resultData;
            }catch (error){
                console.error('Error fetching:', error);
            }
        },
        saveScenario(params){
            const { $axios } = useNuxtApp();
            return new Promise((resolve, reject) => {
                $axios.post(`${scenarioPath}/save`,params).then(result=>{
                    resolve(result)
                }).catch(error => reject(error));
            });
        },
        saveScenarioChild(params){
            const { $axios } = useNuxtApp();
            return new Promise((resolve, reject) => {
                $axios.post(`${scenarioPath}/children/save`,params).then(result=>{
                    resolve(result)
                }).catch(error => reject(error));
            });
        },
        deleteScenario(ids){
            const { $axios } = useNuxtApp();
            return new Promise((resolve, reject) => {
                $axios.post(`${scenarioPath}/delete`,ids).then(result=>{
                    resolve(result)
                }).catch(error => reject(error));
            });
        },
        async exportScenario(type){
            const { $axios } = useNuxtApp();
            return await $axios.get(`${scenarioPath}/export?type=${type}`,{ responseType: 'blob' })
        }
    }
})