type Props = {
  backend: string;
  environment: string;
};

export default function DashboardStatus({
  backend,
  environment,
}: Props) {
  return (
    <div className="border rounded-xl p-6">

      <h2 className="font-semibold mb-4">

        Platform Status

      </h2>

      <p>Backend: {backend}</p>

      <p>Environment: {environment}</p>

    </div>
  );
}