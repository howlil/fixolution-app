import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Daftar() {
  return (
    <form className="flex flex-col gap-3">
      <Input
        label="Username"
        customLabel="text-neutral-100"
        type="text"
        customClass="bg-neutral-900 text-neutral-200  border-neutral-100"
        placeholder="username"
      />
      <Input
        label="Password"
        type="password"
        customClass="bg-neutral-900 text-neutral-200  border-neutral-100"
        customLabel="text-neutral-100"
        placeholder="*******"
      />
      <Input
        label="Repeat Password"
        type="password"
        customLabel="text-neutral-100"
        customClass="bg-neutral-900 text-neutral-200  border-neutral-100"
        placeholder="*******"
      />
      <p className="text-white text-center text-sm">
        Already have an account?
        <Link className="text-col text-sm pl-1" to="/login">
          Login
        </Link>
      </p>
      <Button variant="primary" custom="w-full py-1.5">
        Register
      </Button>
    </form>
  );
}
