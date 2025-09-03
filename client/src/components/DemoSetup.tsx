import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function DemoSetup() {
  const [isDemoActive, setIsDemoActive] = useState(false);

  const setupDemo = () => {
    // Demo progress verileri
    const demoProgress = {
      'Hayvanlar': { 'kolay': 25, 'orta': 15, 'zor': 5 },
      'Yiyecek': { 'kolay': 25, 'orta': 8, 'zor': 0 },
      'Bilim': { 'kolay': 18, 'orta': 0, 'zor': 0 },
      'Ülkeler': { 'kolay': 7, 'orta': 0, 'zor': 0 },
      'Meslekler': { 'kolay': 25, 'orta': 20, 'zor': 0 },
      'Şehirler': { 'kolay': 12, 'orta': 0, 'zor': 0 },
      'Spor Dalları': { 'kolay': 3, 'orta': 0, 'zor': 0 },
      'Markalar': { 'kolay': 25, 'orta': 25, 'zor': 12 },
      'Filmler': { 'kolay': 21, 'orta': 0, 'zor': 0 },
      'Eşyalar': { 'kolay': 9, 'orta': 0, 'zor': 0 }
    };

    // LocalStorage'a yazıyor
    localStorage.setItem('category_progress_user', JSON.stringify(demoProgress));
    localStorage.setItem('category_progress_guest', JSON.stringify(demoProgress));

    // Tamamlanan kategoriler
    const completedEasy = ['Hayvanlar', 'Yiyecek', 'Meslekler', 'Markalar'];
    const completedMedium = ['Markalar'];

    localStorage.setItem('completed_kolay_user', JSON.stringify(completedEasy));
    localStorage.setItem('completed_kolay_guest', JSON.stringify(completedEasy));
    localStorage.setItem('completed_orta_user', JSON.stringify(completedMedium));
    localStorage.setItem('completed_orta_guest', JSON.stringify(completedMedium));

    // Kilit açık zorluklar (4/10 kategori tamamlandı, orta hâlâ kilitli)
    localStorage.setItem('unlocked_difficulties_user', JSON.stringify(['kolay']));
    localStorage.setItem('unlocked_difficulties_guest', JSON.stringify(['kolay']));

    setIsDemoActive(true);
    console.log('🎮 DEMO aktif! Kategori progress yüzdeleri güncellendi');

    // Sayfayı yenile ki progress görünsün
    window.location.reload();
  };

  const clearDemo = () => {
    localStorage.removeItem('category_progress_user');
    localStorage.removeItem('category_progress_guest');
    localStorage.removeItem('completed_kolay_user');
    localStorage.removeItem('completed_kolay_guest');
    localStorage.removeItem('completed_orta_user');
    localStorage.removeItem('completed_orta_guest');
    localStorage.removeItem('unlocked_difficulties_user');
    localStorage.removeItem('unlocked_difficulties_guest');

    setIsDemoActive(false);
    console.log('🧹 Demo verileri temizlendi');
    window.location.reload();
  };

  useEffect(() => {
    // Demo aktif mi kontrol et
    const demoData = localStorage.getItem('category_progress_user');
    if (demoData) {
      setIsDemoActive(true);
    }
  }, []);

  return (
    <Card className="p-4 m-4 bg-yellow-50 border-yellow-200">
      <h3 className="text-lg font-bold text-yellow-800 mb-2">🎮 DEMO MODU</h3>
      <p className="text-sm text-yellow-700 mb-3">
        Progress sistemini test etmek için demo verilerini yükleyin:
      </p>
      <ul className="text-xs text-yellow-600 mb-3">
        <li>• Hayvanlar: %100 (tamamlandı)</li>
        <li>• Ülkeler: %28 (7/25)</li>
        <li>• Filmler: %84 (21/25)</li>
        <li>• Bilim: %72 (18/25)</li>
        <li>• Orta zorluk: Kilitli (6 kategori eksik)</li>
      </ul>
      <div className="flex gap-2">
        {!isDemoActive ? (
          <Button onClick={setupDemo} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Demo Verilerini Yükle
          </Button>
        ) : (
          <Button onClick={clearDemo} variant="outline" className="border-yellow-500 text-yellow-700">
            Demo Verilerini Temizle
          </Button>
        )}
      </div>
      {isDemoActive && (
        <p className="text-xs text-green-600 mt-2">✅ Demo aktif! Kategorilerde progress yüzdeleri görünüyor.</p>
      )}
    </Card>
  );
}