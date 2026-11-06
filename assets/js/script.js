document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 基本要素の取得 ---
    const header = document.getElementById('mainHeader');
    const menuTrigger = document.getElementById('menuTrigger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const backToTop = document.getElementById('backToTop');
    const menuItems = document.querySelectorAll('.menu-item');
    const canvas = document.getElementById('appleCanvas');

    // --- 【重要】ここにBase64文字列を貼り付けてください ---
    const IMAGE_BASE64 = 'data:image/webp;base64,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';

    // --- 2. フィルター機能 (Works) ---
    // ここを画像の読み込み処理の外に出すことで、即座に動作させます
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // ボタンの活性状態切り替え
                filterButtons.forEach(btn => btn.classList.remove('is-active'));
                button.classList.add('is-active');

                const filterValue = button.getAttribute('data-filter');

                workItems.forEach(item => {
                    // 一旦アニメーション用に透明度を下げる
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            // 表示する際のアニメーション
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300); // CSSのtransition時間(0.4s)に合わせる
                });
            });
        });
    }

    // --- 3. スクロール・メニュー制御 (共通) ---
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (header) currentScroll > 100 ? header.classList.add('is-visible') : header.classList.remove('is-visible');
        if (backToTop) currentScroll > 300 ? backToTop.classList.add('is-visible') : backToTop.classList.remove('is-visible');
    });

    const toggleMenu = () => {
        if (!mobileMenu || !overlay || !menuTrigger) return;
        mobileMenu.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
        menuTrigger.classList.toggle('is-active');
        document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    };

    if (menuTrigger) menuTrigger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);
    menuItems.forEach(item => item.addEventListener('click', toggleMenu));

    // --- 4. リンゴのアニメーション (Base64) ---
    if (canvas && IMAGE_BASE64.startsWith('data:image')) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let targetPoints = [];
        const particleCount = 5000; 

        const img = new Image();
        img.src = IMAGE_BASE64;

        img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            const size = 200; 
            tempCanvas.width = size;
            tempCanvas.height = size;
            tempCtx.drawImage(img, 0, 0, size, size);
            const data = tempCtx.getImageData(0, 0, size, size).data;

            const availablePoints = [];
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const alpha = data[(y * size + x) * 4 + 3];
                    if (alpha > 128) availablePoints.push({ x: x / size, y: y / size });
                }
            }

            class Particle {
                constructor() { this.init(); }
                init() {
                    this.x = Math.random() * window.innerWidth;
                    this.y = Math.random() * window.innerHeight;
                    this.size = Math.random() * 2.5 + 0.8; 
                    this.color = ['#F0777E', '#FFFFFF', '#FFB2B6'][Math.floor(Math.random() * 3)];
                    this.isCircle = Math.random() > 0.5;
                    this.speed = Math.random() * 0.08 + 0.02; 
                }
                update(target) {
                    this.x += (target.x - this.x) * this.speed;
                    this.y += (target.y - this.y) * this.speed;
                }
                draw() {
                    ctx.fillStyle = this.color;
                    if (this.isCircle) {
                        ctx.beginPath(); ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2); ctx.fill();
                    } else {
                        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                    }
                }
            }

            function setup() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const displaySize = Math.min(canvas.width, canvas.height) * 0.9; 
                const offsetX = (canvas.width - displaySize) / 2;
                const offsetY = (canvas.height - displaySize) / 2;
                targetPoints = [];
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    const pt = availablePoints[Math.floor(Math.random() * availablePoints.length)];
                    targetPoints.push({ x: pt.x * displaySize + offsetX, y: pt.y * displaySize + offsetY });
                    particles.push(new Particle());
                }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach((p, i) => { p.update(targetPoints[i]); p.draw(); });
                requestAnimationFrame(animate);
            }

            window.addEventListener('resize', setup);
            setup();
            animate();
        };
    }

    if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // スムーススクロール
        });
    });
}
});