type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {

  const normalized =
    status.toLowerCase();

  const statusMap: Record<string, string> = {

    running:
      "bg-green-100 text-green-700",

    pending:
      "bg-yellow-100 text-yellow-700",

    succeeded:
      "bg-blue-100 text-blue-700",

    failed:
      "bg-red-100 text-red-700",

    exited:
      "bg-red-100 text-red-700",

    paused:
      "bg-orange-100 text-orange-700",

    restarting:
      "bg-purple-100 text-purple-700",

  };

  const colors =
    statusMap[normalized] ??
    "bg-gray-100 text-gray-700";

  return (

    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${colors}`}
    >

      {status}

    </span>

  );
}