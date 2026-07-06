import Image from "next/image";
import { LoginForm } from "@/app/[locale]/(auth)/login/_components/login-form";
import ToggleLocale from "@/components/common/toggle-locale";

export default function LoginPage() {
  return (
    <main className="grid grid-cols-3 bg-violet-400">
      <div className="relative col-span-1 h-screen w-full max-w-[540px]">
        <Image
          src="/images/auth/login.svg"
          fill
          className="absolute"
          alt="login"
        />
      </div>
      <div className="relative col-span-2 flex items-center justify-center rounded-s-[50px] bg-white">
        <LoginForm />

        <div className="absolute end-10 top-10">
          <ToggleLocale />
        </div>
      </div>
    </main>
  );
}
