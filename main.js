// ==========================================
// 1. DANH SÁCH 43 SẢN PHẨM DẠNG CHAI TRONG FOLDER ./img
// ==========================================
const MUSIC_URL = "./audio.mp3";
let bgMusic = new Audio(MUSIC_URL);
bgMusic.loop = true;
bgMusic.volume = 1.0;

const PRODUCT_FILES = [
    "Airforce 300SC (100ml).png",
    "Anti-One 200SC (240ml).png",
    "Atorice 1.8SL (100ml).png",
    "Bio-Atorice 0.01SL (100ml).png",
    "Biona Organic.png",
    "Butapro 550EC (480ml-1lit).png",
    "Clicks 500SC (200ml).png",
    "Emasuper 1.9EC (480ml).png",
    "Fan-pro 250SC (100-200ml).png",
    "Fanmax 350SC (16ml-100ml).png",
    "Fertiplant 1 (500ml).png",
    "Fertiplus 1 (500ml).png",
    "Forataras top 247SC (12ml-100ml-240ml).png",
    "Fortamin 3SL (450ml).png",
    "ForvilNew 250SC (1lit) NPP.png",
    "ForvilNew 250SC (480ml-1lit).png",
    "Futitan 30SC (240ml) NPP.png",
    "Futsals 240SC (100ml) MinhLong.png",
    "Futsals 240SC (100ml) Vang.png",
    "Futsals 240SC (100ml) Xanh.png",
    "G3 Top 3.33SL (50ml).png",
    "GoldStar 450SC (200ml).png",
    "IndoSuper 150SC (50ml-100ml).png",
    "KALI-AIPHOS 720VF (500ml-1lit).png",
    "Mesafen 250SL (450ml).png",
    "Miceo 620EC (480ml-1lit).png",
    "New fuze 200SC (100ml).png",
    "New Vario 250SC (200ml).png",
    "Nutrinew 1 (500ml).png",
    "Nuxim Super 20SL (1lit).png",
    "Nuxim Super 20SL (1lit)MD.png",
    "NuximGold 40EC (450ml).png",
    "Picoros 300SC (200ml).png",
    "QuiZalo 50EC (450ml).png",
    "RayKat.png",
    "Resvo 200SC (100ml).png",
    "Saisen-XO 200SC (200ml).png",
    "Superkumi 200SC (80ml).png",
    "Teacher 400SC (240ml-480ml).png",
    "Trobin Plus 400SC (20ml-240ml).png",
    "Trobin Super 250SC (240ml).png",
    "Trobin Top 325SC (30ml-240ml).png",
    "Trobintop 325SC (240ml) MD.png"
];

const loader = new THREE.TextureLoader();
const hasBundledData = (typeof PRODUCTS_DATA !== 'undefined' && PRODUCTS_DATA.length > 0);
const photoFiles = hasBundledData
    ? PRODUCTS_DATA.map(p => p.dataUrl)
    : PRODUCT_FILES.map(name => `./img/${encodeURIComponent(name)}`);
const productNames = hasBundledData
    ? PRODUCTS_DATA.map(p => p.name)
    : PRODUCT_FILES.map(name => name.replace(/\.(png|jpe?g)$/i, ''));
const productAspects = hasBundledData
    ? PRODUCTS_DATA.map(p => p.aspect || 0.65)
    : PRODUCT_FILES.map(() => 0.65);
const photoTextures = [];
photoFiles.forEach((f, i) => {
    const tex = loader.load(f, (loadedTex) => {
        // Nếu không có PRODUCTS_DATA, tự động cập nhật tỷ lệ thật từ ảnh khi tải xong
        if (!hasBundledData && loadedTex.image && loadedTex.image.width && loadedTex.image.height) {
            const realAspect = loadedTex.image.width / loadedTex.image.height;
            if (photoMeshes[i]) {
                const baseH = 11.5;
                photoMeshes[i].geometry.dispose();
                photoMeshes[i].geometry = new THREE.PlaneGeometry(baseH * realAspect, baseH);
            }
        }
    });
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    photoTextures[i] = tex;
});

