"use client"

import React from "react";
import {Card,CardContent,CardHeader,CardFooter} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import Backbutton from "@/components/auth/backbutton";

interface CardWrapperProps {
    children:React.ReactNode;
    headerLable:string;
    backButtonLable:string;
    backButtonHref:string;
    showSocial?:Boolean
}
export default function CardWrapper(
    {
        children,
        headerLable,
        backButtonLable,
        backButtonHref,
        showSocial
    }: CardWrapperProps) {
    return(
        <Card className={"w-[400px] shadow-md"}>
            <CardHeader>
                <Header lable={headerLable}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}

            <CardFooter>
                <Backbutton href={backButtonHref} lable={backButtonLable}/>
            </CardFooter>
        </Card>
    )
}