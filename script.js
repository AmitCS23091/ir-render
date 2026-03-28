document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Toggle ---
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.className = currentTheme;
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.className = 'light-mode';
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // --- Mobile Navigation ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.remove('fa-xmark');
            mobileBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with hidden class for animation
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    // --- Interactive Demo Logic ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const loadingState = document.getElementById('loading');

    // Simulated pseudo-IR database
    const fakeDB = {
        "apple": [
            { title: "Apple (Fruit)", text: "A round fruit with red or green skin and a whitish interior.", icon: "fa-apple-whole", score: "98%" },
            { title: "Apple Inc.", text: "American multinational technology company known for the iPhone and Mac.", icon: "fa-brands fa-apple", score: "95%" },
            { title: "Apple Pie Recipe", text: "How to bake a classic American apple pie from scratch.", icon: "fa-utensils", score: "82%" }
        ],
        "java": [
            { title: "Java (Programming Language)", text: "A high-level class-based, object-oriented programming language.", icon: "fa-brands fa-java", score: "99%" },
            { title: "Java (Island)", text: "An island of Indonesia, bordered by the Indian Ocean.", icon: "fa-map", score: "85%" },
            { title: "Java Coffee", text: "Coffee grown on the island of Java, known for its rich flavor.", icon: "fa-mug-hot", score: "78%" }
        ],
        "python": [
            { title: "Python (Programming Language)", text: "A dynamically typed interpreted high-level language used for AI and web dev.", icon: "fa-brands fa-python", score: "99%" },
            { title: "Python (Snake)", text: "A family of nonvenomous snakes found in Africa, Asia, and Australia.", icon: "fa-staff-snake", score: "88%" }
        ]
    };

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) return;

        // Hide results, show loading
        resultsContainer.innerHTML = '';
        loadingState.style.display = 'block';

        // Simulate network delay and processing (1.5 seconds)
        setTimeout(() => {
            loadingState.style.display = 'none';
            displayResults(query);
        }, 1200);
    });

    function displayResults(query) {
        let results = [];
        
        // Exact match check first
        if (fakeDB[query]) {
            results = fakeDB[query];
        } else {
            // Partial match logic (very basic IR simulation)
            Object.keys(fakeDB).forEach(key => {
                if (key.includes(query) || query.includes(key)) {
                    results = results.concat(fakeDB[key]);
                }
            });
        }

        if (results.length > 0) {
            results.forEach((item, index) => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'simulated-result';
                resultDiv.style.animationDelay = `${index * 0.15}s`;
                
                resultDiv.innerHTML = `
                    <h4><i class="fa-solid ${item.icon}"></i> ${item.title} <span style="margin-left:auto; font-size:0.8rem; background:rgba(79, 70, 229, 0.1); color:var(--accent-primary); padding:2px 8px; border-radius:10px;">Relevance: ${item.score}</span></h4>
                    <p style="color:var(--text-secondary); font-size:0.95rem;">${item.text}</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            // No results found
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png" alt="No results" class="empty-icon" style="width: 100px; opacity: 0.5;">
                    <h4 style="margin-top:1rem;">No matching documents found</h4>
                    <p>Try searching for terms from our demo database like <em>"apple"</em>, <em>"java"</em>, or <em>"python"</em>.</p>
                </div>
            `;
        }
    }

    // --- 3D Pipeline Animation ---
    const stages = [
        { id: 'stage-1', text: '1. User Enters Query', delay: 1200, wordPos: '2%' },
        { id: 'stage-2', text: '2. Engine Preprocesses Query', delay: 1500, stream: 'stream-1', wordPos: '25%' },
        { id: 'stage-3', text: '3. Searching Index Database', delay: 1500, stream: 'stream-2', wordPos: '50%' },
        { id: 'stage-4', text: '4. Ranking Documents by Relevance', delay: 1500, stream: 'stream-3', wordPos: '75%' },
        { id: 'stage-5', text: '5. Displaying Top Results', delay: 2000, stream: 'stream-4', wordPos: '95%' }
    ];

    const statusText = document.getElementById('pipeline-text');
    const flyingWord = document.getElementById('flying-word');

    function runPipeline() {
        if (!statusText) return;
        
        // Reset all stages and streams
        document.querySelectorAll('.stage').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.data-stream').forEach(el => el.classList.remove('active'));
        if (flyingWord) {
            flyingWord.classList.remove('visible');
            flyingWord.style.left = '0%';
        }
        
        const processNext = (index) => {
            if (index >= stages.length) {
                statusText.innerText = 'Process Complete. Restarting...';
                if (flyingWord) flyingWord.classList.remove('visible');
                setTimeout(runPipeline, 2500);
                return;
            }

            const stageData = stages[index];
            statusText.innerText = stageData.text;
            
            if (flyingWord) {
                flyingWord.classList.add('visible');
                flyingWord.style.left = stageData.wordPos;
                if(index === 1) flyingWord.innerText = '["apple"]';
                if(index === 2) flyingWord.innerText = 'Searching {apple}';
                if(index === 3) flyingWord.innerText = 'Score: 98%';
                if(index === 4) flyingWord.innerText = 'Top Result';
                if(index === 0) flyingWord.innerText = '"apple"';
            }
            
            if (stageData.stream) {
                const streamEl = document.querySelector('.' + stageData.stream);
                if (streamEl) streamEl.classList.add('active');
                
                setTimeout(() => {
                    const blockEl = document.getElementById(stageData.id);
                    if (blockEl) blockEl.classList.add('active');
                    setTimeout(() => processNext(index + 1), stageData.delay);
                }, 500);
            } else {
                const blockEl = document.getElementById(stageData.id);
                if (blockEl) blockEl.classList.add('active');
                setTimeout(() => processNext(index + 1), stageData.delay);
            }
        };

        // Small delay before starting
        setTimeout(() => processNext(0), 500);
    }
    
    // Start pipeline
    runPipeline();
});
