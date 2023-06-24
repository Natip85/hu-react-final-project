import { useState } from "react";

interface ReturnType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useTextInput(initialValue: string): ReturnType {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}
