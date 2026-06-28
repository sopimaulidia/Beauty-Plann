# 🌸 Dokumen Ringkasan Bisnis & Panduan GitHub | SHOPPAY-Beauty

Dokumen ini disusun untuk melengkapi seluruh persyaratan wajib proyek e-commerce **SHOPPAY-Beauty**. Dokumen ini terbagi menjadi dua bagian utama:
1. **Aspek Bisnis & Strategi Produk (Business Overview)**
2. **Tutorial Lengkap Mengunggah ke GitHub & Deploy ke GitHub Pages**

---

## 📑 BAGIAN 1: ASPEK BISNIS & STRATEGI PRODUK (BUSINESS OVERVIEW)

### 1. Deskripsi Bisnis & Value Proposition (Proposisi Nilai)
* **Nama Bisnis:** SHOPPAY-Beauty
* **Deskripsi:** SHOPPAY-Beauty adalah platform e-commerce khusus (curated marketplace) yang menghadirkan produk perawatan wajah (skincare), kosmetik (makeup), perawatan rambut (haircare), dan wewangian (fragrance) organik yang berstandar tinggi, bersertifikasi halal, dan terdaftar resmi di BPOM.
* **Value Proposition:** 
  * *100% Curated Clean Beauty:* Hanya menyajikan produk organik berkualitas yang bebas dari bahan kimia berbahaya.
  * *Halal & Dermatologically Tested:* Menjawab kebutuhan pasar Indonesia akan kosmetik yang aman dan sesuai syariat.
  * *Eco-Friendly & Cruelty-Free:* Berkomitmen penuh terhadap kelestarian lingkungan dan menolak pengujian pada hewan.
  * *Interactive Shopping Experience:* Menyediakan konsultasi kecantikan, serta sistem simulasi transaksi sandbox (Midtrans) yang transparan dan aman.

### 2. Target Market & Segmentasi Pelanggan
* **Demografis:** Perempuan dan laki-laki usia 18–35 tahun (Gen Z dan Milenial) dengan tingkat pendapatan menengah hingga menengah ke atas.
* **Geografis:** Penduduk perkotaan (urban dan suburban) di Indonesia yang memiliki akses internet cepat dan aktif berbelanja online.
* **Psikografis:** Konsumen yang memiliki kesadaran tinggi (beauty-conscious) terhadap kesehatan kulit jangka panjang, peduli terhadap kandungan produk (ingredients-aware), dan mengutamakan status kelayakan etis produk (halal/vegan/cruelty-free).

### 3. Analisis Pasar Singkat & Kompetitor
* **Analisis Pasar:** Pasar industri kosmetik di Indonesia terus mengalami lonjakan masif pasca-pandemi, didorong oleh tren *self-care* dan adaptasi transaksi e-commerce digital. Kepercayaan konsumen terhadap brand lokal premium berbasis bahan organik meningkat tajam.
* **Analisis Kompetitor:**
  * *Sociolla:* Memiliki kekuatan jaringan offline store yang masif. SHOPPAY-Beauty bersaing melalui kurasi ketat produk organik murni serta harga yang lebih kompetitif.
  * *BeautyHaul:* Memiliki katalog yang luas, namun SHOPPAY-Beauty membedakan diri dengan fokus 100% pada *clean & ethical beauty* yang bebas alkohol berbahaya.

### 4. Strategi Manajemen Produk & Katalog
* **Sistem Kurasi:** Membagi produk menjadi 4 kategori esensial: Skincare, Makeup, Haircare, dan Fragrance.
* **Visual Memikat:** Setiap item dilengkapi visual beresolusi tinggi, daftar lengkap bahan aktif (ingredients), serta panduan cara pemakaian (how to use) yang informatif guna meminimalkan keraguan konsumen saat membeli.

### 5. Model Bisnis & Revenue Stream
* **B2C Retail:** Pembelian inventori langsung dari produsen resmi kecantikan dengan margin laba bersih sebesar 25% – 35% per produk.
* **Exclusive Brand Launching:** Menjadi partner distribusi eksklusif pertama bagi brand kecantikan lokal pendatang baru di Indonesia dengan pembagian komisi keuntungan.

### 6. Strategi Harga, Promosi, dan Diskon
* **Strategi Harga (Pricing):** Menggunakan *Value-Based Pricing* yang kompetitif tetapi tetap mencerminkan nilai bahan premium produk.
* **Diskon Otomatis (Dynamic Promotion):**
  * Potongan harga langsung (Sale tag) untuk produk tertentu.
  * Program gratis biaya pengiriman (Free Shipping) ke seluruh Indonesia dengan minimal belanja Rp 150.000.
  * Diskon otomatis tambahan 10% jika total belanja di keranjang melampaui Rp 200.000.
