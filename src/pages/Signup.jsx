import AuthLayout from "@/components/layout/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Signup() {
  const { user } = useAuth();

  // 🚫 Already logged in → go to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
