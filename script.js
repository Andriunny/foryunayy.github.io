document.addEventListener('DOMContentLoaded', () => {
    createStars();
    startFallingPetals(); // Mulai animasi kelopak jatuh sejak halaman pertama dibuka

    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelopeScreen = document.getElementById('envelope-screen');
    const hubScreen = document.getElementById('hub-screen');
    const tapText = document.querySelector('.tap-text');

    let isEnvelopeOpened = false;

    // TAHAP 1: Buka Amplop
    envelopeWrapper.addEventListener('click', () => {
        if (isEnvelopeOpened) return;
        isEnvelopeOpened = true;

        // Mulai memutar lagu saat ada interaksi pertama
        const bgm = document.getElementById('bgm');
        if (bgm && bgm.paused) {
            bgm.volume = 0.4; // Volume tidak terlalu keras
            bgm.play().catch(e => console.log("Autoplay dicegah browser", e));
        }

        envelopeWrapper.classList.add('open');
        tapText.style.opacity = '0';

        setTimeout(() => {
            envelopeScreen.classList.remove('active');
            envelopeScreen.classList.add('hidden');

            setTimeout(() => {
                window.scrollTo(0, 0);
                hubScreen.classList.remove('hidden');
                hubScreen.classList.add('active');
            }, 1000);
        }, 2200);
    });

    // Tombol Peluk Virtual di Layar Terakhir
    const finalHugBtn = document.getElementById('final-hug-btn');
    if (finalHugBtn) {
        finalHugBtn.addEventListener('click', () => {
            createHeartsBurst();
            finalHugBtn.innerHTML = "Pelukan Terasa Sangat Hangat! 💖";
            finalHugBtn.style.background = "#ff0055";
            finalHugBtn.style.boxShadow = "0 0 50px #ff0055";

            setTimeout(() => {
                finalHugBtn.innerHTML = "Peluk Erat Virtual 🤗";
                finalHugBtn.style.background = "transparent";
                finalHugBtn.style.boxShadow = "0 0 15px rgba(255, 105, 180, 0.4)";
            }, 5000);
        });
    }

    // Ubah final photo container menjadi animasi mawar merah premium (Photorealistic)
    const finalFrame = document.querySelector('.final-photo-container .final-frame');
    if (finalFrame) {
        finalFrame.innerHTML = `
            <div class="glass-rose-wrapper">
                <img src="premium_rose_transparent.png" alt="Premium Rose" class="premium-rose-img">
                <div class="red-magic-dust">
                    <div class="red-spark rs1"></div>
                    <div class="red-spark rs2"></div>
                    <div class="red-spark rs3"></div>
                    <div class="red-spark rs4"></div>
                    <div class="red-spark rs5"></div>
                    <div class="red-spark rs6"></div>
                    <div class="red-spark rs7"></div>
                </div>
            </div>
        `;
    }
});


let openedGiftsCount = 0;
const totalGifts = 3;

// TAHAP 2: Buka Kotak Hadiah Satu per Satu
function openGift(id) {
    const giftBox = document.getElementById(`gift-${id}`);

    // Cegah penambahan skor jika kotak sudah pernah terbuka
    if (!giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');
        openedGiftsCount++;

        // Jika semua kotak (3 kotak) sudah terbuka
        if (openedGiftsCount === totalGifts) {
            setTimeout(() => {
                const finalMagicContainer = document.getElementById('final-magic-container');
                finalMagicContainer.classList.remove('hidden');

                // Efek transisi muncul perlahan (Fade In)
                finalMagicContainer.style.opacity = "0";
                finalMagicContainer.style.transition = "opacity 2s ease";

                setTimeout(() => {
                    finalMagicContainer.style.opacity = "1";

                    // Scroll ke bawah otomatis supaya user melihat tombol baru
                    window.scrollBy({
                        top: 300,
                        behavior: 'smooth'
                    });
                }, 100);
            }, 1500); // Muncul 1.5 detik setelah kotak ketiga diklik
        }
    }

    // Tunggu animasi buka tutup kotak, lalu munculkan isi modalnya
    setTimeout(() => {
        showModal(id);
    }, 900);
}

