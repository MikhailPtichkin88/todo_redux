import { useEffect } from "react"
import {AppRouter, useAuthStore} from "@/modules/AppRouter"
import { HeaderAppBar } from "./modules/HeaderAppBar/ui/HeaderAppBar"


export const App = () => {
  const {checkAuthorized} = useAuthStore()

  useEffect(()=>{
    checkAuthorized()
  },[])
  
  return <div className="app">
    <HeaderAppBar />
    <div className="container">
    <AppRouter />
    </div>
  </div>
}
