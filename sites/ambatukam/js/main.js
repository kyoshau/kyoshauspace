// ==========================================
// SILK ROAD - MARKETPLACE FUNCTIONALITY
// ==========================================

// Complete Product Database
const allProducts = {
    // FumoDealer_69 products (1-6)
    1: { sellerId: 1, sellerName: 'FumoDealer_69', title: 'Reimu Hakurei Fumo', desc: 'Original Touhou Project plushie, mint condition', fullDesc: 'This is an authentic Reimu Hakurei fumo plushie from the official Touhou Project merchandise line by Gift. The item is in perfect, mint condition and has never been removed from its original packaging. Approximately 20cm tall with high-quality plush material. Original tags attached, never displayed or handled.', price: '2.5 BTC', badge: 'RARE', icon: 'fa-ghost', category: 'fumo' },
    2: { sellerId: 1, sellerName: 'FumoDealer_69', title: 'Cirno Fumo Bundle', desc: 'Set of 3 Cirno plushies, never opened', fullDesc: 'Complete bundle of three Cirno fumo plushies from different production runs. All sealed in original packaging. Perfect for collectors looking to complete their Touhou collection. Each plushie features authentic Gift quality and craftsmanship.', price: '4.2 BTC', badge: '', icon: 'fa-ghost', category: 'fumo' },
    3: { sellerId: 1, sellerName: 'FumoDealer_69', title: 'Marisa Kirisame Fumo', desc: 'Perfect condition, with original tags', fullDesc: 'Official Marisa Kirisame fumo in pristine condition. Includes witch hat and broom accessories. Never removed from box, all original tags intact. Authentic Gift merchandise with certificate of authenticity available upon request.', price: '2.3 BTC', badge: '', icon: 'fa-ghost', category: 'fumo' },
    4: { sellerId: 1, sellerName: 'FumoDealer_69', title: 'Sakuya Fumo Limited Edition', desc: 'Rare limited run, only 200 made', fullDesc: 'Ultra-rare limited edition Sakuya Izayoi fumo. Only 200 units produced worldwide. Numbered certificate included. Mint condition in original display box. This is a serious collector\'s item with significant appreciation potential.', price: '5.8 BTC', badge: 'LIMITED', icon: 'fa-ghost', category: 'fumo' },
    5: { sellerId: 1, sellerName: 'FumoDealer_69', title: 'Youmu Fumo', desc: 'Brand new with tags, fast shipping', fullDesc: 'Brand new Youmu Konpaku fumo with dual swords. Fresh from Japan, all original packaging and tags. Ready to ship immediately with expedited delivery available. Perfect gift for Touhou fans.', price: '2.4 BTC', badge: '', icon: 'fa-ghost', category: 'fumo' },
    6: { sellerId: 1, sellerName: 'FumoDealer_69', title: 'Flandre Fumo', desc: 'High demand item, authentic Gift', fullDesc: 'Highly sought-after Flandre Scarlet fumo. Authentic Gift product with wings and crystal accessories. Very limited availability due to high demand. Mint condition, never displayed.', price: '3.1 BTC', badge: 'HOT', icon: 'fa-ghost', category: 'fumo' },

    // AnimeLord420 products (7-12)
    7: { sellerId: 2, sellerName: 'AnimeLord420', title: 'Hatsune Miku Racing Ver.', desc: '1/8 Scale Figure, Limited Edition 2024', fullDesc: 'Limited edition 2024 Hatsune Miku Racing Queen figure. 1/8 scale with incredible detail and vibrant colors. Includes racing flag and specialty base. Only 1000 units produced. Comes with certificate of authenticity.', price: '1.8 BTC', badge: 'LIMITED', icon: 'fa-female', category: 'anime' },
    8: { sellerId: 2, sellerName: 'AnimeLord420', title: 'Rem Crystal Dress Ver.', desc: 'Limited run of 500, certificate included', fullDesc: 'Stunning Re:Zero Rem figure in crystal dress variant. Limited to 500 pieces worldwide. Translucent dress with LED base illumination. Premium packaging with numbered certificate. Museum-quality display piece.', price: '3.8 BTC', badge: 'LIMITED', icon: 'fa-female', category: 'anime' },
    9: { sellerId: 2, sellerName: 'AnimeLord420', title: 'Asuna Undine Ver.', desc: 'Premium SAO figure, rare variant', fullDesc: 'Rare Asuna Undine version from Sword Art Online. Beautiful water-themed design with flowing effects. Premium sculpting and paint application. Very limited release, highly collectible.', price: '2.9 BTC', badge: 'HOT', icon: 'fa-star', category: 'anime' },
    10: { sellerId: 2, sellerName: 'AnimeLord420', title: 'Saber Lily 1/7 Scale', desc: 'Fate series collector edition', fullDesc: 'Premium Saber Lily figure from the Fate series. 1/7 scale with intricate armor detail and Excalibur. Collector\'s edition with special packaging. Perfect condition.', price: '3.2 BTC', badge: '', icon: 'fa-star', category: 'anime' },
    11: { sellerId: 2, sellerName: 'AnimeLord420', title: 'Rin Tohsaka Battle Ver.', desc: 'Dynamic pose, LED base included', fullDesc: 'Dynamic Rin Tohsaka battle scene figure with LED-illuminated magic effects. Action pose with gem projectiles. Premium quality with detailed base. Limited availability.', price: '2.7 BTC', badge: 'RARE', icon: 'fa-female', category: 'anime' },
    12: { sellerId: 2, sellerName: 'AnimeLord420', title: 'Aqua Goddess Ver.', desc: 'KonoSuba premium sculpt', fullDesc: 'Premium Aqua figure from KonoSuba in goddess outfit. Beautiful flowing robes and divine accessories. Excellent sculpting and paint quality. Great addition to any collection.', price: '2.2 BTC', badge: '', icon: 'fa-star', category: 'anime' },

    // TokyoSupply products (13-18)
    13: { sellerId: 3, sellerName: 'TokyoSupply', title: 'Zero Two Figure', desc: 'Premium quality 1/7 scale, authentic', fullDesc: 'Premium Zero Two from Darling in the FranXX. 1/7 scale with beautiful detailing and vibrant pink hair. Authentic licensed product. Dynamic pose with specialty base.', price: '2.1 BTC', badge: 'HOT', icon: 'fa-star', category: 'anime' },
    14: { sellerId: 3, sellerName: 'TokyoSupply', title: 'Saber Alter Deluxe', desc: '1/4 Scale massive figure with LED effects', fullDesc: 'Massive 1/4 scale Saber Alter deluxe edition. Over 40cm tall with LED-illuminated Excalibur Morgan. Premium packaging and display base. This is a serious centerpiece figure.', price: '6.9 BTC', badge: 'HOT', icon: 'fa-fire', category: 'limited' },
    15: { sellerId: 3, sellerName: 'TokyoSupply', title: 'Nendoroid Pikachu', desc: 'Pokemon official merchandise', fullDesc: 'Official Pokemon Nendoroid Pikachu with multiple expressions and accessories. Includes Thunderbolt effect parts. Perfect for Pokemon fans and Nendoroid collectors.', price: '0.8 BTC', badge: '', icon: 'fa-bolt', category: 'anime' },
    16: { sellerId: 3, sellerName: 'TokyoSupply', title: 'Chainsaw Man Denji', desc: 'Latest release from Good Smile', fullDesc: 'Brand new Denji figure from Chainsaw Man by Good Smile Company. Features chainsaw transformation parts. Fresh from Tokyo, latest release. High demand item.', price: '1.5 BTC', badge: 'NEW', icon: 'fa-male', category: 'anime' },
    17: { sellerId: 3, sellerName: 'TokyoSupply', title: 'Spy x Family Anya', desc: 'Adorable spy daughter figure', fullDesc: 'Cute Anya Forger figure with multiple face expressions. Includes peanuts accessory and school uniform variant. Perfect quality from official manufacturer.', price: '1.3 BTC', badge: 'HOT', icon: 'fa-child', category: 'anime' },
    18: { sellerId: 3, sellerName: 'TokyoSupply', title: 'Demon Slayer Tanjiro', desc: 'Premium breathing effects version', fullDesc: 'Tanjiro Kamado with water breathing visual effects. Premium sculpting with dynamic water effects. Limited release with special packaging. Very popular item.', price: '3.5 BTC', badge: 'LIMITED', icon: 'fa-fire', category: 'anime' },

    // NipponWares products (19-23)
    19: { sellerId: 4, sellerName: 'NipponWares', title: 'Asuka Langley Vintage', desc: '1997 Original NGE collectible, sealed', fullDesc: 'Original 1997 Asuka Langley figure from Evangelion. Factory sealed in original packaging. Extremely rare vintage collectible. Museum quality with significant historical value. Certificate of authenticity included.', price: '5.5 BTC', badge: 'RARE', icon: 'fa-gem', category: 'rare' },
    20: { sellerId: 4, sellerName: 'NipponWares', title: 'Cowboy Bebop Spike 90s', desc: 'Original Bandai release from 1998', fullDesc: 'Authentic 1998 Bandai Spike Spiegel figure from Cowboy Bebop. Original release, never opened. Vintage packaging in excellent condition. Serious collector\'s item from the golden age of anime.', price: '4.8 BTC', badge: 'RARE', icon: 'fa-gem', category: 'rare' },
    21: { sellerId: 4, sellerName: 'NipponWares', title: 'Sailor Moon R Box Set', desc: 'Complete vintage collection, unopened', fullDesc: 'Complete Sailor Moon R figure box set from the 90s. All figures mint in sealed boxes. Complete set is extremely hard to find. Investment-grade vintage anime collectible.', price: '7.2 BTC', badge: 'RARE', icon: 'fa-moon', category: 'rare' },
    22: { sellerId: 4, sellerName: 'NipponWares', title: 'Dragon Ball Z Goku SSJ', desc: '1999 vintage figure, perfect condition', fullDesc: '1999 original Super Saiyan Goku figure. Perfect condition with all original parts and packaging. Authentic Bandai product from the DBZ golden era. Highly sought after by collectors.', price: '3.9 BTC', badge: '', icon: 'fa-dragon', category: 'rare' },
    23: { sellerId: 4, sellerName: 'NipponWares', title: 'Yu-Gi-Oh! Blue Eyes', desc: 'Original card + figure combo from 2000', fullDesc: 'Rare Yu-Gi-Oh! Blue-Eyes White Dragon figure with original holographic card. Year 2000 special release. Both card and figure in mint condition. Complete package with all original materials.', price: '6.5 BTC', badge: 'RARE', icon: 'fa-certificate', category: 'rare' },

    // Kyoshau products (24-33)
    24: { sellerId: 5, sellerName: 'Kyoshau', title: 'Premium White Blocks (Fresh)', desc: 'Freshly made Mt. Akina special, delivered before dawn. 1kg pack', fullDesc: 'Authentic Mt. Akina tofu blocks, delivered fresh before sunrise. Traditional production methods. Perfect consistency and flavor. Delivery service includes express midnight runs. No questions asked. Popular with local racers and food enthusiasts.', price: '0.05 BTC', badge: 'HOT', icon: 'fa-cube', category: 'rare' },
    25: { sellerId: 5, sellerName: 'Kyoshau', title: 'Golden Beetle Replica', desc: 'Rare Italian antique, metallic finish. Handle with care', fullDesc: 'Rare Italian artifact with golden beetle motif. Metallic finish, museum-quality replica. Historical significance. Extremely delicate, requires special handling. Comes with authentication documentation. Very limited availability.', price: '8.5 BTC', badge: 'RARE', icon: 'fa-bug', category: 'rare' },
    26: { sellerId: 5, sellerName: 'Kyoshau', title: 'Exotic Island Fruit', desc: 'New Guinea import, healing properties. Limited harvest', fullDesc: 'Rare exotic fruit from New Guinea islands. Known for unique healing properties according to local legends. Very limited harvest, seasonal availability. Requires refrigerated shipping. Handle with extreme care. Serious buyers only.', price: '12.3 BTC', badge: 'LIMITED', icon: 'fa-leaf', category: 'rare' },
    27: { sellerId: 5, sellerName: 'Kyoshau', title: 'Vintage Panda Car Parts', desc: 'AE86 authentic components, midnight delivery available', fullDesc: 'Authentic AE86 Trueno components. Genuine Toyota parts from the legendary panda era. Midnight delivery service available for discreet transactions. Perfect for restoration projects or collectors. Limited stock.', price: '2.1 BTC', badge: '', icon: 'fa-cog', category: 'rare' },
    28: { sellerId: 5, sellerName: 'Kyoshau', title: 'Ancient Arrow Collection', desc: 'Historical Italian artifacts, beetle motif. Museum quality', fullDesc: 'Collection of historical Italian arrow artifacts featuring unique beetle decorations. Museum quality preservation. Extremely rare archaeological finds. Each piece comes with provenance documentation. Serious collectors only. Non-refundable.', price: '15.7 BTC', badge: 'RARE', icon: 'fa-long-arrow-alt-right', category: 'rare' },
    29: { sellerId: 5, sellerName: 'Kyoshau', title: 'Dragon Essence (Concentrated)', desc: 'Kamurocho special blend, extreme potency. For experts only', fullDesc: 'Concentrated dragon essence from Kamurocho district. Extreme potency, experts only. Traditional blend using time-honored methods. Very limited production. Requires special storage. Not for beginners. ID verification required.', price: '6.8 BTC', badge: 'HOT', icon: 'fa-fire', category: 'rare' },
    30: { sellerId: 5, sellerName: 'Kyoshau', title: 'Stone Ocean Shells', desc: 'Rare Florida collection, unique properties', fullDesc: 'Rare shell collection from Florida\'s Stone Ocean area. Unique properties and patterns. Each shell carefully selected and authenticated. Natural formations with unusual characteristics. Perfect for serious collectors of oceanic rarities.', price: '4.2 BTC', badge: '', icon: 'fa-circle', category: 'rare' },
    31: { sellerId: 5, sellerName: 'Kyoshau', title: 'Yellow Diamond Package', desc: 'Morioh specialty crystals, highest purity grade', fullDesc: 'Premium yellow diamond crystals from Morioh region. Highest purity grade available. Special processing for enhanced clarity. Each crystal individually certified. Investment-grade gemstones. Secure packaging and insured shipping included.', price: '9.9 BTC', badge: 'LIMITED', icon: 'fa-gem', category: 'rare' },
    32: { sellerId: 5, sellerName: 'Kyoshau', title: 'Mt. Akina Night Delivery Service', desc: 'Express runs, no questions asked. Includes white blocks', fullDesc: 'Professional midnight delivery service on Mt. Akina routes. Express runs with guaranteed timing. Includes premium white blocks. Completely discreet, no questions asked. Perfect for those who value speed and privacy. Booking required 24h advance.', price: '1.5 BTC', badge: 'HOT', icon: 'fa-moon', category: 'rare' },
    33: { sellerId: 5, sellerName: 'Kyoshau', title: 'Mysterious Purple Vines', desc: 'Hermit seller exclusive, very limited stock', fullDesc: 'Extremely rare purple vines from hermit seller. Very limited stock with unique properties. Harvested using traditional methods. Requires special care and storage. Exclusive item not available elsewhere. Serious inquiries only.', price: '7.4 BTC', badge: 'RARE', icon: 'fa-seedling', category: 'rare' }
};


