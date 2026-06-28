# 🌸 SHOPPAY-Beauty E-Commerce Website & Business Plan

Proyek ini dibangun untuk menghadirkan website e-commerce kosmetik premium **SHOPPAY-Beauty** yang lengkap, responsif, memiliki performa tinggi, serta didukung oleh dokumen rencana bisnis terintegrasi dan petunjuk publikasi ke layanan hosting gratis (GitHub Pages).

---

## 🚀 LIVE PREVIEW & DEMO

Aplikasi web e-commerce ini dikembangkan menggunakan tumpukan teknologi modern **React (v19) + Vite + Tailwind CSS (v4)** untuk memberikan performa responsif kilat di sisi klien, sementara berkas vanilla yang siap diunggah ke tugas berada di dalam folder `/vanilla/`.

---

## 📑 ASPEK BISNIS & STRATEGI PRODUK (BUSINESS OVERVIEW)

### 1. Deskripsi Bisnis & Value Proposition (Proposisi Nilai)
* **Nama Bisnis:** SHOPPAY-Beauty
* **Deskripsi:** Toko e-commerce kosmetik premium terkurasi (*curated beauty marketplace*) yang mengedepankan produk-produk kecantikan berbahan organik murni, berlisensi resmi BPOM, dan bersertifikasi halal oleh MUI.
* **Value Proposition:** 
  * **100% Organik & Clean Beauty:** Bebas paraben, sulfat keras, serta paraben beracun lainnya yang membahayakan kulit jangka panjang.
  * **Sertifikasi Halal & BPOM Terjamin:** Memberikan rasa aman dan kepastian moral bagi mayoritas konsumen muslim di Indonesia.
  * **Ethical & Cruelty-Free:** Mendukung gerakan ramah lingkungan dan menentang keras segala bentuk percobaan kosmetik pada hewan (*no animal testing*).
  * **Simulasi Sandbox Interaktif:** Dilengkapi kalkulator pengiriman real-time, validasi form, serta simulasi gateway pembayaran QRIS & Bank Virtual Account otomatis.

### 2. Target Market & Segmentasi Pelanggan
* **Demografis:** Perempuan dan pria usia produktif 18–35 tahun (mayoritas Gen Z dan Milenial) dengan tingkat pendapatan menengah hingga atas.
* **Geografis:** Berlokasi di wilayah urban dan suburban di Indonesia (Jabodetabek, Surabaya, Bandung, Medan, Makassar) yang terbiasa bertransaksi online secara instan.
* **Psikografis:** Konsumen dengan kesadaran tinggi (*conscious consumer*) mengenai kebersihan bahan aktif (*ingredients-aware*), menyukai tren perawatan kulit alami (*clean-beauty*), dan berorientasi estetika tinggi.

### 3. Analisis Pasar Singkat & Kompetitor
* **Analisis Pasar:** Industri kosmetik dan *personal care* di Indonesia mencatat pertumbuhan dobel digit tahunan, dipicu oleh pergeseran tren dari riasan tebal (*heavy makeup*) menjadi tampilan bercahaya sehat alami (*healthy glowing skin*).
* **Kompetitor Utama:**
  * **Sociolla:** Kuat di jaringan outlet fisik. SHOPPAY-Beauty bersaing melalui keunikan kurasi produk organik murni bebas paraben, efisiensi navigasi situs yang cepat, dan promosi otomatis yang agresif.
  * **BeautyHaul:** Memiliki jangkauan luas. SHOPPAY-Beauty unggul dari segi visual yang elegan, penulisan bahan aktif yang transparan, dan kemudahan proses checkout.

### 4. Strategi Manajemen Produk & Katalog
Katalog produk dibagi secara intuitif menjadi 4 kategori esensial:
1. **Skincare (Perawatan Kulit):** Serum Vitamin C, Toner Bunga Mawar, Sunscreen SPF 50+, dan Cleansing Balm.
2. **Makeup (Riasan):** Velvet Liquid Lipstick, Volumizing Mascara, dan Tinted Lip Glow Balm.
3. **Haircare (Perawatan Rambut):** Argan Rosemary Hair Oil dan Keratin Repair Mask.
4. **Fragrance (Wewangian):** Rose de Mai Luxury Eau de Parfum.

Setiap produk dilengkapi deskripsi lengkap, daftar bahan penyusun (*ingredients*), serta instruksi cara pakai guna mengedukasi pembeli secara transparan.

