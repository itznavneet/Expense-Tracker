"use client";

import Link from "next/link";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { RegisterFormData, RegisterSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";



export default function RegisterPage() {
    const router= useRouter();

  const form= useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
    const [loading, setLoading]= useState(false);

    const handleRegister = async (values: RegisterFormData) => {
      try {
        setLoading(true);
        const response= await api.post("/auth/register", {
          name:values.name,
          email:values.email,
          password:values.password
        });

        console.log(response.data)
        form.reset();

        toast.success(
  "Account created successfully"
);
        router.push("/login");
      } catch (error) {
        if (axios.isAxiosError(error)) {

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

}
      }finally{
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <Card className="w-[400px] p-6">

        <h1 className="text-2xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-muted-foreground mb-6">
          Register to continue
        </p>

        <div className="space-y-4">

       <form onSubmit={form.handleSubmit(handleRegister)}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>

                  <Input {...field}/>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

        </div>


        <p className="text-center mt-4">

          Already have an account?{" "}

          <Link
            href="/login"
            className="underline"
          >
            Login
          </Link>

        </p>

      </Card>

    </div>
  );
}