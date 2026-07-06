"use client";

import ErrorComponent from "@/components/common/error-component";
import { ErrorProps } from "@/types/common.types";

export default function GlobalError(props: ErrorProps) {
  return <ErrorComponent {...props} />;
}