// Seller Database
const sellersData = {
    1: {
        username: 'FumoDealer_69',
        rating: '4.9',
        totalSales: '432',
        reviews: '156',
        positive: '99.8%',
        memberSince: '2023',
        badges: ['Trusted Seller', 'Top Rated', '400+ Sales'],
        bio: "I've been collecting and trading Touhou Project merchandise for over 5 years. All my fumo plushies are sourced directly from Japan and are 100% authentic Gift products. I guarantee the quality of every item and provide tracking for all shipments.",
        shipping: "Ships within 24 hours, worldwide shipping available. All packages are discreetly packed with full tracking.",
        specialty: "Specialized in authentic Touhou Project fumo plushies and rare Japanese collectibles.",
        pgp: "0x7A8B9C2D",
        activeListings: '12'
    },
    2: {
        username: 'AnimeLord420',
        rating: '5.0',
        totalSales: '312',
        reviews: '89',
        positive: '100%',
        memberSince: '2023',
        badges: ['Trusted Seller', 'Perfect Rating', '300+ Sales'],
        bio: "Premium anime figure dealer specializing in limited edition scales and rare collectibles. Every figure comes with authenticity verification and original packaging. Quality guaranteed or full refund.",
        shipping: "Express shipping available. All items insured during transit. Tracked worldwide delivery.",
        specialty: "Specialized in limited edition anime figures and premium scale models.",
        pgp: "0x9F3E5B1A",
        activeListings: '18'
    },
    3: {
        username: 'TokyoSupply',
        rating: '4.7',
        totalSales: '678',
        reviews: '234',
        positive: '98.5%',
        memberSince: '2022',
        badges: ['Verified Seller', 'High Volume', '600+ Sales'],
        bio: "Direct supplier from Tokyo with connections to major retailers and limited drops. Fast shipping, competitive prices. Been in the business for 3+ years with thousands of satisfied customers worldwide.",
        shipping: "Ships from Tokyo within 48 hours. EMS and DHL options available.",
        specialty: "Wide variety of anime merchandise, figures, and collectibles from Japan.",
        pgp: "0x2C7D8F4E",
        activeListings: '45'
    },
    4: {
        username: 'NipponWares',
        rating: '4.8',
        totalSales: '289',
        reviews: '67',
        positive: '99.2%',
        memberSince: '2024',
        badges: ['Trusted Seller', 'New Rising Star'],
        bio: "Specializing in vintage and rare collectibles from the 90s and early 2000s. Every item is authenticated and comes with certificate of authenticity. Perfect for serious collectors.",
        shipping: "Careful packaging for vintage items. Worldwide tracked shipping with insurance.",
        specialty: "Vintage anime collectibles, rare imports, and authenticated limited editions.",
        pgp: "0x6B2A9C3F",
        activeListings: '8'
    },
    5: {
        username: 'Kyoshau',
        rating: '4.95',
        totalSales: '521',
        reviews: '203',
        positive: '99.6%',
        memberSince: '2023',
        badges: ['Trusted Seller', 'Initial D Legend', '500+ Sales', 'Eurobeat Approved'],
        bio: "Delivering tofu and rare JDM collectibles since the 90s. Specialized in Initial D merchandise, AE86 Trueno models, and drift culture items. My stand ability is finding the rarest figures - whether it's Yakuza 0 Kiryu statues or Stone Ocean limited editions. Every delivery is faster than Takumi's downhill run. No sleep till marketplace domination! 頭文字D forever.",
        shipping: "Express delivery like a midnight tofu run on Mt. Akina. Ships before dawn, arrives before you can say 'Ora Ora Ora'. Eurobeat soundtrack included with every order.",
        specialty: "Initial D collectibles, AE86 models, Yakuza game merch, JoJo's Bizarre Adventure figures, and rare JDM drift culture items.",
        pgp: "0x86AE1986",
        activeListings: '27'
    }
};

