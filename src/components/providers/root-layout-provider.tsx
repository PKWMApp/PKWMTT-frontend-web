import { timeZone } from "@/i18n/request";
import { TRPCReactProvider } from "@/trpc/react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./theme-provider";

export default function RootLayoutProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <NextIntlClientProvider timeZone={timeZone}>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
