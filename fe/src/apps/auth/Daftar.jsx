import { useState } from "react";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";

export default function Daftar() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [no_hp, setNohp] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      showToast("Password does not match", "error");
      return;
    }
    setLoading(true);
    try {
      const result = await api.post("/register", {
        nama,
        username,
        password,
        no_hp,
      });
      if (result) {
        showToast(result.data.message,result.data.success );
        navigate("/login");
      } else {
        showToast("Registration failed", "error");
      }
    } catch (error) {

      showToast("An error occurred during registration", "error");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;

  return (
    <form className="flex flex-col gap-3" onSubmit={handleRegister}>
      <Input
        label="Name"
        customLabel="text-neutral-100"
        type="text"
        customClass="bg-neutral-900 text-neutral-200 border-neutral-100"
        placeholder="full name"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
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
        label="No Hp"
        customLabel="text-neutral-100"
        type="text"
        customClass="bg-neutral-900 text-neutral-200 border-neutral-100"
        placeholder="+62"
        value={no_hp}
        onChange={(e) => setNohp(e.target.value)}
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
