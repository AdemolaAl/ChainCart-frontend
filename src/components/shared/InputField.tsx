import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface InputFieldProps {
  id: string;
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "password" | "number" | "file";
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  containerClassName?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

export function InputField({
  id, label, placeholder, type = "text", required = false, disabled = false,
  className = "", containerClassName = "", value, onChange, onBlur, onFocus,
  errorMessage, icon, onIconClick,
}: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

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
      <div className="relative w-full">
        <Input
          id={id} name={id}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder} required={required} value={value}
          disabled={disabled} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          className={`bg-gray-900/60 backdrop-blur-sm text-gray-100 py-6 pr-10 ${borderColor} ${className}`}
          autoComplete={type === "password" ? "current-password" : "new-password"}
          step={type === "number" ? "0.0001" : undefined}
          min={type === "number" ? "0" : undefined}
        />
        {icon && (
          <Button type="button" variant="ghost" size="icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-transparent text-gray-400 hover:text-cyan-300"
            onClick={onIconClick}>
            {icon}
          </Button>
        )}
        {type === "password" && (
          <Button type="button" variant="ghost" size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-cyan-300"
            onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        )}
      </div>
      {errorMessage && <p className="text-red-400 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
}
