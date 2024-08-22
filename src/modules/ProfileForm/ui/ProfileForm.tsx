import { getUserData } from '@/modules/HeaderAppBar'
import { useAppDispatch } from '@/providers/StoreProvider'
import { Button } from '@/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/Card'
import { LabeledInput } from '@/ui/Input'
import { Loader } from '@/ui/PageLoader'
import { UserAvatar } from '@/ui/UserAvatar'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getProfileData } from '../model/selectors/getProfileData/getProfileData'
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { fetchProfileTh } from '../model/services/fetchProfileTh/fetchProfileTh'
import { IProfileData } from '../model/types/types'
import cls from './ProfileForm.module.scss'
import { updateProfileTh } from '../model/services/updateProfileTh/updateProfileTh'

export const ProfileForm = () => {
  const initialUserData = useSelector(getUserData)
  const profileData = useSelector(getProfileData)
  const loading = useSelector(getProfileIsLoading)
  const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IProfileData>({ mode: 'onBlur' })

  const onCancel = () => {
    reset({ ...initialUserData })
  }

  const onSubmit = handleSubmit((data: IProfileData) => {
    dispatch(updateProfileTh({ userId: initialUserData.id, data }))
  })

  useEffect(() => {
    dispatch(
      fetchProfileTh({ userId: initialUserData.id, resetFormData: reset })
    )
    return () => {
      reset()
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Card className={cls.cardWrapper}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <div className={cls.contentWrapper}>
            <div className={cls.formBlock}>
              <LabeledInput
                data-testid="ProfilePage.emailInput"
                label="email"
                id="email"
                placeholder="Enter your email"
                defaultValue={initialUserData?.email}
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />

              {errors?.email?.message && (
                <span className={cls.error}>{errors.email.message}</span>
              )}

              <LabeledInput
                data-testid="ProfilePage.nameInput"
                label="name"
                id="username"
                placeholder="Enter your name"
                defaultValue={initialUserData?.username}
                {...register('username', {
                  minLength: {
                    value: 2,
                    message: 'user name is less than 2 symbols',
                  },
                })}
              />

              {errors?.username?.message && (
                <span className={cls.error}>{errors?.username?.message}</span>
              )}

              <LabeledInput
                data-testid="ProfilePage.avatarInput"
                label="avatar link"
                id="avatar"
                placeholder="Paste your avatar link"
                defaultValue={initialUserData?.avatar}
                {...register('avatar', {
                  pattern: {
                    value:
                      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    message: 'invalid link',
                  },
                })}
              />

              {errors?.avatar?.message && (
                <span className={cls.error}>{errors?.avatar?.message}</span>
              )}

              <LabeledInput
                data-testid="ProfilePage.passwordInput"
                type="password"
                label="password"
                id="password"
                placeholder="Enter your password"
                {...register('password', {
                  minLength: {
                    value: 5,
                    message: 'password is less than 5 symbols',
                  },
                })}
              />

              {errors?.password?.message && (
                <span className={cls.error}>{errors?.password?.message}</span>
              )}
            </div>

            <div className={cls.avatarBlock}>
              <UserAvatar
                width={200}
                height={200}
                avatarLink={profileData?.avatar}
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className={cls.footer}>
        <Button
          data-testid="updateProfileBtn"
          disabled={loading}
          onClick={onSubmit}
          variant="outline"
        >
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </CardFooter>
    </Card>
  )
}
