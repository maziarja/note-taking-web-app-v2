"use client";

import { ChevronLeft } from "lucide-react";
import Container from "../ui/Container";
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
import FontSerifIcon from "../ui/icon-font-serif";
import MonospaceFontIcon from "../ui/icon-font-monospace";
import FontSansSerifIcon from "../ui/icon-font-sans-serif";
import { useEffect, useState } from "react";

function FontTheme() {
  const router = useRouter();

  const [font, setFont] = useState("");

  function handleFontTheme() {
    window.localStorage.setItem("font", font);
    document.documentElement.dataset.font = font;
  }

  useEffect(() => {
    const savedFont = window.localStorage.getItem("font");

    if (savedFont) {
      document.documentElement.dataset.font = savedFont;
      setFont(savedFont);
    }
  }, []);

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
            <p className="text-preset-1 lg:text-preset-3">Font Theme</p>
            <span className="text-preset-5 text-text-mute">
              choose your font theme:
            </span>
          </div>
        </div>
        <RadioGroup
          onValueChange={(val) => setFont(val)}
          defaultValue={font}
          key={font}
          className="max-w-5xl"
        >
          <FieldLabel>
            <Field orientation="horizontal">
              <div className="bg-background flex size-10 items-center justify-center rounded-xl border dark:border-neutral-700">
                <FontSansSerifIcon />
              </div>
              <FieldContent>
                <FieldTitle>Sans-serif</FieldTitle>
                <FieldDescription>
                  Clean and modern, easy to read.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="sans" id="sans-serif" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal">
              <div className="bg-background flex size-10 items-center justify-center rounded-xl border dark:border-neutral-700">
                <FontSerifIcon />
              </div>
              <FieldContent>
                <FieldTitle>Serif</FieldTitle>
                <FieldDescription>
                  Classic and elegant for a timeless feel.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="serif" id="serif" />
            </Field>
          </FieldLabel>
          <FieldLabel>
            <Field orientation="horizontal">
              <div className="bg-background flex size-10 items-center justify-center rounded-xl border dark:border-neutral-700">
                <MonospaceFontIcon />
              </div>
              <FieldContent>
                <FieldTitle>Monospace</FieldTitle>
                <FieldDescription>
                  Code-like, great for a technical vibe.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="mono" id="monospace" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <Button onClick={handleFontTheme} size={"xl"} className="ml-auto">
          Apply Changes
        </Button>
      </div>
    </>
  );
}

export default FontTheme;
