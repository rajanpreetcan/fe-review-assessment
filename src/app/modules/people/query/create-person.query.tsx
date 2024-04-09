import { useState } from "react";
import { useAxios } from "@shared/context";
import { API_RESOURCE } from "@shared/constant";

interface FormData {
  name: string;
  show: string;
  actor: string;
  dob: string;
  movies: string;
}

interface HookReturnType {
  onCreatePerson: (formData: FormData) => Promise<void>;
  error: any;
}

export const useCreatePerson = (): HookReturnType => {
  const axios = useAxios();
  const [error, setError] = useState<any>(null);

  const createPerson = async (personData: FormData) => {
    try {
      await axios.post(`/${API_RESOURCE.PEOPLE}`, personData);
    } catch (error) {
      setError(error);
    }
  };

  return { onCreatePerson: createPerson, error };
};