// Seller-specific product listings
const sellerProducts = {
    1: [ // FumoDealer_69
        { title: 'Reimu Hakurei Fumo', desc: 'Original Touhou Project plushie, mint condition', price: '2.5 BTC', badge: 'RARE', icon: 'fa-ghost' },
        { title: 'Cirno Fumo Bundle', desc: 'Set of 3 Cirno plushies, never opened', price: '4.2 BTC', badge: '', icon: 'fa-ghost' },
        { title: 'Marisa Kirisame Fumo', desc: 'Perfect condition, with original tags', price: '2.3 BTC', badge: '', icon: 'fa-ghost' },
        { title: 'Sakuya Fumo Limited Edition', desc: 'Rare limited run, only 200 made', price: '5.8 BTC', badge: 'LIMITED', icon: 'fa-ghost' },
        { title: 'Youmu Fumo', desc: 'Brand new with tags, fast shipping', price: '2.4 BTC', badge: '', icon: 'fa-ghost' },
        { title: 'Flandre Fumo', desc: 'High demand item, authentic Gift', price: '3.1 BTC', badge: 'HOT', icon: 'fa-ghost' }
    ],
    2: [ // AnimeLord420
        { title: 'Hatsune Miku Racing Ver.', desc: '1/8 Scale Figure, Limited Edition 2024', price: '1.8 BTC', badge: 'LIMITED', icon: 'fa-female' },
        { title: 'Rem Crystal Dress Ver.', desc: 'Limited run of 500, certificate included', price: '3.8 BTC', badge: 'LIMITED', icon: 'fa-female' },
        { title: 'Asuna Undine Ver.', desc: 'Premium SAO figure, rare variant', price: '2.9 BTC', badge: 'HOT', icon: 'fa-star' },
        { title: 'Saber Lily 1/7 Scale', desc: 'Fate series collector edition', price: '3.2 BTC', badge: '', icon: 'fa-star' },
        { title: 'Rin Tohsaka Battle Ver.', desc: 'Dynamic pose, LED base included', price: '2.7 BTC', badge: 'RARE', icon: 'fa-female' },
        { title: 'Aqua Goddess Ver.', desc: 'KonoSuba premium sculpt', price: '2.2 BTC', badge: '', icon: 'fa-star' }
    ],
    3: [ // TokyoSupply
        { title: 'Zero Two Figure', desc: 'Premium quality 1/7 scale, authentic', price: '2.1 BTC', badge: 'HOT', icon: 'fa-star' },
        { title: 'Saber Alter Deluxe', desc: '1/4 Scale massive figure with LED effects', price: '6.9 BTC', badge: 'HOT', icon: 'fa-fire' },
        { title: 'Nendoroid Pikachu', desc: 'Pokemon official merchandise', price: '0.8 BTC', badge: '', icon: 'fa-bolt' },
        { title: 'Chainsaw Man Denji', desc: 'Latest release from Good Smile', price: '1.5 BTC', badge: 'NEW', icon: 'fa-male' },
        { title: 'Spy x Family Anya', desc: 'Adorable spy daughter figure', price: '1.3 BTC', badge: 'HOT', icon: 'fa-child' },
        { title: 'Demon Slayer Tanjiro', desc: 'Premium breathing effects version', price: '3.5 BTC', badge: 'LIMITED', icon: 'fa-fire' }
    ],
    4: [ // NipponWares
        { title: 'Asuka Langley Vintage', desc: '1997 Original NGE collectible, sealed', price: '5.5 BTC', badge: 'RARE', icon: 'fa-gem' },
        { title: 'Cowboy Bebop Spike 90s', desc: 'Original Bandai release from 1998', price: '4.8 BTC', badge: 'RARE', icon: 'fa-gem' },
        { title: 'Sailor Moon R Box Set', desc: 'Complete vintage collection, unopened', price: '7.2 BTC', badge: 'RARE', icon: 'fa-moon' },
        { title: 'Dragon Ball Z Goku SSJ', desc: '1999 vintage figure, perfect condition', price: '3.9 BTC', badge: '', icon: 'fa-dragon' },
        { title: 'Yu-Gi-Oh! Blue Eyes', desc: 'Original card + figure combo from 2000', price: '6.5 BTC', badge: 'RARE', icon: 'fa-certificate' }
    ],
    5: [ // Kyoshau - Real Items with Coded Names
        { title: 'Premium White Blocks (Fresh)', desc: 'Freshly made Mt. Akina special, delivered before dawn. 1kg pack', price: '0.05 BTC', badge: 'HOT', icon: 'fa-cube' },
        { title: 'Golden Beetle Replica', desc: 'Rare Italian antique, metallic finish. Handle with care', price: '8.5 BTC', badge: 'RARE', icon: 'fa-bug' },
        { title: 'Exotic Island Fruit', desc: 'New Guinea import, healing properties. Limited harvest', price: '12.3 BTC', badge: 'LIMITED', icon: 'fa-leaf' },
        { title: 'Vintage Panda Car Parts', desc: 'AE86 authentic components, midnight delivery available', price: '2.1 BTC', badge: '', icon: 'fa-cog' },
        { title: 'Ancient Arrow Collection', desc: 'Historical Italian artifacts, beetle motif. Museum quality', price: '15.7 BTC', badge: 'RARE', icon: 'fa-long-arrow-alt-right' },
        { title: 'Dragon Essence (Concentrated)', desc: 'Kamurocho special blend, extreme potency. For experts only', price: '6.8 BTC', badge: 'HOT', icon: 'fa-fire' },
        { title: 'Stone Ocean Shells', desc: 'Rare Florida collection, unique properties', price: '4.2 BTC', badge: '', icon: 'fa-circle' },
        { title: 'Yellow Diamond Package', desc: 'Morioh specialty crystals, highest purity grade', price: '9.9 BTC', badge: 'LIMITED', icon: 'fa-gem' },
        { title: 'Mt. Akina Night Delivery Service', desc: 'Express runs, no questions asked. Includes white blocks', price: '1.5 BTC', badge: 'HOT', icon: 'fa-moon' },
        { title: 'Mysterious Purple Vines', desc: 'Hermit seller exclusive, very limited stock', price: '7.4 BTC', badge: 'RARE', icon: 'fa-seedling' }
    ]
};

