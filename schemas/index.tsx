import * as z from "zod"

// @ts-ignore
export const LoginSchema = z.object({
    email:z.string().email({message :"Email is Required"}),
    password:z.string().min(3,{message:"Password is Required"})
})