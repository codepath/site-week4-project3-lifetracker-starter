import { useState } from "react";
import apiClient from "../services/apiClient";
import { useNutritionContext } from "../contexts/nutrition";
import { useNavigate } from "react-router-dom";

export const useNewNutritionForm = () => {
  const { nutrition, createNutrition } = useNutritionContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    calories: 0,
    quantity: 0,
    imageUrl: "",
    category: "",
  });

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
    const newNutrition = {
      name: form.name,
      calories: form.calories,
      quantity: form.quantity,
      imageUrl: form.imageUrl,
      category: form.category,
    };
    const { data } = await apiClient.createNutrition(newNutrition);

    setIsLoading(false);
  };
  return { form, errors, isLoading, handleOnInputChange, handleOnSubmit };
};
