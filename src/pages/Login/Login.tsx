import { Button } from "@/ui/Button"
import { toast } from "sonner"

 const Login = () => {
  
  return <div>
    <Button variant="outline" onClick={()=>toast.success("My toast", {
      description: "description"
    })}>Button</Button>
  </div>
}
export default Login