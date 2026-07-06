"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PasswordInput } from "@/components/ui/password-input";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import FormBlockWrapper from "@/components/common/form-block-wrapper";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  profileFiles: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one file"),
  notification: z.boolean().optional(),
  marketingEmails: z.boolean(),
  subscriptionPlan: z.string(),
  tasks: z.array(z.string()),
});
const tasks = [
  {
    id: "push",
    label: "Push notifications",
  },
  {
    id: "email",
    label: "Email notifications",
  },
];

export default function TestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      profileFiles: [],
      notification: false,
      marketingEmails: false,
      subscriptionPlan: "monthly",
      tasks: [],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto space-y-8 py-10"
    >
      <FormBlockWrapper title="Basic Info">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel aria-invalid={fieldState.invalid} htmlFor="username">
                Username
              </FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                placeholder="shadcn"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel aria-invalid={fieldState.invalid} htmlFor="password">
                Password
              </FieldLabel>
              <PasswordInput
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="notification"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label">Responses</FieldLegend>
                <FieldDescription>
                  Get notified for requests that take time, like research or
                  image generation.
                </FieldDescription>
                <FieldGroup>
                  <Field orientation="horizontal">
                    <Checkbox
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel
                      htmlFor="form-rhf-checkbox-responses"
                      className="font-normal"
                    >
                      Push notifications
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        <Controller
          name="tasks"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend variant="label">Tasks</FieldLegend>
              <FieldDescription>
                Get notified when tasks you&apos;ve created have updates.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                {tasks.map((task) => (
                  <Field
                    key={task.id}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      id={`form-rhf-checkbox-${task.id}`}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value.includes(task.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, task.id]
                          : field.value.filter((value) => value !== task.id);
                        field.onChange(newValue);
                      }}
                    />
                    <FieldLabel
                      htmlFor={`form-rhf-checkbox-${task.id}`}
                      className="font-normal"
                    >
                      {task.label}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
      </FormBlockWrapper>

      <FormBlockWrapper title="Other info">
        <Controller
          name="marketingEmails"
          control={form.control}
          render={({
            field: { value, onChange, ...fieldProps },
            fieldState,
          }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-row items-center justify-between rounded-xl border p-4"
            >
              <div className="space-y-0.5">
                <FieldLabel
                  aria-invalid={fieldState.invalid}
                  htmlFor="marketingEmails"
                  className="text-base"
                >
                  Marketing emails
                </FieldLabel>
              </div>
              <Switch
                {...fieldProps}
                id="marketingEmails"
                checked={value}
                onCheckedChange={onChange}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="profileFiles"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel aria-invalid={fieldState.invalid}>
                Profile File
              </FieldLabel>
              <FileUploader
                value={field.value}
                onValueChange={(files) => field.onChange(files ?? [])}
                dropzoneOptions={{
                  accept: {
                    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
                    "application/pdf": [".pdf"],
                  },
                  maxFiles: 1,
                  maxSize: 4 * 1024 * 1024,
                  multiple: false,
                }}
              >
                <FileInput>
                  Drop a file here or click to upload (max 4MB)
                </FileInput>
                <FileUploaderContent>
                  {field.value?.map((file, index) => (
                    <FileUploaderItem key={file.name + index} index={index}>
                      <span className="truncate">{file.name}</span>
                    </FileUploaderItem>
                  ))}
                </FileUploaderContent>
              </FileUploader>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subscriptionPlan"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet
              data-invalid={fieldState.invalid}
              className="w-full max-w-xs"
            >
              <FieldLegend variant="label">Subscription Plan</FieldLegend>
              <RadioGroup {...field} onValueChange={field.onChange}>
                <Field orientation="horizontal">
                  <RadioGroupItem value="monthly" id="plan-monthly" />
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor="plan-monthly"
                    className="font-normal"
                  >
                    Monthly ($9.99/month)
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="yearly" id="plan-yearly" />
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor="plan-yearly"
                    className="font-normal"
                  >
                    Yearly ($99.99/year)
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="lifetime" id="plan-lifetime" />
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor="plan-lifetime"
                    className="font-normal"
                  >
                    Lifetime ($299.99)
                  </FieldLabel>
                </Field>
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
      </FormBlockWrapper>
      <Button type="submit">Submit</Button>
    </form>
  );
}
