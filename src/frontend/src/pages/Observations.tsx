import { useEffect, useState } from "react";
import ObservationList from "../components/observation/ObservationList";
import { ObservationType } from "../types/Observation";
import { getObservations, deleteObservation } from "../services/observationService";

const Observations = () => {
  const [observations, setObservations] = useState<ObservationType[]>([]);
  const [activeTab, setActiveTab] = useState<"active"|"inactive">("active");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchObservations = async() =>{
      try {
        const data = await getObservations(activeTab);
        setObservations(data.data);
      } catch (error: any) {
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchObservations();
  }, [activeTab])

  const onDelete = async (id:string) =>{
    try {
      await deleteObservation(id);
      setObservations(prev => prev.filter((obs) => obs.recordId !== id))
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ObservationList observations={observations} onTabChange={setActiveTab} activeTab={activeTab} isLoading={isLoading} onDelete={onDelete}></ObservationList>

  )
}
export default Observations;