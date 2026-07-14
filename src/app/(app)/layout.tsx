import { redirect } from "next/navigation";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { NavLink } from "@/components/nav-link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/income-expense", label: "Income & Expense" },
  { href: "/logistics", label: "Logistics" },
  { href: "/manpower", label: "Manpower" },
  { href: "/salary", label: "Salary" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-lg font-semibold tracking-tight">
              money<span className="text-accent">U</span>
            </span>
            <nav className="flex flex-wrap gap-5">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt=""
                width={28}
                height={28}
                className="rounded-full"
              />
            )}
            <span className="text-sm text-muted">{session.user.name}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="text-sm text-muted hover:text-foreground">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
