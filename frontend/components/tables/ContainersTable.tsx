import StatusBadge from "@/components/shared/StatusBadge";

type Container = {
  id: string;
  name: string;
  image: string;
  status: string;
};

type Props = {
  containers: Container[];
};

export default function ContainersTable({
  containers,
}: Props) {
  return (
    <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">

      <thead className="bg-gray-100">

        <tr>

          <th className="border px-4 py-3 text-left">
            Name
          </th>

          <th className="border px-4 py-3 text-left">
            ID
          </th>

          <th className="border px-4 py-3 text-left">
            Status
          </th>

          <th className="border px-4 py-3 text-left">
            Image
          </th>

        </tr>

      </thead>

      <tbody>

        {containers.map((container) => (

        <tr
            key={container.id}
            className="hover:bg-gray-50 transition-colors"
        >

            <td className="border px-4 py-3 text-left">

              {container.name}

            </td>

            <td className="border px-4 py-3 text-left">

              {container.id}

            </td>

            <td className="border px-4 py-3 text-left">

              <StatusBadge
                status={container.status}
              />

            </td>

            <td
              className="border px-4 py-3 text-left max-w-xs truncate"
              title={container.image}
            >

              {container.image}

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}