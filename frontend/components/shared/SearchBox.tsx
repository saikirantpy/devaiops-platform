type Props = {

  value: string;

  onChange: (
    value: string
  ) => void;

};

export default function SearchBox({

  value,

  onChange,

}: Props) {

  return (

    <input

      type="text"

      placeholder="🔍 Search"

      value={value}

      onChange={(event) =>

        onChange(
          event.target.value
        )

      }

      className="
        w-full

        border

        rounded-lg

        p-3

        mb-6

        shadow-sm
      "

    />

  );

}