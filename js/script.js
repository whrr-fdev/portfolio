let isManualScroll = false;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollSpy();
    initSidebar();
    initScrollProgress();
    initGuestbook();
    initParallax();
    
    // Запускаем анимации после полной загрузки страницы
    window.addEventListener('load', () => {
        // Даем время на исчезновение лоадера (800ms)
        setTimeout(() => {
            initScrollAnimations();
        }, 800);
    });
    
    preloadHeroImage();
    handleInitialHash();
});

// ==================== АНИМАЦИИ ПРИ ПРОКРУТКЕ ====================
function initScrollAnimations() {
    console.log('Анимации запущены'); // Для отладки
    
    // Герой секция - каждый элемент отдельно с последовательными задержками
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroDescriptions = document.querySelectorAll('.hero__description');
    const heroLinks = document.querySelector('.hero__links');
    
    // Задержки для герой секции (увеличил для надежности)
    const heroBaseDelay = 300; // Дополнительная задержка перед началом анимаций героя
    
    // Заголовок
    if (heroTitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        console.log('Заголовок появился');
                    }, heroBaseDelay + 0);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(heroTitle);
    }
    
    // Подзаголовок
    if (heroSubtitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        console.log('Подзаголовок появился');
                    }, heroBaseDelay + 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(heroSubtitle);
    }
    
    // Описания
    heroDescriptions.forEach((desc, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        console.log(`Описание ${index + 1} появилось`);
                    }, heroBaseDelay + 300 + (index * 150));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(desc);
    });
    
    // Кнопки
    if (heroLinks) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        console.log('Кнопки появились');
                    }, heroBaseDelay + 600);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(heroLinks);
    }
    
    // Заголовки секций
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        titleObserver.observe(title);
    });
    
    // Кнопка открыть гостевую книгу
    const guestToggleBtn = document.querySelector('.guestbook-toggle-btn');
    if (guestToggleBtn) {
        const toggleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 200);
                    toggleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        toggleObserver.observe(guestToggleBtn);
    }
    
    // About элементы
    const aboutItems = document.querySelectorAll('.about-item');
    aboutItems.forEach((item, index) => {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    itemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        itemObserver.observe(item);
    });
    
    // Карточки проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
    
    // Карточки контактов
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
}

// ==================== ТЕМА ====================
function initTheme() {
    const sidebarToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    function updateIcon(theme) {
        if (sidebarToggle) {
            const icon = sidebarToggle.querySelector('.icon');
            if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
    }

    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleTheme);
}

// ==================== НАВИГАЦИЯ ====================
function initNavigation() {
    const links = document.querySelectorAll('.header__link');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            e.preventDefault();
            isManualScroll = true;

            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const section = document.querySelector(targetId);
            if (section) {
                const offset = 20;
                const position = section.getBoundingClientRect().top + window.pageYOffset - offset;
                smoothScrollTo(position, 800);
                history.pushState(null, null, targetId);
            }

            setTimeout(() => { isManualScroll = false; }, 1000);
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// ==================== SCROLL SPY ====================
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header__link');

    function updateActiveSection() {
        if (isManualScroll) return;

        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const top = section.offsetTop;
            const height = section.clientHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                current = section.getAttribute('id');
                break;
            }
        }

        if (!current && window.scrollY < 100) {
            current = 'home';
        }

        if (current) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href) link.classList.toggle('active', href === `#${current}`);
            });
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveSection, 50);
    });
    
    updateActiveSection();
}

// ==================== САЙДБАР ====================
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    setTimeout(() => sidebar.classList.add('visible'), 800);
}

