// ========== КОПИРОВАНИЕ ОДНОГО НАКАЗАНИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки копирования
    const copyButtons = document.querySelectorAll('.copy-punishment');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Получаем команду из атрибута data-cmd
            const commandText = this.getAttribute('data-cmd');
            
            if (commandText) {
                copyToClipboard(commandText, this);
            } else {
                console.error('Нет текста для копирования');
                showToast('❌ Ошибка: нет текста для копирования', 'error');
            }
        });
    });
});

// ========== КОПИРОВАНИЕ ВСЕХ КОМАНД ==========
document.getElementById('copyAllBtn').addEventListener('click', function() {
    const punishments = document.querySelectorAll('.punishment-card');
    let allText = '⚡ ENVYWORLD STAFF TOOLS ⚡\n';
    allText += '='.repeat(55) + '\n\n';
    
    punishments.forEach((card, index) => {
        const button = card.querySelector('.copy-punishment');
        const commandText = button.getAttribute('data-cmd');
        if (commandText) {
            allText += commandText + '\n\n';
            allText += '-'.repeat(40) + '\n\n';
        }
    });
    
    allText += '='.repeat(55) + '\n';
    allText += `📅 Дата: ${new Date().toLocaleDateString('ru-RU')}\n`;
    allText += '✨ Копируй и используй для выдачи наказаний! ✨';
    
    copyToClipboard(allText, this);
});

// ========== УНИВЕРСАЛЬНАЯ ФУНКЦИЯ КОПИРОВАНИЯ ==========
function copyToClipboard(text, button) {
    const originalText = button.innerHTML;
    
    // Современный метод
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button, originalText);
            showToast('✅ Команда скопирована!', 'success');
        }).catch((err) => {
            console.error('Clipboard error:', err);
            fallbackCopy(text, button, originalText);
        });
    } else {
        // Fallback для старых браузеров
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
    textarea.focus();
    
    try {
        const success = document.execCommand('copy');
        if (success) {
            showCopySuccess(button, originalText);
            showToast('✅ Команда скопирована!', 'success');
        } else {
            showCopyError(button, originalText);
            showToast('❌ Ошибка копирования', 'error');
        }
    } catch (err) {
        console.error('Fallback copy error:', err);
        showCopyError(button, originalText);
        showToast('❌ Ошибка копирования', 'error');
    }
    
    document.body.removeChild(textarea);
}

// ========== ВИЗУАЛЬНАЯ ОБРАТНАЯ СВЯЗЬ ==========
function showCopySuccess(button, originalText) {
    button.innerHTML = '✅ Скопировано!';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.transform = '';
    }, 1500);
}

function showCopyError(button, originalText) {
    button.innerHTML = '❌ Ошибка!';
    button.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 1500);
}

// ========== УВЕДОМЛЕНИЯ ==========
function showToast(message, type = 'success') {
    // Удаляем старые уведомления
    const oldToasts = document.querySelectorAll('.custom-toast');
    oldToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 14px 28px;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(12px);
        color: ${type === 'success' ? '#00ff00' : '#ff4444'};
        border-radius: 50px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#00ff00' : '#ff4444'};
        font-size: 16px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
        font-family: 'Segoe UI', sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
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

// ========== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ EnvyWorld Staff Tools загружен!');
    
    const title = document.querySelector('.title');
    const originalTitle = title.innerText;
    title.innerText = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalTitle.length) {
            title.innerText += originalTitle.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();
    
    setTimeout(() => {
        showToast('✨ Готово! Нажми на любую команду чтобы скопировать', 'success');
    }, 800);
});

// ========== ПОДДЕРЖКА СТАРЫХ БРАУЗЕРОВ ==========
if (!navigator.clipboard) {
    console.log('ℹ️ Используется fallback метод копирования');
}