// Function to load seller profile dynamically
function loadSellerProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const sellerId = urlParams.get('id') || '1';
    const seller = sellersData[sellerId];

    if (!seller) return;

    // Update seller username
    const usernameElements = document.querySelectorAll('.seller-header-info h2');
    usernameElements.forEach(el => el.textContent = seller.username);

    // Update badges
    const badgesContainer = document.querySelector('.seller-badges');
    if (badgesContainer) {
        badgesContainer.innerHTML = seller.badges.map(badge =>
            `<span class="badge-item"><i class="fas fa-shield-alt"></i> ${badge}</span>`
        ).join('');
        // Add member since badge
        badgesContainer.innerHTML += `<span class="badge-item"><i class="fas fa-clock"></i> Member Since ${seller.memberSince}</span>`;
    }

    // Update specialty text
    const specialtyText = document.querySelector('.seller-header-info p');
    if (specialtyText) {
        specialtyText.textContent = seller.specialty + ' All items are verified authentic with escrow protection.';
    }

    // Update stats
    const statCards = document.querySelectorAll('.stat-card h3');
    if (statCards.length >= 4) {
        statCards[0].textContent = seller.rating;
        statCards[1].textContent = seller.totalSales;
        statCards[2].textContent = seller.reviews;
        statCards[3].textContent = seller.positive;
    }

    // Update about section
    const bioText = document.querySelector('.seller-about p');
    if (bioText) {
        bioText.innerHTML = seller.bio;
        const shippingP = bioText.nextElementSibling;
        if (shippingP) {
            shippingP.innerHTML = `<strong>Shipping Policy:</strong> ${seller.shipping}`;
        }
    }

    // Update PGP
    const pgpText = document.querySelector('.seller-about p:last-child');
    if (pgpText && pgpText.innerHTML.includes('PGP')) {
        pgpText.innerHTML = `<i class="fas fa-lock"></i> PGP Key: ${seller.pgp} (Available on request)`;
    }


    // Update listings count
    const listingsHeader = document.querySelector('.listings-header');
    if (listingsHeader) {
        listingsHeader.innerHTML = `<i class="fas fa-box-open"></i> ACTIVE LISTINGS (${seller.activeListings})`;
    }

    // Load seller-specific products
    const productGrid = document.querySelector('.product-grid');
    if (productGrid && sellerProducts[sellerId]) {
        productGrid.innerHTML = ''; // Clear existing products

        sellerProducts[sellerId].forEach(product => {
            const badgeHTML = product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : '';

            const productCard = `
                <div class="product-card">
                    ${badgeHTML}
                    <div class="product-image-container">
                        <div class="product-image-placeholder">
                            <i class="fas ${product.icon}"></i>
                        </div>
                    </div>
                    <div class="product-info">
                        <h6 class="product-title">${product.title}</h6>
                        <p class="product-description">${product.desc}</p>
                        <div class="product-meta">
                            <span class="rating"><i class="fas fa-star"></i> ${seller.rating} (${seller.reviews})</span>
                        </div>
                        <div class="product-footer">
                            <span class="price">${product.price}</span>
                            <a href="product.html?id=${Object.keys(allProducts).find(id => allProducts[id].title === product.title)}" class="btn btn-view">VIEW</a>
                        </div>
                    </div>
                </div>
            `;

            productGrid.innerHTML += productCard;
        });
    }
}

