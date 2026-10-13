import logoAsset from "@/assets/keshet-ream-logo.jpg.asset.json";
import { school } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center sm:px-8 md:flex-row md:text-right">
        <img src={logoAsset.url} alt={school.name} className="h-12 w-auto" />
        <p className="text-sm text-muted-foreground">
          {school.track} · {school.tagline}
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {school.name}
        </p>
      </div>
    </footer>
  );
}