### 5. Model Bisnis & Revenue Stream
* **Penjualan Langsung B2C:** Pembelian produk dalam volume besar langsung dari produsen resmi kecantikan dengan margin keuntungan berkisar antara 25% - 35% per produk.
* **Promosi Berbayar Brand Lokal:** Sistem bagi hasil (komisi distribusi) untuk brand kecantikan organik lokal pendatang baru yang diluncurkan secara eksklusif pertama kali di platform SHOPPAY-Beauty.

### 6. Strategi Harga, Promosi, dan Diskon
* **Value-Based Pricing:** Menetapkan harga kompetitif yang mencerminkan kualitas organik premium dan keaslian produk.
* **Sistem Diskon Otomatis (Interactive Sales Trigger):**
  * Penempelan label *Sale* (diskon langsung hingga 20%) untuk beberapa produk unggulan.
  * **Gratis Biaya Kirim (Free Shipping):** Diberikan secara otomatis jika nilai belanja di keranjang mencapai minimal Rp 150.000.
  * **Diskon Otomatis Tambahan 10%:** Dipotong langsung pada ringkasan belanja jika total belanjaan melampaui Rp 200.000.
  * **Lead Generation Promo:** Kode voucher diskon tambahan 15% dikirimkan otomatis setelah pengguna mendaftarkan email di kolom buletin footer.

### 7. Proses Checkout & Simulasi Payment Gateway
Alur checkout dirancang seringkas mungkin untuk mengurangi rasio pembatalan transaksi (*cart abandonment*):
1. **Formulir Pengiriman:** Dilengkapi validasi field wajib isi (Nama, Email, HP, Alamat, Kota, Kode Pos).
2. **Dynamic Delivery Cost:** Mengubah tarif kirim secara instan sesuai metode pengiriman yang dipilih (Regular / GoSend Instant).
3. **Integrasi Sandbox Simulator:** Mengintegrasikan model gateway sandbox seperti Midtrans/Xendit:
   * **QRIS (Quick Response Code Indonesian Standard):** Kode QR dinamis ditampilkan dengan sisa batas waktu pembayaran (countdown timer). Status transaksi akan otomatis terdeteksi sukses dalam waktu 5 detik pasca scanning simulasi.
   * **Virtual Account (VA):** Menampilkan nomor rekening bank virtual Mandiri / BCA sandbox dengan pencatatan status realtime.

### 8. Rencana SEO, Keamanan, dan Pemeliharaan
* **Rencana SEO:**
  * Optimasi tag judul halaman dan meta deskripsi berbasis kata kunci ramah Google (*skincare halal, kosmetik organik terpercaya, beauty shop indonesia*).
  * Struktur heading semantic (`<h1>` hingga `<h6>`) dan penamaan alternatif gambar (*alt text*) deskriptif untuk meraup lalu lintas pencarian organik Google Image.
* **Keamanan:**
  * Penerapan sertifikat enkripsi SSL/HTTPS wajib pada server hosting.
  * Proteksi data pribadi di sisi klien menggunakan penyimpanan lokal aman (localStorage).
  * Pembersihan string masukan formulir guna menghindari serangan siber Cross-Site Scripting (XSS).
* **Pemeliharaan Berkala:**
  * Pengurangan ukuran berkas gambar tanpa mengurangi ketajaman visual (*image optimization*) demi mempertahankan waktu loading di bawah 2 detik.
  * Pembaruan pustaka framework secara konsisten untuk menambal celah bug keamanan.

### 9. Rencana Pengambilan Keputusan Berbasis Data (Data Analytics)
Pelacakan aksi terekam langsung (real-time click tracking) menggunakan dummy Google Analytics (gtag.js) untuk memantau performa bisnis:
* **Bounce Rate:** Mengukur persentase pengunjung yang langsung menutup situs tanpa mengeksplorasi katalog untuk mengevaluasi daya tarik visual utama.
* **Conversion Rate:** Mengukur rasio pengunjung yang menyelesaikan pembayaran terhadap total lalu lintas situs.
* **Cart Abandonment Rate:** Menganalisis tahapan di mana pembeli membatalkan pesanan di checkout untuk menyusun taktik diskon susulan.
* **Average Order Value (AOV):** Menganalisis rata-rata nilai transaksi per pelanggan untuk meluncurkan program promosi bundel produk kecantikan yang relevan.

---

## 💻 TEKNIS PENGEMBANGAN (TECHNICAL RELEASES)

Proyek ini dipisahkan menjadi dua arsitektur folder utama demi kenyamanan pengumpulan tugas Anda:

