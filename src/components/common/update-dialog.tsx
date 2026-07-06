"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/*
NOTE: Usage

// Add mode
<UpdateDialog
  title={t("add-title")}
  trigger={<Button>{t("add")}</Button>}
  form={<SpecialtyForm onSuccess={() => setOpen(false)} />}
/>

// Edit mode
<UpdateDialog
  title={t("edit-title")}
  trigger={<EditButton />}
  form={<SpecialtyForm data={specialty} onSuccess={() => setOpen(false)} />}
/>
*/

type UpdateDialogProps = {
  /** Dialog title shown in the header */
  title: string;
  /** Element that triggers the dialog to open */
  trigger: React.ReactNode;
  /** Form content rendered inside the dialog body */
  form: React.ReactElement<{ onSuccess?: () => void }>;
  /** Optional controlled open state */
  open?: boolean;
  /** Optional controlled open-change handler */
  onOpenChange?: (open: boolean) => void;
};

export default function UpdateDialog({
  title,
  trigger,
  form,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: UpdateDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Support both controlled and uncontrolled usage
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (controlledOnOpenChange ?? setInternalOpen)
    : setInternalOpen;

  // Inject onSuccess into the form so it can close the dialog
  const formWithClose = React.cloneElement(form, {
    onSuccess: () => {
      setOpen(false);
      form.props.onSuccess?.();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {formWithClose}
      </DialogContent>
    </Dialog>
  );
}
