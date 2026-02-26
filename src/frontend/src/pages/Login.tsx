import { useNavigate, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../store/AuthContext";
import { useState } from "react";
import { LoginPayload } from "../types/LoginPayload";
import { loginUser } from "../services/authService";
import { decodeToken } from "../utils/tokenUtils";

const Login = () => {
  const {login, isAuthenticated} = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError ] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      const response = await loginUser(payload);
      const token = response.data.token;
      const { hashId } = decodeToken(token);
      login(token, hashId);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }finally{
      setIsLoading(false);
    }
  }

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error}></LoginForm>
}
export default Login;