* **Lead Capture Promo:** Diskon promosi 15% untuk pelanggan yang mendaftarkan email mereka pada kolom buletin di footer.

### 7. Proses Checkout & Simulasi Payment Gateway
Situs SHOPPAY-Beauty menggunakan integrasi alur checkout sandbox modern:
* Mengisi data pengiriman (Nama, Email, WhatsApp, Alamat Lengkap, Kota, dan Kode Pos) dengan validasi form terintegrasi.
* Memilih metode pengiriman secara real-time yang memengaruhi kalkulasi total harga belanja.
* Simulasi **Midtrans / Xendit Sandbox API** menggunakan sistem pembayaran:
  * **QRIS (Quick Response Code Indonesian Standard):** Menghasilkan kode QR dinamis dengan sistem countdown timer (5 menit) dan melakukan verifikasi instan sukses dalam waktu 5 detik.
  * **Virtual Account (VA Bank Transfer):** Menampilkan nomor rekening bank transfer BCA/Mandiri virtual berdurasi dinamis.

### 8. Rencana SEO, Keamanan, dan Pemeliharaan
* **Rencana SEO:**
  * Menggunakan tag meta deskripsi, penamaan gambar berbasis kata kunci kecantikan (alt text), serta struktur heading semantic (`<h1>` hingga `<h6>`) untuk menaikkan peringkat organik di pencarian Google.
* **Keamanan:**
  * Protokol SSL/HTTPS wajib pada server hosting.
  * Penyimpanan data keranjang belanja lokal dienkripsi ringan di sisi klien (localStorage).
  * Menolak script injeksi jahat (XSS) melalui validasi input formulir secara ketat.
* **Pemeliharaan (Maintenance):**
  * Pembaruan berkala pustaka kode, kompresi aset gambar berkala agar situs tetap cepat (loading time < 2 detik), serta pembersihan cache berkala.

### 9. Rencana Penggunaan Data Analytics Untuk Pengambilan Keputusan
SHOPPAY-Beauty mengintegrasikan dummy script Google Analytics (gtag.js) untuk merekam aksi mikro pengguna secara anonim. Metrik-metrik yang dipantau meliputi:
1. **Bounce Rate (Tingkat Rasio Pantulan):** Mengetahui apakah materi promosi atau kualitas halaman utama menarik minat pengunjung pertama.
2. **Conversion Rate (Tingkat Konversi):** Mengukur rasio antara total pengunjung yang melakukan transaksi sukses berbayar dibanding total pengunjung biasa.
3. **Cart Abandonment Rate (Tingkat Pengabaian Keranjang):** Menganalisis alasan pengguna memasukkan barang ke keranjang tetapi membatalkan pembelian sebelum checkout guna merancang strategi retargeting promosi.
4. **Average Order Value (AOV):** Menganalisis rata-rata nilai transaksi per pelanggan untuk menentukan efektivitas promosi bundel kosmetik.

---

## 💻 BAGIAN 2: PANDUAN UPLOAD GITHUB & DEPLOY GITHUB PAGES

Berikut adalah langkah-langkah praktis dan runtut untuk mengunggah proyek **SHOPPAY-Beauty** ke GitHub pribadi Anda dan mempublikasikannya secara online menggunakan **GitHub Pages**.

