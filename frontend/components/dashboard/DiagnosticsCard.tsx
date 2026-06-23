type Diagnostic = {

  namespace: string;

  name: string;

  message: string;

  suggestion: string;

};

type Props = {

  diagnostics: Diagnostic[];

};

export default function DiagnosticsCard({

  diagnostics,

}: Props) {

  return (

    <div className="border rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">

        Diagnostics

      </h2>

      <div className="space-y-4">

        {diagnostics.map(

          (item) => (

            <div
              key={item.name}
              className="border rounded-lg p-4 bg-yellow-50"
            >

              <p className="font-semibold">

                ⚠ {item.name}

              </p>

              <p>

                {item.message}

              </p>

              <p className="text-sm text-gray-600">

                💡 {item.suggestion}

              </p>

            </div>

          )

        )}

      </div>

    </div>

  );
}