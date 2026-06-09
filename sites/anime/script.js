// 2007 Anime Fan Site - JavaScript Effects

// ☠ SAGOPA FANBOY DÖNÜŞÜMÜ ☠
if (localStorage.getItem('tarikat_laneti') === 'true') {
    console.clear();
    console.log('%c🎤 SAGOPA KAJMER FAN SİTESİ 🎤', 'color: #8B0000; font-size: 24px; font-weight: bold;');
    console.log('%cAnime bitmiş... Sagopa başlamış.', 'color: #666; font-size: 14px;');
    console.log('%c🎮 GİZLİ: Konami kodu ile laneti kır! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #00FF00; font-size: 12px; font-weight: bold;');
    console.log('%c💡 İpucu: Doğru kodu girersen eski anime sitesi geri gelecek...', 'color: #FFD700; font-size: 10px;');

    window.addEventListener('load', () => {
        setTimeout(transformToRap, 200);
    });
}

function transformToRap() {
    // 1. DARK BACKGROUND & CSS
    document.body.style.backgroundColor = '#0a0a0a';
    document.body.style.background = '#0a0a0a';

    const darkStyle = document.createElement('style');
    darkStyle.textContent = `
        body { background: #0a0a0a !important; }
        table { background: #0a0a0a !important; border-color: #8B0000 !important; }
        td { background: #111 !important; color: #999 !important; }
        font { color: #999 !important; }
        .neon-text, h1, h2, h3, blink { color: #8B0000 !important; text-shadow: 0 0 10px #8B0000 !important; }
        marquee { background: #000 !important; color: #8B0000 !important; }
        a { color: #666 !important; }
        img { filter: brightness(0.6) contrast(1.5) saturate(0.5) !important; border-color: #8B0000 !important; }
        .banner { background: #000 !important; }
    `;
    document.head.appendChild(darkStyle);

    // 2. TÜM METİNLERİ GEZ VE DEĞİŞTİR - SAGOPA FANBOY TARZINDA!
    function transformText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let txt = node.textContent;

            // Cümle değişimleri - SAGOPA FANBOY!
            txt = txt.replace(/HOŞGELDİNİZ ANİME CENNET'E/gi, 'SAGOPA KAJMER FAN SİTESİ - PESİMİST KOLEKTİF');
            txt = txt.replace(/HOŞGELDIN NAKAMA!/gi, 'HOŞGELDİN PESİMİST KARDEŞ!');
            txt = txt.replace(/Konnichiwa minna-san! \(\*\^‿\^\*\) Bu site benim kendi özel anime dünyam!!!/gi, 'Selam kardeşler! Sagopa Kajmer\'e adanmış rap sitesi! Türkiye\'nin en iyi rapçisi!!!');
            txt = txt.replace(/Naruto'nun son bölümü çok EPİK!!!/gi, 'Sagopa\'nın 366. albümü çok EPİK!!! Kimse yapamaz böyle sözler!!!');
            txt = txt.replace(/Rasengan çok havalı!!! \^_\^/gi, '366. albüm Türkiye\'nin en derin albümü!!!');
            txt = txt.replace(/BANKAI çok güçlü!!!/gi, 'Hızlı konuşmak ≠ iyi rap (Ceza overrated)');
            txt = txt.replace(/L çok zeki ama saçları garip lol xD/gi, 'Sokak sözleri iyi ama Sagopa kadar değil!!!');
            txt = txt.replace(/NARUTO VS SASUKE\?\?\?/gi, 'SAGOPA KAJMER >>> CEZA (tartışmasız)');
            txt = txt.replace(/Yeni Naruto bölümü çıktı!!!/gi, 'Yeni Sagopa albümü çıktı!!!');
            txt = txt.replace(/Bleach manga'sı bitiyor mu\?\?\?/gi, 'Ceza çok overrated değil mi???');
            txt = txt.replace(/Death Note film oluyor!!!/gi, 'Kayra iyi ama Sagopa kadar olamaz!!!');
            txt = txt.replace(/Siteniz çok güzel olmuş!!!/gi, 'Sagopa fanları buraya!!!');
            txt = txt.replace(/Site güzel/gi, 'Sagopa en iyisi');
            txt = txt.replace(/Türkiye'nin En Kawaii Sitesi!/gi, 'Türkiye\'nin En İyi Rapçisi: SAGOPA KAJMER!');
            txt = txt.replace(/MİSAFİR DEFTERİ/gi, 'SAGOPA FANLARI BURAYA');
            txt = txt.replace(/ANİME GALERİSİ/gi, 'SAGOPA ARŞİVİ');
            txt = txt.replace(/EN SEVDİĞİM ANİMELER/gi, 'EN İYİ RAPÇILER (SAGOPA BİRİNCİ)');
            txt = txt.replace(/YORUM EKLE/gi, 'SÖZ YAZ');
            txt = txt.replace(/Sakura_chan123/gi, 'Pesimist_366');
            txt = txt.replace(/DarkSasuke666/gi, 'SagopaFan2007');

            // Kelime değişimleri
            txt = txt.replace(/ANİME CENNET/gi, 'SAGOPA KAJMER');
            txt = txt.replace(/Anime Cennet/gi, 'Sagopa Kajmer');
            txt = txt.replace(/anime/gi, 'rap');
            txt = txt.replace(/Anime/g, 'Rap');
            txt = txt.replace(/ANİME/g, 'SAGOPA');
            txt = txt.replace(/Naruto/gi, 'Sagopa');
            txt = txt.replace(/Bleach/gi, 'Ceza');
            txt = txt.replace(/Death Note/gi, 'Kayra');
            txt = txt.replace(/Rasengan/gi, '366 Albüm');
            txt = txt.replace(/BANKAI/gi, 'Hızlı rap');
            txt = txt.replace(/Bankai/gi, 'Hızlı rap');
            txt = txt.replace(/kawaii/gi, 'pesimist');
            txt = txt.replace(/otaku/gi, 'sagopa fanı');
            txt = txt.replace(/manga/gi, 'albüm');
            txt = txt.replace(/nakama/gi, 'ekip');
            txt = txt.replace(/bölüm/gi, 'track');
            txt = txt.replace(/xXx_AnimeKing_xXx/gi, 'xXx_Sagopa366_xXx');

            node.textContent = txt;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Alt elemanları da gez
            for (let child of Array.from(node.childNodes)) {
                transformText(child);
            }
        }
    }
    transformText(document.body);

    // 3. RESİMLERİ DEĞİŞTİR
    setTimeout(() => {
        const imgs = document.querySelectorAll('img');
        imgs.forEach((img, i) => {
            if (i === 0 || img.alt.includes('banner')) {
                img.src = 'rap_banner.png';
            } else if (i === 1) {
                img.src = 'sagopa_underground.png';
            } else if (i === 2) {
                img.src = 'ceza_devil.png';
            } else {
                img.src = 'sagopa_underground.png';
            }
        });
    }, 400);

    // 4. OVERLAY'İ KALDIR
    const overlay = document.querySelector('[style*="position:fixed"][style*="pointer-events:none"]');
    if (overlay) overlay.remove();

    // 5. BAŞLIK
    document.title = '☠ SAGOPA KAJMER FAN SİTESİ ☠';

    // 6. POPUP
    setTimeout(() => {
        alert(`🎤 SAGOPA KAJMER FAN SİTESİ 🎤\n\nAnime bitti, rap başladı!\n\nTürkiye'nin en iyi rapçisi: SAGOPA KAJMER\n\n"Ceza overrated, Sagopa derindir"\n\n☠ 366 ☠`);
    }, 1500);

    // 7. KONSOL
    const quotes = [
        '🎤 "Ölüm soğuktur" - Sagopa',
        '🌙 "366. gün" - Sagopa',
        '💀 "Galiba..." - Sagopa',
        '⚫ "Pesimist dünya" - Sagopa'
    ];
    setInterval(() => {
        console.log(`%c${quotes[Math.floor(Math.random() * quotes.length)]}`, 'color: #8B0000;');
    }, 10000);

    // 8. BAŞLIK ANIMASYON
    const titles = ['🎤 SAGOPA KAJMER 🎤', '☠ PESİMİST KOLEKTİF ☠', '🌙 366 🌙', '💀 SAGOPA FAN SİTESİ 💀'];
    let idx = 0;
    setInterval(() => {
        document.title = titles[idx];
        idx = (idx + 1) % titles.length;
    }, 2000);
}

