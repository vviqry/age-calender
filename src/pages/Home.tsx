import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import HistoryFact from '../components/HistoryFact';
import useAgeStore from '../store/useAgeStore';

function Home() {
  const { result } = useAgeStore();

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-12 md:py-20">
      {/* Main Card */}
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Age Calculator
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Masukkan tanggal lahirmu untuk menghitung umur dan temukan fakta sejarah di tanggal tersebut.
        </p>

        {/* Form Input */}
        <InputForm />

        {/* Divider + Result */}
        {result && (
          <>
            <hr className="my-8 border-gray-100" />
            <ResultCard />
          </>
        )}
      </div>

      {/* History Facts — di luar card utama */}
      {result && (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
          <HistoryFact />
        </div>
      )}
    </div>
  );
}

export default Home;
