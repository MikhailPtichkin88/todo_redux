import { HTMLProps, useEffect, useState } from 'react'
import placeholder from '@/assets/images/avatar.png'

interface IUserAvatarProps extends HTMLProps<HTMLImageElement> {
  avatarLink: string
}

export const UserAvatar = ({
  avatarLink,
  className = '',
  width = 50,
  height = 50,
  ...props
}: IUserAvatarProps) => {
  const [src, setSrc] = useState(avatarLink ?? placeholder)

  useEffect(() => {
    if (avatarLink) {
      setSrc(avatarLink)
    }
  }, [])

  return (
    <img
      className={`rounded-full object-cover ${className}`}
      width={width}
      height={height}
      src={src}
      alt="users avatar img"
      loading="lazy"
      onError={() => setSrc(placeholder)}
      {...props}
    />
  )
}
