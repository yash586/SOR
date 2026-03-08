import { useNavigate } from "react-router-dom";
import type { ObservationCreate } from "../../types/Observation";
import { createObservation } from "../../services/observationService";
import ObservationForm from "../../pages/ObservationForm";
import { useState } from "react";
import Toast from "../common/Toast";

const ObservationCreate = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string; type: "success" | "danger"} | null>(null);
  
  const handleSubmit = async(payload: ObservationCreate) =>{
    const response = await createObservation(payload);
    setToast({ message: response.data.message, type: "success" });
    setTimeout(() => navigate("/observations"), 2000);
    navigate("/dashboard");
  }

  return (
  <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ObservationForm onSubmit={handleSubmit} />
  </>
  )
}

export default ObservationCreate;