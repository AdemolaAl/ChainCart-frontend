import { Label } from "../ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select";

interface SelectFieldProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function SelectField({ options, placeholder = "Select an option", onChange, defaultValue }: SelectFieldProps) {
  return (
    <section>
      <Label htmlFor="terms" className="text-gray-300 text-sm block mb-2 tracking-wide">
        Category <span className="text-cyan-400 font-black ml-[2px]">*</span>
      </Label>
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger className="w-full bg-gray-900/60 backdrop-blur-sm text-gray-100 border-gray-700/60 py-6 pr-10 hover:border-gray-600/80 focus:border-cyan-500/60">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700/60 backdrop-blur-xl">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-gray-200 focus:bg-cyan-500/15 focus:text-cyan-300">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
}
