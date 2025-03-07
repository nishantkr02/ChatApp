import {create} from 'zustand'


//const useAuthStore = create(()=>({}))
    const useAuthStore = create(()=>({
       userAuthenticated :null,
       isCheckingAuth :true

    }))


    export {useAuthStore}