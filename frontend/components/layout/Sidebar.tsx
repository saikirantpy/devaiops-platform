import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/" },
  { name: "Containers", href: "/containers" },
  { name: "Deployments", href: "/deployments" },
  { name: "Kubernetes", href: "/kubernetes" },
  { name: "Monitoring", href: "/monitoring" },
  { name: "Logs", href: "/logs" },
  { name: "AI Copilot", href: "/ai-copilot" },
  { name: "Notifications", href: "/notifications" },
  { name: "Integrations", href: "/integrations" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">
        🚀 DevAIOps
      </h2>

      <nav>
        <ul className="space-y-4">

          {menuItems.map((item) => (

            <li key={item.name}>

              <Link href={item.href}>

                {item.name}

              </Link>

            </li>

          ))}

        </ul>
      </nav>
    </aside>
  );
}