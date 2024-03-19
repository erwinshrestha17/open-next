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

export default function LoginForm() {
    const form =useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password: ""
        }
    })

    const onSubmit =(values:z.infer<typeof LoginSchema>)=>{
        console.log(values)
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
                                        <Input {...field} placeholder={"erwinsh@example.com"} type={"email"}/>
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
                                        <Input {...field} placeholder={"*******"} type={"password"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) }/>
                    </div>
                    <FormError message={"Something Went Wrong"}/>
                    <Button type={"submit"} className={"w-full"}>
                        Log In
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}