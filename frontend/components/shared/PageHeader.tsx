type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">

      <h1 className="text-3xl font-bold">

        {title}

      </h1>

      <p className="text-gray-500 mt-1">

        {subtitle}

      </p>

    </div>
  );
}