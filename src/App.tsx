import { useEffect } from "react"
import {AppRouter} from "@/modules/AppRouter"
import { HeaderAppBar, useUserStore } from "@/modules/HeaderAppBar"


export const App = () => {

  const {_inited, mockMeRequest} = useUserStore()

  useEffect(()=>{
    if(!_inited){
      mockMeRequest()
    }
  },[])
  
  return <div className="app">
    <HeaderAppBar />
    <div className="container">
    <AppRouter />
    </div>
  </div>
}
