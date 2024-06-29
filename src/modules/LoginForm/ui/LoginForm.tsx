import { Card, CardContent, CardFooter, CardTitle } from "@/ui/Card"
import cls from "./LoginForm.module.scss"

import { LabeledInput } from "@/ui/Input"
import { Button } from "@/ui/Button"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { IAuthForm, authService } from "../api/api"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { toast } from "sonner"
import { Navigate, useNavigate } from "react-router-dom"
import { useUserStore } from "@/modules/HeaderAppBar"

export const LoginForm = () => {
  const { _inited, setUserData } = useUserStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IAuthForm>({ mode: "onBlur" })

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: ({ data, type }: { data: IAuthForm, type: "login" | "register" }) => {
      return authService.main(data, type)
    },
    onSuccess: (data, { type }) => {
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data))
      setUserData(data)
      toast.success(`You have successfully ${type}`)
      reset()
      navigate('/')
    },
    onError: (error, { type }) => {
      console.error(error)
      toast.error(`${type} request failed`, { description: error?.message ?? "" })
      reset()
    }
  })

  const onSubmit = (data: IAuthForm, type: "login" | "register") => {
    mutate({ data, type })
  }

  const handleLogin = handleSubmit(data => onSubmit(data, "login"))
  const handleRegister = handleSubmit(data => onSubmit(data, "register"))

  useEffect(() => {
    reset({ email: "", password: "" })
  }, [])

  if (_inited) {
    return (
      <Navigate to={`/`} />
    )
  }

  return (
  <Card className={cls.cardWrapper}>
    <CardTitle className={cls.title}>Create project</CardTitle>

    <form >
      <CardContent className={cls.contentWrapper}>

        <LabeledInput
          label="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true, pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
        
        {
          errors?.email?.message &&
          <span className={cls.error}>{errors.email.message}</span>
        }

        <LabeledInput
          type="password"
          label="password"
          id="password"
          placeholder="Enter your password"
          {...register("password", { minLength: { value: 5, message: "password is less than 5 symbols" } })}
        />
        {
          errors?.password?.message &&
          <span className={cls.error}>{errors?.password?.message}</span>
        }

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleLogin} variant="outline">Login</Button>
        <Button onClick={handleRegister}>Register</Button>
      </CardFooter>
    </form>
  </Card>
  )
}
