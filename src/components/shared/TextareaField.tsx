import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface TextareaFieldProps {
  id: string; label?: string; placeholder: string; required?: boolean;
  className?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string; errorMessage?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean; containerClassName?: string;
}

export function TextareaField({
  id, label, placeholder, required = false, disabled = false,
  className = "", containerClassName = "", value, onChange, onBlur, onFocus, errorMessage,
}: TextareaFieldProps) {
  const borderColor = errorMessage
    ? "border-red-500/60 focus:ring-red-500/30"
    : "border-gray-700/60 focus:ring-cyan-500/20 focus:border-cyan-500/60";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <Label htmlFor={id} className="text-gray-300 text-sm block mb-2 tracking-wide">
          {label}
          {required && <span className="text-cyan-400 font-black ml-[2px]">*</span>}
        </Label>
      )}
      <Textarea
        id={id} placeholder={placeholder} required={required} value={value} name={id}
        disabled={disabled} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
        className={`min-h-[200px] bg-gray-900/60 backdrop-blur-sm text-gray-100 py-4 ${borderColor} ${className}`}
      />
      {errorMessage && <p className="text-red-400 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
}
