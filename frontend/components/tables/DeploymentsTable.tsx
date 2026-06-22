type Deployment = {
  namespace: string;
  name: string;
  ready: string;
  replicas: number;
};

type Props = {
  deployments: Deployment[];
};

export default function DeploymentsTable({
  deployments,
}: Props) {

  return (

    <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">

      <thead className="bg-gray-100">

        <tr>

          <th className="border px-4 py-3 text-left">

            Namespace

          </th>

          <th className="border px-4 py-3 text-left">

            Deployment

          </th>

          <th className="border px-4 py-3 text-left">

            Ready

          </th>

          <th className="border px-4 py-3 text-left">

            Replicas

          </th>

        </tr>

      </thead>

      <tbody>

        {deployments.map((deployment) => (

          <tr
            key={`${deployment.namespace}-${deployment.name}`}
            className="hover:bg-gray-50 transition-colors"
          >

            <td className="border px-4 py-3 text-left">

              {deployment.namespace}

            </td>

            <td className="border px-4 py-3 text-left">

              {deployment.name}

            </td>

            <td className="border px-4 py-3 text-left">

            {deployment.ready.startsWith("0/")
                ? "🔴 " + deployment.ready
                : "🟢 " + deployment.ready}

            </td>

            <td className="border px-4 py-3 text-left">

              {deployment.replicas}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}