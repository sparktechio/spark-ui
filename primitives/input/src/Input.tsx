import React, {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChanged: (value: string) => void;
}

export const Input = (props: InputProps) => {
  return (
    <input {...props} />
  )
}