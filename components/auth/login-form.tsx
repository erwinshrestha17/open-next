import CardWrapper from "@/components/auth/cardWrapper";

export default function LoginForm() {
    return(
        <CardWrapper
        headerLable={"Welcome Back"}
        backButtonHref={"/auth/register"}
        backButtonLable={"Don't have an account ?"}
        showSocial
        >
            .
        </CardWrapper>
    )
}