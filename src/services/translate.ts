import axios from 'axios';

/**
 * Terjemahkan teks dari Inggris ke Indonesia
 * Menggunakan MyMemory Translation API (gratis, tanpa API key)
 */
export const translateToId = async (text: string): Promise<string> => {
  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: 'en|id',
      },
    });
    return response.data.responseData.translatedText;
  } catch {
    // Kalau gagal translate, return teks asli
    return text;
  }
};
