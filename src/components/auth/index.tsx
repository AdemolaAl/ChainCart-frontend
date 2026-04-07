import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { InputField } from "../shared/InputField";
import AppButton from "../shared/AppButton";
import { LoginSchema, RegisterSchema } from "./validation";
import useAuth from "./hook/useAuth";

export function Register() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loginAuth, registerAuth, loginLoad, registerLoad } = useAuth();

  const toggleForm = useCallback(() => setIsSignUp((prev) => !prev), []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validation = isSignUp ? RegisterSchema.safeParse(formData) : LoginSchema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => { if (err.path) formattedErrors[err.path[0]] = err.message; });
      setErrors(formattedErrors);
      return;
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return;
    }
    if (isSignUp) registerAuth(formData.email, formData.password);
    else loginAuth(formData.email, formData.password);
  }, [formData, isSignUp, registerAuth, loginAuth]);

  return (
    <div className="h-full py-6 flex justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-gray-900/70 backdrop-blur-xl border border-gray-800/50 p-8 shadow-[0_0_40px_rgba(6,182,212,0.05)] rounded-2xl w-full max-w-md">
        <AppButton label="Connect With Xion Meta" disabled variant="outline" className="w-full my-4" />
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField id="email" label="Email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} errorMessage={errors.email} required />
          <InputField id="password" label="Password" placeholder="Enter your password" type="password" value={formData.password} onChange={handleChange} errorMessage={errors.password} required />
          {isSignUp && (
            <InputField id="confirmPassword" label="Confirm Password" placeholder="Confirm your password" type="password" value={formData.confirmPassword} onChange={handleChange} errorMessage={errors.confirmPassword} required />
          )}
          <AppButton isLoading={loginLoad || registerLoad} label={isSignUp ? "Sign Up" : "Login"} buttonStyle="w-full" type="submit" />
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button onClick={toggleForm} className="text-cyan-400 font-medium ml-1 hover:text-cyan-300 transition-colors">
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
