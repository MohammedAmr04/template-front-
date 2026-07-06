import { z } from "zod";
import { TZodIntel } from "@/types/common.types";

export const loginSchema = (_t: TZodIntel) =>
  z.object({
    systemType: z.enum(["admin", "hospital", "lab", "pharmacy"]),
    email: z.email(),
    password: z.string().min(8),
  });

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
