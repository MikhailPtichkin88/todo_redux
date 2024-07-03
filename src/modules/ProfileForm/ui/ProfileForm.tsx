import { useUserStore } from '@/modules/HeaderAppBar'
import { initialUserData } from '@/shared/const/initialUserData'
import { Button } from '@/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/Card'
import { LabeledInput } from '@/ui/Input'
import { UserAvatar } from '@/ui/UserAvatar'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { IProfileData, useProfileStore } from '../store/useProfileStore'
import cls from './ProfileForm.module.scss'

export const ProfileForm = () => {
  const { user, setUserData } = useUserStore()
  const {
    profile: { email, username, avatar },
    setProfileData,
    resetProfileData,
  } = useProfileStore()
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IProfileData>({ mode: 'onBlur' })

  const { updateProfile, isPending } = useUpdateProfile({
    userId: user?.id,
    setUserData,
  })

  const onCancel = () => {
    reset({ ...initialUserData, ...user })
  }

  const onSubmit = handleSubmit((data: IProfileData) => {
    updateProfile(data)
  })

  useEffect(() => {
    setProfileData(user)

    return () => {
      resetProfileData()
      reset()
    }
  }, [])

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
                defaultValue={email}
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
                defaultValue={username}
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
                defaultValue={avatar}
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
              <UserAvatar width={200} height={200} avatarLink={user?.avatar} />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className={cls.footer}>
        <Button
          data-testid="updateProfileBtn"
          disabled={isPending}
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
