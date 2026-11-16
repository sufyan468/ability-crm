import { Columns3, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const labels: Record<string, string> = {
  "/": "Contacts",
  "/pipeline/": "Pipeline",
  "/contacts/new/": "New contact",
  "/contacts/view/": "Contact record",
  "/contacts/edit/": "Edit contact",
};

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const crumb = labels[pathname] ?? "Page unavailable";
  const section = pathname === "/pipeline/" ? "pipeline" : pathname === "/" || pathname.startsWith("/contacts/") ? "contacts" : undefined;
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  const navLink =
    "relative flex min-h-[43px] items-center gap-[11px] rounded-[7px] px-3 py-2.5 font-[520] text-[#d2ded4] hover:bg-[#2b473b] hover:text-[#fffef4] aria-[current=page]:bg-[#2b473b] aria-[current=page]:text-[#fffef4] aria-[current=page]:after:ml-auto aria-[current=page]:after:size-[5px] aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-[#c4d5ad] max-tablet:gap-1.5 max-tablet:px-[9px] max-tablet:py-[7px] max-tablet:after:hidden max-mobile:min-h-10 max-mobile:text-xs max-mobile:[&_svg]:size-[15px] max-small:px-1.5 max-narrow:[&_svg]:hidden";
  return (
    <div className="grid min-h-dvh grid-cols-[223px_minmax(0,1fr)] max-compact:grid-cols-[182px_minmax(0,1fr)] max-tablet:grid-cols-1">
      <title>{`${crumb} · Ability CRM`}</title>
      <a
        href="#main"
        className="fixed top-2 left-2 z-5 -translate-y-[150%] bg-white px-3.5 py-2.5 focus:translate-y-0"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        Skip to content
      </a>
      <aside className="sticky top-0 flex h-dvh flex-col self-start bg-[#162f28] px-[15px] pt-[29px] pb-[18px] text-[#f3f4ea] [--focus-ring:#dce7d3] max-tablet:static max-tablet:h-auto max-tablet:flex-row max-tablet:items-center max-tablet:justify-between max-tablet:gap-2.5 max-tablet:px-5 max-tablet:py-[13px] max-mobile:px-[15px]">
        <Link href="/" className="mx-[9px] flex w-fit items-center gap-[11px] max-tablet:mx-0 max-small:gap-[5px]">
          <img className="size-[39px] max-tablet:size-8 max-small:size-[27px]" src="/ability.svg" alt="" />
          <span className="font-serif text-[25px]/[.92] tracking-[-.6px] whitespace-nowrap max-tablet:text-[22px] max-small:text-[19px]">
            Ability CRM
            <small className="mt-2 block font-sans text-[9px]/none font-[650] tracking-[.15em] text-[#c0cdbf] max-tablet:mt-[5px] max-tablet:text-[8px] max-narrow:hidden">CLIENT INTAKE</small>
          </span>
        </Link>
        <div className="mt-[55px] max-tablet:mt-0">
          <span className="mb-3 block px-3 text-[10px] font-[650] tracking-[.14em] text-[#aebfb2] max-tablet:hidden">WORKSPACE</span>
          <nav aria-label="Workspace" className="grid gap-[5px] max-tablet:flex">
            <Link href="/" className={navLink} aria-current={section === "contacts" ? "page" : undefined}>
              <UsersRound size={18} /> Contacts
            </Link>
            <Link href="/pipeline/" className={navLink} aria-current={section === "pipeline" ? "page" : undefined}>
              <Columns3 size={18} /> Pipeline
            </Link>
          </nav>
        </div>
        <div className="mt-auto flex items-center gap-2.5 border-t border-[#365146] px-2 pt-4 text-[13px] font-semibold max-tablet:hidden">
          <span className="grid size-[33px] flex-none place-items-center rounded-lg bg-[#324e40] font-serif text-xs text-[#d4e0c9]">AL</span>
          <div>
            Alder &amp; Lane<small className="block text-[11px] font-normal text-[#b8c9bd]">Intake team</small>
          </div>
        </div>
      </aside>
      <div>
        <header className="flex h-[65px] items-center justify-between gap-3 border-b border-line bg-paper px-[clamp(22px,4vw,55px)] max-tablet:h-12 max-tablet:px-[22px] max-mobile:px-[15px]">
          <div className="flex items-center gap-2.5 text-xs text-muted">
            <span className="max-narrow:hidden">Workspace</span>
            <b className="font-normal text-[#777f74] max-narrow:hidden" aria-hidden="true">
              /
            </b>
            <strong className="font-[650] text-ink">{crumb}</strong>
          </div>
        </header>
        <main
          ref={main}
          id="main"
          tabIndex={-1}
          className="mx-auto max-w-[1440px] px-[clamp(22px,4vw,55px)] pt-[31px] pb-[52px] focus:outline-none max-compact:px-6 max-tablet:pt-[22px] max-mobile:px-[15px] max-mobile:pt-4 max-mobile:pb-9"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
