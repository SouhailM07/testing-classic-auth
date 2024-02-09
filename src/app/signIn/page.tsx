"use client";
// types
import { inputs } from "@/types";
// forms
import { createNewUser } from "@/lib/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// shadcn
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters",
  }),
});

/*=====================================================================================*/
// main component section
/*=====================================================================================*/
export default function SignIn_page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-[1.7rem] font-bold underline">Sign In</h1>
        <SignIn />
      </main>
    </>
  );
}

/*=====================================================================================*/
// small components
/*=====================================================================================*/

const SignIn = () => {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //! set your default values here
    defaultValues: {
      name: "",
    },
  });
  //  Defining a submit handler
  let { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // start
    // console.log(values);
    await createNewUser(values).then((check) => {
      if (check! > 0) {
        toast({
          variant: "destructive",
          description: "User is already exist !",
        });
      } else {
        toast({
          title: "Scheduled: Catch up",
          description: "Account created successfully",
        });
      }
    });
  };
  // Define inputs
  let inputs: inputs[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "enter your name",
      inputType: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "example@gmail.com",
      inputType: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "your password",
      inputType: "password",
    },
  ];
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {inputs.map((e: any, i) => {
            return (
              <FormField
                key={i}
                control={form.control}
                name={e.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{e.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={e.inputType}
                        placeholder={e.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
