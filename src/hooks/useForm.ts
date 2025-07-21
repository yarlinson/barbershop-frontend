import { useState } from 'react';
import type { ChangeEvent } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface FieldRules {
  [key: string]: ValidationRules;
}

interface ValidationErrors {
  [key: string]: string;
}

type FormChangeEvent = 
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>
  | { target: { name: string; value: string } };

export const useForm = <T extends { [key: string]: string }>(
  initialState: T,
  validationRules: FieldRules = {}
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return 'Este campo es requerido';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Máximo ${rules.maxLength} caracteres`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Formato inválido';
    }

    if (rules.custom && !rules.custom(value)) {
      return 'Valor inválido';
    }

    return '';
  };

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormData
  };
}; 