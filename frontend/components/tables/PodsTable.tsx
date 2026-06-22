import StatusBadge from "@/components/shared/StatusBadge";

type Pod = {
  namespace: string;
  name: string;
  status: string;
  node: string;
};

type Props = {
  pods: Pod[];
};

export default function PodsTable({
  pods,
}: Props) {
  return (
    <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">

      <thead className="bg-gray-100">

        <tr>

          <th className="border px-4 py-3 text-left">
            Namespace
          </th>

          <th className="border px-4 py-3 text-left">
            Pod Name
          </th>

          <th className="border px-4 py-3 text-left">
            Status
          </th>

          <th className="border px-4 py-3 text-left">
            Node
          </th>

        </tr>

      </thead>

      <tbody>

        {pods.map((pod) => (

          <tr key={`${pod.namespace}-${pod.name}`}>

            <td className="border px-4 py-3 text-left">

              {pod.namespace}

            </td>

            <td className="border px-4 py-3 text-left">

              {pod.name}

            </td>

            <td className="border px-4 py-3 text-left">

              <StatusBadge
                status={pod.status}
              />

            </td>

            <td className="border px-4 py-3 text-left">

              {pod.node}

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}