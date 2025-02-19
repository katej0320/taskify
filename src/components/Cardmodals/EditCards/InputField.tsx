import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
