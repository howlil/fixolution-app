import Input from "../../components/ui/Input"
import { Link } from "react-router-dom"
import Button from "../../components/ui/Button"

export default function Daftar() {
  return (
    <form className="flex flex-col gap-3">
      <Input label="Username" type="text" placeholder="username" />
      <Input label="Password" type="password" placeholder="*******" />
      <Input label="Repeat Password" type="password" placeholder="*******" />
      <p className="text-white text-center text-sm">Already have an account? 
        <Link className="text-col text-sm pl-1" to="/login">Login</Link>
    </p>
    <Button variant="primary" custom="w-full py-1.5" >Register</Button>
    </form>
  )
}
