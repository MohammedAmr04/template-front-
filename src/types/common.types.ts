import { useTranslations } from "next-intl";

export type RouteProps = {
  params: Promise<{
    locale: string;
    [key: string]: string | string[] | undefined;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export type LayoutsProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type TZodIntel = ReturnType<typeof useTranslations>;
