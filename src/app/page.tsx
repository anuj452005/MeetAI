"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        // onRequest: (ctx) => {
        //   //show loading
        // },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          window.alert("singup complete");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        suppressHydrationWarning
      ></Input>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        suppressHydrationWarning
      ></Input>
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        suppressHydrationWarning
      ></Input>
      <Button onClick={onSubmit}>Signup</Button>
    </div>
  );
};

export default page;
