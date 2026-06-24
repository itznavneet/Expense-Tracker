"use client";

import api from "@/lib/api";
import { logout } from "@/lib/auth";
import { LayoutDashboard, LogOut, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname= usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUser=async()=>{
    const token =
    localStorage.getItem("token");
    try {
      const response= await api.get("/auth/me",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setName(response.data.user.name);
      setEmail(response.data.user.email);
    } catch (error) {
    console.log(error)
  }}
const handleLogout=()=>{
  logout();
  router.push("/login");
}

useEffect(() => {
  fetchUser();
}, []);

  return (
    <aside className="w-64 min-h-screen border-r bg-muted/30">
      <div className="p-6 border-b"><h2 className="font-bold text-2xl">Expense Tracker</h2></div>
      <div className="p-6 border-b flex flex-col items-center">
    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-3">
  {name?.charAt(0).toUpperCase()}
</div>
        <h2 className="font-bold text-xl">
          {name}
        </h2>

        <p className="text-sm text-muted-foreground">
          {email}
        </p>

      </div>

      <nav className="p-4 space-y-2">

  <Link 
  href="/dashboard" 
  className={`flex items-center gap-2 rounded-lg p-3 ${
    pathname === '/dashboard' 
      ? 'bg-muted font-semibold' 
      : 'hover:bg-muted'
  }`}
>

    <LayoutDashboard size={18} />
    Dashboard
  </Link>

  <Link
  href="/transactions"
  className={`flex items-center gap-2 rounded-lg p-3 transition-colors

  ${
    pathname === "/transactions"
      ? "bg-muted font-semibold"
      : "hover:bg-muted"
  }`}
>
    <ReceiptText size={18} />
    Transactions
  </Link>

<button
  onClick={handleLogout}
  className="flex items-center gap-2 rounded-lg p-3 hover:bg-muted w-full"
>

  <LogOut size={18} />

  Logout

</button>
</nav>

    </aside>
  );
}