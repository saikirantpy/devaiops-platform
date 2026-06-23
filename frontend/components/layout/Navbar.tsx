import EnvironmentBadge from "@/components/shared/EnvironmentBadge";

export default function Navbar() {

  return (

    <nav
      className="
        h-20

        border-b

        bg-white

        flex

        items-center

        justify-between

        px-8

        shadow-sm
      "
    >

      <div>

        <h1 className="text-3xl font-bold">

          🚀 DevAIOps Platform

        </h1>

        <p className="text-sm text-gray-500">

          Unified AI Powered DevOps Control Center

        </p>

      </div>

      <div className="flex items-center gap-4">

        <EnvironmentBadge />

      </div>

    </nav>

  );

}