"use client";

import { ChevronLeft, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ColorTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState("light-mode");
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  function handleColorTheme() {
    setTheme(value);
  }

  if (!mounted) return null;

  return (
    <>
      <div className="flex flex-col gap-5 lg:max-w-132">
        <div className="space-y-3">
          <button
            onClick={router.back}
            className="text-secondary-foreground flex items-center gap-2 lg:hidden"
          >
            <ChevronLeft size={20} />
            <span className="text-preset-4">Settings</span>
          </button>
          <div className="space-y-2">
            <p className="text-preset-1 lg:text-preset-3">Color Theme</p>
            <span className="text-preset-5 text-text-mute">
              choose your color theme:
            </span>
          </div>
        </div>
        <RadioGroup
          onValueChange={(val) => setValue(val)}
          defaultValue={theme}
          className="max-w-5xl"
        >
          <FieldLabel>
            <Field orientation="horizontal">
              <div className="bg-background flex size-10 items-center justify-center rounded-xl border">
                <SunIcon size={24} className="shrink-0" />
              </div>
              <FieldContent>
                <FieldTitle>Light Mode</FieldTitle>
                <FieldDescription>
                  Pick a clean and classic light theme
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="light" id="light" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal">
              <div className="bg-background flex size-10 items-center justify-center rounded-xl border">
                <MoonIcon size={24} className="shrink-0" />
              </div>
              <FieldContent>
                <FieldTitle>Dark Mode</FieldTitle>
                <FieldDescription>
                  Select a sleek and modern dark theme
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="dark" id="dark" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal">
              <div className="bg-background flex size-10 items-center justify-center rounded-xl border">
                <SunMoonIcon size={24} className="shrink-0" />
              </div>
              <FieldContent>
                <FieldTitle>System</FieldTitle>
                <FieldDescription>
                  Adapts to your device's theme
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="system" id="system" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <Button onClick={handleColorTheme} size={"xl"} className="ml-auto">
          Apply Changes
        </Button>
      </div>
    </>
  );
}

export default ColorTheme;
