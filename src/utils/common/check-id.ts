import { notFound } from "next/navigation";

export const validateIdIsNumeric = (id?: string) => {
  if (id && !/^\d+$/.test(id)) {
    return notFound();
  }
};
