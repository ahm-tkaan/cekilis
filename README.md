# ReactXchem Çekiliş Sistemi

ReactXchem etkinliği için geliştirilmiş basit bir çekiliş sistemi.

## Özellikler

- QR kod ile kayıt sistemi
- Ad, soyad ve telefon numarası ile kayıt
- KVKK onay mekanizması
- Admin paneli ile katılımcı yönetimi
- Tek tuşla otomatik çekiliş yapabilme
- Görsel çekiliş sonuç ekranı
- Kazananlar için konfeti efekti

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Firebase hesabı

### Kurulum Adımları

1. Repo'yu bilgisayarınıza klonlayın:
```
git clone https://github.com/your-username/react-cekilisapp.git
cd react-cekilisapp
```

2. Gerekli paketleri yükleyin:
```
npm install
```

3. Firebase yapılandırması:
   - Firebase Console üzerinden yeni bir proje oluşturun
   - Firebase projenizde Firestore Database hizmetini etkinleştirin
   - Web uygulaması olarak projenizi kaydedin ve yapılandırma bilgilerini alın
   - `src/firebase/config.js` dosyasında kendi Firebase yapılandırmanızı ekleyin

4. Uygulamayı başlatın:
```
npm start
```

## Kullanım

### Katılımcı Kaydı

1. QR kodu oluşturmak için `/qrcode` sayfasını ziyaret edin ve QR kodunu indirin
2. Bu QR kodu etkinlikte paylaşın
3. Katılımcılar QR kodu okuttuğunda kayıt formuna yönlendirileceklerdir
4. Katılımcılar ad, soyad, telefon numarası ve KVKK onayı ile kaydolabilir

### Çekiliş Yönetimi

1. `/admin` sayfasına giriş yapın
2. Burada tüm katılımcıları görebilir ve yönetebilirsiniz
3. Çekilişi başlatmak için "Çekilişi Başlat" butonuna tıklayın
4. `/draw` sayfasında çekilişi gerçekleştirin ve sonuçları görüntüleyin

## Veri Yapısı

Firebase Firestore veritabanında iki koleksiyon kullanılmaktadır:

### participants

Katılımcı bilgilerini içerir:
- firstName: Ad
- lastName: Soyad
- phoneNumber: Telefon numarası
- kvkkApproved: KVKK onayı (boolean)
- registrationTime: Kayıt zamanı (timestamp)
- isWinner: Kazanan mı? (boolean)
- prize: Kazanılan ödül (string)

### prizes

Çekilişteki ödülleri içerir:
- name: Ödül adı
- sponsor: Sponsor adı
- quantity: Kazanan sayısı
- winners: Kazanan ID'leri (array)

## Lisans

MIT