// ==========================================
// 2. TEXTURES NÔNG NGHIỆP (LÁ XANH, LÚA VÀNG, TRÁI CHÍN, QUÀ MÙA VÀNG)
// ==========================================
function createCustomTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const cx = 64, cy = 64;

    if (type === 'leaf_green') {
        // Hạt Diệp Lục & Lá Xanh Tươi Tốt
        const grd = ctx.createRadialGradient(cx, cy, 2, cx, cy, 52);
        grd.addColorStop(0, '#E8F5E9');
        grd.addColorStop(0.25, '#69F0AE');
        grd.addColorStop(0.6, '#2E7D32');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 128, 128);

        // Vẽ hình chiếc lá sắc nét ở tâm
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, -34);
        ctx.quadraticCurveTo(26, -10, 0, 34);
        ctx.quadraticCurveTo(-26, -10, 0, -34);
        ctx.fillStyle = 'rgba(185, 246, 202, 0.85)';
        ctx.fill();
        // Gân lá
        ctx.strokeStyle = '#1B5E20';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -28); ctx.lineTo(0, 28);
        ctx.stroke();
        ctx.restore();

    } else if (type === 'rice_gold') {
        // Hạt Lúa Vàng Óng Ánh (Mùa Vàng Bội Thu)
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 46);
        grd.addColorStop(0, '#FFFFFF');
        grd.addColorStop(0.25, '#FFF59D');
        grd.addColorStop(0.55, '#FFB300');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd; ctx.fillRect(0, 0, 128, 128);

        // Hình hạt lúa vàng ở giữa
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI / 6);
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 26, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE082';
        ctx.fill();
        ctx.strokeStyle = '#FF8F00';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

    } else if (type === 'fruit_red') {
        // Trái Chín Đỏ Hồng (Cà phê chín, Trái cây ngọt)
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52);
        grd.addColorStop(0, '#FFCDD2');
        grd.addColorStop(0.3, '#FF1744');
        grd.addColorStop(0.65, '#B71C1C');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd; ctx.fillRect(0, 0, 128, 128);

        // Cuốn lá xanh nhỏ trên đỉnh quả
        ctx.fillStyle = '#69F0AE';
        ctx.beginPath();
        ctx.ellipse(cx + 6, cy - 22, 10, 5, -0.4, 0, Math.PI * 2);
        ctx.fill();

    } else if (type === 'agri_gift') {
        // Hộp Quà Nông Nghiệp Phú Nông (Xanh lá - Nơ Vàng)
        ctx.fillStyle = '#1B5E20';
        ctx.fillRect(20, 24, 88, 84);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 24, 88, 84);
        // Ruy băng vàng
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(54, 24, 20, 84);
        ctx.fillRect(20, 56, 88, 20);
        // Nơ trên hộp quà
        ctx.beginPath();
        ctx.arc(52, 20, 10, 0, Math.PI * 2);
        ctx.arc(76, 20, 10, 0, Math.PI * 2);
        ctx.fill();

    } else if (type === 'wood_bark') {
        // Hạt Thân Gỗ Hổ Phách Dịu Nhẹ (Ánh đồng ấm vừa phải, không bị chói)
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 44);
        grd.addColorStop(0, 'rgba(255, 224, 130, 0.72)');
        grd.addColorStop(0.35, 'rgba(216, 138, 40, 0.48)');
        grd.addColorStop(0.7, 'rgba(141, 110, 99, 0.22)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 128, 128);

    } else if (type === 'snow_flake') {
        // Bông Tuyết & Sương Giá Đêm Đông Giáng Sinh
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 56);
        grd.addColorStop(0, '#FFFFFF');
        grd.addColorStop(0.35, 'rgba(225, 245, 254, 0.9)');
        grd.addColorStop(0.7, 'rgba(129, 212, 250, 0.35)');
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 128, 128);

        // Vẽ nhánh tinh thể bông tuyết 6 cánh
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        for (let k = 0; k < 6; k++) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate((k * Math.PI) / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -40);
            ctx.moveTo(0, -24);
            ctx.lineTo(-10, -33);
            ctx.moveTo(0, -24);
            ctx.lineTo(10, -33);
            ctx.stroke();
            ctx.restore();
        }
    }
    return new THREE.CanvasTexture(canvas);
}

const textures = {
    leaf: createCustomTexture('leaf_green'),
    gold: createCustomTexture('rice_gold'),
    red: createCustomTexture('fruit_red'),
    gift: createCustomTexture('agri_gift'),
    trunk: createCustomTexture('wood_bark'),
    snow: createCustomTexture('snow_flake')
};

// ==========================================
// 3. CẤU HÌNH HỆ THỐNG CÂY THÔNG NÔNG NGHIỆP
// ==========================================
const CONFIG = {
    leafCount: 2400,      // Tán lá xanh nông nghiệp
    goldCount: 1100,      // Dải bông lúa vàng xoắn ốc & hạt mùa vàng
    redCount: 350,        // Trái chín đỏ rực rỡ
    giftCount: 160,       // Hộp quà nông nghiệp
    trunkCount: 450,      // Gốc cây & đất phù sa
    fireflyCount: 160,    // Đom đóm mùa vàng
    snowCount: 520,       // Tuyết rơi & sương giá đêm Giáng Sinh se lạnh
    explodeRadius: 72,
    photoOrbitRadius: 34,
    treeHeight: 74,
    treeBaseRadius: 37,
    tierCount: 6          // 6 tầng tán cây thông rõ rệt
};

let scene, camera, renderer;
let groupLeaf, groupGold, groupRed, groupGift, groupTrunk, groupFireflies, groupSnow;
let photoMeshes = [];
let titleMesh, subTitleMesh, starMesh, loveMesh, groundRingMesh;

let state = 'TREE';
let manualOverrideUntil = 0;
let selectedIndex = 0;
let handX = 0.5;
let handY = 0.5;          // Vị trí dọc của bàn tay (0 = mép trên camera, 1 = mép dưới)
let selectedRow = 1;      // Hàng đang chọn khi bung chai: 2 = hàng trên, 1 = hàng giữa, 0 = hàng dưới
let isDragging = false;
let prevMouseX = 0;

// Cập nhật vị trí tay (làm mượt trục dọc để tránh rung)
function updateHandPosition(lm) {
    handX = lm[9].x;
    handY += (lm[9].y - handY) * 0.5;
    updateSelectedRowFromHand();
}

// Đưa tay lên cao → hàng trên, ngang tầm → hàng giữa, hạ thấp → hàng dưới.
// Có vùng đệm (hysteresis) để hàng không bị nhảy qua lại khi tay ở ranh giới.
function updateSelectedRowFromHand() {
    if (handY < 0.40) selectedRow = 2;
    else if (handY > 0.60) selectedRow = 0;
    else if (handY > 0.45 && handY < 0.55) selectedRow = 1;
}

