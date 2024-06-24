import { defineStore } from 'pinia'
export const useLayoutsStore = defineStore('layouts', {
    state: () => {
        return {
            isCollapse:false,
            navList:[
                {
                    path: "/dashboard/",
                    name: "dashboard",
                    title: "대시보드",
                },{
                    path: "/scenario/",
                    name: "scenario",
                    title: "시나리오",
                }, {
                    path: "/log-history/",
                    name: "log-history",
                    title: "활동내역",
                }
            ]
        }
    },
    getters: {
        getIsCollapse: (state) => state.isCollapse,
        getNavList: (state) => state.navList,
    },
    actions: {
        setIsCollapse(val: boolean) {
            this.isCollapse = val
        },
    }
})