### Prasyarat
1. Pastikan Anda sudah memiliki akun [GitHub](https://github.com/).
2. Unduh dan pasang [Git](https://git-scm.com/) di komputer Anda.
3. Siapkan file proyek Anda yang sudah rapi dalam satu folder (misalnya folder `shoppay-beauty` yang berisi `index.html`, folder `css/`, dan folder `js/`).

---

### Langkah 1: Buat Repository Baru di GitHub
1. Masuk (*login*) ke akun GitHub Anda.
2. Di pojok kanan atas, klik tombol tanda plus `+` lalu pilih **New repository**.
3. Isi kolom **Repository name** dengan nama yang unik, misalnya: `shoppay-beauty`.
4. Berikan deskripsi singkat (opsional), contoh: `Website Toko Kosmetik SHOPPAY-Beauty Premium`.
5. Pilih tipe akses **Public** agar bisa dipublikasikan menggunakan GitHub Pages secara gratis.
6. Pada bagian *Initialize this repository with*, biarkan semua **tidak dicentang** (jangan tambahkan README, .gitignore, atau lisensi di tahap ini karena kita akan mengunggah file yang sudah kita miliki).
7. Klik tombol hijau **Create repository**.

---

### Langkah 2: Inisialisasi Git di Komputer Lokal Anda
1. Buka aplikasi **Terminal** (di Mac/Linux) atau **Command Prompt / Git Bash** (di Windows).
2. Arahkan direktori terminal ke dalam folder tempat Anda menyimpan file e-commerce SHOPPAY-Beauty Anda. Contoh perintah:
   ```bash
   cd path/to/your/shoppay-beauty-folder
   ```
3. Lakukan inisialisasi repositori Git lokal dengan mengetik perintah:
   ```bash
   git init
   ```

---

### Langkah 3: Tambahkan dan Lakukan Commit File Proyek
1. Tambahkan semua file proyek Anda (index.html, css, js, dll.) ke area penyimpanan sementara (staging area) Git:
   ```bash
   git add .
   ```
2. Lakukan perekaman commit pertama dengan pesan yang deskriptif:
   ```bash
   git commit -m "feat: inisialisasi proyek SHOPPAY-Beauty e-commerce lengkap"
   ```

---

### Langkah 4: Hubungkan Repositori Lokal ke GitHub
1. Kembali ke halaman repositori GitHub yang baru saja Anda buat. Di bawah bagian *"..or push an existing repository from the command line"*, salin alamat URL repositori Anda (yang berakhiran `.git`).
2. Jalankan perintah di terminal untuk menghubungkan repositori lokal Anda ke repositori GitHub online (ganti URL di bawah dengan URL salinan Anda):
   ```bash
   git remote add origin https://github.com/username-anda/shoppay-beauty.git
   ```
3. Ubah nama branch utama lokal Anda menjadi `main` (sesuai standar modern GitHub):
   ```bash
   git branch -M main
   ```
4. Unggah (push) seluruh file kode Anda ke GitHub:
   ```bash
   git push -u origin main
   ```
   *(Catatan: Jika diminta login, masukkan username dan Personal Access Token (PAT) GitHub Anda, atau login via browser).*

---

### Langkah 5: Publikasikan (Deploy) ke GitHub Pages
Setelah file berhasil terunggah ke repositori GitHub, saatnya mempublikasikannya agar bisa diakses oleh dosen, teman, atau pelanggan secara langsung:
1. Di halaman repositori GitHub Anda, klik tab menu **Settings** (ikon roda gigi di bagian menu atas).
2. Pada panel menu sebelah kiri, cari dan klik menu **Pages** (di bawah bagian *Code and automation*).
3. Di bagian **Build and deployment**:
   * Di kolom **Source**, pilih **Deploy from a branch**.
   * Di kolom **Branch**, ganti `None` menjadi branch **`main`**.
   * Di sampingnya, pastikan foldernya terpilih **`/ (root)`** (karena file `index.html` berada langsung di folder utama).
4. Klik tombol **Save** di sebelah kanan.
5. Tunggu sekitar 1 hingga 2 menit agar proses kompilasi otomatis dari GitHub berjalan di latar belakang.
6. Lakukan penyegaran halaman (*refresh*). Di bagian atas halaman **Pages** tersebut, Anda akan melihat banner berwarna hijau yang bertuliskan:
   > **Your site is live at: `https://username-anda.github.io/shoppay-beauty/`**
7. Selamat! Website **SHOPPAY-Beauty** Anda kini sudah online secara global dan siap dipamerkan!

---

### Tips Commit Tambahan (Commit History Rapi)
Untuk memenuhi syarat *"Commit history yang rapi (minimal 8–10 commit bermakna)"*, saat proses pembuatan website di komputer lokal, Anda disarankan untuk mencicil pekerjaan dan melakukan commit secara berkala, contoh:
* `git commit -m "initial commit"`
* `git commit -m "feat: buat struktur dasar index.html navbar dan hero banner"`
* `git commit -m "style: tambahkan tema warna blush pink di css/style.css"`
* `git commit -m "feat: buat grid katalog produk kecantikan sebanyak 10 item"`
* `git commit -m "feat: tambahkan fitur interaktif filter kategori dan search pencarian"`
* `git commit -m "feat: integrasikan fungsi shopping cart berbasis localStorage"`
* `git commit -m "feat: buat detail modal produk beserta tab komposisi dan manfaat"`
* `git commit -m "feat: selesaikan halaman checkout pengiriman"`
* `git commit -m "feat: buat simulasi payment gateway QRIS otomatis sukses"`
* `git commit -m "docs: tambahkan dokumentasi business plan di README.md"`
