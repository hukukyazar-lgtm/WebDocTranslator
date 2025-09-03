import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ProgressReset() {
  const clearAllProgress = () => {
    // Tüm progress verilerini temizle
    const keysToRemove = [
      'category_progress_guest',
      'category_progress_user', 
      'completed_kolay_guest',
      'completed_orta_guest',
      'completed_zor_guest',
      'completed_kolay_user',
      'completed_orta_user',
      'completed_zor_user',
      'unlocked_difficulties_guest',
      'unlocked_difficulties_user'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('🧹 Tüm progress verileri temizlendi');
    alert('Progress verileri temizlendi! Sayfa yenileniyor...');
    window.location.reload();
  };

  return (
    <Card className="p-3 m-3 bg-red-50 border-red-200">
      <h4 className="text-sm font-bold text-red-800 mb-2">⚠️ Progress Sıfırlama</h4>
      <p className="text-xs text-red-600 mb-2">
        Tüm kullanıcı progress verilerini sıfırla
      </p>
      <Button 
        onClick={clearAllProgress} 
        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
      >
        Tüm Progress'i Sıfırla
      </Button>
    </Card>
  );
}