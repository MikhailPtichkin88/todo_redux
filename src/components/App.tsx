import { Link, Outlet } from "react-router-dom"
import cls from "./App.module.scss"
import png from "@/assets/pngImage.png"
import jpeg from "@/assets/jpegImage.jpeg"
import Svg from "@/assets/svgImage.svg"
export const App = () => {

  return <div>
    <Link to={'/about'}>About</Link>
    <br />
    <Link to={"/shop"}>Shop</Link>
    <br />
    <button className={cls.button}>button</button>
    <div>
    <img src={png} alt="png"  width={100} height={100}/>
    <img src={jpeg} alt="jpeg"  width={100} height={100}/>
    <Svg width={100} height={100} color="yellow"/>
    <div>{`App is running in ${__ENV__} mode`}</div>
    </div>
    <Outlet />
  </div>
}
