"use client";
// types
import { inputs } from "@/types";
// forms
import { userLogin } from "@/lib/api";
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
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(8, { message: "password must be at least above 8 characters" }),
});

/*==============================================================================================*/
// main component section
/*==============================================================================================*/

export default function Login_page() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="underline text-[1.7rem] font-bold">Login</h1>
      <Login />
    </main>
  );
}

const Login = () => {
  // Defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // ! set your default values here
    defaultValues: {
      email: "",
    },
  });
  // Defining a submit handler
  let { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // * start
    // console.log(values);
    await userLogin(values).then((check) => {
      if (check == 0) {
        console.log(check);
        toast({
          variant: "destructive",
          description: "User does not exist !",
        });
      } else {
        toast({
          description: "User exist !",
        });
      }
    });
  };
  // Defining inputs
  const inputs: inputs[] = [
    {
      name: "email",
      inputType: "text",
      placeholder: "example@gmail.com",
      label: "Email",
    },
    {
      name: "password",
      inputType: "password",
      placeholder: "example@gmail.com",
      label: "Password",
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
