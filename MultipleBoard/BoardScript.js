// פונקציה ליצירת לוח הכפל
function createTable() {
    // מערך לאחסון המספרים
    var numbers = [];
    
    // קריאת 10 המספרים מהמשתמש
    for (var i = 1; i <= 10; i++) {
        var value = document.getElementById("num" + i).value;
        
        // אם השדה ריק, שים 0
        if (value === "") {
            numbers.push(0);
        } else {
            numbers.push(Number(value));
        }
    }
    
    // יצירת הטבלה
    var tableHTML = '<table class="multiplication-table">';
    
    // שורת כותרת עליונה
    tableHTML += '<tr>';
    tableHTML += '<th class="corner">×</th>'; // תא פינה
    
    // הוספת המספרים בשורה העליונה
    for (var i = 0; i < numbers.length; i++) {
        tableHTML += '<th>' + numbers[i] + '</th>';
    }
    tableHTML += '</tr>';
    
    // יצירת שורות הטבלה
    for (var i = 0; i < numbers.length; i++) {
        tableHTML += '<tr>';
        
        // תא כותרת בצד שמאל
        tableHTML += '<th>' + numbers[i] + '</th>';
        
        // תאי הכפל
        for (var j = 0; j < numbers.length; j++) {
            var result = numbers[i] * numbers[j];
            tableHTML += '<td>' + result + '</td>';
        }
        
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    
    // הצגת הטבלה בדף
    document.getElementById("tableContainer").innerHTML = tableHTML;
}

// פונקציה לניקוי כל השדות והטבלה
function clearAll() {
    // ניקוי כל שדות הקלט
    for (var i = 1; i <= 10; i++) {
        document.getElementById("num" + i).value = "";
    }
    
    // ניקוי הטבלה
    document.getElementById("tableContainer").innerHTML = "";
}

// אפשרות ליצירת הטבלה בלחיצה על Enter
document.addEventListener('DOMContentLoaded', function() {
    // הוספת מאזין לכל שדות הקלט
    for (var i = 1; i <= 10; i++) {
        document.getElementById("num" + i).addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                createTable();
            }
        });
    }
});