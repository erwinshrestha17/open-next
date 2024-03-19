"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";


interface BackBUttonProps {
    href:string
    lable:string
}
export default function Backbutton({href,lable}:BackBUttonProps){
    return(
        <Button variant={"link"} className={"font-normal w-full "} size={"sm" } asChild>
            <Link href={href}>{lable}</Link>
        </Button>
    )
}