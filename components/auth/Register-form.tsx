"use client"
import CardWrapper from "@/components/auth/cardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormField,FormItem,FormControl,FormMessage,FormLabel} from "@/components/ui/form"
import * as z from "zod"
import {RegisterSchema} from "@/schemas"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSucess from "@/components/form-sucess";
import {register} from "@/actions/register";
import {useState, useTransition} from "react";

export default function RegisterForm() {
    const [error,setError]=useState<string|undefined>("")
    const [sucess,setSucess]=useState<string|undefined>("")
    const form =useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password: "",
            name:""
        }
    })

    const [isPending,startTransition] = useTransition();

    const onSubmit =(values:z.infer<typeof RegisterSchema>)=>{
        setError("")
        setSucess("")
        startTransition(()=>{
          register(values)
              .then((data)=>{
                  setError(data.error)
                  setSucess(data.sucess)
              })
      })
    }

    return(
        <CardWrapper
        headerLable={"Create an account "}
        backButtonHref={"/auth/login"}
        backButtonLable={"Already have an account ?"}
        showSocial
        >
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"space-y-4"}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder={"Full Name"} type={"text"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }/>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder={"example@gmail.com"} type={"email"}/>
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
                       Create an account
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}