import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import LoginAkun from "../../apis/auth/login";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    try {
      const response = await LoginAkun(username, password);
      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        console.log("Login successful:", response);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        label="Username"
        type="text"
        placeholder="username"
        customLabel="text-neutral-100"
        customClass="bg-neutral-900 text-neutral-200  border-neutral-100"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        customLabel="text-neutral-100"
        type="password"
        placeholder="*******"
        value={password}
        customClass="bg-neutral-900 text-neutral-200  border-neutral-100"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <p className="text-white text-center text-xs">
        Don’t have an account?
        <Link className="text-xs text-col pl-1" to="/daftar">
          register
        </Link>
      </p>
      <Button variant="primary" custom="w-full py-1.5">
        Login
      </Button>
    </form>
  );
}