1. **`/vanilla/` (Vanilla Release - Untuk Tugas Kuliah/Grup):**
   * **`index.html`**: Layout murni tanpa framework, rapi, responsif, dan siap dijalankan offline dengan inline SVG icons.
   * **`css/style.css`**: Lembar gaya terpisah murni menggunakan media queries lengkap untuk mobile, tablet, dan desktop.
   * **`js/app.js`**: Logika interaktif penuh (pencarian, filter multi-kategori, slider harga, keranjang belanja localStorage, modal detail tab, form checkout, timer pembayaran, serta simulator QRIS).
2. **`/src/` (React Release - Untuk Penayangan Live Preview):**
   * Menggunakan teknologi modern **React 19 + Vite + Tailwind CSS v4 + Motion React Animations** untuk menghasilkan antarmuka super mewah dengan transisi dinamis layaknya startup kecantikan profesional.

---

## 🚀 PANDUAN UNGGUAH GITHUB & DEPLOY GITHUB PAGES (GRATIS)

Ikuti langkah-langkah praktis di bawah ini untuk mengunggah proyek kosmetik **SHOPPAY-Beauty** Anda ke GitHub dan mempublikasikannya secara online secara gratis menggunakan **GitHub Pages**:

### Langkah 1: Buat Repositori Baru di GitHub
1. Masuk ke akun [GitHub](https://github.com/) Anda.
2. Klik tombol **New** (atau tanda plus `+` di kanan atas &rarr; *New repository*).
3. Isi **Repository name** dengan: `shoppay-beauty`.
4. Atur visibilitas repositori sebagai **Public** (wajib agar bisa di-deploy gratis di GitHub Pages).
5. Pada pilihan *Initialize this repository with*, biarkan semua **kosong** (jangan centang README/gitignore).
6. Klik **Create repository**.

### Langkah 2: Persiapkan Folder Proyek di Laptop
1. Ekspor file proyek Anda dalam bentuk **ZIP** dari menu pengaturan AI Studio Workspace ini, lalu ekstrak di komputer Anda.
2. Salin seluruh isi di dalam folder `/vanilla/` (yaitu berkas `index.html`, folder `css/`, dan folder `js/`) lalu pindahkan ke satu folder khusus di laptop Anda, misalnya folder bernama `tugas-shoppay-beauty`.

### Langkah 3: Inisialisasi Git & Commit Melalui Terminal
1. Buka aplikasi **Git Bash** (Windows) atau **Terminal** (Mac/Linux).
2. Masuk ke direktori folder proyek Anda tersebut:
   ```bash
   cd path/to/tugas-shoppay-beauty
   ```
3. Jalankan inisialisasi Git lokal:
   ```bash
   git init
   ```
4. Masukkan seluruh file ke staging area Git:
   ```bash
   git add .
   ```
5. Lakukan perekaman commit pertama Anda:
   ```bash
   git commit -m "feat: inisialisasi e-commerce SHOPPAY-Beauty lengkap"
   ```

### Langkah 4: Hubungkan ke GitHub & Push Kode
1. Salin alamat URL repository Anda di GitHub yang berakhiran `.git`. Contoh: `https://github.com/username-anda/shoppay-beauty.git`.
2. Masukkan perintah berikut di terminal untuk mendaftarkan remote repository (ganti URL dengan milik Anda):
   ```bash
   git remote add origin https://github.com/username-anda/shoppay-beauty.git
   ```
3. Ubah nama branch utama menjadi `main`:
   ```bash
   git branch -M main
   ```
4. Unggah seluruh file Anda ke repositori GitHub online:
   ```bash
   git push -u origin main
   ```

### Langkah 5: Publikasikan (Deploy) via GitHub Pages
1. Kembali ke halaman repositori Anda di website GitHub, lalu klik tab menu **Settings** di bagian atas.
2. Pada bar navigasi sebelah kiri, cari dan klik menu **Pages** (di bawah kelompok *Code and automation*).
3. Di dalam panel konfigurasi **Build and deployment**:
   * Di dropdown **Branch**, ubah pilihan dari `None` menjadi branch **`main`**.
   * Di sampingnya, biarkan folder berada pada folder utama **`/ (root)`**.
4. Klik tombol **Save**.
5. Tunggu sekitar 1 menit agar GitHub memproses kompilasi di latar belakang. Lakukan refresh halaman. Di bagian atas halaman settings pages akan muncul pemberitahuan berwarna hijau yang menyatakan:
   > **Your site is live at `https://username-anda.github.io/shoppay-beauty/`**
6. Selamat! Website **SHOPPAY-Beauty** Anda telah mengudara secara global dan siap diserahkan untuk tugas kuliah dengan bangga!
