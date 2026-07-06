import { Button } from "../ui/button";

export default function AddNewItemButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button variant={"brand"} size={"brand"} className="px-10">
      {children}
    </Button>
  );
}
