import { Input as HeroInput } from '@heroui/react';
import type React from 'react'
import { useController, type Control } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  required?: string;
  endContent?: JSX.Element;
}

const Input: React.FC<Props> = ({ control, label, name, endContent, placeholder, required = '', type }) => {
  const { field, fieldState: { invalid }, formState: { errors } } = useController({ name, control, rules: { required } });

  return (
    <HeroInput id={name} label={label} type={label} placeholder={placeholder} value={field.value} name={field.name} isInvalid={invalid} onChange={field.onChange} onBlur={field.onBlur} errorMessage={`${errors[name]?.message ?? ''}`} />
  )
}

export default Input
