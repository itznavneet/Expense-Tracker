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

export default function LoginPage() {
    const router= useRouter();

    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin= async () => {
    try {
      setLoading(true);
        
        const response= await api.post("/auth/login", {
            email,
            password
        })
        console.log(response.data)

        localStorage.setItem("token", response.data.token);
        setEmail("");
        setPassword("");

        router.push("/dashboard");
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
}

  return (
    <div className="min-h-screen flex items-center justify-center">

      <Card className="w-[400px] p-6">

        <h1 className="text-2xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-muted-foreground mb-6">
          Login to continue
        </p>

        <div className="space-y-4">

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

  <Button
  className="w-full mt-4" onClick={handleLogin} disabled={loading}
>
  {loading? "Logging in..." : "Login"}
</Button>

<p className="text-center mt-4">

  Don't have an account?{" "}

  <Link
    href="/register"
    className="font-medium underline"
  >
    Register
  </Link>

</p>


      </Card>

    </div>
  );
}