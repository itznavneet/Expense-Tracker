"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { LoginFormData, LoginSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export default function LoginPage() {
  const router = useRouter();

  //     const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // console.log(form);

  const handleLogin = async (values: LoginFormData) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      form.reset();
      toast.success(
  "Login successful"
);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px] p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>

        <p className="text-muted-foreground mb-6">Login to continue</p>

        <div className="space-y-4">
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>

                  <Input {...field}/>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>

                  <Input type="password" {...field} />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button className="w-full mt-4" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
