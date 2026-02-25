import useAgeStore from '../store/useAgeStore';

function ResultCard() {
  const { result } = useAgeStore();

  if (!result) return null;

  const items = [
    { value: result.years, singular: 'tahun', plural: 'tahun' },
    { value: result.months, singular: 'bulan', plural: 'bulan' },
    { value: result.days, singular: 'hari', plural: 'hari' },
  ];

  return (
    <div className="space-y-2 py-4">
      {items.map((item) => (
        <p key={item.singular} className="text-4xl font-extrabold leading-snug text-gray-900 md:text-5xl">
          <span className="text-purple-600">{item.value}</span>{' '}
          {item.value === 1 ? item.singular : item.plural}
        </p>
      ))}
    </div>
  );
}

export default ResultCard;