// ==========================================
// 4. KHỞI TẠO KHÔNG GIAN 3D
// ==========================================
function init3D() {
    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061826, 0.0016);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 108);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Tạo các lớp hạt của Cây Thông Nông Nghiệp
    groupTrunk = createParticleSystem('trunk', CONFIG.trunkCount, 2.8);
    groupLeaf = createParticleSystem('leaf', CONFIG.leafCount, 2.5);
    groupGold = createParticleSystem('gold', CONFIG.goldCount, 2.4);
    groupRed = createParticleSystem('red', CONFIG.redCount, 3.6);
    groupGift = createParticleSystem('gift', CONFIG.giftCount, 3.2);
    groupFireflies = createFireflies(CONFIG.fireflyCount);
    groupSnow = createSnowfall(CONFIG.snowCount);

    createPhotos();
    createDecorations();
    setupMouseAndTouchControls(container);
    animate();
}

// Hàm tính bán kính tán cây thông phân tầng (6 tầng lá tự nhiên)
function getTieredTreeRadius(hNorm) {
    // hNorm từ 0 (đáy tán) đến 1 (đỉnh ngọn)
    const tierProgress = (hNorm * CONFIG.tierCount) % 1;
    // Mỗi tầng xòe rộng ở dưới và thu nhỏ ở trên
    const tierFlare = 0.68 + 0.36 * (1 - Math.pow(tierProgress, 0.75));
    const coneEnvelope = Math.pow(1 - hNorm, 0.88);
    return CONFIG.treeBaseRadius * coneEnvelope * tierFlare;
}

