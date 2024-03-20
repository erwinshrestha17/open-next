"use server"
import * as z from "zod"
import {RegisterSchema} from "@/schemas";
import {db} from"@/lib/db"
import bcrypt from "bcrypt"
import {getUserByEmail} from "@/data/user";

export const register = async (value:z.infer<typeof RegisterSchema>) => {
  const validatedFields =RegisterSchema.safeParse(value)
  if (!validatedFields.success){
    return {error:"Invalid Fields"}
  }
  const {email ,password,name} = validatedFields.data
  const hasedPassword = await bcrypt.hash(password,10)
  const existingUser = await getUserByEmail(email)
  if(existingUser){
    return {error:"Email Already Taken"}
  }
  await db.user.create({
    data:{
      name,
      email,
      password:hasedPassword
    }
  })

  // TODO : Send verification token email
  return {sucess:"User Created"}
}