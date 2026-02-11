// פונקציה לביצוע כפל של שני מספרים
function multiply() {
    // קבלת הערכים משדות הקלט
    var number1 = document.getElementById("num1").value;
    var number2 = document.getElementById("num2").value;
    
    // המרה למספרים (כי value מחזיר טקסט)
    number1 = Number(number1);
    number2 = Number(number2);
    
    // ביצוע הכפל
    var result = number1 * number2;
    
    // הצגת המספרים והתוצאה על המסך
    document.getElementById("displayNum1").textContent = number1;
    document.getElementById("displayNum2").textContent = number2;
    document.getElementById("displayResult").textContent = result;
    
    // הצגת אזור התוצאות
    document.getElementById("result").classList.add("show");
}