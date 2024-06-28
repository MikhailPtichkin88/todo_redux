import { LoginForm } from "@/modules/LoginForm/ui/LoginForm"
import { Button } from "@/ui/Button"
import { toast } from "sonner"

 const Login = () => {
  
  return <div className="w-full h-[calc(100vh_-_100px)] flex justify-center items-center">
    <LoginForm />
  </div>
}
export default Login