import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import api from "../../utils/axios";
import { getUserData } from "../../utils/getUserData";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      showToast("Username and password are required", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      if (!response.data.success) {
        showToast(response.message, "error");
      } else {
        showToast(response.data.message, "success");
        const userData = getUserData();
        if (userData.userType === "superadmin") {
          navigate("/dashboard");
        }
        if (userData.userType === "user") {
          navigate("/");
        }
        if (userData.userType === "bengkel") {
          navigate("/booking");
        }
      }
    } catch (error) {
      showToast("An error occurred during login", "error");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Loading />;

  return (
    <div className="mx-6">
      <Toaster />
      <form className="space-y-3 relative" onSubmit={handleSubmit}>
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
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <Loading type="spin" color="#ffffff" />
          </div>
        ) : (
          <Button variant="primary" custom="w-full py-1.5">
            Login
          </Button>
        )}
        <p className="text-white text-center text-xs">
          Don’t have an account?
          <Link className="text-xs text-col pl-1" to="/daftar">
            register
          </Link>
        </p>
      </form>
    </div>
  );
}
