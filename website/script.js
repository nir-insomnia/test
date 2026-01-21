// ========================================
// הצגת תאריך נוכחי
// ========================================
function displayCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (!dateElement) return;
    
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    dateElement.textContent = `${day}/${month}/${year}`;
}

// ========================================
// לוגיקת המשחק - משופרת
// ========================================
function setupGame() {
    // בדיקה שאנחנו בדף המשחק
    if (!document.getElementById('guessInput')) return;
    
    // משתנים גלובליים של המשחק
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    let guessedNumbers = [];
    let wins = parseInt(localStorage.getItem('gameWins') || '0');
    let bestScore = parseInt(localStorage.getItem('gameBestScore') || '999');
    
    // אלמנטים
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const gameMessage = document.getElementById('gameMessage');
    const gameEmoji = document.getElementById('gameEmoji');
    const resetButton = document.getElementById('resetButton');
    const attemptsDisplay = document.getElementById('attempts');
    const bestScoreDisplay = document.getElementById('bestScore');
    const winsDisplay = document.getElementById('wins');
    const hintBox = document.getElementById('hintBox');
    const hintText = document.getElementById('hintText');
    const guessedNumbersGrid = document.getElementById('guessedNumbers');
    
    // עדכון תצוגה ראשונית
    winsDisplay.textContent = wins;
    bestScoreDisplay.textContent = bestScore === 999 ? '-' : bestScore;
    
    // פונקציה לבדיקת ניחוש
    function checkGuess() {
        const userGuess = parseInt(guessInput.value);
        
        // בדיקת תקינות
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            showMessage('😕', 'אנא הכנס מספר בין 1 ל-10!', '#FF6B6B');
            shakeElement(guessInput);
            return;
        }
        
        // בדיקה אם כבר ניחשו את המספר
        if (guessedNumbers.includes(userGuess)) {
            showMessage('🤔', 'כבר ניחשת את המספר הזה!', '#FFB347');
            shakeElement(guessInput);
            return;
        }
        
        attempts++;
        guessedNumbers.push(userGuess);
        attemptsDisplay.textContent = attempts;
        
        // הוספת המספר לתצוגה
        addGuessedNumber(userGuess, randomNumber);
        
        // בדיקת התשובה
        if (userGuess === randomNumber) {
            // ניצחון! 🎉
            const newBest = bestScore === 999 || attempts < bestScore;
            if (newBest) {
                bestScore = attempts;
                localStorage.setItem('gameBestScore', bestScore);
                bestScoreDisplay.textContent = bestScore;
            }
            
            wins++;
            localStorage.setItem('gameWins', wins);
            winsDisplay.textContent = wins;
            
            showMessage(
                '🎉',
                `מדהים! ניחשת נכון ב-${attempts} ניסיונות!${newBest ? ' 🏆 שיא חדש!' : ''}`,
                '#6BCF7F'
            );
            
            // כפתורים
            guessButton.style.display = 'none';
            resetButton.style.display = 'flex';
            guessInput.disabled = true;
            hintBox.style.display = 'none';
            
            // אנימציית חגיגה
            celebrateWin();
            
        } else if (userGuess < randomNumber) {
            const diff = randomNumber - userGuess;
            showMessage('⬆️', `המספר גדול יותר!`, '#FFB347');
            
            if (diff <= 2) {
                showHint('🔥 חם מאוד! אתה ממש קרוב!');
            } else if (diff <= 4) {
                showHint('🌡️ חם! המשך בכיוון הזה');
            }
            
        } else {
            const diff = userGuess - randomNumber;
            showMessage('⬇️', `המספר קטן יותר!`, '#FFB347');
            
            if (diff <= 2) {
                showHint('🔥 חם מאוד! אתה ממש קרוב!');
            } else if (diff <= 4) {
                showHint('🌡️ חם! המשך בכיוון הזה');
            }
        }
        
        guessInput.value = '';
        guessInput.focus();
    }
    
    // הצגת הודעה
    function showMessage(emoji, message, color) {
        gameEmoji.textContent = emoji;
        gameMessage.innerHTML = message;
        gameMessage.style.color = color;
        
        // אנימציה
        gameEmoji.style.transform = 'scale(0.8)';
        setTimeout(() => {
            gameEmoji.style.transform = 'scale(1)';
        }, 100);
    }
    
    // הצגת רמז
    function showHint(hint) {
        hintBox.style.display = 'flex';
        hintText.textContent = hint;
        
        // אנימציה
        hintBox.style.animation = 'none';
        setTimeout(() => {
            hintBox.style.animation = 'slideInDown 0.5s ease-out';
        }, 10);
    }
    
    // הוספת מספר מנוחש לתצוגה
    function addGuessedNumber(number, target) {
        const numberEl = document.createElement('div');
        numberEl.className = 'guessed-number';
        numberEl.textContent = number;
        
        const diff = Math.abs(number - target);
        if (number === target) {
            numberEl.style.background = '#6BCF7F';
        } else if (diff <= 2) {
            numberEl.classList.add('close');
        } else {
            numberEl.classList.add('wrong');
        }
        
        guessedNumbersGrid.appendChild(numberEl);
    }
    
    // אנימציית רעידה
    function shakeElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'shake 0.5s ease';
        }, 10);
    }
    
    // אנימציית ניצחון
    function celebrateWin() {
        // יצירת קונפטי דיגיטלי
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 50);
        }
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.textContent = ['🎉', '⭐', '✨', '🎊', '🌟'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '2rem';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${2 + Math.random() * 2}s linear`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
    
    // איפוס משחק
    function resetGame() {
        randomNumber = Math.floor(Math.random() * 10) + 1;
        attempts = 0;
        guessedNumbers = [];
        
        attemptsDisplay.textContent = '0';
        guessedNumbersGrid.innerHTML = '';
        gameMessage.innerHTML = 'חשבתי על מספר בין 1 ל-10...<br>תוכל לנחש מה זה?';
        gameMessage.style.color = '';
        gameEmoji.textContent = '🤔';
        
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.style.display = 'flex';
        resetButton.style.display = 'none';
        hintBox.style.display = 'none';
        
        guessInput.focus();
    }
    
    // מאזינים לאירועים
    guessButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', resetGame);
    
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !guessInput.disabled) {
            checkGuess();
        }
    });
    
    // פוקוס אוטומטי
    guessInput.focus();
}

// ========================================
// אנימציות CSS נוספות דינמיות
// ========================================
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// אפקטים ויזואליים נוספים
// ========================================
function addVisualEffects() {
    // אפקט hover על כרטיסים
    const cards = document.querySelectorAll('.link-card, .blog-post, .interest-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
    
    // אפקט פרלקס פשוט על ה-hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// ========================================
// Smooth scroll לקישורים פנימיים
// ========================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// אנימציות כניסה לאלמנטים בגלילה
// ========================================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // אלמנטים לאנימציה
    const animatedElements = document.querySelectorAll('.content-card, .link-card, .blog-post, .game-container');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ========================================
// טיפים בקונסול למורים ותלמידים
// ========================================
function showDeveloperTips() {
    console.log('%c🎓 ברוכים הבאים לאתר האישי! ', 'background: #667eea; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%cטיפים למורים ותלמידים:', 'font-size: 16px; font-weight: bold; color: #FF6B6B;');
    console.log('1. כל הקוד זמין לעיון ולעריכה');
    console.log('2. נסו לשנות צבעים ב-CSS (:root variables)');
    console.log('3. הוסיפו אנימציות חדשות');
    console.log('4. צרו דפים נוספים על פי הדוגמה');
    console.log('5. שפרו את המשחק עם רמות קושי');
    console.log('%cבהצלחה! 🚀', 'font-size: 18px; color: #6BCF7F; font-weight: bold;');
}

// ========================================
// אתחול כל הפונקציות
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDate();
    setupGame();
    addCustomAnimations();
    addVisualEffects();
    setupSmoothScroll();
    setupScrollAnimations();
    showDeveloperTips();
});

// ========================================
// טיפול בגודל חלון
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // עדכון אלמנטים בהתאם לגודל המסך
        console.log('Window resized - layout updated');
    }, 250);
});