// Beralih dari TAHAP 2 ke TAHAP 4 (Perjalanan Akhir)
function startFinalJourney() {
    const hubScreen = document.getElementById('hub-screen');
    const finalJourneyScreen = document.getElementById('final-journey-screen');

    // Berikan efek ledakan hati saat pindah layar
    createHeartsBurst();

    hubScreen.classList.remove('active');
    hubScreen.classList.add('hidden');

    setTimeout(() => {
        window.scrollTo(0, 0);
        finalJourneyScreen.classList.remove('hidden');
        finalJourneyScreen.classList.add('active');

        // Mulai memunculkan bubble love
        startBubbleLove();
    }, 1500); // Tunggu layar lama menghilang
}

// Bubble Love Animation di Layar Final Journey
let bubbleInterval;
function startBubbleLove() {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    bubbleInterval = setInterval(() => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble-love');
        bubble.innerHTML = '❤️';
        bubble.style.left = Math.random() * 80 + 10 + '%';
        bubble.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(bubble);

        setTimeout(() => { bubble.remove(); }, 4000);
    }, 500);
}

// Menampilkan Modal sesuai ID
function showModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
    }, 50);
}

// Tutup Modal
function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 600);
}

// Animasi Latar Belakang (Bintang & Hati)
function createStars() {
    const starsBg = document.querySelector('.stars-bg');
    for (let i = 0; i < 200; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        let size = Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDuration = Math.random() * 4 + 2 + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        starsBg.appendChild(star);
    }
}

let audioCtx;
function playPopSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Frekuensi dasar untuk bubble pop (sedikit acak agar terdengar natural)
        const baseFreq = 300 + Math.random() * 300;
        
        osc.type = 'sine';
        
        // Sweep frekuensi ke atas dengan sangat cepat menciptakan efek "pop"
        osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, audioCtx.currentTime + 0.04);
        
        // Attack sangat cepat dan decay seketika (hanya 40ms) untuk suara gelembung meletus
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        console.log("Audio API tidak didukung", e);
    }
}

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    heart.innerHTML = '❤️';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
    document.body.appendChild(heart);
    
    // Mainkan efek suara lucu setiap kali hati muncul!
    playPopSound();

    setTimeout(() => { heart.remove(); }, 4500);
}

function createHeartsBurst() {
    const isMobile = window.innerWidth <= 768;
    const burstCount = isMobile ? 25 : 50;
    
    // Hide loading animation
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    
    // Matikan/Jeda lagu sementara agar bunyi "pop" terdengar bergantian
    const bgm = document.getElementById('bgm');
    if (bgm && !bgm.paused) {
        bgm.pause();
    }

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const startX = (window.innerWidth / 2) + (Math.random() * 800 - 400);
            const startY = window.innerHeight + 50;
            createHeart(startX, startY);
        }, i * 40);
    }
    
    // Lanjutkan lagu setelah semburan hati selesai
    const burstDuration = burstCount * 40;
    setTimeout(() => {
        if (bgm) {
            bgm.play().catch(e => console.log(e));
        }
    }, burstDuration + 300); // 300ms tambahan agar transisi pas
}

