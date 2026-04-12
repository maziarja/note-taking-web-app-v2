"use client";

import { userSchema, UserType } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { Button } from "../ui/button";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: UserType) {
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
            <Input
              className="text-preset-5"
              {...field}
              id={field.name}
              placeholder="email@example.com"
              type="email"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                className="text-preset-5"
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon
                onClick={() => setShowPassword((show) => !show)}
                align={"inline-end"}
              >
                {!showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputGroupAddon>
            </InputGroup>
            <div className="text-secondary-foreground flex items-center gap-2">
              <InfoIcon size={16} />
              <FieldDescription>At least 6 characters</FieldDescription>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button size={"xl"} className="w-full">
        Sign up
      </Button>
    </form>
  );
}

export default SignupForm;
