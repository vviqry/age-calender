import { useState } from 'react';
import type { DateInput } from '../types/age.types';
import { validateDateInput, calculateAge } from '../utils/calculateAge';
import { getHistoricalEvents } from '../services/api';
import { translateToId } from '../services/translate';
import useAgeStore from '../store/useAgeStore';

function InputForm() {
  const [input, setInput] = useState<DateInput>({ day: 0, month: 0, year: 0 });
  const [error, setError] = useState<string | null>(null);

  const { setResult, setHistoricalFacts, setLoading, setError: setStoreError } = useAgeStore();

  const handleChange = (field: keyof DateInput, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    setInput((prev) => ({ ...prev, [field]: numValue }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    const validationError = validateDateInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Hitung umur
    const ageResult = calculateAge(input);
    setResult(ageResult);

    // Fetch fakta sejarah + terjemahkan ke Indonesia
    setLoading(true);
    setStoreError(null);
    try {
      const data = await getHistoricalEvents(input.month, input.day);
      const topEvents = data.events.slice(0, 5);

      // Terjemahkan semua fakta secara paralel
      const translatedEvents = await Promise.all(
        topEvents.map(async (event: { text: string; year: number; pages: unknown[] }) => ({
          ...event,
          text: await translateToId(event.text),
        }))
      );

      setHistoricalFacts(translatedEvents);
    } catch {
      setStoreError('Gagal mengambil fakta sejarah');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-2xl font-bold text-gray-900 outline-none transition-all focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-200';

  const labelStyle = 'block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        {/* Day */}
        <div>
          <label htmlFor="day" className={labelStyle}>
            Day
          </label>
          <input
            id="day"
            type="number"
            placeholder="DD"
            min={1}
            max={31}
            value={input.day || ''}
            onChange={(e) => handleChange('day', e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* Month */}
        <div>
          <label htmlFor="month" className={labelStyle}>
            Month
          </label>
          <input
            id="month"
            type="number"
            placeholder="MM"
            min={1}
            max={12}
            value={input.month || ''}
            onChange={(e) => handleChange('month', e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className={labelStyle}>
            Year
          </label>
          <input
            id="year"
            type="number"
            placeholder="YYYY"
            min={1900}
            max={new Date().getFullYear()}
            value={input.year || ''}
            onChange={(e) => handleChange('year', e.target.value)}
            className={inputStyle}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full cursor-pointer rounded-xl bg-purple-600 py-3 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg active:scale-[0.98]"
      >
        Hitung Umur
      </button>
    </form>
  );
}

export default InputForm;
