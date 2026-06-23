type Props = {

  answer: string;

};

export default function CopilotAnswer({

  answer,

}: Props) {

  if (!answer) {

    return null;

  }

  return (

    <div className="border rounded-xl p-6 bg-white shadow-sm">

      <h2 className="text-xl font-semibold mb-4">

        AI Answer

      </h2>

      <div className="whitespace-pre-line">

        {answer}

      </div>

    </div>

  );

}