// Beralih ke Halaman Bunga Spesial (Tahap 5) dengan Transisi Boneka & Bubble Love
function goToFlowerScreen() {
    const finalJourneyScreen = document.getElementById('final-journey-screen');
    const flowerScreen = document.getElementById('flower-screen');

    // Buat overlay transisi
    const transitionContainer = document.createElement('div');
    transitionContainer.style.position = 'fixed';
    transitionContainer.style.top = '0';
    transitionContainer.style.left = '0';
    transitionContainer.style.width = '100vw';
    transitionContainer.style.height = '100vh';
    transitionContainer.style.zIndex = '9999';
    transitionContainer.style.display = 'flex';
    transitionContainer.style.flexDirection = 'column';
    transitionContainer.style.justifyContent = 'center';
    transitionContainer.style.alignItems = 'center';
    transitionContainer.style.background = 'rgba(0, 0, 0, 0.85)';
    transitionContainer.style.backdropFilter = 'blur(10px)';
    transitionContainer.style.opacity = '0';
    transitionContainer.style.transition = 'opacity 1s ease';

    // Tambahkan gambar boneka lucu beruang
    const bearImg = document.createElement('img');
    bearImg.src = 'foto5.jpeg'; // Use local image
    bearImg.style.width = '250px';
    bearImg.style.height = '250px';
    bearImg.style.objectFit = 'cover';
    bearImg.style.borderRadius = '20px';
    bearImg.style.boxShadow = '0 0 40px #ff69b4';
    bearImg.style.animation = 'floatFrame 2s infinite alternate';

    const text = document.createElement('h2');
    text.className = 'neon-text';
    text.innerText = 'Tunggu sebentar sayang... 🧸❤️';
    text.style.marginTop = '30px';
    text.style.fontSize = '3rem';

    transitionContainer.appendChild(bearImg);
    transitionContainer.appendChild(text);
    document.body.appendChild(transitionContainer);

    // Munculkan overlay dengan halus
    setTimeout(() => {
        transitionContainer.style.opacity = '1';
    }, 10);

    // Buat efek bubble love / hearts melayang deras selama transisi
    const burstInterval = setInterval(() => {
        createHeart((window.innerWidth / 2) + (Math.random() * 600 - 300), window.innerHeight);
    }, 150);

    // Setelah 4 detik (boneka & bubble love muncul), pindah ke layar bunga
    setTimeout(() => {
        clearInterval(burstInterval);
        if (typeof bubbleInterval !== 'undefined') clearInterval(bubbleInterval);

        transitionContainer.style.opacity = '0';

        finalJourneyScreen.classList.remove('active');
        finalJourneyScreen.classList.add('hidden');

        window.scrollTo(0, 0);
        flowerScreen.classList.remove('hidden');
        flowerScreen.classList.add('active');

        setTimeout(() => {
            transitionContainer.remove();
        }, 1000);
    }, 4500);
}

// Animasi Kelopak Bunga Jatuh
function startFallingPetals() {
    const bg = document.getElementById('petals-bg');
    if (!bg) return;

    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Ukuran acak kelopak (dibuat lebih pas, tidak menutupi konten)
        const size = Math.random() * 15 + 10; // 10px - 25px
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';

        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 7 + 5) + 's'; // 5-12 detik jatuh

        bg.appendChild(petal);
        setTimeout(() => { petal.remove(); }, 12000); 
    }, 450); // Munculkan kelopak setiap 450ms (lebih elegan)
}

// Update Persentase Cinta
function updatePercentage() {
    const slider = document.getElementById('loveSlider');
    const percentageText = document.getElementById('lovePercentage');
    percentageText.innerText = slider.value;

    // Ganti ukuran font sedikit sesuai besar persen untuk efek dinamis
    const newSize = 5 + (slider.value / 1000) * 3;
    percentageText.style.fontSize = newSize + 'rem';

    // Munculkan hati secara acak saat slider digeser mendekati maksimal
    if (slider.value > 800 && Math.random() > 0.5) {
        createHeart((window.innerWidth / 2) + (Math.random() * 400 - 200), window.innerHeight);
    }
}

// Fitur Kirim Pesan ke WhatsApp
function sendWhatsApp() {
    const message = document.getElementById('reply-message').value;
    const percentage = document.getElementById('loveSlider').value;

    if (!message.trim()) {
        alert("Jangan lupa isi pesannya ya sayang! 🥺");
        return;
    }

    // ==========================================
    // PENTING: GANTI NOMOR DI BAWAH INI
    // ==========================================
    // Ganti dengan nomor WhatsApp kamu (awali dengan 62 untuk Indonesia)
    // Contoh jika nomormu 081234567890 -> ganti jadi "6281234567890"
    const targetNumber = "6181236120997"; // Updated with user-provided number

    const textPrefix = `Hai sayang! Ini jawabanku:\nCintaku padamu sebesar: ${percentage}%\n\nPesan:\n`;
    const encodedMessage = encodeURIComponent(textPrefix + message);

    const waLink = `https://wa.me/${targetNumber}?text=${encodedMessage}`;
    window.open(waLink, '_blank');
}

// ==========================================
// Fitur Tambahan: Dynamic Tab Title (Tab Merayu)
// ==========================================
let originalTitle = document.title;
window.addEventListener('blur', () => {
    document.title = "Balik dong sayang... 🥺❤️";
});
window.addEventListener('focus', () => {
    document.title = originalTitle;
});
