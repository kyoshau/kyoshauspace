document.addEventListener('DOMContentLoaded', () => {
    // --- Available Sites ---
    const availableSites = [
        { name: 'anime', path: './sites/anime/index.html', description: 'Anime themed site' },
        { name: 'persona', path: './sites/persona/index.html', description: 'Persona themed site' },
        { name: 'ambatukam', path: './sites/ambatukam/index.html', description: 'Marketplace' }
    ];

    // --- Easter Egg Redirect URL ---
    const WIPE_REDIRECT_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Change this to your desired redirect URL!

    // --- Global State ---
    const state = {
        mode: 'terminal', // 'terminal', 'pong', 'matrix'
        currentDir: '~',
        fileSystem: {
            '~': {
                type: 'dir',
                children: {
                    'projects': {
                        type: 'dir', children: {
                            'portfolio.txt': { type: 'file', content: 'This site! Built with HTML, CSS, JS.' },
                            'secret_project.txt': { type: 'file', content: '52 75 6e 20 63 6f 6d 6d 61 6e 64 3a 20 70 72 6f 74 6f 63 6f 6c 5f 7a 65 72 6f' }
                        }
                    },
                    'about.txt': { type: 'file', content: 'I am a developer who loves retro aesthetics.' },
                    'contact.txt': { type: 'file', content: 'Email: kyoshau@proton.me' },
                    'sites': {
                        type: 'dir', children: {
                            'anime': { type: 'link', target: './sites/anime/index.html' },
                            'persona': { type: 'link', target: './sites/persona/index.html' },
                            'ambatukam': { type: 'link', target: './sites/ambatukam/index.html' }
                        }
                    }
                }
            }
        },
        lines: [
            // Initial messages will be typed out dynamically
        ],
        commandHistory: [],
        historyIndex: -1,
        pong: {
            gameInterval: null,
            ball: { x: 30, y: 10, dx: 1, dy: 1 },
            leftPaddle: 8,
            rightPaddle: 8,
            leftScore: 0,
            rightScore: 0,
            gameOver: false,
            winner: null
        }
    };

    // --- DOM Elements ---
    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('command-input');
    const terminalBody = document.getElementById('terminal-body');
    const starCanvas = document.getElementById('star-canvas');
    const matrixCanvas = document.getElementById('matrix-canvas');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalHeader = document.getElementById('terminal-header');

    // --- Typing Animation ---
    async function typeText(content, type, delay = 30) {
        state.lines.push({ text: "", type: type });
        renderLines();
        const currentIndex = state.lines.length - 1;

        for (let i = 0; i < content.length; i++) {
            state.lines[currentIndex].text += content[i];
            renderLines();
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function initTerminal() {
        await typeText("Initializing system...", "system", 50);
        await new Promise(resolve => setTimeout(resolve, 300));

        await typeText("> neofetch", "command", 50);
        state.lines.push({ type: "ascii" });
        renderLines();
        await new Promise(resolve => setTimeout(resolve, 500));

        await typeText("Welcome to my portfolio.", "info", 50);
        await typeText("Type 'help' for available commands.", "info", 30);
    }

    // --- Draggable Terminal ---
    let isDragging = false;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    terminalHeader.addEventListener("mousedown", dragStart);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", drag);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
            isDragging = true;
            // Ensure absolute positioning is set when dragging starts
            if (terminalWindow.style.position !== 'absolute') {
                const rect = terminalWindow.getBoundingClientRect();
                terminalWindow.style.position = 'absolute';
                terminalWindow.style.left = rect.left + 'px';
                terminalWindow.style.top = rect.top + 'px';
                terminalWindow.style.margin = '0';
                terminalWindow.style.transform = 'none'; // distinct from flex layout

                // Recalculate offsets after switching to absolute
                xOffset = 0;
                yOffset = 0;
                initialX = e.clientX;
                initialY = e.clientY;
            }
        }
    }

    function dragEnd(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            const currentX = e.clientX - initialX;
            const currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            // Simple movement logic using transform which is performant
            // However, since we switched to absolute/left/top mixed logic above, 
            // let's stick to updating left/top to avoid transform conflicts if we used transform there.
            // Actually, best practice for dragging is usually translate3d. 
            // BUT, mixing flexbox centering + absolute dragging is tricky.
            // Let's rely on the switch-to-absolute logic we added in dragStart, 
            // so we just update left/top relative to the viewport.

            // Re-logic:
            // Since we set left/top to fixed pixel values in dragStart (current position),
            // We just need to ADD the delta.
            // Wait, standard drag logic:
            // newLeft = e.clientX - (clickX - rectLeft)
            // Let's refine the logic to be robust.
        }
    }

    // Better Drag Implementation for Hybrid Layouts
    let dragStartX, dragStartY, rectLeft, rectTop;

    function newDragStart(e) {
        if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
            isDragging = true;

            // Get current visual position and size
            const rect = terminalWindow.getBoundingClientRect();
            rectLeft = rect.left;
            rectTop = rect.top;
            const currentWidth = rect.width;

            dragStartX = e.clientX;
            dragStartY = e.clientY;

            // Switch to fixed/absolute positioning if not already
            terminalWindow.style.position = 'fixed'; // Fixed is easier for overlay
            terminalWindow.style.left = rectLeft + 'px';
            terminalWindow.style.top = rectTop + 'px';
            terminalWindow.style.width = currentWidth + 'px'; // Lock width to prevent stretching
            terminalWindow.style.margin = '0';
            terminalWindow.style.transform = 'none';
        }
    }

    function newDrag(e) {
        if (!isDragging) return;
        e.preventDefault();

        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;

        terminalWindow.style.left = (rectLeft + deltaX) + 'px';
        terminalWindow.style.top = (rectTop + deltaY) + 'px';
    }

    // Overwrite the event listeners with the better logic
    terminalHeader.removeEventListener("mousedown", dragStart);
    terminalHeader.addEventListener("mousedown", newDragStart);
    document.addEventListener("mousemove", newDrag);


    // --- Star Background ---
    function initStarBackground() {
        const ctx = starCanvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            starCanvas.width = window.innerWidth;
            starCanvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                radius: Math.random() * 1.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        const shootingStars = [];
        const createShootingStar = () => {
            const startX = Math.random() * starCanvas.width;
            const startY = Math.random() * starCanvas.height / 2;
            shootingStars.push({
                x: startX,
                y: startY,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 8 + 6,
                angle: Math.PI / 4 + Math.random() * Math.PI / 6,
                opacity: 1
            });
        };

        setInterval(() => {
            if (Math.random() < 0.5) createShootingStar();
        }, 3000);

        const animate = () => {
            ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            ctx.fillStyle = 'white';

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                star.x += star.vx;
                star.y += star.vy;
                if (star.x < 0 || star.x > starCanvas.width) star.vx = -star.vx;
                if (star.y < 0 || star.y > starCanvas.height) star.vy = -star.vy;
            });

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.opacity -= 0.01;

                if (star.opacity > 0) {
                    const gradient = ctx.createLinearGradient(
                        star.x, star.y,
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    ctx.stroke();
                } else {
                    shootingStars.splice(i, 1);
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }
    initStarBackground();

    // --- Matrix Rain ---
    function initMatrixRain() {
        const ctx = matrixCanvas.getContext('2d');
        let animationFrameId;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const fontSize = 14;
        let columns;
        let drops;

        const resizeCanvas = () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            columns = Math.floor(matrixCanvas.width / fontSize);
            drops = new Array(columns).fill(1);
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctx.fillStyle = "#0F0";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        return {
            start: () => {
                matrixCanvas.classList.remove('d-none');
                draw();
            },
            stop: () => {
                matrixCanvas.classList.add('d-none');
                cancelAnimationFrame(animationFrameId);
            }
        };
    }
    const matrixEffect = initMatrixRain();

    // --- Terminal Logic ---
    function renderLines() {
        outputDiv.innerHTML = '';

        if (state.mode === 'pong') {
            const pre = document.createElement('pre');
            pre.className = "text-white small lh-sm";
            pre.textContent = renderPongGame();
            outputDiv.appendChild(pre);
            return;
        }

        state.lines.forEach(line => {
            const div = document.createElement('div');
            div.className = "mb-1";

            if (line.type === 'error') div.className += " text-danger fw-bold";
            else if (line.type === 'system') div.className += " text-muted";
            else if (line.type === 'command') div.className += " text-white";
            else if (line.type === 'response') div.className += " text-light whitespace-pre-wrap";

            if (line.type === 'ascii') {
                div.innerHTML = renderNeofetch();
            } else if (line.isHtml) {
                div.innerHTML = line.text;
            } else {
                // Auto-linkify
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                if (line.text && line.text.match(urlRegex)) {
                    div.innerHTML = line.text.replace(urlRegex, '<a href="$1" target="_blank" class="text-primary hover-underline">$1</a>');
                } else {
                    div.textContent = line.text;
                }
            }
            outputDiv.appendChild(div);
        });
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function renderNeofetch() {
        const textArt = `    __                              __                  
   / /__   __  __  ____    _____   / /_   ____ _  __  __
  / //_/  / / / / / __ \\  / ___/  / __ \\ / __ \`/ / / / /
 / ,<    / /_/ / / /_/ / (__  )  / / / // /_/ / / /_/ / 
/_/|_|   \\__, /  \\____/ /____/  /_/ /_/ \\__,_/  \\__,_/  
        /____/                                          `;

        const faceArt = `
⣿⠿⠿⠛⠛⠛⠟⠿⠻⣿⣿⡿⠿⠿⠛⠛⠛⠛⠿⢿
⣷⣴⣾⠿⠿⠿⣷⢶⢾⣿⣿⡿⢶⡶⠿⠻⠛⣿⣶⣽
⣿⣿⣏⠶⠀⠀⠭⢺⣺⣿⣿⣧⣺⠧⠄⠀⡰⢛⣽⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⢏⣾⣿
⣿⣿⣿⣿⣿⠻⠿⠿⠿⠿⠿⠿⢛⣛⣭⣾⣿⣸⣿⣿
⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿`;

        const info = [
            "<span style='color: #00ffd2; font-weight: bold;'>kyoshau@</span>",
            "<span class='text-muted'>--------------------</span>",
            "kyOS x86_64",
            "7.0.10-2-kyoos",
            '<span class="text-warning me-1"><i class="far fa-clock"></i></span> <span id="dynamic-uptime">24 mins</span>',
            "1449 (sonic)",
            "shark 4.7.1",
            "",
            "tf is desktop environtment",
            "Kyo (Kyoland)",
            "alacritty 0.17.0",
            '<span style="color: #f5c2e7;" class="me-1"><i class="fas fa-palette"></i></span> catppuccin-mocha-blue (CatppuccinMoch]',
            "",
            "AMD Ryzen 7 6800H (16) @ 4.79 GHz",
            '<span style="color: #fab387;" class="me-1"><i class="fas fa-microchip"></i></span> NVIDIA GeForce RTX 3050 Mobile [Discr]',
            '<span style="color: #fab387;" class="me-1"><i class="fas fa-microchip"></i></span> AMD Radeon 680M [Integrated]',
            '<span style="color: #a6e3a1;" class="me-1"><i class="fas fa-memory"></i></span> <span id="dynamic-memory">4.82 GiB / 14.86 GiB (32%)</span>',
            '<span style="color: #a6e3a1;" class="me-1"><i class="fas fa-folder"></i></span> 148.52 GiB / 258.51 GiB (58%) - btrfs',
            '<span style="color: #a6e3a1;" class="me-1"><i class="fas fa-folder"></i></span> 417.70 GiB / 476.05 GiB (88%) - fuseb',
            '<span style="color: #a6e3a1;" class="me-1"><i class="fas fa-folder"></i></span> 632.14 GiB / 672.00 GiB (94%) - ntfs3',
            "",
            '<span style="color: #89b4fa;" class="me-1"><i class="fas fa-desktop"></i></span> 1360x768 in 15", 60 Hz [External]',
            '<span style="color: #89b4fa;" class="me-1"><i class="fas fa-desktop"></i></span> 1920x1080 in 16", 144 Hz [Built-in] *'
        ];

        // Color blocks HTML
        const colors = ["#4a5568", "#e53e3e", "#48bb78", "#ecc94b", "#4299e1", "#9f7aea", "#38b2ac", "#e2e8f0"];
        const colorBlocks = colors.map(c => `<span style="display: inline-block; width: 30px; height: 16px; background-color: ${c}; margin-right: 4px;"></span>`).join('');

        return `
        <div class="d-flex flex-column md-flex-row gap-4 align-items-start">
            <div class="d-flex flex-col flex-md-row gap-4">
                <div class="d-flex flex-column align-items-center">
                    <div class="whitespace-pre ascii-art" style="color: #00ffd2; font-size: 11px; font-weight: bold; line-height: 1.2;">${textArt}</div>
                    <div class="whitespace-pre text-white ascii-art" style="font-size: 22px; font-weight: bold; line-height: 1.1; margin-top: 12px; letter-spacing: 0.5px;">${faceArt}</div>
                </div>
                <div class="d-flex flex-column text-white/90 font-monospace" style="font-size: 13.5px; line-height: 1.45; margin-left: 20px;">
                    ${info.map(line => line === "" ? "<div style='height: 8px;'></div>" : '<div class="lh-sm">' + line + '</div>').join('')}
                    <div style="margin-top: 12px; display: flex;">${colorBlocks}</div>
                </div>
            </div>
        </div>`;
    }

    // Dynamic Info Updates
    let uptimeMinutes = 24;
    setInterval(() => {
        const uptimeEl = document.getElementById('dynamic-uptime');
        const memEl = document.getElementById('dynamic-memory');

        if (uptimeEl) {
            uptimeEl.textContent = uptimeMinutes + " mins";
        }

        if (memEl) {
            const currentMem = (4.8 + Math.random() * 0.15).toFixed(2);
            const percent = Math.round((parseFloat(currentMem) / 14.86) * 100);
            memEl.innerHTML = `${currentMem} GiB / 14.86 GiB (${percent}%)`;
        }
    }, 1500);

    // Increment uptimeMinutes every 60 seconds
    setInterval(() => {
        uptimeMinutes++;
    }, 60000);

    function startTrainAnimation() {
        const trainContainer = document.getElementById('terminal-window');
        if (!trainContainer) return;

        const train = document.createElement('pre');
        train.className = 'sl-train-anim';
        
        train.textContent = 
`      ====        ___________  _________
  _D _|  L_Y_   [            ][         ]
   [__|_|__|_|   [   kyOS     ][  sonic  ]
    |o 0 |_|_|   [____________][________]
   _|_|_|_\__/    OO        OO  OO    OO
  /__________\\
  O-O      O-O`;

        trainContainer.appendChild(train);
        
        // Remove after animation completes (4.5s matches keyframe animation duration)
        setTimeout(() => {
            train.remove();
        }, 4600);
    }

    function triggerSystemWipe(preMessage = "") {
        if (preMessage) {
            state.lines.push({ text: preMessage, type: "error" });
            renderLines();
        }
        
        setTimeout(() => {
            state.lines.push({ text: "Proceeding with system destruction... (Force override detected)", type: "error" });
            renderLines();
        }, 1000);
        
        let delay = 1500;
        const filesToDelete = [
            "/index.html",
            "/style.css",
            "/script.js",
            "/img/girl.png",
            "/secrets/brain.dat",
            "/etc/hosts",
            "/usr/bin/shark",
            "/var/log/mental_health"
        ];
        
        filesToDelete.forEach((file, index) => {
            setTimeout(() => {
                state.lines.push({ text: `Removing ${file}... OK`, type: "error" });
                renderLines();
            }, delay + index * 150);
        });
        
        setTimeout(() => {
            state.lines.push({ text: "\nERROR: System partition destroyed. Kernel panic: Attempted to kill init!", type: "error" });
            state.lines.push({ text: "\nRedirecting to restore sequence...", type: "info" });
            renderLines();
        }, delay + filesToDelete.length * 150 + 200);
        
        setTimeout(() => {
            window.location.href = WIPE_REDIRECT_URL;
        }, delay + filesToDelete.length * 150 + 1200);
    }

    function handleCommand(cmd) {
        const cleanCmd = cmd.trim();
        if (cleanCmd) {
            state.lines.push({ text: `${state.currentDir === '~' ? 'user@kyo:~' : 'user@kyo:~/' + state.currentDir} $ ${cmd}`, type: "command" });
            state.commandHistory.push(cmd);
            state.historyIndex = state.commandHistory.length;
        }

        const parts = cleanCmd.split(' ');
        const mainCmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (cleanCmd.toLowerCase().includes('rm -rf')) {
            triggerSystemWipe("WARNING: Running this command will completely wipe out this portfolio's system directories.\nAre you absolutely sure you want to proceed? [y/N]");
            return;
        }

        switch (mainCmd) {
            case 'ls':
                let targetDir = args[0] || state.currentDir;
                // Basic resolution relative to current dir, only handling immediate children or absolute paths (~) for this simple mock
                let dir;

                if (targetDir === '~') {
                    dir = state.fileSystem['~'];
                } else if (state.currentDir === '~' && state.fileSystem['~'].children[targetDir]) {
                    dir = state.fileSystem['~'].children[targetDir];
                } else if (targetDir === state.currentDir) { // 'ls' with no args or explicit current dir
                    dir = resolveDir(state.currentDir);
                } else {
                    // Try to resolve generic path
                    const resolved = resolveDir(state.currentDir + '/' + targetDir);
                    if (resolved) dir = resolved;
                    // Also check if user typed 'ls sites' while in root
                    else {
                        const rootChild = state.fileSystem['~'].children[targetDir];
                        if (rootChild) dir = rootChild;
                    }
                }

                if (dir) {
                    if (dir.type === 'dir') {
                        const items = Object.keys(dir.children).map(name => {
                            const item = dir.children[name];
                            return item.type === 'dir' ? `<span class="text-primary">${name}/</span>` :
                                item.type === 'link' ? `<span class="text-success">${name}@</span>` : name;
                        }).join('  ');
                        state.lines.push({ text: items, type: "response", isHtml: true });
                    } else {
                        state.lines.push({ text: `ls: ${targetDir}: Not a directory`, type: "error" });
                    }
                } else {
                    state.lines.push({ text: `ls: ${targetDir}: No such file or directory`, type: "error" });
                }
                break;
            case 'cd':
                if (args.length === 0 || args[0] === '~') {
                    state.currentDir = '~';
                } else if (args[0] === '..') {
                    if (state.currentDir !== '~') {
                        // Simple one-level up logic for this mock FS
                        const pathParts = state.currentDir.split('/');
                        pathParts.pop();
                        state.currentDir = pathParts.join('/') || '~';
                        if (state.currentDir === '') state.currentDir = '~';
                    }
                } else {
                    const target = args[0];
                    const currentDirObj = resolveDir(state.currentDir);
                    if (currentDirObj.children[target] && currentDirObj.children[target].type === 'dir') {
                        state.currentDir = state.currentDir === '~' ? target : state.currentDir + '/' + target;
                    } else {
                        state.lines.push({ text: `cd: ${target}: No such directory`, type: "error" });
                    }
                }
                break;
            case 'cat':
                if (args.length === 0) {
                    state.lines.push({ text: "cat: missing operand", type: "error" });
                } else {
                    const targetFile = args[0];
                    const currentDirObj = resolveDir(state.currentDir);
                    if (currentDirObj.children[targetFile]) {
                        if (currentDirObj.children[targetFile].type === 'file') {
                            state.lines.push({ text: currentDirObj.children[targetFile].content, type: "response" });
                        } else {
                            state.lines.push({ text: `cat: ${targetFile}: Is a directory`, type: "error" });
                        }
                    } else {
                        state.lines.push({ text: `cat: ${targetFile}: No such file`, type: "error" });
                    }
                }
                break;
            case 'theme':
                if (args.length === 0) {
                    state.lines.push({ text: "Available themes: matrix, cyberpunk, amber, default", type: "response" });
                } else {
                    applyTheme(args[0]);
                }
                break;
            case 'help':
                state.lines.push(
                    { text: "Available commands:", type: "response" },
                    { text: "", type: "response" },
                    { text: "  ls         - List directory contents", type: "response" },
                    { text: "  cd <dir>   - Change directory", type: "response" },
                    { text: "  cat <file> - Read file content", type: "response" },
                    { text: "  theme <nm> - Change terminal theme", type: "response" },
                    { text: "  about      - Learn about me", type: "response" },
                    { text: "  projects   - View my projects", type: "response" },
                    { text: "  contact    - Get my contact info", type: "response" },
                    { text: "  social     - Find me on social platforms", type: "response" },
                    { text: "  sites      - List available sites", type: "response" },
                    { text: "  open <name>- Open a site (e.g., open anime)", type: "response" },
                    { text: "  whoami     - who the fuck I am", type: "response" },
                    { text: "  neofetch   - Display system information", type: "response" },
                    { text: "  sl         - Chugga chugga choo choo 🚂", type: "response" },
                    { text: "  shark      - The ultimate package manager 🦈", type: "response" },
                    { text: "  pong       - Play a game of Pong 🏓", type: "response" },
                    { text: "  matrix     - Enter the Matrix 👁️", type: "response" },
                    { text: "  clear      - Clear the terminal", type: "response" }
                );
                break;
            case 'about':
                state.lines.push(
                    { text: "I’m a passionate graphic designer with a strong interest in web development and creating engaging user experiences.", type: "response" },
                    { text: "", type: "response" }
                );
                break;
            case 'projects':
                state.lines.push(
                    { text: "1. Portfolio (This site)", type: "response" },
                    { text: "2. More coming soon...", type: "response" }
                );
                break;
            case 'contact':
                state.lines.push({ text: "Email: kyoshau@proton.me", type: "response" });
                break;
            case 'social':
                state.lines.push(
                    { text: "Find me on:", type: "response" },
                    { text: "", type: "response" },
                    { text: "  GitHub      : https://github.com/kyoshau", type: "response" },
                    { text: "  Steam       : https://steamcommunity.com/id/kyoshau", type: "response" },
                    { text: "  MyAnimeList : https://myanimelist.net/profile/kyoshau", type: "response" },
                    { text: "  Spotify     : https://open.spotify.com/user/ralcqz0nk2sazx60hctyacype?nd=1&dlsi=d2114e6207eb4647", type: "response" }
                );
                break;
            case 'whoami':
                state.lines.push({ text: "kyoshau", type: "response" });
                break;
            case 'clear':
                state.lines = [];
                break;
            case 'shark':
                if (args.length === 0) {
                    state.lines.push(
                        { text: "Usage: shark <operation> [packages...]", type: "info" },
                        { text: "Operations:", type: "info" },
                        { text: "  install <pkg> - Install a package", type: "response" },
                        { text: "  remove <pkg>  - Remove a package", type: "response" },
                        { text: "  update        - Update the shark repository", type: "response" },
                        { text: "  upgrade       - Upgrade system packages", type: "response" },
                        { text: "  bite          - Test the shark teeth 🦈", type: "response" }
                    );
                } else {
                    const op = args[0].toLowerCase();
                    const pkg = args.slice(1).join(' ');
                    if (op === 'install') {
                        if (!pkg) {
                            state.lines.push({ text: "Error: No package specified. What do you want to feed the shark?", type: "error" });
                        } else if (pkg.toLowerCase() === 'girlfriend' || pkg.toLowerCase() === 'gf') {
                            state.lines.push({ text: "Error: Dependency 'rich_parents' or 'good_looks' not found. Installation failed.", type: "error" });
                        } else if (pkg.toLowerCase() === 'league_of_legends' || pkg.toLowerCase() === 'lol') {
                            state.lines.push({ text: "Error: Installation aborted. Protecting your mental health.", type: "error" });
                        } else if (pkg.toLowerCase() === 'valorant') {
                            state.lines.push({ text: "Error: Riot Vanguard detected. Your computer now belongs to Tencent. Kidding, install failed.", type: "error" });
                        } else if (pkg.toLowerCase() === 'life' || pkg.toLowerCase() === 'grass' || pkg.toLowerCase() === 'social_skills') {
                            state.lines.push({ text: "Error: Package 'life' is too heavy for your system. Try uninstalling Discord first.", type: "error" });
                        } else if (pkg.toLowerCase() === 'brain') {
                            state.lines.push({ text: "Error: Package 'brain' requires 404TB of RAM. Current hardware insufficient.", type: "error" });
                        } else {
                            state.lines.push({ text: `[🦈] Hunting down package '${pkg}'...`, type: "response" });
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈] Sniffing blood in the network streams...`, type: "response" });
                                renderLines();
                            }, 500);
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈🦈] Chomping down ${Math.floor(Math.random() * 500) + 100} MB of data...`, type: "response" });
                                renderLines();
                            }, 1000);
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈🦈🦈] digested package '${pkg}' successfully. Shark is happy.`, type: "info" });
                                renderLines();
                            }, 1500);
                        }
                    } else if (op === 'remove') {
                        if (!pkg) {
                            state.lines.push({ text: "Error: No package specified.", type: "error" });
                        } else if (pkg.toLowerCase() === 'system32' || pkg.toLowerCase() === 'kernel') {
                            state.lines.push({ text: "Error: Shark refused to eat the kernel. It's too toxic.", type: "error" });
                        } else if (pkg.toLowerCase() === 'french' || pkg.toLowerCase() === 'french-language-pack' || pkg.toLowerCase() === 'fr') {
                            state.lines.push({ text: `[🦈] Locating French language files...`, type: "response" });
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈] Found: baguette.mo, croissant.po, surrender.conf, eiffel_tower.exe`, type: "response" });
                                renderLines();
                            }, 500);
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈🦈] Deleting French vocabulary... "Omelette du fromage" has been purged.`, type: "response" });
                                renderLines();
                            }, 1100);
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈🦈🦈] Removing all baguettes...`, type: "response" });
                                renderLines();
                            }, 1800);
                            setTimeout(() => {
                                state.lines.push({ text: `[🦈🦈🦈🦈] French language pack deleted! System yields: 0 white flags remaining.`, type: "info" });
                                renderLines();
                            }, 2500);
                            setTimeout(() => {
                                triggerSystemWipe("CRITICAL WARNING: French baguette residue detected in kernel space. Initiating emergency full system wipe...");
                            }, 3200);
                        } else {
                            state.lines.push({ text: `[🦈] Spit out package '${pkg}' successfully.`, type: "response" });
                        }
                    } else if (op === 'update') {
                        state.lines.push({ text: ":: Synchronizing shark databases...", type: "info" });
                        setTimeout(() => {
                            state.lines.push({ text: "  kyos-repo        is up to date", type: "response" });
                            renderLines();
                        }, 300);
                        setTimeout(() => {
                            state.lines.push({ text: "  shark-tank       is up to date", type: "response" });
                            renderLines();
                        }, 600);
                        setTimeout(() => {
                            state.lines.push({ text: "  community-fish   is up to date", type: "response" });
                            state.lines.push({ text: ":: All repositories synchronized successfully.", type: "info" });
                            renderLines();
                        }, 900);
                    } else if (op === 'upgrade') {
                        state.lines.push({ text: ":: Starting full system upgrade...", type: "info" });
                        setTimeout(() => {
                            state.lines.push({ text: "resolving dependencies...", type: "response" });
                            renderLines();
                        }, 400);
                        setTimeout(() => {
                            state.lines.push({ text: "looking for conflicting packages...", type: "response" });
                            renderLines();
                        }, 800);
                        setTimeout(() => {
                            state.lines.push({ text: "\nPackages (3): discord-toxic-1.3  neofetch-2.0  league-of-legends-remover-9.9\n", type: "response" });
                            state.lines.push({ text: "Total Download Size:   64.2 MiB", type: "response" });
                            state.lines.push({ text: "Total Installed Size:  189.5 MiB", type: "response" });
                            state.lines.push({ text: "Net Upgrade Size:       14.2 MiB\n", type: "response" });
                            state.lines.push({ text: ":: Proceed with installation? [Y/n] Y (auto-accepted)", type: "info" });
                            renderLines();
                        }, 1200);
                        setTimeout(() => {
                            state.lines.push({ text: "(1/3) Upgrading neofetch...             [🦈🦈🦈🦈🦈🦈🦈🦈🦈🦈] 100%", type: "response" });
                            renderLines();
                        }, 1800);
                        setTimeout(() => {
                            state.lines.push({ text: "(2/3) Upgrading discord-toxic...        [🦈🦈🦈🦈🦈🦈🦈🦈🦈🦈] 100%", type: "response" });
                            renderLines();
                        }, 2300);
                        setTimeout(() => {
                            state.lines.push({ text: "(3/3) Upgrading league-of-legends-remover... [🦈🦈🦈🦈🦈🦈🦈🦈🦈🦈] 100%", type: "response" });
                            renderLines();
                        }, 2800);
                        setTimeout(() => {
                            state.lines.push({ text: ":: Running post-transaction hooks...", type: "info" });
                            state.lines.push({ text: "(1/1) Cleaning up fish scales...", type: "response" });
                            state.lines.push({ text: "System upgraded successfully! Shark is satisfied.", type: "info" });
                            renderLines();
                        }, 3400);
                    } else if (op === 'bite') {
                        state.lines.push(
                            { text: "CHOMP! 🦈", type: "error" },
                            { text: "   \\|/   ", type: "response" },
                            { text: "  -🦈-  ", type: "response" },
                            { text: "   /|\\   ", type: "response" }
                        );
                    } else {
                        state.lines.push({ text: `shark: Unknown operation '${op}'.`, type: "error" });
                    }
                }
                break;
            case 'neofetch':
            case 'fastfetch':
                state.lines.push({ type: "ascii" });
                break;
            case 'sl':
                startTrainAnimation();
                break;
            case 'matrix':
                state.lines.push({ text: "Entering the Matrix...", type: "response" });
                state.mode = 'matrix';
                matrixEffect.start();
                break;
            case 'pong':
                state.mode = 'pong';
                startPongGame();
                break;
            case 'sites':
            case 'ls sites':
                state.lines.push({ text: "Available sites:", type: "response" });
                state.lines.push({ text: "", type: "response" });
                availableSites.forEach((site, index) => {
                    state.lines.push({
                        text: `  ${index + 1}. ${site.name.padEnd(15)} - ${site.description}`,
                        type: "response"
                    });
                });
                state.lines.push({ text: "", type: "response" });
                state.lines.push({ text: "Use 'open <name>' to open a site", type: "info" });
                break;
            default:
                // Check for 'open <site>' command
                if (mainCmd === 'open') {
                    const siteName = args[0];
                    // Also check mock FS links
                    const dir = resolveDir(state.currentDir);
                    if (dir.children[siteName] && dir.children[siteName].type === 'link') {
                        state.lines.push({ text: `Opening ${siteName}...`, type: "response" });
                        window.open(dir.children[siteName].target, '_blank');
                        break;
                    }

                    const site = availableSites.find(s => s.name === siteName);
                    if (site) {
                        state.lines.push({ text: `Opening ${site.name}...`, type: "response" });
                        window.open(site.path, '_blank');
                    } else {
                        state.lines.push({
                            text: `Site not found: ${siteName}. Type 'sites' to see available sites.`,
                            type: "error"
                        });
                    }
                } else if (mainCmd === 'protocol_zero') {
                    // ARG Trigger - CHAOS MODE
                    state.lines.push({ text: "SYSTEM BREACH DETECTED...", type: "error" });

                    // Audio
                    playGlitchSound();

                    // Visual Chaos
                    setTimeout(() => {
                        applyTheme('breach');
                        terminalWindow.classList.add('shake-animation'); // Shake it!

                        // Create flashing red overlay
                        const overlay = document.createElement('div');
                        overlay.className = 'system-failure-overlay';
                        document.body.appendChild(overlay);

                        state.lines.push({ text: "WARNING: UNAUTHORIZED ACCESS.", type: "error" });
                        state.lines.push({ text: "YOU HAVE ENTERED THE VOID.", type: "error" });

                        // Corrupt randomness
                        const corruptionInterval = setInterval(() => {
                            if (Math.random() > 0.5) {
                                // Add random junk
                                const junk = Array(20).fill(0).map(() => String.fromCharCode(33 + Math.random() * 90)).join('');
                                state.lines.push({ text: junk, type: "error" });
                                renderLines();
                            }
                        }, 100);

                        state.lines.push({
                            type: "ascii", isHtml: true, text: `
<pre class="text-danger fw-bold lh-1" style="font-size: 10px;">
      .                                                      .
        .n                   .                 .                  n.
  .   .dP                  dP                   9b                 9b.    .
 4    qXb         .       dX                     Xb       .        dXp     t
dX.    9Xb      .dXb    __                     __    dXb.     dXP     .Xb
9XXb._       _.dXXXXb dXXXXbo.               .odXXXXb dXXXXb._       _.dXXP
 9XXXXXXXXXXXXXXXXXXXVXXXXXXXXOo.           .oOXXXXXXXXVXXXXXXXXXXXXXXXXXXXP
  '9XXXXXXXXXXXXXXXXXXXXX'~   ~'OOO8b   d8OOO'~   ~'XXXXXXXXXXXXXXXXXXXXXP'
    '9XXXXXXXXXXXP' '9XX'   DIE    '98v8P'  YOU   'XXP' '9XXXXXXXXXXXP'
        ~~~~~~~       9X.          .db|db.          .XP       ~~~~~~~
                        )b.  .dbo.dP' v '9b.odb.  .dX(
                      ,dXXXXXXXXXXXb     dXXXXXXXXXXXb.
                     dXXXXXXXXXXXP'   .   '9XXXXXXXXXXXb
                    dXXXXXXXXXXXXb   d|b   dXXXXXXXXXXXXb
                    9XXb'   'XXXXXb.dX|Xb.dXXXXX'   'dXXP
                     '9      9XXXXXX(   )XXXXXXP      P'
                              XXXX X.'v'.X XXXX
                              XP^X'b   d'X^XX
                              X. 9  '   '  P )X
                              'b  '       '  d'
</pre>
`});
                        renderLines();

                        // CRASH SEQUENCE
                        setTimeout(() => {
                            clearInterval(corruptionInterval);
                            document.body.removeChild(overlay);
                            terminalWindow.classList.remove('shake-animation');

                            // Redirect to the cult site
                            window.location.href = './sites/melankolia/index.html';
                        }, 4000); // 4 seconds of chaos
                    }, 1000);
                } else if (cleanCmd) {
                    state.lines.push({ text: `Command not found: ${cmd}`, type: "error" });
                }
        }
        renderLines();
    }

    // --- Helper Functions ---
    function resolveDir(path) {
        if (path === '~') return state.fileSystem['~'];
        const parts = path.split('/'); // path should be relative to ~ for now in this simple mock
        // Assuming path starts with something in ~
        let current = state.fileSystem['~'];
        for (const part of parts) {
            if (part === '~') continue;
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        return current;
    }

    function applyTheme(themeName) {
        document.body.className = "bg-black text-white vh-100 vw-100 overflow-hidden m-0 p-0 font-monospace selection-primary"; // Reset
        const terminal = document.getElementById('terminal-window');

        switch (themeName) {
            case 'matrix':
                document.documentElement.style.setProperty('--mdb-primary', '#00ff00');
                document.body.classList.add('theme-matrix');
                state.lines.push({ text: "System updated: Matrix theme applied.", type: "response text-success" });
                break;
            case 'cyberpunk':
                document.body.classList.add('theme-cyberpunk');
                state.lines.push({ text: "System updated: Cyberpunk theme applied.", type: "response text-info" });
                break;
            case 'amber':
                document.body.classList.add('theme-amber');
                state.lines.push({ text: "System updated: Retro Amber theme applied.", type: "response text-warning" });
                break;
            case 'breach':
                document.body.classList.add('theme-breach');
                // No text response here as it is handled by the event usually
                break;
            default:
                state.lines.push({ text: "System updated: Default theme applied.", type: "response" });
        }
    }

    async function rebootSystem() {
        state.lines = [];
        renderLines();
        applyTheme('default'); // Reset theme

        // Simulation of reboot
        await typeText("SYSTEM FAILURE.", "error", 100);
        await new Promise(r => setTimeout(r, 1000));
        state.lines = [];
        renderLines();

        await typeText("Rebooting...", "system", 50);
        await new Promise(r => setTimeout(r, 1000));

        // Restore initial state
        initTerminal();
    }

    function playGlitchSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.1);
            osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.error("Audio glitch failed", e);
        }
    }

    // --- Input Handling ---
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleCommand(inputField.value);
            inputField.value = '';
        } else if (e.key === 'ArrowUp') {
            if (state.historyIndex > 0) {
                state.historyIndex--;
                inputField.value = state.commandHistory[state.historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (state.historyIndex < state.commandHistory.length - 1) {
                state.historyIndex++;
                inputField.value = state.commandHistory[state.historyIndex];
            } else {
                state.historyIndex = state.commandHistory.length;
                inputField.value = '';
            }
            e.preventDefault();
        }
    });

    // Global Key Listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.mode === 'matrix') {
                state.mode = 'terminal';
                matrixEffect.stop();
                renderLines();
            } else if (state.mode === 'pong') {
                state.mode = 'terminal';
                stopPongGame();
                renderLines();
            }
        }

        // Pong Controls
        if (state.mode === 'pong') {
            const PADDLE_HEIGHT = 4;
            const FIELD_HEIGHT = 20;
            if (e.key === 'w' || e.key === 'W') {
                state.pong.leftPaddle = Math.max(0, state.pong.leftPaddle - 1);
            } else if (e.key === 's' || e.key === 'S') {
                state.pong.leftPaddle = Math.min(FIELD_HEIGHT - PADDLE_HEIGHT, state.pong.leftPaddle + 1);
            }
        } else {
            // Auto-focus input
            if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
                inputField.focus();
            }
        }
    });

    // --- Pong Game Logic ---
    function startPongGame() {
        state.pong = {
            gameInterval: null,
            ball: { x: 30, y: 10, dx: 1, dy: 1 },
            leftPaddle: 8,
            rightPaddle: 8,
            leftScore: 0,
            rightScore: 0,
            gameOver: false,
            winner: null
        };

        state.pong.gameInterval = setInterval(() => {
            if (state.pong.gameOver) return;

            const { ball, leftPaddle, rightPaddle } = state.pong;
            const FIELD_WIDTH = 60;
            const FIELD_HEIGHT = 20;
            const PADDLE_HEIGHT = 4;

            // Move Ball
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall Collisions (Top/Bottom)
            if (ball.y <= 0 || ball.y >= FIELD_HEIGHT - 1) ball.dy *= -1;

            // Paddle Collisions
            // Left Paddle
            if (Math.floor(ball.x) === 1 && ball.y >= leftPaddle && ball.y < leftPaddle + PADDLE_HEIGHT) {
                ball.dx *= -1;
            }
            // Right Paddle
            if (Math.floor(ball.x) === FIELD_WIDTH - 2 && ball.y >= rightPaddle && ball.y < rightPaddle + PADDLE_HEIGHT) {
                ball.dx *= -1;
            }

            // Scoring
            if (ball.x < 0) {
                state.pong.rightScore++;
                resetBall();
            } else if (ball.x > FIELD_WIDTH) {
                state.pong.leftScore++;
                resetBall();
            }

            // AI Movement
            if (ball.y > rightPaddle + PADDLE_HEIGHT / 2) {
                state.pong.rightPaddle = Math.min(FIELD_HEIGHT - PADDLE_HEIGHT, rightPaddle + 0.8); // Speed 0.8
            } else {
                state.pong.rightPaddle = Math.max(0, rightPaddle - 0.8);
            }

            // Check Win
            if (state.pong.leftScore >= 5) {
                state.pong.gameOver = true;
                state.pong.winner = 'You';
            } else if (state.pong.rightScore >= 5) {
                state.pong.gameOver = true;
                state.pong.winner = 'AI';
            }

            renderLines(); // Re-render game frame
        }, 100);
    }

    function stopPongGame() {
        clearInterval(state.pong.gameInterval);
    }

    function resetBall() {
        state.pong.ball = { x: 30, y: 10, dx: (Math.random() > 0.5 ? 1 : -1), dy: (Math.random() > 0.5 ? 1 : -1) };
    }

    function renderPongGame() {
        const FIELD_WIDTH = 60;
        const FIELD_HEIGHT = 20;
        const PADDLE_HEIGHT = 4;
        let display = [];

        display.push('┌' + '─'.repeat(FIELD_WIDTH) + '┐');

        for (let y = 0; y < FIELD_HEIGHT; y++) {
            let line = '│';
            for (let x = 0; x < FIELD_WIDTH; x++) {
                if (x === 1 && y >= state.pong.leftPaddle && y < state.pong.leftPaddle + PADDLE_HEIGHT) line += '█';
                else if (x === FIELD_WIDTH - 2 && y >= state.pong.rightPaddle && y < state.pong.rightPaddle + PADDLE_HEIGHT) line += '█';
                else if (Math.floor(state.pong.ball.x) === x && Math.floor(state.pong.ball.y) === y) line += '●';
                else if (x === Math.floor(FIELD_WIDTH / 2)) line += '┊';
                else line += ' ';
            }
            line += '│';
            display.push(line);
        }

        display.push('└' + '─'.repeat(FIELD_WIDTH) + '┘');
        display.push('');
        display.push(`  You: ${state.pong.leftScore}  ${' '.repeat(FIELD_WIDTH - 20)}  AI: ${state.pong.rightScore}`);
        display.push('');
        if (state.pong.gameOver) {
            display.push(`  🎉 ${state.pong.winner} WIN${state.pong.winner === 'You' ? '' : 'S'}! 🎉`);
            display.push(`  Press ESC to exit`);
        } else {
            display.push(`  Controls: W/S to move | ESC to quit`);
        }

        return display.join('\n');
    }

    // Initial Render
    // renderLines(); // Removed to allow typing animation to handle it
    initTerminal();
});