// Function to load product details dynamically
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = allProducts[productId];

    if (!product) return;

    // Update product title
    const title = document.querySelector('.product-detail-info h2');
    if (title) title.textContent = product.title;

    // Update badge and category
    const badgeContainer = document.querySelector('.product-detail-info p');
    if (badgeContainer) {
        let badgeHTML = '';
        if (product.badge) {
            const badgeClass = product.badge.toLowerCase();
            badgeHTML = `<span style="background: var(--accent-${badgeClass === 'rare' ? 'blue' : badgeClass === 'limited' ? 'yellow' : badgeClass === 'hot' ? 'red' : 'green'}); color: var(--bg-primary); padding: 3px 8px; margin-right: 5px;">${product.badge}</span>`;
        }
        badgeContainer.innerHTML = `${badgeHTML}Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`;
    }

    // Update price
    const priceElement = document.querySelector('.product-price-large');
    if (priceElement) priceElement.textContent = product.price;

    // Update short description
    const shortDesc = document.querySelector('.product-detail-info > p[style*="line-height"]');
    if (shortDesc) shortDesc.textContent = product.desc;

    // Update seller info
    const sellerLink = document.querySelector('.seller-info-box a');
    if (sellerLink) {
        sellerLink.textContent = product.sellerName;
        sellerLink.href = `seller.html?id=${product.sellerId}`;
    }

    const seller = sellersData[product.sellerId];
    if (seller) {
        const ratingSpan = document.querySelector('.seller-info-box .fa-star').parentElement;
        if (ratingSpan) {
            ratingSpan.innerHTML = `<i class="fas fa-star" style="color: var(--accent-yellow);"></i> Rating: <span style="color: var(--accent-yellow);">${seller.rating}/5.0</span> (${seller.reviews} reviews)`;
        }
    }

    // Update icon
    const iconElement = document.querySelector('.product-image-placeholder i');
    if (iconElement) {
        iconElement.className = `fas ${product.icon}`;
    }

    // Update full description
    const fullDescElement = document.querySelector('.product-description-full p');
    if (fullDescElement) fullDescElement.textContent = product.fullDesc;
}

