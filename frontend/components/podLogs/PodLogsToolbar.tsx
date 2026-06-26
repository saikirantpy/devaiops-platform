type Props = {
  search: string;
  setSearch: (value: string) => void;
  refresh: () => void;
};

export default function PodLogsToolbar({
  search,
  setSearch,
  refresh,
}: Props) {

  return (

    <div className="border rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between">

      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border rounded-lg px-4 py-2 flex-1"
      />

      <button
        onClick={refresh}
        className="
          border
          rounded-lg
          px-6
          py-2
          hover:bg-gray-100
          transition
        "
      >
        🔄 Refresh
      </button>

    </div>

  );

}