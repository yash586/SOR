import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import { RegisterPayload } from "../types/RegisterPayload";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(payload: RegisterPayload) => {
    try {
      setIsLoading(true);
      await registerUser(payload);
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