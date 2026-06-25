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
    icon: "📊",
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
      flex-shrink-0

      bg-white

      dark:bg-gray-900

      border-r

      border-gray-200

      dark:border-gray-800

      overflow-y-auto

      px-6

      py-8

      shadow-sm
      "
    >

      <div className="mb-10">

        <h2 className="text-3xl font-bold">

          🚀 DevAIOps

        </h2>

        <p className="text-sm text-gray-500 mt-2">

          AI Powered DevOps Control Center

        </p>

      </div>

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

                      ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"

                      : "text-gray-600 hover:bg-gray-100 hover:translate-x-1"
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