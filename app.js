var dob = document.querySelector("#dob");
var submitButton = document.querySelector("#btn-submit");
var output = document.querySelector("#output");

function reverseString(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    return str === reverseString(str);
}

function dateString(date){
    var dateStr = {day : '', month : '', year : ''};
    if (date.day < 10)
        dateStr.day = '0' + date.day;
    else 
        dateStr.day = date.day.toString();

    if (date.month < 10)
        dateStr.month = '0' + date.month;
    else 
        dateStr.month = date.month.toString();
    
    dateStr.year = date.year.toString();
    return dateStr;
}

function dateAllVariations(date){
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromesForAllDateFormats(date){
    var listOfDates = dateAllVariations(date);
    var flag = false;

    for(let i=0; i<listOfDates.length; i++)
        if(isPalindrome(listOfDates[i])){
            flag = true;
            break;
        }
    return flag;
}

function isLeapYear(year){
    if(year%4===0 && year%100!==0 || year%400===0)
        return true;
    return false;
}

function getNextDate(date){
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    if (month === 2)
        if (isLeapYear(year)){
            if(day > 29){
                day = 1;
                month = 3;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month = 3;
            }
        }
    else{
        if(day > daysInMonths[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        day = 1;
        month = 1;
        year++;
    }
    return {
        day : day,
        month : month,
        year: year
    }
}

function getPreviousDate(date){
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    if (month === 3)
        if (isLeapYear(year)){
            if(day === 0){
                day = 29;
                month = 2;
            }
        }
        else{
            if(day === 0){
                day = 28;
                month = 2;
            }
        }
    else{
        if(day === 0){
            month--;
            day = daysInMonths[month-1];
        }
    }

    if(month === 0){
        day = 31;
        month = 12;
        year--;
    }
    return {
        day : day,
        month : month,
        year: year
    }
}

function getNextPalindrome(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var dateStr = dateString(nextDate);
        if(checkPalindromesForAllDateFormats(dateStr))
            break;
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}

function getPreviousPalindrome(date){
    var count = 0;
    var previousDate = getPreviousDate(date);

    while(1){
        count++;
        var dateStr = dateString(previousDate);
        if(checkPalindromesForAllDateFormats(dateStr))
            break;
        previousDate = getPreviousDate(previousDate);
    }
    return [count, previousDate];
}

function checkBirthdayPalindrome(){
    var dobValue = dob.value;
    if(dobValue === '')
        output.innerText = "Enter valid DOB ";
    else{
        var date = dobValue.split('-');
        var dd = date[2];
        var mm = date[1];
        var yyyy = date[0];

        var date = {
            day : Number(dd),
            month : Number(mm),
            year : Number(yyyy)
        };

        var dateStr = dateString(date);
        var flag = checkPalindromesForAllDateFormats(dateStr);

        if(flag)
            output.innerText = "Yayy! Your Birthday is Palindrome!🎉";
        else{
            var nextPalindrome = getNextPalindrome(date);
            var previousPalindrome = getPreviousPalindrome(date);
            var previousStr = dateString(previousPalindrome[1]);
            var nextStr = dateString(nextPalindrome[1]);

            if (nextPalindrome[0] > previousPalindrome[0]){
                var msg = previousPalindrome[0]===1?'day':'days';
                output.innerText = `Oops! Your Birthday is not Palindrome😔. Previous Palindrome Date is ${previousStr.day}-${previousStr.month}-${previousStr.year}. You missed by ${previousPalindrome[0]} ${msg}.`;
            }
            else{
                var msg = nextPalindrome[0]===1?'day':'days';
                output.innerText = `Oops! Your Birthday is not Palindrome😔. Next Palindrome Date is ${nextStr.day}-${nextStr.month}-${nextStr.year}. You missed by ${nextPalindrome[0]} ${msg}.`;
            }           
        }
    }
}
submitButton.addEventListener('click', checkBirthdayPalindrome);