function createParticleSystem(type, count, size) {
    const pPositions = [];
    const pExplodeTargets = [];
    const pTreeTargets = [];
    const pHeartTargets = [];
    const sizes = [];
    const phases = [];

    for (let i = 0; i < count; i++) {
        let tx = 0, ty = 0, tz = 0;

        if (type === 'trunk') {
            // Gốc cây cổ thụ vững chãi + mô đất phù sa dưới gốc
            if (i < count * 0.65) {
                // Thân gỗ trụ tròn
                const trunkH = Math.random() * 18; // từ -44 đến -26
                ty = -CONFIG.treeHeight / 2 - 9 + trunkH;
                const trunkR = (3.8 - (trunkH / 18) * 1.2) * Math.sqrt(Math.random());
                const theta = Math.random() * Math.PI * 2;
                tx = trunkR * Math.cos(theta);
                tz = trunkR * Math.sin(theta);
            } else {
                // Đế đất phù sa & rễ cây lan tỏa
                const moundR = 4 + Math.random() * 18;
                const theta = Math.random() * Math.PI * 2;
                tx = moundR * Math.cos(theta);
                tz = moundR * Math.sin(theta);
                ty = -CONFIG.treeHeight / 2 - 8.5 + Math.cos((moundR / 22) * Math.PI * 0.5) * 2.5;
            }
        } else if (type === 'gold' && i < count * 0.55) {
            // Dải lụa bông lúa vàng (Golden Rice Garland) quấn xoắn ốc quanh cây thông
            const strand = i % 2; // 2 dải xoắn đối xứng
            const hNorm = (i / (count * 0.55));
            const h = hNorm * CONFIG.treeHeight;
            ty = h - CONFIG.treeHeight / 2;
            const maxR = (1 - hNorm * 0.92) * CONFIG.treeBaseRadius;
            const turns = 4.5;
            const theta = hNorm * Math.PI * 2 * turns + (strand * Math.PI) + (Math.random() - 0.5) * 0.22;
            const r = maxR * (0.96 + (Math.random() - 0.5) * 0.08);
            tx = r * Math.cos(theta);
            tz = r * Math.sin(theta);
        } else {
            // Tán lá thông 6 tầng + Trái chín + Quà nông nghiệp
            const hNorm = Math.pow(Math.random(), 0.92);
            const h = hNorm * CONFIG.treeHeight;
            ty = h - CONFIG.treeHeight / 2;
            const maxR = getTieredTreeRadius(hNorm);

            let radiusRatio;
            if (type === 'leaf') {
                // Tán lá dày đặc từ trong ra ngoài rìa cành
                radiusRatio = 0.25 + 0.75 * Math.pow(Math.random(), 0.45);
            } else if (type === 'gold') {
                radiusRatio = 0.5 + 0.5 * Math.random();
            } else {
                // Trái chín & hộp quà treo ở đầu cành cây
                radiusRatio = 0.85 + Math.random() * 0.18;
            }

            // Tạo nhánh cành khía cạnh tự nhiên (8 nhánh chính mỗi tầng)
            const branchAngles = 8;
            const theta = Math.random() * Math.PI * 2;
            const branchLobe = 1 + 0.08 * Math.cos(theta * branchAngles + hNorm * 12);
            const r = maxR * radiusRatio * branchLobe;

            tx = r * Math.cos(theta);
            tz = r * Math.sin(theta);
        }
        pTreeTargets.push(tx, ty, tz);

        // --- EXPLODE TARGETS ---
        const u = Math.random();
        const v = Math.random();
        const phi = Math.acos(2 * v - 1);
        const lam = 2 * Math.PI * u;
        let radMult = (type === 'gift') ? 1.15 : 1.0;
        const rad = CONFIG.explodeRadius * (0.35 + 0.65 * Math.cbrt(Math.random())) * radMult;
        pExplodeTargets.push(
            rad * Math.sin(phi) * Math.cos(lam),
            rad * Math.sin(phi) * Math.sin(lam),
            rad * Math.cos(phi)
        );

        // --- HEART TARGETS (Trái Tim Tri Ân Nhà Nông) ---
        const tHeart = Math.random() * Math.PI * 2;
        let hx = 16 * Math.pow(Math.sin(tHeart), 3);
        let hy = 13 * Math.cos(tHeart) - 5 * Math.cos(2 * tHeart) - 2 * Math.cos(3 * tHeart) - Math.cos(4 * tHeart);

        const rFill = Math.pow(Math.random(), 0.35);
        hx *= rFill; hy *= rFill;
        let hz = (Math.random() - 0.5) * 9 * rFill;

        const scaleH = 2.25;
        pHeartTargets.push(hx * scaleH, hy * scaleH + 5, hz);

        // --- INIT POSITIONS ---
        pPositions.push(tx, ty, tz);
        sizes.push(size);
        phases.push(Math.random() * Math.PI * 2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pPositions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color();
    if (type === 'leaf') baseColor.setHex(0x4CAF50);
    else if (type === 'gold') baseColor.setHex(0xFFD700);
    else if (type === 'red') baseColor.setHex(0xFF3D00);
    else if (type === 'trunk') baseColor.setHex(0xC88A32);
    else baseColor.setHex(0xFFFFFF);

    for (let i = 0; i < count; i++) {
        // Biến thiên sắc độ tự nhiên cho lá xanh
        if (type === 'leaf') {
            const shade = 0.75 + 0.45 * Math.random();
            colors[i * 3] = baseColor.r * shade * 0.85;
            colors[i * 3 + 1] = Math.min(1.0, baseColor.g * shade * 1.1);
            colors[i * 3 + 2] = baseColor.b * shade * 0.8;
        } else {
            colors[i * 3] = baseColor.r;
            colors[i * 3 + 1] = baseColor.g;
            colors[i * 3 + 2] = baseColor.b;
        }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    geo.userData = {
        tree: pTreeTargets, explode: pExplodeTargets, heart: pHeartTargets,
        phases: phases, baseColor: baseColor, baseSize: size
    };

    const mat = new THREE.PointsMaterial({
        size: size,
        map: textures[type],
        transparent: true, opacity: 1.0,
        vertexColors: true,
        blending: (type === 'gift') ? THREE.NormalBlending : THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);
    return points;
}

// Tuyết rơi & sương giá se lạnh đêm Giáng Sinh trên cánh đồng
function createSnowfall(count) {
    const pos = [];
    const speeds = [];
    const drifts = [];
    for (let i = 0; i < count; i++) {
        pos.push(
            (Math.random() - 0.5) * 220,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 160
        );
        speeds.push(0.12 + Math.random() * 0.25);
        drifts.push(Math.random() * Math.PI * 2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.userData = { speeds: speeds, drifts: drifts };
    const mat = new THREE.PointsMaterial({
        size: 2.3,
        map: textures.snow,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    return points;
}

// Đom đóm & phấn hoa vàng bay lượn quanh cánh đồng đêm Giáng Sinh
function createFireflies(count) {
    const pos = [];
    const phases = [];
    for (let i = 0; i < count; i++) {
        pos.push(
            (Math.random() - 0.5) * 180,
            (Math.random() - 0.5) * 120,
            (Math.random() - 0.5) * 140
        );
        phases.push(Math.random() * Math.PI * 2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.userData = { phases: phases };
    const mat = new THREE.PointsMaterial({
        size: 1.8,
        map: textures.gold,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    return points;
}

// ==========================================
// 5. TẠO 43 SẢN PHẨM DẠNG CHAI (TREO TRÊN CÂY & BUNG 3 TẦNG QUỸ ĐẠO)
// ==========================================
function createNameLabelTexture(productName) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 96;
    const ctx = canvas.getContext('2d');
    // Khung nhãn xanh viền vàng
    ctx.fillStyle = 'rgba(8, 48, 22, 0.92)';
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    const r = 20;
    ctx.beginPath();
    ctx.moveTo(10 + r, 10);
    ctx.lineTo(502 - r, 10);
    ctx.quadraticCurveTo(502, 10, 502, 10 + r);
    ctx.lineTo(502, 86 - r);
    ctx.quadraticCurveTo(502, 86, 502 - r, 86);
    ctx.lineTo(10 + r, 86);
    ctx.quadraticCurveTo(10, 86, 10, 86 - r);
    ctx.lineTo(10, 10 + r);
    ctx.quadraticCurveTo(10, 10, 10 + r, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 26px "Segoe UI", sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const shortName = productName.length > 30 ? productName.slice(0, 28) + '...' : productName;
    ctx.fillText(shortName, 256, 48);
    return new THREE.CanvasTexture(canvas);
}

function createPhotos() {
    const total = photoFiles.length; // 43 sản phẩm dạng chai
    const baseHeight = 11.5;

    for (let i = 0; i < total; i++) {
        // Giữ đúng 100% tỷ lệ khung hình thật của từng chai (không bị méo hình)
        const aspect = productAspects[i] || 0.65;
        const planeW = baseHeight * aspect;
        const geo = new THREE.PlaneGeometry(planeW, baseHeight);

        const mat = new THREE.MeshBasicMaterial({
            map: photoTextures[i],
            side: THREE.DoubleSide,
            transparent: true,
            alphaTest: 0.03
        });
        const mesh = new THREE.Mesh(geo, mat);

        // Vị trí treo trên Cây Thông
        const treeRatio = (i + 0.5) / total;
        const hNorm = 0.07 + treeRatio * 0.80;
        const treeY = hNorm * CONFIG.treeHeight - CONFIG.treeHeight / 2;
        const maxR = getTieredTreeRadius(hNorm) + 2.2;
        const goldenAngle = i * 2.3999632;
        mesh.userData = {
            index: i,
            name: productNames[i],
            treeR: maxR,
            treeY: treeY,
            treeAngle: goldenAngle
        };

        mesh.visible = true;
        mesh.scale.set(0.38, 0.38, 0.38);
        scene.add(mesh);
        photoMeshes.push(mesh);
    }
}

// ==========================================
// 6. TRANG TRÍ ĐỈNH CÂY, TIÊU ĐỀ MÙA VÀNG & VÒNG ĐỒNG RUỘNG
// ==========================================
function createDecorations() {
    // 1. TIÊU ĐỀ CHÍNH: GIÁNG SINH MÙA VÀNG
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 72px "Segoe UI", sans-serif';
    ctx.fillStyle = '#FFD700'; ctx.textAlign = 'center';
    ctx.shadowColor = "#1B5E20"; ctx.shadowBlur = 25;
    ctx.fillText("🌾 GIÁNG SINH MÙA VÀNG 🎄", 512, 130);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
    titleMesh = new THREE.Mesh(new THREE.PlaneGeometry(66, 16.5), mat);
    titleMesh.position.set(0, 50, 0);
    scene.add(titleMesh);

    // 2. NGÔI SAO MÙA VÀNG & BÔNG LÚA TRÊN ĐỈNH CÂY THÔNG
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 256; starCanvas.height = 256;
    const sCtx = starCanvas.getContext('2d');
    const cx = 128, cy = 128;

    // Hào quang mặt trời ấm áp
    const glow = sCtx.createRadialGradient(cx, cy, 8, cx, cy, 120);
    glow.addColorStop(0, 'rgba(255, 255, 220, 1)');
    glow.addColorStop(0.35, 'rgba(255, 215, 0, 0.85)');
    glow.addColorStop(0.7, 'rgba(46, 204, 113, 0.35)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = glow;
    sCtx.fillRect(0, 0, 256, 256);

    // Ngôi sao 8 cánh vàng rực
    sCtx.fillStyle = "#FFD700";
    sCtx.strokeStyle = "#FFFFFF";
    sCtx.lineWidth = 3;
    sCtx.beginPath();
    const points = 8, outer = 78, inner = 30;
    for (let i = 0; i < points * 2; i++) {
        const r = (i % 2 === 0) ? outer : inner;
        const ang = (i * Math.PI) / points - Math.PI / 2;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        if (i === 0) sCtx.moveTo(x, y);
        else sCtx.lineTo(x, y);
    }
    sCtx.closePath();
    sCtx.fill();
    sCtx.stroke();

    // Vòng nguyệt quế lá xanh ở tâm ngôi sao
    sCtx.beginPath();
    sCtx.arc(cx, cy, 20, 0, Math.PI * 2);
    sCtx.fillStyle = "#1B5E20";
    sCtx.fill();
    sCtx.strokeStyle = "#FFD700";
    sCtx.lineWidth = 3;
    sCtx.stroke();

    const starTex = new THREE.CanvasTexture(starCanvas);
    const starMat = new THREE.MeshBasicMaterial({ map: starTex, transparent: true, blending: THREE.AdditiveBlending });
    starMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), starMat);
    starMesh.position.set(0, CONFIG.treeHeight / 2 + 3.5, 0);
    scene.add(starMesh);

    // 3. VÒNG HÀO QUANG MÙA VÀNG DƯỚI GỐC CÂY (Sáng rực rỡ, hòa quyện với đồng lúa)
    const ringCanvas = document.createElement('canvas');
    ringCanvas.width = 512; ringCanvas.height = 512;
    const rCtx = ringCanvas.getContext('2d');
    const rGrd = rCtx.createRadialGradient(256, 256, 15, 256, 256, 250);
    rGrd.addColorStop(0, 'rgba(255, 215, 0, 0.55)');
    rGrd.addColorStop(0.35, 'rgba(105, 240, 174, 0.35)');
    rGrd.addColorStop(0.7, 'rgba(255, 193, 7, 0.2)');
    rGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    rCtx.fillStyle = rGrd;
    rCtx.fillRect(0, 0, 512, 512);

    // Vẽ vòng tròn đồng tâm ánh kim gợi ruộng bậc thang mùa vàng
    rCtx.strokeStyle = 'rgba(255, 235, 130, 0.55)';
    rCtx.lineWidth = 3;
    [90, 140, 190, 230].forEach(rad => {
        rCtx.beginPath();
        rCtx.arc(256, 256, rad, 0, Math.PI * 2);
        rCtx.stroke();
    });

    const ringTex = new THREE.CanvasTexture(ringCanvas);
    const ringMat = new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
    groundRingMesh = new THREE.Mesh(new THREE.PlaneGeometry(86, 86), ringMat);
    groundRingMesh.rotation.x = -Math.PI / 2;
    groundRingMesh.position.set(0, -CONFIG.treeHeight / 2 - 8.5, 0);
    scene.add(groundRingMesh);

    // 4. THÔNG ĐIỆP TRI ÂN NHÀ NÔNG (KHI THẢ TIM)
    const loveCanvas = document.createElement('canvas');
    loveCanvas.width = 1024; loveCanvas.height = 256;
    const lCtx = loveCanvas.getContext('2d');
    lCtx.font = 'bold 80px "Segoe UI", sans-serif';
    lCtx.fillStyle = '#FFD700'; lCtx.textAlign = 'center';
    lCtx.shadowColor = "#2E7D32"; lCtx.shadowBlur = 35;
    lCtx.fillText("❤️ TRI ÂN NGƯỜI NÔNG DÂN 🌾", 512, 115);

    lCtx.font = 'bold 42px "Segoe UI", sans-serif';
    lCtx.fillStyle = '#FFFFFF';
    lCtx.fillText("Chúc Bà Con Trúng Mùa - Được Giá - Hạnh Phúc!", 512, 185);

    const loveTex = new THREE.CanvasTexture(loveCanvas);
    const loveMat = new THREE.MeshBasicMaterial({ map: loveTex, transparent: true });
    loveMesh = new THREE.Mesh(new THREE.PlaneGeometry(72, 18), loveMat);
    loveMesh.position.set(0, 0, 24);
    loveMesh.visible = false;
    scene.add(loveMesh);
}

// ==========================================
// 7. CẬP NHẬT CHUYỂN ĐỘNG HẠT & SẢN PHẨM
// ==========================================
function updateParticleGroup(group, type, targetState, speed, handRotY, time) {
    const positions = group.geometry.attributes.position.array;
    const sizes = group.geometry.attributes.size.array;
    const colors = group.geometry.attributes.color.array;
    const phases = group.geometry.userData.phases;
    const baseColor = group.geometry.userData.baseColor;
    const baseSize = group.geometry.userData.baseSize;

    const targetKey = (targetState === 'TREE') ? 'tree' : (targetState === 'HEART' ? 'heart' : 'explode');
    const targets = group.geometry.userData[(targetState === 'PHOTO') ? 'explode' : targetKey];

    for (let i = 0; i < positions.length; i++) {
        positions[i] += (targets[i] - positions[i]) * speed;
    }
    group.geometry.attributes.position.needsUpdate = true;

    const count = positions.length / 3;

    if (targetState === 'TREE') {
        group.rotation.y += 0.014;
        group.scale.set(1, 1, 1);

        for (let i = 0; i < count; i++) {
            sizes[i] = baseSize;
            let brightness = 1.0;
            if (type === 'red') {
                brightness = 0.65 + 0.45 * Math.sin(time * 3.5 + phases[i]);
            } else if (type === 'gold') {
                brightness = 0.8 + 0.4 * Math.sin(time * 8 + phases[i]);
            } else if (type === 'trunk') {
                brightness = 0.42 + 0.15 * Math.sin(time * 3 + phases[i]);
            } else if (type === 'leaf') {
                brightness = 0.85 + 0.2 * Math.sin(time * 2 + phases[i]);
            }
            colors[i * 3] = Math.min(1, baseColor.r * brightness);
            colors[i * 3 + 1] = Math.min(1, baseColor.g * brightness);
            colors[i * 3 + 2] = Math.min(1, baseColor.b * brightness);
        }
        group.geometry.attributes.color.needsUpdate = true;
        group.geometry.attributes.size.needsUpdate = true;

    } else if (targetState === 'HEART') {
        group.rotation.y = 0;
        const beatScale = 1 + Math.abs(Math.sin(time * 3)) * 0.12;
        group.scale.set(beatScale, beatScale, beatScale);

        for (let i = 0; i < count; i++) {
            colors[i * 3] = baseColor.r; colors[i * 3 + 1] = baseColor.g; colors[i * 3 + 2] = baseColor.b;
            if (i % 2 === 0) sizes[i] = baseSize;
            else sizes[i] = 0;
        }
        group.geometry.attributes.color.needsUpdate = true;
        group.geometry.attributes.size.needsUpdate = true;

    } else {
        // EXPLODE HOẶC PHOTO
        group.scale.set(1, 1, 1);
        group.rotation.y += (handRotY - group.rotation.y) * 0.08;

        for (let i = 0; i < count; i++) {
            sizes[i] = baseSize * 0.85;
            let brightness = 0.9 + 0.35 * Math.sin(time * 8 + phases[i]);
            colors[i * 3] = baseColor.r * brightness;
            colors[i * 3 + 1] = baseColor.g * brightness;
            colors[i * 3 + 2] = baseColor.b * brightness;
        }
        group.geometry.attributes.size.needsUpdate = true;
        group.geometry.attributes.color.needsUpdate = true;
    }
}

function updateBannerUI() {
    const banner = document.getElementById('product-banner');
    const nameText = document.getElementById('product-name-text');
    const countTag = document.getElementById('product-count-tag');
    if (state === 'EXPLODE' || state === 'PHOTO') {
        banner.style.display = 'inline-flex';
        nameText.innerText = productNames[selectedIndex] || '';
        countTag.innerText = `${selectedIndex + 1} / ${photoMeshes.length}`;
    } else {
        banner.style.display = 'none';
    }
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    const speed = 0.08;
    const handRotY = (handX - 0.5) * 5.0;

    updateParticleGroup(groupTrunk, 'trunk', state, speed, handRotY, time);
    updateParticleGroup(groupLeaf, 'leaf', state, speed, handRotY, time);
    updateParticleGroup(groupGold, 'gold', state, speed, handRotY, time);
    updateParticleGroup(groupRed, 'red', state, speed, handRotY, time);
    updateParticleGroup(groupGift, 'gift', state, speed, handRotY, time);

    // Chuyển động đom đóm mùa vàng
    if (groupFireflies) {
        const fPos = groupFireflies.geometry.attributes.position.array;
        const fPhases = groupFireflies.geometry.userData.phases;
        for (let i = 0; i < fPhases.length; i++) {
            fPos[i * 3 + 1] += Math.sin(time * 1.5 + fPhases[i]) * 0.06;
            fPos[i * 3] += Math.cos(time * 1.1 + fPhases[i]) * 0.04;
        }
        groupFireflies.geometry.attributes.position.needsUpdate = true;
    }

    // Chuyển động Tuyết rơi & Sương lạnh Giáng Sinh
    if (groupSnow) {
        const sPos = groupSnow.geometry.attributes.position.array;
        const sSpeeds = groupSnow.geometry.userData.speeds;
        const sDrifts = groupSnow.geometry.userData.drifts;
        for (let i = 0; i < sSpeeds.length; i++) {
            sPos[i * 3 + 1] -= sSpeeds[i]; // Rơi xuống nhẹ nhàng
            sPos[i * 3] += Math.sin(time * 0.9 + sDrifts[i]) * 0.07; // Gió đông thổi nhẹ
            if (sPos[i * 3 + 1] < -75) {
                sPos[i * 3 + 1] = 75;
                sPos[i * 3] = (Math.random() - 0.5) * 220;
            }
        }
        groupSnow.geometry.attributes.position.needsUpdate = true;
    }

    if (state === 'TREE') {
        titleMesh.visible = true;
        starMesh.visible = true;
        groundRingMesh.visible = true;
        loveMesh.visible = false;

        titleMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        starMesh.rotation.z -= 0.035;
        starMesh.material.opacity = 0.85 + 0.15 * Math.sin(time * 4);
        groundRingMesh.rotation.z += 0.012;

        // Hiển thị 43 sản phẩm dạng chai xoay vòng tròn nhanh quanh tán cây thông
        const productOrbitSpeed = time * 1.35;
        photoMeshes.forEach((mesh) => {
            mesh.visible = true;
            const u = mesh.userData;
            const ang = u.treeAngle + productOrbitSpeed;
            const tx = Math.sin(ang) * u.treeR;
            const tz = Math.cos(ang) * u.treeR;
            mesh.position.lerp(new THREE.Vector3(tx, u.treeY, tz), 0.25);
            mesh.lookAt(camera.position);
            mesh.scale.lerp(new THREE.Vector3(0.38, 0.38, 0.38), 0.1);
        });

    } else if (state === 'HEART') {
        titleMesh.visible = false;
        starMesh.visible = false;
        groundRingMesh.visible = false;
        loveMesh.visible = true;
        photoMeshes.forEach(m => { m.visible = false; });
        const s = 1 + Math.abs(Math.sin(time * 3)) * 0.08;
        loveMesh.scale.set(s, s, 1);

    } else if (state === 'EXPLODE') {
        titleMesh.visible = false;
        starMesh.visible = false;
        groundRingMesh.visible = false;
        loveMesh.visible = false;

        // Sắp xếp 43 sản phẩm thành 3 vòng xoắn ốc 3D (Mùa Vàng Triển Lãm) để dễ nhìn tất cả
        const baseAngle = groupGold.rotation.y;
        const total = photoMeshes.length;
        const rings = 3; // 3 tầng vòng tròn
        let bestIdx = selectedIndex;
        let maxScore = -999;

        photoMeshes.forEach((mesh, i) => {
            mesh.visible = true;
            const ringIdx = i % rings; // 0, 1, 2
            const idxInRing = Math.floor(i / rings);
            const countInRing = Math.ceil((total - ringIdx) / rings);

            const angleStep = (Math.PI * 2) / countInRing;
            const angle = baseAngle + idxInRing * angleStep + ringIdx * 0.35;

            const ringRadius = CONFIG.photoOrbitRadius + (ringIdx === 1 ? 6 : 0);
            const baseY = (ringIdx - 1) * 16; // Tầng trên (+16), Tầng giữa (0), Tầng dưới (-16)
            const y = baseY + Math.sin(time * 2 + i * 0.5) * 1.5;

            const x = Math.sin(angle) * ringRadius;
            const z = Math.cos(angle) * ringRadius;

            mesh.position.lerp(new THREE.Vector3(x, y, z), 0.1);
            mesh.lookAt(camera.position);

            // Chọn chai gần camera nhất (hướng thẳng phía trước) trong hàng mà tay đang trỏ tới
            if (ringIdx === selectedRow && z > maxScore) {
                maxScore = z;
                bestIdx = i;
            }

            let ds = (z > 10) ? 0.85 + (z / ringRadius) * 0.65 : 0.48;
            if (i === selectedIndex) ds *= 1.25; // Làm nổi bật chai sẽ được mở khi chụm ngón
            mesh.scale.lerp(new THREE.Vector3(ds, ds, ds), 0.1);
        });
        selectedIndex = bestIdx;

    } else if (state === 'PHOTO') {
        titleMesh.visible = false;
        starMesh.visible = false;
        groundRingMesh.visible = false;
        loveMesh.visible = false;

        photoMeshes.forEach((mesh, i) => {
            if (i === selectedIndex) {
                mesh.visible = true;
                mesh.position.lerp(new THREE.Vector3(0, 1.0, 52), 0.12);
                mesh.scale.lerp(new THREE.Vector3(2.3, 2.3, 2.3), 0.12);
                mesh.lookAt(camera.position);
                mesh.rotation.z = 0;
            } else {
                mesh.scale.lerp(new THREE.Vector3(0, 0, 0), 0.12);
            }
        });
    }

    updateBannerUI();
    renderer.render(scene, camera);
}

// ==========================================
// 8. ĐIỀU KHIỂN BẰNG TAY (CAMERA) & CHUỘT / NÚT BẤM
// ==========================================
function updateStatusText(newState) {
    // Đã ẩn cụm status-badge và mode-toolbar theo yêu cầu
}

function setManualState(newState) {
    state = newState;
    manualOverrideUntil = Date.now() + 15000;
}

function stepProduct(dir) {
    selectedIndex = (selectedIndex + dir + photoMeshes.length) % photoMeshes.length;
    setManualState('PHOTO');
}

function changeBg(fileUrl, btnEl) {
    document.body.style.backgroundImage = `radial-gradient(circle at 50% 42%, rgba(4, 20, 32, 0.38) 0%, rgba(4, 18, 28, 0.22) 45%, rgba(2, 10, 18, 0.52) 100%), url('${fileUrl}')`;
    document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
}

function setupMouseAndTouchControls(container) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
    });

    window.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            prevMouseX = e.clientX;
            handX = Math.max(0, Math.min(1, handX + deltaX * 0.0025));
        }
    });

    window.addEventListener('pointerup', () => {
        isDragging = false;
    });

    // Click trực tiếp vào bất kỳ sản phẩm nào để phóng to xem chi tiết
    container.addEventListener('click', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(photoMeshes, true);
        if (intersects.length > 0) {
            let obj = intersects[0].object;
            while (obj.parent && obj.userData.index === undefined) {
                obj = obj.parent;
            }
            if (obj.userData && obj.userData.index !== undefined) {
                selectedIndex = obj.userData.index;
                setManualState('PHOTO');
            }
        }
    });

    // Hỗ trợ phím mũi tên Trái/Phải để duyệt 43 sản phẩm
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') stepProduct(1);
        else if (e.key === 'ArrowLeft') stepProduct(-1);
        else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // Chuyển hàng trên / dưới khi đang bung chai
            selectedRow = Math.max(0, Math.min(2, selectedRow + (e.key === 'ArrowUp' ? 1 : -1)));
            handY = [0.75, 0.5, 0.25][selectedRow];
            setManualState('EXPLODE');
        }
        else if (e.key === 'Escape') setManualState('EXPLODE');
    });
}

function startSystem() {
    document.getElementById('btnStart').style.display = 'none';
    bgMusic.play().catch(e => console.log(e));
    init3D();

    const video = document.getElementsByClassName('input_video')[0];
    const canvas = document.getElementById('camera-preview');
    const ctx = canvas.getContext('2d');

    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

    hands.onResults(results => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        // Nếu người dùng vừa bấm nút trên màn hình, ưu tiên giữ trạng thái đó
        if (Date.now() < manualOverrideUntil) {
            if (results.multiHandLandmarks.length > 0) {
                updateHandPosition(results.multiHandLandmarks[0]);
            }
            return;
        }

        // Nhận diện ghép 2 bàn tay thành Trái Tim
        if (results.multiHandLandmarks.length === 2) {
            const h1 = results.multiHandLandmarks[0];
            const h2 = results.multiHandLandmarks[1];
            const distIndex = Math.hypot(h1[8].x - h2[8].x, h1[8].y - h2[8].y);
            const distThumb = Math.hypot(h1[4].x - h2[4].x, h1[4].y - h2[4].y);
            if (distIndex < 0.15 && distThumb < 0.15) {
                state = 'HEART';
                updateStatusText(state);
                return;
            }
        }

        if (results.multiHandLandmarks.length > 0) {
            const lm = results.multiHandLandmarks[0];
            // Khi đang chụm ngón (PHOTO) thì giữ nguyên hàng đã chọn, tránh tay xê dịch làm đổi chai
            if (state !== 'PHOTO') updateHandPosition(lm);
            else handX = lm[9].x;
            const tips = [8, 12, 16, 20];
            const wrist = lm[0];
            let openDist = 0;
            tips.forEach(i => openDist += Math.hypot(lm[i].x - wrist.x, lm[i].y - wrist.y));
            const avgDist = openDist / 4;
            const pinchDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);

            if (avgDist < 0.25) {
                state = 'TREE';
            } else if (pinchDist < 0.05) {
                state = 'PHOTO';
            } else {
                state = 'EXPLODE';
            }
            updateStatusText(state);
        } else {
            state = 'TREE';
            updateStatusText(state);
        }
    });

    const cameraUtils = new Camera(video, {
        onFrame: async () => { await hands.send({ image: video }); }, width: 320, height: 240
    });
    cameraUtils.start().catch(() => {
        console.log("Camera không khả dụng, sử dụng chế độ điều khiển chuột & bàn phím.");
    });
}

window.addEventListener('resize', () => {
    if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

