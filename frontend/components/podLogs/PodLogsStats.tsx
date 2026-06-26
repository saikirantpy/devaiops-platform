type Props = {

  totalLines: number;

  filteredLines: number;

  lastUpdated: string;

};

export default function PodLogsStats({

  totalLines,

  filteredLines,

  lastUpdated,

}: Props) {

  return (

    <div className="grid md:grid-cols-3 gap-6">

      <div className="border rounded-xl p-5">

        <h3 className="text-gray-500">

          Total Lines

        </h3>

        <p className="text-3xl font-bold">

          {totalLines}

        </p>

      </div>

      <div className="border rounded-xl p-5">

        <h3 className="text-gray-500">

          Filtered Lines

        </h3>

        <p className="text-3xl font-bold">

          {filteredLines}

        </p>

      </div>

      <div className="border rounded-xl p-5">

        <h3 className="text-gray-500">

          Last Updated

        </h3>

        <p className="text-lg font-semibold">

          {lastUpdated}

        </p>

      </div>

    </div>

  );

}
