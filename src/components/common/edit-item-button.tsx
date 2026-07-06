import { PencilLine } from "lucide-react";
import { Button } from "../ui/button";

export default function EditItemButton() {
  return (
    <Button variant={"brandLight"} size={"icon-lg"}>
      <PencilLine strokeWidth={3} className="size-5" />
    </Button>
  );
}
