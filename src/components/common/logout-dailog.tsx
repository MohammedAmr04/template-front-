/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { LogOut, LogOutIcon } from "lucide-react";
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
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function LogoutDialog() {
  const t = useTranslations("common");
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
      toast.success(t("logout-success"));
    } catch (error) {
      toast.error(t("logout-error"));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuButton
          tooltip={"logout"}
          variant={"sidebar"}
          className="me-2 cursor-pointer py-6 hover:bg-transparent"
        >
          <span className="text-brand rounded-5xl mx-auto flex items-center justify-between gap-1 bg-white/35 px-8 py-3 text-lg font-semibold group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:px-0">
            <span className="rotate-180">
              <LogOutIcon className="size-4" />
            </span>
            <span className="text-[13px]">{t("logout")}</span>
          </span>
        </SidebarMenuButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("logout-title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("logout-description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive hover:bg-destructive/90"
          >
            {t("logout")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
