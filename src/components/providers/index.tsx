import {
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
import { Check, Info, X } from "lucide-react";
import NextTopLoader from "nextjs-toploader";
import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query.provider";
import { Toaster } from "../ui/sonner";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  // Translation
  const messages = useMessages();
  const locale = useLocale();
  const now = useNow();
  const timeZone = useTimeZone();

  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          now={now}
          timeZone={timeZone}
        >
          <NextTopLoader
            color="#331a55"
            shadow="0 0 3px #E1DFED,0 0 3px #E1DFED"
            easing="ease-out"
          />
          {children}

          <Toaster
            toastOptions={{
              closeButton: true,
              className: " !shadow-lg  !gap-[10px] !py-4 ",
              classNames: {
                success:
                  "!bg-emerald-50/50 !text-emerald-900 !border-emerald-700  ",
                error: "!bg-red-50/50  !text-red-900 !border-red-700  ",
                info: "!bg-zinc-50/50 !text-zinc-900 !border-zinc-400 ",
                closeButton:
                  "!bg-transparent !text-zinc-500 !border-none   [&_svg]:!size-4 !right-0 !left-auto !top-4",
              },
            }}
            icons={{
              success: <Check size="18" />,
              error: <X size="18" />,
              info: <Info size="18" />,
            }}
          />
        </NextIntlClientProvider>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
