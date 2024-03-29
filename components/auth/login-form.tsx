"use client"
import CardWrapper from "@/components/auth/cardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormField,FormItem,FormControl,FormMessage,FormLabel} from "@/components/ui/form"
import * as z from "zod"
import {LoginSchema} from "@/schemas"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSucess from "@/components/form-sucess";
import {login} from "@/actions/login";
import {useState, useTransition} from "react";

export default function LoginForm() {
    const [error,setError]=useState<string|undefined>("")
    const [sucess,setSucess]=useState<string|undefined>("")
    const form =useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password: ""
        }
    })

    const [isPending,startTransition] = useTransition();

    const onSubmit =(values:z.infer<typeof LoginSchema>)=>{
        setError("")
        setSucess("")
        startTransition(()=>{
          login(values)
              .then((data)=>{
                  setError(data.error)
                  setSucess(data.sucess)
              })
      })
    }

    return(
        <CardWrapper
        headerLable={"Welcome Back"}
        backButtonHref={"/auth/register"}
        backButtonLable={"Don't have an account ?"}
        showSocial
        >
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"space-y-4"}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder={"erwinsh@example.com"} type={"email"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }/>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder={"*******"} type={"password"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }/>
                    </div>
                    <FormError message={error}/>
                    <FormSucess message={sucess}/>
                    <Button type={"submit"} disabled={isPending} className={"w-full"}>
                        Log In
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}