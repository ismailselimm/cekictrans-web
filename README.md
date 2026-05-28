# Çekiç Trans

Çekiç Trans Uluslararası Taşımacılık Ltd. Şti. kurumsal web sitesi.

**Live:** https://cekictrans.com

## Stack

Vanilla. Database yok, build step yok.
- HTML / CSS / JS
- GitHub Pages üzerinden ücretsiz hosting
- `cekictrans.com` özel domain (CNAME)

## Yapı

```
.
├── index.html              # Tek sayfa
├── css/style.css           # Tüm stiller
├── js/main.js              # Etkileşim, animasyon, form
├── assets/                 # Logolar ve fotoğraflar
│   ├── logo.png            # Beyaz arkaplanlı logo
│   ├── logo-256.png        # Küçük versiyon
│   ├── favicon.png         # 64x64
│   ├── fleet-lineup.jpg    # Filo park alanı
│   └── fleet-truck-1.jpg   # Tenteli tır
├── CNAME                   # cekictrans.com
├── .nojekyll               # Jekyll devre dışı
├── robots.txt
└── sitemap.xml
```

## Lokal geliştirme

```bash
# Basit bir HTTP sunucusu yeterli
python3 -m http.server 8080
# veya
npx serve .
```

Tarayıcıdan: http://localhost:8080

## Deploy (GitHub Pages)

1. GitHub'da `cekictrans` adında public repo aç.
2. Repo'yu push'la:
   ```bash
   git remote add origin https://github.com/<kullanici>/cekictrans.git
   git push -u origin main
   ```
3. Repo Settings → Pages:
   - **Source:** Deploy from branch
   - **Branch:** `main` / `(root)`
4. Settings → Pages → Custom domain alanına `cekictrans.com` yaz, Save.
5. GoDaddy DNS:
   - **A** kayıtları (apex):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** (www): `<kullanici>.github.io`
6. DNS yayıldıktan sonra (5dk-24sa) Pages ayarlarında "Enforce HTTPS" işaretle.

## Lisans

© Çekiç Trans Uluslararası Taşımacılık Ltd. Şti.
