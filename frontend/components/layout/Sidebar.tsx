"use client";

import Link from "next/link";

import { usePathname }
from "next/navigation";

const menuItems = [

  {
    icon: "🏠",
    name: "Dashboard",
    href: "/",
  },

  {
    icon: "🐳",
    name: "Containers",
    href: "/containers",
  },

  {
    icon: "☸️",
    name: "Kubernetes",
    href: "/kubernetes",
  },

  {
    icon: "🚀",
    name: "Deployments",
    href: "/deployments",
  },

  {
    icon: "📈",
    name: "Monitoring",
    href: "/monitoring",
  },

    {
    icon: "📈",
    name: "Grafana",
    href: "/grafana",
  },

  {
    icon: "📄",
    name: "Logs",
    href: "/logs",
  },

  {
    icon: "🤖",
    name: "AI Copilot",
    href: "/ai-copilot",
  },

  {
    icon: "🔔",
    name: "Notifications",
    href: "/notifications",
  },

  {
    icon: "🔗",
    name: "Integrations",
    href: "/integrations",
  },

  {
    icon: "⚙️",
    name: "Settings",
    href: "/settings",
  },

];

export default function Sidebar() {

  const pathname =
    usePathname();

  return (

    <aside
      className="
      w-72
      h-screen
      sticky
      top-0
      border-r
      overflow-y-auto
      flex-shrink-0
      "
    >

      <h2 className="text-3xl font-bold mb-10">

        🚀 DevAIOps

      </h2>

      <nav>

        <ul className="space-y-2">

          {menuItems.map((item) => (

            <li key={item.name}>

              <Link

                href={item.href}

                className={`

                  flex

                  items-center

                  gap-3

                  p-3

                  rounded-lg

                  transition-colors

                  ${
                    pathname === item.href

                      ? "bg-blue-100 text-blue-700 font-semibold"

                      : "hover:bg-gray-100"
                  }

                `}

              >

                <span>

                  {item.icon}

                </span>

                <span>

                  {item.name}

                </span>

              </Link>

            </li>

          ))}

        </ul>

      </nav>

    </aside>

  );

}