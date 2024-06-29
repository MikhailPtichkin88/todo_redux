import { IUserData } from "@/modules/HeaderAppBar"
import { $api } from "@/shared/api/api"
import { IProfileData } from "../store/useProfileStore"


export const profileService = {
	async update({id, ...data}: IProfileData & {id: string}) {

      const  response = await $api.patch<IUserData>(
         `/user/${id}`,
         data
       )
     
      if (response.data) return response.data
	}
}