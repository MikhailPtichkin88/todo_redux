import { Card, CardContent, CardFooter, CardTitle } from '@/ui/Card'
import cls from './LoginForm.module.scss'
import { Button } from '@/ui/Button'
import { LabeledInput } from '@/ui/Input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { ILoginData, useLoginMutation, useRegisterMutation } from '../api/api'
import { useSelector } from 'react-redux'
import { authSliceActions, getIsInited } from '@/modules/HeaderAppBar'
import { toast } from 'sonner'
import { useAppDispatch } from '@/providers/StoreProvider'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

export const LoginForm = () => {
  const isInited = useSelector(getIsInited)
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const [registerUser] = useRegisterMutation()
  const navigate = useNavigate()

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginData>({ mode: 'onBlur' })

  const onSubmit = async (data: ILoginData, type: 'login' | 'register') => {
    console.log(errors)
    await trigger()
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      return
    }

    try {
      let userData
      if (type === 'login') {
        userData = await login(data).unwrap()
      } else {
        userData = await registerUser(data).unwrap()
      }
      if (!userData) {
        return toast.error(`error`)
      }
      dispatch(authSliceActions.updateUserData(userData))
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData))
      toast.success(`You have successfully ${type}`)
      reset()
      navigate('/')
    } catch (error) {
      toast.error(`${type} error`)
    }
  }

  const handleLogin = handleSubmit((data) => onSubmit(data, 'login'))
  const handleRegister = handleSubmit((data) => onSubmit(data, 'register'))

  useEffect(() => {
    reset({ email: '', password: '' })
  }, [])

  if (isInited) {
    return <Navigate to={`/`} />
  }

  return (
    <Card className={cls.cardWrapper} data-testid={'LoginPage'}>
      <CardTitle className={cls.title}>Create project</CardTitle>

      <form>
        <CardContent className={cls.contentWrapper}>
          <LabeledInput
            data-testid="LoginForm.emailInput"
            label="email"
            id="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'email required',
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
            data-testid="LoginForm.passwordInput"
            type="password"
            label="password"
            id="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'password required',
              minLength: {
                value: 5,
                message: 'password is less than 5 symbols',
              },
            })}
          />
          {errors?.password?.message && (
            <span className={cls.error}>{errors?.password?.message}</span>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            data-testid="LoginBtn"
            onClick={handleLogin}
            variant="outline"
          >
            Login
          </Button>
          <Button data-testid="RegisterBtn" onClick={handleRegister}>
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