// ==================== PROGRESS BAR ====================
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// ==================== ПАРАЛЛАКС ====================
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                heroBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==================== ГОСТЕВАЯ КНИГА ====================
function initGuestbook() {
    const mainToggle = document.getElementById('guestMainToggle');
    const guestbookContent = document.getElementById('guestbookContent');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (mainToggle && guestbookContent) {
        guestbookContent.style.display = 'none';
        
        mainToggle.addEventListener('click', () => {
            if (guestbookContent.style.display === 'none') {
                guestbookContent.style.display = 'block';
                if (toggleText) toggleText.textContent = 'Скрыть гостевую книгу';
                if (toggleIcon) toggleIcon.className = 'fas fa-chevron-up';
                
                setTimeout(() => {
                    const messageCards = document.querySelectorAll('.message-card');
                    messageCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }, 100);
            } else {
                guestbookContent.style.display = 'none';
                if (toggleText) toggleText.textContent = 'Открыть гостевую книгу';
                if (toggleIcon) toggleIcon.className = 'fas fa-chevron-down';
            }
        });
    }

    // Supabase
    const supabaseUrl = 'https://juyilekdgvmtrcmlnipj.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eWlsZWtkZ3ZtdHJjbWxuaXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjUxNTQsImV4cCI6MjA4NjkwMTE1NH0.yThmXSHpWDYaoOnkkdcOHGsn3kq27r-oBY8hFqIEEAM';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    
    const guestForm = document.querySelector('.guestbook-form');
    const commentsContainer = document.getElementById('commentsContainer');

    async function fetchComments() {
        if (!commentsContainer) return;

        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Ошибка загрузки:', error);
            commentsContainer.innerHTML = '<p class="guest-empty">Ошибка загрузки сообщений</p>';
        } else {
            renderComments(data);
        }
    }

    function renderComments(comments) {
        if (!comments || comments.length === 0) {
            commentsContainer.innerHTML = '<p class="guest-empty">Пока нет сообщений. Будьте первым!</p>';
            return;
        }

        commentsContainer.innerHTML = comments.map(c => `
            <div class="message-card">
                <span class="message-author">${escapeHTML(c.name)}</span>
                <p class="message-text">${escapeHTML(c.message)}</p>
                <span class="message-date">${new Date(c.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit'
                })}</span>
            </div>
        `).join('');
        
        if (guestbookContent && guestbookContent.style.display === 'block') {
            const messageCards = document.querySelectorAll('.message-card');
            messageCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }
    }

    function escapeHTML(str) {
        if (!str) return '';
        const map = { 
            '&': '&amp;', 
            '<': '&lt;', 
            '>': '&gt;', 
            '"': '&quot;', 
            "'": '&#39;' 
        };
        return str.replace(/[&<>"']/g, m => map[m]);
    }

    if (guestForm) {
        guestForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = guestForm.querySelector('.guest-input');
            const messageInput = guestForm.querySelector('.guest-textarea');
            const submitBtn = guestForm.querySelector('.guest-btn');

            if (!nameInput.value.trim() || !messageInput.value.trim()) {
                alert('Пожалуйста, введите имя и сообщение');
                return;
            }

            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';

            const { error } = await supabase
                .from('comments')
                .insert([{
                    name: nameInput.value.trim(),
                    message: messageInput.value.trim()
                }]);

            if (error) {
                alert('Ошибка при отправке!');
                console.error('Ошибка:', error);
            } else {
                guestForm.reset();
                await fetchComments();
            }

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }

    fetchComments();
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ====================
function handleInitialHash() {
    if (!window.location.hash) return;
    
    const hash = window.location.hash;
    const targetLink = document.querySelector(`.header__link[href="${hash}"]`);
    if (!targetLink) return;

    isManualScroll = true;
    document.querySelectorAll('.header__link').forEach(link => link.classList.remove('active'));
    targetLink.classList.add('active');

    setTimeout(() => {
        const section = document.querySelector(hash);
        if (section) {
            const position = section.getBoundingClientRect().top + window.pageYOffset - 20;
            smoothScrollTo(position, 800);
        }
    }, 100);

    setTimeout(() => {
        isManualScroll = false;
    }, 1000);
}

function preloadHeroImage() {
    const bgImage = new Image();
    bgImage.src = 'images/hero-bg.jpg';
}

// ==================== RESIZE HANDLER ====================
window.addEventListener('resize', () => {
    setTimeout(() => {
        initScrollSpy();
    }, 100);
});