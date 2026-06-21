type Props = {
  status: string;
  backend: string;
  environment: string;
};

export default function DashboardStatus({
  status,
  backend,
  environment,
}: Props) {
  return (
    <div className="border rounded-xl p-6">

      <h2 className="font-semibold mb-4">

        Platform Status

      </h2>

      <p>Status: {status}</p>

      <p>Backend: {backend}</p>

      <p>Environment: {environment}</p>

    </div>
  );
}