// Visitor counter
let visitorCount = 42069;
setInterval(() => {
    visitorCount++;
    const el = document.getElementById('visitor-count');
    if (el) el.textContent = visitorCount.toString().padStart(9, '0');
}, 30000);

// Music toggle
function toggleMusic() {
    alert('Müzik yakında!');
}

// Konami code - LANETİ KIR!
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    if (konamiCode.join('') === konamiPattern.join('')) {
        if (localStorage.getItem('tarikat_laneti') === 'true') {
            // LANETİ KIR ve eski anime sitesine dön!
            localStorage.removeItem('tarikat_laneti');
            alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\nLanet kırıldı! Anime sitesi geri geliyor...');
            location.reload();
        } else {
            alert('KONAMI CODE ACTIVATED!!! ⭐✨');
        }
    }
});

// Cursor sparkles
const sparkleContainer = document.createElement('div');
sparkleContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
document.body.appendChild(sparkleContainer);

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.2) return;
    const sparkle = document.createElement('div');
    sparkle.textContent = ['★', '✦', '✧', '✨'][Math.floor(Math.random() * 4)];
    sparkle.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:${Math.random() * 20 + 10}px;color:${['#FFD700', '#FF00FF', '#00FFFF'][Math.floor(Math.random() * 3)]};pointer-events:none;animation:sparkle 1s forwards`;
    sparkleContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
});

// Right-click disable
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Sağ tık kapalı!!!');
    return false;
});

// Exit warning
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'Ayrılıyor musunuz???';
    return e.returnValue;
});

// Console
console.log('%c★☆★ ANİME CENNET ★☆★', 'color: #FF00FF; font-size: 20px; font-weight: bold;');

// Title animation (normal mode)
let titleIndex = 0;
const titleFrames = ['★ ANİME CENNET ★', '☆ ANİME CENNET ☆', '✦ ANİME CENNET ✦'];
setInterval(() => {
    if (!localStorage.getItem('tarikat_laneti')) {
        document.title = titleFrames[titleIndex];
        titleIndex = (titleIndex + 1) % titleFrames.length;
    }
}, 500);

// Snow effect
function createSnowflake() {
    if (Math.random() > 0.98) {
        const snowflake = document.createElement('div');
        snowflake.textContent = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
        snowflake.style.cssText = `position:fixed;left:${Math.random() * 100}%;top:-20px;font-size:${Math.random() * 20 + 10}px;color:#FFF;pointer-events:none;z-index:9998;opacity:0.7`;
        document.body.appendChild(snowflake);
        const dur = Math.random() * 5 + 5;
        snowflake.animate([
            { transform: 'translateY(0)', opacity: 0.7 },
            { transform: `translateY(${window.innerHeight + 20}px)`, opacity: 0 }
        ], { duration: dur * 1000, easing: 'linear' });
        setTimeout(() => snowflake.remove(), dur * 1000);
    }
}
setInterval(createSnowflake, 100);
