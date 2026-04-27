"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { userSchema, UserType } from "@/lib/schemas/user";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { login } from "@/app/_actions/auth/login";
import { useNote } from "@/app/_context/NoteContext";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { reloadNotes, dispatch } = useNote();

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: UserType) {
    const result = await login(data);
    if (result.success) {
      dispatch({ type: "user_authenticated", payload: true });
      await reloadNotes();
      router.push("/app");
    }
    if (result?.error) {
      form.setError("root", { message: result.error });
    }
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
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            </div>
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {form.formState.errors.root && (
        <FieldError
          errors={[{ message: form.formState.errors.root.message }]}
        />
      )}
      <Button type="submit" size={"xl"} className="w-full">
        {form.formState.isSubmitting ? <Spinner /> : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
