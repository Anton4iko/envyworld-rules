// ========== КОПИРОВАНИЕ ОДНОГО ПРАВИЛА ==========
document.querySelectorAll('.copy-rule').forEach(button => {
    button.addEventListener('click', function() {
        const ruleCard = this.closest('.rule-card');
        const title = ruleCard.querySelector('h2').innerText;
        const text = ruleCard.querySelector('.rule-text').innerText;
        const fullText = `${title}\n\n${text}`;
        
        copyToClipboard(fullText, this);
    });
});

// ========== КОПИРОВАНИЕ ВСЕХ ПРАВИЛ ==========
document.getElementById('copyAllBtn').addEventListener('click', function() {
    const rules = document.querySelectorAll('.rule-card');
    let allText = '📜 ПРАВИЛА ПРОЕКТА ENVYWORLD 📜\n\n';
    allText += '='.repeat(50) + '\n\n';
    
    rules.forEach((rule, index) => {
        const title = rule.querySelector('h2').innerText;
        const text = rule.querySelector('.rule-text').innerText;
        allText += `${title}\n${text}\n\n`;
        allText += '-'.repeat(40) + '\n\n';
    });
    
    allText += '='.repeat(50) + '\n';
    allText += `📅 Дата: ${new Date().toLocaleDateString('ru-RU')}\n`;
    allText += '✨ Соблюдайте правила и уважайте других игроков! ✨';
    
    copyToClipboard(allText, this);
});

// ========== УНИВЕРСАЛЬНАЯ ФУНКЦИЯ КОПИРОВАНИЯ ==========
function copyToClipboard(text, button) {
    // Сохраняем оригинальный текст кнопки
    const originalText = button.innerHTML;
    
    // Пробуем современный метод
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button, originalText);
        }).catch(() => {
            fallbackCopy(text, button, originalText);
        });
    } else {
        fallbackCopy(text, button, originalText);
    }
}

// ========== FALLBACK ДЛЯ СТАРЫХ БРАУЗЕРОВ ==========
function fallbackCopy(text, button, originalText) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const success = document.execCommand('copy');
        if (success) {
            showCopySuccess(button, originalText);
        } else {
            showCopyError(button, originalText);
        }
    } catch (err) {
        showCopyError(button, originalText);
    }
    
    document.body.removeChild(textarea);
}

// ========== ВИЗУАЛЬНАЯ ОБРАТНАЯ СВЯЗЬ ПРИ УСПЕХЕ ==========
function showCopySuccess(button, originalText) {
    button.innerHTML = '✅ Скопировано!';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.transform = '';
    }, 1500);
}

// ========== ВИЗУАЛЬНАЯ ОБРАТНАЯ СВЯЗЬ ПРИ ОШИБКЕ ==========
function showCopyError(button, originalText) {
    button.innerHTML = '❌ Ошибка!';
    button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 1500);
}

// ========== ПОИСК ПО ПРАВИЛАМ ==========
document.getElementById('search').addEventListener('input', function() {
    const searchText = this.value.toLowerCase().trim();
    const rules = document.querySelectorAll('.rule-card');
    let foundCount = 0;
    
    rules.forEach(rule => {
        const text = rule.innerText.toLowerCase();
        
        if (searchText === '' || text.includes(searchText)) {
            rule.style.display = 'block';
            rule.style.animation = 'fadeInUp 0.5s ease';
            foundCount++;
        } else {
            rule.style.display = 'none';
        }
    });
    
    // Визуальная обратная связь
    if (searchText !== '') {
        if (foundCount > 0) {
            this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
            showToast(`🔍 Найдено: ${foundCount}`, 'success');
        } else {
            this.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
            showToast('❌ Ничего не найдено', 'error');
        }
        setTimeout(() => {
            this.style.boxShadow = '';
        }, 1000);
    }
});

// ========== УВЕДОМЛЕНИЯ (TOAST) ==========
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 12px 24px;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        color: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff4444' : '#ff00c8'};
        border-radius: 50px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff4444' : '#ff00c8'};
        font-size: 14px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Добавляем анимации для уведомлений
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);

// ========== КНОПКА НАВЕРХ ==========
document.getElementById('goTopBtn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ EnvyWorld Rules загружен!');
    
    // Эффект печати для заголовка
    const title = document.querySelector('.title');
    const originalTitle = title.innerText;
    title.innerText = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalTitle.length) {
            title.innerText += originalTitle.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        }
    }
    typeWriter();
    
    // Приветственное уведомление
    setTimeout(() => {
        showToast('✨ Добро пожаловать в EnvyWorld!', 'info');
    }, 500);
});

// ========== ПОДДЕРЖКА СТАРЫХ БРАУЗЕРОВ ==========
if (!navigator.clipboard) {
    console.log('ℹ️ Используется fallback метод копирования');
}
