import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";

export default function DisplayImageDialog({
  imgUrl,
  imgWrapperClassName,
}: {
  imgUrl: string;
  imgWrapperClassName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "relative size-48 cursor-pointer overflow-hidden rounded-2xl shadow transition-all hover:scale-105",
            imgWrapperClassName,
          )}
        >
          <Image
            src={imgUrl || "/assets/img-placeholder.jpg"}
            fill
            className="object-contain"
            alt="Picture of the author"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="h-3/4 max-w-2xl! p-2">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="sr-only">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={imgUrl || "/assets/img-placeholder.jpg"}
            fill
            className="object-contain"
            alt="Picture of the author"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
