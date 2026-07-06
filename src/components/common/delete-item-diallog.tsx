"use client";

import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/* 
NOTE: Usage <DeleteItemDialog action={deleteAddress.bind(null, address.id)} />
*/

export default function DeleteItemDialog({
  action,
  itemName,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => Promise<any>;
  itemName: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("common");

  const mutation = useMutation({
    mutationFn: () => action(),
    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
      setOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="cursor-pointer">
        <Trash2 className="text-destructive size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-confirmation-title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete-confirmation-description", { itemName: itemName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-start">
          <AlertDialogCancel disabled={mutation.isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} asChild>
            <Button
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
              disabled={mutation.isPending}
              spinner={mutation.isPending}
            >
              {t("continue")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
