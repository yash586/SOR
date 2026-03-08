import { useLocation, useNavigate } from "react-router-dom";
import { ObservationCreate } from "../../types/Observation";
import { updateObservation } from "../../services/observationService";
import ObservationForm from "../../pages/ObservationForm";
import Toast from "../common/Toast";
import { useState } from "react";

const ObservationEdit = () => {
  const { state } = useLocation();
  const observation = state?.observation;
  console.log(observation);
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string; type: "success" | "danger"} | null>(null);

  const handleSubmit = async (payload: ObservationCreate) => {
    const response = await updateObservation(observation.hashId, payload);
    setToast({ message: response.data.message, type: "success" });
    setTimeout(() => navigate("/observations"), 2000);
    navigate("/dashboard");
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ObservationForm onSubmit={handleSubmit} observation={observation} />
    </>
  );
}
export default ObservationEdit;