import { Card, CardContent, CardFooter, CardTitle } from '@/ui/Card'
import cls from './LoginForm.module.scss'

import { useUserStore } from '@/modules/HeaderAppBar'
import { Button } from '@/ui/Button'
import { LabeledInput } from '@/ui/Input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { IAuthForm } from '../api/api'
import { useAuth } from '../hooks/useAuth'

export const LoginForm = () => {
  const { _inited, setUserData } = useUserStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthForm>({ mode: 'onBlur' })

  const { mutate: loginOrRegister } = useAuth({ setUserData, resetForm: reset })

  const onSubmit = (data: IAuthForm, type: 'login' | 'register') => {
    loginOrRegister({ data, type })
  }

  const handleLogin = handleSubmit((data) => onSubmit(data, 'login'))
  const handleRegister = handleSubmit((data) => onSubmit(data, 'register'))

  useEffect(() => {
    reset({ email: '', password: '' })
  }, [])

  if (_inited) {
    return <Navigate to={`/`} />
  }

  return (
    <Card className={cls.cardWrapper} data-testid={'LoginPage'}>
      <CardTitle className={cls.title}>Create project</CardTitle>

      <form>
        <CardContent className={cls.contentWrapper}>
          <LabeledInput
            label="email"
            id="email"
            placeholder="Enter your email"
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleLogin} variant="outline">
            Login
          </Button>
          <Button onClick={handleRegister}>Register</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
