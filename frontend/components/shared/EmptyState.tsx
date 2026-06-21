type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="border rounded-xl p-8">

      <h2 className="text-xl font-semibold">

        {title}

      </h2>

      <p className="text-gray-500 mt-2">

        {description}

      </p>

    </div>
  );
}