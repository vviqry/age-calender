import useAgeStore from '../store/useAgeStore';

function HistoryFact() {
  const { historicalFacts, isLoading, error } = useAgeStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-500">
        {error}
      </p>
    );
  }

  if (historicalFacts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">
        Peristiwa di Tanggal Ini
      </h2>

      <div className="space-y-3">
        {historicalFacts.map((fact, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-purple-50 hover:border-purple-200"
          >
            <span className="mr-2 inline-block rounded-lg bg-purple-100 px-2 py-1 text-xs font-bold text-purple-700">
              {fact.year}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {fact.text}
            </p>
            {fact.pages?.[0] && (
              <a
                href={fact.pages[0].content_urls.desktop.page}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs font-medium text-purple-500 hover:text-purple-700 hover:underline"
              >
                Read more →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryFact;
