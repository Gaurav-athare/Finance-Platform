'use client'; // if you decide to move to client component, else remove this

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-blue-50/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-800 tracking-tight">
            <Image
              src="/logo.png"
              alt="Welth Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline">
                <LayoutDashboard size="18" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedIn>
            <Link href="/transactions/create">
              <Button>
                <PenBox size="18" />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonAvatarBox: "h-10 w-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
