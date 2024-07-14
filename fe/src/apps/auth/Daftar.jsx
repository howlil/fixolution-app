import { useState } from "react";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Register from "../../apis/auth/register";
import { useNavigate } from "react-router-dom";

export default function Daftar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const result = await Register(username, password);
      if (result.success) {
        navigate("/login");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleRegister}>
      <Input
        label="Username"
        customLabel="text-neutral-100"
        type="text"
        customClass="bg-neutral-900 text-neutral-200 border-neutral-100"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        customClass="bg-neutral-900 text-neutral-200 border-neutral-100"
        customLabel="text-neutral-100"
        placeholder="*******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="Repeat Password"
        type="password"
        customLabel="text-neutral-100"
        customClass="bg-neutral-900 text-neutral-200 border-neutral-100"
        placeholder="*******"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <p className="text-white text-center text-sm">
        Already have an account?
        <Link className="text-col text-sm pl-1" to="/login">
          Login
        </Link>
      </p>
      <Button variant="primary" custom="w-full py-1.5" type="submit">
        Register
      </Button>
    </form>
  );
}
