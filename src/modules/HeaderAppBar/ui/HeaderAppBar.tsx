
import { Button } from "@/ui/Button"
import cls from "./HeaderAppBar.module.scss"
import logoIcon from "@/assets/images/internet.png"
import { useUserStore } from "../store/useUserStore"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { ProfileAvatar } from "@/components/ProfileAvatar/ui/ProfileAvatar"
import { NavLink } from "react-router-dom"
interface IHeaderAppBarProps {

}

export const HeaderAppBar = ({ }: IHeaderAppBarProps) => {

  const { _inited, user, logout  } = useUserStore()
  const onLogout = ()=>{
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    logout()
  }
  return <div className={cls.appBar}>
    <div className="container">
      <div className={cls.headerWrapper}>

        <NavLink to={"/"}>
        <div className="flex items-center gap-[5px]">
          <img src={logoIcon} alt="logo internet icon" />
          <span className="font-medium text-[20px]">Logo</span>
        </div>
        </NavLink>

        <div className="self-center flex items-center gap-[10px]">

          {_inited &&
            <p>{user?.username || user?.email}</p>}

          <ProfileAvatar inited={_inited} avatarLink={user?.avatar} />

          {_inited && (
            <Button onClick={onLogout} variant="outline" >Logout</Button>
          )
          }
        </div>
      </div>
    </div>
  </div>
}
