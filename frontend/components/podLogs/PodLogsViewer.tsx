type Props = {
  logs: string;
};

export default function PodLogsViewer({
  logs,
}: Props) {

  function highlightLine(
    line: string
  ) {

    if (line.includes("ERROR")) {

      return (
        <span className="text-red-400">
          {line}
        </span>
      );

    }

    if (line.includes("WARN")) {

      return (
        <span className="text-yellow-400">
          {line}
        </span>
      );

    }

    if (line.includes("INFO")) {

      return (
        <span className="text-green-400">
          {line}
        </span>
      );

    }

    return <span>{line}</span>;

  }

  return (

    <div className="bg-gray-950 rounded-xl overflow-auto max-h-[700px]">

      {logs
        .split("\n")
        .filter(Boolean)
        .map((line, index) => (

          <div
            key={index}
            className="flex border-b border-gray-800 font-mono text-sm"
          >

            <div className="w-16 text-right pr-4 py-1 text-gray-500 select-none">

              {index + 1}

            </div>

            <div className="flex-1 py-1 pr-4 text-green-300 whitespace-pre-wrap">

              {highlightLine(line)}

            </div>

          </div>

        ))}

    </div>

  );

}