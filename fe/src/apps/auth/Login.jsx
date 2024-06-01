import Input from "../../components/ui/Input"
import { Link } from "react-router-dom"
import Button from "../../components/ui/Button"

export default function Login() {
  return (
    <form className="space-y-3">
      <Input label="Username" type="text" placeholder="username" />
      <Input label="Password" type="password" placeholder="*******" />
      <p className="text-white text-center text-xs">Don’t have an account? 
        <Link className="text-xs text-col pl-1" to="/daftar">register</Link>
    </p>
    <Button variant="primary" custom="w-full py-1.5" >Login</Button>
    </form>
  )
}
