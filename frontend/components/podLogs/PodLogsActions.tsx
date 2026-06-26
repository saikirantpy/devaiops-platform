type Props = {

  logs: string;

  podName: string;

};

export default function PodLogsActions({

  logs,

  podName,

}: Props) {

  function copyLogs() {

    navigator.clipboard.writeText(logs);

    alert("Logs copied.");

  }

  function downloadLogs() {

    const blob = new Blob(

      [logs],

      {

        type: "text/plain",

      }

    );

    const url =

      URL.createObjectURL(blob);

    const a =

      document.createElement("a");

    a.href = url;

    a.download =

      `${podName}.log`;

    a.click();

    URL.revokeObjectURL(url);

  }

  return (

    <div className="flex gap-4">

      <button

        onClick={copyLogs}

        className="border rounded-lg px-5 py-2 hover:bg-gray-100 transition"

      >

        📋 Copy Logs

      </button>

      <button

        onClick={downloadLogs}

        className="border rounded-lg px-5 py-2 hover:bg-gray-100 transition"

      >

        📥 Download Logs

      </button>

    </div>

  );

}
