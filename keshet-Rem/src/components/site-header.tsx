import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import logoAsset from "@/assets/keshet-ream-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { blogNav, navItems } from "@/content/site";

function scrollTo(hash: string) {
  document
    .querySelector(`#${hash}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:flex lg:justify-between">
        {onHome ? (
          <button
            onClick={() => scrollTo("top")}
            className="min-w-0 cursor-pointer"
            aria-label="חזרה לראש העמוד"
          >
            <Logo />
          </button>
        ) : (
          <Link to="/" className="min-w-0" aria-label="חזרה לעמוד הבית">
            <Logo />
          </Link>
        )}

        <nav className="hidden items-center gap-7 lg:flex" aria-label="ניווט ראשי">
          {navItems.map((item) =>
            onHome ? (
              <button
                key={item.hash}
                onClick={() => scrollTo(item.hash)}
                className="text-[15px] font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                className="text-[15px] font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ),
          )}
          <Link
            to={blogNav.to}
            className="text-[15px] font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            {blogNav.label}
          </Link>
          {onHome ? (
            <Button
              onClick={() => scrollTo("contact")}
              className="h-11 rounded-full px-6 shadow-none"
            >
              בואו להכיר
            </Button>
          ) : (
            <Button asChild className="h-11 rounded-full px-6 shadow-none">
              <a href="/#contact">בואו להכיר</a>
            </Button>
          )}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 lg:hidden"
              aria-label="פתיחת תפריט"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[84%] border-border bg-background pt-16"
            dir="rtl"
          >
            <SheetTitle className="sr-only">תפריט ניווט</SheetTitle>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <SheetClose asChild key={item.hash}>
                  {onHome ? (
                    <Button
                      variant="ghost"
                      onClick={() => scrollTo(item.hash)}
                      className="h-14 justify-start text-lg"
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button variant="ghost" asChild className="h-14 justify-start text-lg">
                      <a href={`/#${item.hash}`}>{item.label}</a>
                    </Button>
                  )}
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  asChild
                  className="h-14 justify-start text-lg"
                >
                  <Link to={blogNav.to}>{blogNav.label}</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <img
      src={logoAsset.url}
      alt="קשת ראם — רואים אותך מצוין"
      className="h-11 w-auto max-w-[170px] object-contain sm:h-12"
    />
  );
}