document.addEventListener('DOMContentLoaded', function () {

    // Load product details if on product page
    if (window.location.pathname.includes('product.html')) {
        loadProductDetails();
    }

    // Load marketplace products on index page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const productGrid = document.getElementById('productGrid');
        if (productGrid) {
            // Show featured products from all sellers (mix of different products)
            const featuredIds = [1, 7, 13, 19, 24, 2, 8, 14, 20, 25, 3, 9]; // Selection from all sellers

            featuredIds.forEach(productId => {
                const product = allProducts[productId];
                if (product) {
                    const badgeHTML = product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : '';

                    const productCard = `
                        <div class="product-card" data-category="${product.category}">
                            ${badgeHTML}
                            <div class="product-image-container">
                                <div class="product-image-placeholder">
                                    <i class="fas ${product.icon}"></i>
                                </div>
                            </div>
                            <div class="product-info">
                                <h6 class="product-title">${product.title}</h6>
                                <p class="product-description">${product.desc}</p>
                                <div class="product-meta">
                                    <span class="seller"><i class="fas fa-user"></i> ${product.sellerName}</span>
                                    <span class="rating"><i class="fas fa-star"></i> ${sellersData[product.sellerId].rating} (${sellersData[product.sellerId].reviews})</span>
                                </div>
                                <div class="product-footer">
                                    <span class="price">${product.price}</span>
                                    <a href="product.html?id=${productId}" class="btn btn-view">VIEW</a>
                                </div>
                            </div>
                        </div>
                    `;

                    productGrid.innerHTML += productCard;
                }
            });
        }
    }

    // Load seller profile if on seller page
    if (window.location.pathname.includes('seller.html')) {
        loadSellerProfile();
    }


    // Fake IP rotation for authenticity
    const fakeIPs = [
        '127.0.0.1',
        '192.168.1.1',
        '10.0.0.1',
        '172.16.0.1'
    ];

    const nodes = [
        'onion3xc7vr2k.onion',
        'darknet42xyz.onion',
        'silkroad3mkl.onion',
        'marketplace7t.onion'
    ];

    // Rotate IP and node every 10 seconds
    setInterval(() => {
        const randomIP = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];

        const ipElement = document.getElementById('fake-ip');
        const nodeElement = document.getElementById('node');

        if (ipElement) ipElement.textContent = randomIP;
        if (nodeElement) nodeElement.textContent = randomNode;
    }, 10000);

    // Category Filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    const productCards = document.querySelectorAll('.product-card');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.btn-search');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const seller = card.querySelector('.seller').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query) || seller.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            const grid = document.getElementById('productGrid');
            const cards = Array.from(productCards);

            cards.sort((a, b) => {
                if (sortValue === 'price-low') {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(' BTC', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(' BTC', ''));
                    return priceA - priceB;
                } else if (sortValue === 'price-high') {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(' BTC', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(' BTC', ''));
                    return priceB - priceA;
                } else if (sortValue === 'rating') {
                    const ratingA = parseFloat(a.querySelector('.rating').textContent.split(' ')[1]);
                    const ratingB = parseFloat(b.querySelector('.rating').textContent.split(' ')[1]);
                    return ratingB - ratingA;
                }
                return 0; // newest (default order)
            });

            // Re-append sorted cards
            cards.forEach(card => grid.appendChild(card));
        });
    }

    // Glitch effect on hover (optional)
    const productTitles = document.querySelectorAll('.product-title');
    productTitles.forEach(title => {
        title.addEventListener('mouseenter', function () {
            this.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.5)';
        });
        title.addEventListener('mouseleave', function () {
            this.style.textShadow = 'none';
        });
    });

    // Console warning (easter egg)
    console.log('%c⚠️ WARNING ⚠️', 'color: #ff0000; font-size: 20px; font-weight: bold;');
    console.log('%cYou are accessing a secure marketplace. All activity is logged.', 'color: #00ff00; font-size: 14px;');
    console.log('%cStay anonymous. Stay safe.', 'color: #00ff00; font-size: 14px;');
});

// Prevent right-click (adds to darknet feel)
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    console.log('⚠️ Right-click disabled for security purposes');
});
