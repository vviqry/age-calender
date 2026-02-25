import type { AgeResult, DateInput } from '../types/age.types';

/**
 * Hitung selisih umur dari tanggal lahir ke hari ini.
 * Return: { years, months, days }
 */
export const calculateAge = (input: DateInput): AgeResult => {
  const today = new Date();
  const birthDate = new Date(input.year, input.month - 1, input.day);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Koreksi jika hari minus
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Koreksi jika bulan minus
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

/**
 * Validasi input tanggal lahir.
 * Return: string error message atau null jika valid.
 */
export const validateDateInput = (input: DateInput): string | null => {
  const { day, month, year } = input;
  const today = new Date();

  if (!day || !month || !year) {
    return 'Semua field harus diisi';
  }

  if (month < 1 || month > 12) {
    return 'Bulan harus antara 1-12';
  }

  if (day < 1 || day > 31) {
    return 'Hari harus antara 1-31';
  }

  // Cek hari valid untuk bulan tertentu
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    return `Bulan ${month} hanya punya ${daysInMonth} hari`;
  }

  const inputDate = new Date(year, month - 1, day);
  if (inputDate > today) {
    return 'Tanggal tidak boleh di masa depan';
  }

  if (year < 1900) {
    return 'Tahun harus 1900 atau lebih';
  }

  return null;
};
