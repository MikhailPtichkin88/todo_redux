import { useEffect } from "react"
import {AppRouter, useAuthStore} from "@/modules/AppRouter"


export const App = () => {
  const {checkAuthorized} = useAuthStore()

  useEffect(()=>{
    checkAuthorized()
  },[])
  
  return <div className="app">
    <AppRouter />
  </div>
}
