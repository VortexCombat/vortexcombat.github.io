document.addEventListener('DOMContentLoaded', () => {
    
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
        themeToggle.checked = true;
    }

    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            
            body.classList.add('blue-theme');
            localStorage.setItem('theme', 'blue');
        } else {
            
            body.classList.remove('blue-theme');
            localStorage.setItem('theme', 'red'); 
        }
    });
    


    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    
    const copyPopup = document.getElementById('copy-popup');
    const copyPopupText = document.getElementById('copy-popup-text');
    const copyPopupBtn = document.getElementById('copy-popup-btn');
    const copyButtons = document.querySelectorAll('.contact-btn[data-copy]');

    function copyToClipboard(text, buttonElement) {
        navigator.clipboard.writeText(text).then(() => {
            if (buttonElement) {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = 'Copied!';
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                }, 1500);
            }
        }).catch(err => {
            console.error('Kopyalama başarısız: ', err);
        });
    }

    copyPopupBtn.addEventListener('click', () => {
        const text = copyPopupText.textContent;
        copyToClipboard(text, copyPopupBtn);
    });

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const textToCopy = button.dataset.copy;
            copyToClipboard(textToCopy, null); 
            
            copyPopupText.textContent = textToCopy;
            copyPopupBtn.textContent = 'Copy'; 
            
            const rect = button.getBoundingClientRect();
            copyPopup.style.display = 'flex'; 
            
            copyPopup.style.top = `${rect.top + window.scrollY - copyPopup.offsetHeight - 10}px`;
            copyPopup.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (copyPopup.offsetWidth / 2)}px`;
        });
    });

    document.addEventListener('click', (e) => {
        if (!copyPopup.contains(e.target) && !e.target.closest('.contact-btn[data-copy]')) {
            copyPopup.style.display = 'none';
        }
    });
    


    
    function switchTab(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        sections.forEach(section => {
            if (section.id === "about" || section.id === "projects" || section.id === "contact") {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            switchTab(targetId);
        });
    });

    switchTab('about');
});