import { ProfileForm, profileSliceReducer } from '@/modules/ProfileForm'
import { DynamicModuleLoader } from '@/providers/DynamicModuleLoader/DynamicModuleLoader'
import { TReducersList } from '@/shared/types/types'

const reducers: TReducersList = {
  profile: profileSliceReducer,
}

const ProfilePage = () => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div data-testid="ProfilePage">
        <ProfileForm />
      </div>
    </DynamicModuleLoader>
  )
}
export default ProfilePage
