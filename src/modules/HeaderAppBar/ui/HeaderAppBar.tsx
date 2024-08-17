import { Button } from '@/ui/Button'
import cls from './HeaderAppBar.module.scss'
import logoIcon from '@/assets/images/internet.png'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { ProfileAvatar } from '@/components/ProfileAvatar/ui/ProfileAvatar'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsInited } from '../model/selectors/getIsInited'
import { useAppDispatch } from '@/providers/StoreProvider'
import { authSliceActions } from '../model/slice/authSlice'
import { getUserData } from '../model/selectors/getUserData'

export const HeaderAppBar = () => {
  const isInited = useSelector(getIsInited)
  const user = useSelector(getUserData)

  const dispatch = useAppDispatch()

  const onLogout = () => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    dispatch(authSliceActions.logout())
  }

  return (
    <div className={cls.appBar}>
      <div className="container">
        <div className={cls.headerWrapper}>
          <NavLink to={'/'} data-testid="LogoLink">
            <div className="flex items-center gap-[5px]">
              <img
                src={`${typeof logoIcon === 'function' ? '' : logoIcon}`}
                alt="logo internet icon"
              />
              <span className="font-medium text-[20px]">Maps</span>
            </div>
          </NavLink>

          <div className="self-center flex items-center gap-[10px]">
            {isInited && (
              <p data-testid="UserName">{user?.username || user?.email}</p>
            )}

            <ProfileAvatar inited={isInited} avatarLink={user?.avatar ?? ''} />

            {isInited && (
              <Button
                data-testid="LogoutBtn"
                onClick={onLogout}
                variant="outline"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
