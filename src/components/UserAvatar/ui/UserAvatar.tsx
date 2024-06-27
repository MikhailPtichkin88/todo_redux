import { useEffect, useState } from "react"
import placeholder from "@/assets/images/avatar.png"
  
interface IUserAvatarProps {
  avatarLink: string
}

export const UserAvatar = ({avatarLink	}:IUserAvatarProps) => {
  
  const [src, setSrc] = useState("")
  
  useEffect(()=>{
    if(avatarLink){
      setSrc(avatarLink)
    }
  },[])

  return <img
  className="w-[50px] h-[50px] rounded-full object-cover"
  src={src}
  alt="users avatar img"
  loading="lazy"
  onError={() => setSrc(placeholder)}
  />
}
