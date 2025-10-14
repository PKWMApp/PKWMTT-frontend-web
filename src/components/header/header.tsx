import { Link } from "@/i18n/navigation";
import Image from "next/image";
import DesktopNav from "./desktop-nav/desktop-nav";
import MobileNavSheet from "./mobile-nav-sheet/mobile-nav-sheet";

export default function Header() {
    return (
        <header className="bg-background-darker flex h-18 w-full shrink-0 items-center">
            <Link
                href="/"
                className="grid aspect-square h-full w-auto shrink-0 rounded-lg p-2.5"
            >
                <Image
                    src={"/logo.png"}
                    width={1024}
                    height={1024}
                    alt="logo"
                    className="block object-cover dark:hidden"
                    priority
                />
                <Image
                    src={"/logo-dark.png"}
                    width={1024}
                    height={1024}
                    alt="logo"
                    className="hidden object-cover dark:block"
                    priority
                />
            </Link>
            <div className="flex h-full w-full items-center justify-end p-5">
                <DesktopNav />
                <div className="md:hidden">
                    <MobileNavSheet />
                </div>
            </div>
        </header>
    );
}
