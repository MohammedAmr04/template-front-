import { Link } from "@/i18n/navigation";
import TestCommon from "./_components/test-common";
import TestForm from "./_components/test-form";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-center text-4xl font-bold">Dashboard Home</h1>

  

      <hr className="w-full max-w-4xl" />

      <TestCommon />

      <hr className="w-full max-w-4xl" />
      <TestForm />
    </div>
  );
}
