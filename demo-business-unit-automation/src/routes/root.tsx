import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Meetings",
    to: "/meetings",
  },
  {
    name: "Payments",
    to: "/payments",
  },
  {
    name: "Form",
    to: "/form",
  },
  {
    name: "Tasks",
    to: "/tasks",
  },
];

export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Root({ className, ...props }: RootProps) {
  const location = useLocation();
  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px]">
        {/* TODO: fix this cheap active link shot */}
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {navItems.map((e) => (
            <NavLink
              to={e.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-4",
                  isActive ||
                    (location.pathname === "/" && e.to === "/meetings")
                    ? "font-bold text-primary"
                    : "font-medium text-muted-foreground"
                )
              }
              key={e.name}
            >
              {e.name}
            </NavLink>
          ))}
          <ScrollBar orientation="horizontal" className="invisible" />
        </div>
      </ScrollArea>
      <Outlet />
    </div>
  );
}
