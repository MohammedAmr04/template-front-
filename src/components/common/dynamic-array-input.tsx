import { useFieldArray, Control, FieldValues, Path } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

type DynamicArrayInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  addButtonLabel: string;
  placeholder?: string;
};

export function DynamicArrayInput<T extends FieldValues>({
  control,
  name,
  label,
  addButtonLabel,
  placeholder,
}: DynamicArrayInputProps<T>) {
  const c = useTranslations("common");

  const { fields, append, remove } = useFieldArray({
    control,
    name: name as any,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>{label}</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" } as any)}
          icon={() => <Plus className="size-4" />}
        >
          {addButtonLabel}
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`${name}.${index}.value` as Path<T>}
            render={({ field: formField }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input {...formField} placeholder={placeholder} />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="text-destructive size-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
