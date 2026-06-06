"use client";

import Link from "next/link";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const router= useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

    const handleRegister = async () => {
      try {
        const response= await api.post("/auth/register", {
          name,
          email,
          password,
        });

        console.log(response.data)
        setName("");
        setEmail("");
        setPassword("");

        router.push("/login");
      } catch (error) {
        console.error("Error registering user:", error);
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

          <Input
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <Button className="w-full mt-4" onClick={handleRegister}>
          Register
        </Button>

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