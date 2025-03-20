import { create } from "zustand";

const useThemeStore = create((set)=>({
    currentTheme:localStorage.getItem("chat-theme")||"cupcake",
    switchTheme:(newTheme)=>{
        localStorage.setItem("chat-theme",newTheme)
        set({currentTheme:newTheme})
    }
}))


export {useThemeStore}