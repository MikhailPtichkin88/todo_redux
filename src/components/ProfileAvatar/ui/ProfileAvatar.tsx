import { UserAvatar } from '@/ui/UserAvatar'
import { HTMLProps } from 'react'
import { NavLink } from 'react-router-dom'

interface IProfileAvatarProps extends HTMLProps<HTMLImageElement> {
  wrapperClassName?: string
  avatarLink: string
  inited: boolean
}

export const ProfileAvatar = ({
  inited,
  avatarLink,
  wrapperClassName,
  className = '',
}: IProfileAvatarProps) => {
  if (!inited) {
    return <UserAvatar avatarLink={undefined} className={className} />
  }

  return (
    <NavLink to={'/profile'} className={wrapperClassName}>
      <UserAvatar avatarLink={avatarLink} className={className} />
    </NavLink>
  )
}
