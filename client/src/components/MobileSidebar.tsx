"use client"
import Link from "next/link"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Menu,
  LayoutDashboard,
  ReceiptText,
  LogOut,
} from "lucide-react";

export default function MobileSidebar(){
    return(
        <Sheet>
            <SheetTrigger>
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="mt-8 space-y-4">
                    <Link href="/dashboard" className="flex gap-2">
                    <LayoutDashboard size={18} />
            Dashboard
                    </Link>

          <Link
            href="/transactions"
            className="flex gap-2"
          >
            <ReceiptText size={18} />
            Transactions
          </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
