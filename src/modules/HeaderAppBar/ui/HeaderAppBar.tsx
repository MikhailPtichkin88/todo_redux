
import { Button } from "@/ui/Button"
import cls from "./HeaderAppBar.module.scss"
import logoIcon from "@/assets/images/internet.png"
import { UserAvatar } from "@/components/UserAvatar"
import { useUserStore } from "../store/useUserStore"
interface IHeaderAppBarProps {

}

export const HeaderAppBar = ({ }: IHeaderAppBarProps) => {

  const { getIsUserInited, ...user } = useUserStore()

  return <div className={cls.appBar}>
    <div className="container">
      <div className={cls.headerWrapper}>
        <div className="flex items-center gap-[5px]">
          <img src={logoIcon} alt="logo internet icon" />
          <span className="font-medium text-[20px]">Logo</span>
        </div>

        <div className="self-center flex items-center gap-[10px]">

          {getIsUserInited() &&
            <p>{user?.email}</p>}

          <UserAvatar avatarLink={user?.avatar} />

          {getIsUserInited() && (
            <Button variant="outline" >Logout</Button>
          )
          }
        </div>
      </div>
    </div>
  </div>
}
