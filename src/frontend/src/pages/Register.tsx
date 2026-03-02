import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import { RegisterPayload } from "../types/RegisterPayload";
import { loginUser, registerUser } from "../services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext";
import { decodeToken } from "../utils/tokenUtils";

const Register = () => {
  
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  const handleSubmit = async(payload: RegisterPayload) => {
    try {
      setIsLoading(true);
      await registerUser(payload);
      const response = await loginUser({ email: payload.email, password: payload.password});
      const token = response.data.token;
      const { hashId } = decodeToken(token);
      login(token, hashId);
      navigate("/dashboard");
    } catch (error:any) {
      setError(error.message);
    }finally{
      setIsLoading(false);
    }
  }
  return <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} error={error}></RegisterForm>
} 


export default Register;