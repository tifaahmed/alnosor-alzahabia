export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-amber-200/60 dark:bg-[#161615] dark:ring-amber-900/40">
                <img
                    src="/images/logos/logo-without-background.png"
                    alt="Al Nosor Al Zahabia FZE LLC"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">Al Nosor Al Zahabia</span>
                <span className="truncate text-[11px] font-medium uppercase tracking-widest text-amber-700 dark:text-amber-300">
                    FZE LLC · Ajman
                </span>
            </div>
        </>
    );
}
