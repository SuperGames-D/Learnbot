// Imagebot v0.1


const removeWords = ["what", "when", "who", "why", "how", "where", "does", "often", "much", "do", "many", "it", "about", "which", "define", "tell me", "can you explain", "draw a", "generate a", "create a", "generate", "draw", "create"];
const botname = "Imagebot"
let database = []
const punctuation = [".", "!", "?"]
const punctuationAll = [".", "!", "?", ",", ";"]
const noAnswer = "No answer found."
let conversationAI = []
let conversationUser = []
let conversationAlternate = []
let userFontSize = 15
let imgMatrix = ""
for (let i = 0; i <= 100; i++) {
    imgMatrix += "1"
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("form").style.width = "100%"
    document.getElementById("form").style.left = "0%"
    document.getElementById("form").style.transform = "translateX(0%)"
    document.getElementById("input").style.width = "80%"
    document.getElementById("input").style.fontSize = "40px"
    document.getElementById("submit").style.fontSize = "40px"
    document.getElementById("conversation").style.fontSize = "55px"
    document.getElementById("conversation").style.width = "90%"
    document.getElementById("conversation").style.marginTop = "20%"
    document.getElementById("teachArea").style.left = "0px"
    document.getElementById("teachArea").style.transform = "translateY(0%)"
    document.getElementById("teachArea").style.top = "50px"
    document.getElementById("teachArea").style.textAlign = "center"
    document.getElementById("teachArea").style.height = "10%"
    document.getElementById("teachArea").style.width = "90%"
    userFontSize = 40
}

document.getElementById("teachArea").style.width = "100%"
document.getElementById("teachArea").style.textAlign = "left"
document.getElementById("teachArea").innerHTML = "<text style=\"font-size: 20px\">Teach:</text><br>"
document.getElementById("teachArea").innerHTML += "<textarea style=\"display: none\" id=\"teach\"</textarea>"
document.getElementById("teachArea").innerHTML += "<br>"
for (let i = 0; i <= 100; i++) {
    if (i != 0) {
    document.getElementById("teachArea").innerHTML += "<button id=\"img_button_" + String(i) + "\" onclick=\"imgButtonChange(" + String(i) + ")\" style=\"width: 20px; height: 20px; margin: 1px; background-color: white; color: white; border: none\">aa</button>"
    if (i % 10 == 0) {
        document.getElementById("teachArea").innerHTML += "<br>"
    }
}
}
document.getElementById("teachArea").innerHTML += "<br>Name: <input id=\"imgName\">"
document.getElementById("teachArea").innerHTML += "<br><button onclick=\"addImage()\" style=\"font-size: 20px; background-color: black; border: 2px solid white; color: white; padding-left: 30px; padding-right: 30px\">Add</button>"

function splitText(text) {
    let sentences = [];
    text.split(".").forEach(i => {
        i.split("!").forEach(j => {
            j.split("?").forEach(k => {
                k.split(";").forEach(l => {
                    sentences.push(l.trim());
                });
            });
        });
    });
    return sentences;
}
function changeDatabase() {
    let teach = document.getElementById("teach").value;


    let database1 = [];
    splitText(teach).forEach(i => {
        i.split(".").forEach(n => database1.push(n));
    });

    let database2 = [];
    let database3 = [];
    let database4 = [];
    let database5 = [];


    database1.forEach(i => {
        i.split("!").forEach(n => database2.push(n));
    });
    database2.forEach(i => {
        i.split("?").forEach(n => database3.push(n));
    });
    database3.forEach(i => {
        i.split(";").forEach(n => database4.push(n));
    });
    database4.forEach(i => {
        i.split(";").forEach(n => database5.push(n));
    });

    database = database5;
}

document.getElementById("input").placeholder = "Message " + botname

function askQuestion() {
    event.preventDefault();
    let answers = ""
    let allResults = []
    let database1 = [];
    splitText(document.getElementById("input").value).forEach(i => {
        i.split(".").forEach(n => database1.push(n));
    });
    message(document.getElementById("input").value, "You")
    let question = document.getElementById("input").value
    document.getElementById("input").value = ""
    let dot = ""
    if (question[question.length - 1] != ".") {
        dot = "."
    }
    let learnCommand = false
    if (question.toLowerCase().startsWith("/learn ")) {
        learnCommand = true
        if (question.replace("/learn ", "") == "math") {
            math = ""
            for (let a = 0; a <= 100; a++) {
                for (let b = 0; b <= 100; b++) {
                    math = math + String(a) + "+" + String(b) + " is " + String(a + b) + "."
                    math = math + String(a) + "-" + String(b) + " is " + String(a - b) + "."
                    math = math + String(a) + "*" + String(b) + " is " + String(a * b) + "."
                    if (a / b == Math.round(a / b)) {
                        math = math + String(a) + "/" + String(b) + " is " + String(Math.round(a / b)) + "."
                    }
                    else {
                        math = math + String(a) + "/" + String(b) + " is approximately " + String(Math.round(a / b)) + "."
                    }
                }
            }
            document.getElementById("teach").value += "." + math
            changeDatabase()
        }
        else {
            document.getElementById("teach").value += "." + question.replace("/learn ", "") + dot
            changeDatabase()
        }
    }

    let database2 = [];
    let database3 = [];
    let database4 = [];
    let database5 = [];


    database1.forEach(i => {
        i.split("!").forEach(n => database2.push(n));
    });
    database2.forEach(i => {
        i.split("?").forEach(n => database3.push(n));
    });
    database3.forEach(i => {
        i.split(";").forEach(n => database4.push(n));
    });
    database4.forEach(i => {
        i.split(";").forEach(n => database5.push(n));
    });
    if (learnCommand) {
        let msg = question.replace("/learn ", "") + dot
        database5 = [msg]
    }
    for (let z = 0; z <= database5.length - 1; z++) {
        let ask = database5[z]
        if (ask != "") {
            for (let i in punctuationAll) {
                ask = ask.replaceAll(punctuationAll[i], " ")
            }
            ask = " " + ask
            for (let i in removeWords) {
                ask = ask.replaceAll("" + removeWords[i], " ")
            }
            ask = ask.slice(1)
            let words = ask.split(/\s+/).map(word => word.replace(/[.,!?;:]/g, '').toLowerCase());
            let keywords = words.filter(word => !removeWords.includes(word.toLowerCase()));
            let results = [];
            let newResults = []

            database.forEach(sentence => {
                let load = 0;
                keywords.forEach(keyword => {
                    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                        load += 1;
                    }
                    if (synonyms.hasOwnProperty(keyword.toLowerCase())) {
                        if (sentence.toLowerCase().includes(synonyms[keyword.toLowerCase()][0]) || sentence.toLowerCase().includes(synonyms[keyword.toLowerCase()][1])) {
                            load += 1
                        }
                    }
                });
                if (load === keywords.length) {
                    results.push(sentence);
                }
            });
            let answer = ""
            if (results.length != 0) {
                for (let i in results) {
                    answer = " " + results[i]
                    for (let i in Object.keys(synonyms)) {
                        if (Math.random() > 0.3) {
                            answer = answer.replace(" " + Object.keys(synonyms)[i], " " + synonyms[Object.keys(synonyms)[i]][Math.round(Math.random())])
                        }
                    }
                    answer = answer.replaceAll(/\[.*?\]/g, '');
                    answer = replaceAllCaseInsensitive(answer, "i am", "you're")
                    answer = replaceAllCaseInsensitive(answer, "you are", "i'm")
                    answer = answer.slice(1);
                    answer = answer.charAt(0).toUpperCase() + answer.slice(1);
                    if (punctuation.includes(answer[answer.length - 1])) {
                        answer = answer
                    }
                    else {
                        answer = answer + "."
                    }
                    newResults.push(answer)
                }
                answer = " " + combineStrings(results)
                for (let i in Object.keys(synonyms)) {
                    if (Math.random() > 0.3) {
                        answer = answer.replace(" " + Object.keys(synonyms)[i], " " + synonyms[Object.keys(synonyms)[i]][Math.round(Math.random())])
                    }
                }
                answer = answer.replaceAll(/\[.*?\]/g, '');
                answer = replaceAllCaseInsensitive(answer, "i am", "you're")
                answer = replaceAllCaseInsensitive(answer, "you are", "i'm")
                answer = answer.slice(1);
                answer = answer.charAt(0).toUpperCase() + answer.slice(1);
                if (punctuation.includes(answer[answer.length - 1])) {
                    answer = answer
                }
                else {
                    answer = answer + "."
                }
            }
            let newline = ""
            if (z != 0) {
                newline = "<br><br>"
            }

            if (results.length > 0) {
                answers = answers + newline + answer;
                if (document.getElementById("pagetitle").innerHTML == "Learnbot") {
                    document.getElementById("pagetitle").innerHTML = question.charAt(0).toUpperCase() + question.slice(1);
                }
            } else {
                answers = answers + newline + noAnswer;
            }
            allResults.push(newResults)
        }
    }
    conversationAlternate.push(allResults)
    message(answers, botname);
}

function message(message, sender) {
    document.getElementById("conversation").innerHTML += "<br><br><b style=\"font-size:" + String(userFontSize) + "px; text-align: left\">" + sender + "</b><br>"
    if (sender == botname) {
        document.getElementById("conversation").innerHTML += "<br>"
    for (let i in message) {
        if (i != 0) {
        if (message[i] == "0") {
            document.getElementById("conversation").innerHTML += "<div style=\"width: 20px; height: 20px; margin: 0px; background-color: black; color: black; display: inline\">aa</div>"
        }
        else if (message[i] == "1") {
            document.getElementById("conversation").innerHTML += "<div style=\"height: 20px; width: 20px; margin: 0px; background-color: white; color: white; display: inline\">aa</div>"
        }
        if (i % 10 == 0) {
            document.getElementById("conversation").innerHTML += "<br>"
        }
    }
    }}
    else {
        document.getElementById("conversation").innerHTML += message
    }
    if (sender == botname) {
        conversationAI.push(message)
        /*
        document.getElementById("conversation").innerHTML += "<br><button onclick=\"goodResponse(" + String(conversationAI.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/like.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"badResponse(" + String(conversationUser.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/like.png\" style=\"transform: scaleY(-1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"readAloud(" + String(conversationAI.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/read-aloud.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"copy(" + String(conversationAI.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/copy.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"secondaryResults(" + String(conversationAI.length - 1) + ")\" id=\"secondary-button" + String(conversationAI.length - 1) + "\" class=\"responseButton\"\"><img src=\"images/secondary-answers.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<div id=\"secondary-answers" + String(conversationAI.length - 1) + "\"></div>"
  */
        }
    else if (sender == "You") {
        conversationUser.push(message)
    }
    window.scrollTo(0, document.body.scrollHeight);
}

function badResponse(q) {
    correctAnswer = prompt("What should " + botname + " have replied?")
    let dot = ""
    if (correctAnswer[correctAnswer.length - 1] != ".") {
        dot = "."
    }
    userQ = conversationUser[q]
    userQ = " " + userQ
    for (let i in punctuationAll) {
        userQ = userQ.replaceAll(punctuationAll[i], " ")
    }
    for (let i in removeWords) {
        userQ = userQ.replaceAll("" + removeWords[i], " ")
    }
    userQ = userQ.slice(1)
    console.log(userQ)
    document.getElementById("teach").value = "[" + userQ + "]" + correctAnswer + dot + document.getElementById("teach").value
    changeDatabase()
}

function goodResponse(msg) {
    document.getElementById("teach").value = conversationAI[msg].replaceAll("<br>", "") + document.getElementById("teach").value
    changeDatabase()
}

function readAloud(msg) {
    let text = conversationAI[msg].replaceAll("<br>", "")
    for (let i in punctuationAll) {
        text = text.replaceAll(punctuationAll[i], punctuationAll[i] + " ")
    }
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function copy(msg) {
    let text = conversationAI[msg].replaceAll("<br>", "")
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard")
}

function secondaryResults(msg) {
    let altResults = []
    let newAltResults = []
    let resultsText = "<b>Secondary answers:</b><br>"
    for (let i in conversationAlternate[msg]) {
        altResults.push([])
        for (let n in conversationAlternate[msg][i]) {
            if (n > 0) {
                altResults[i].push(conversationAlternate[msg][i][n])
            }
        }
    }
    for (let i in altResults[0]) {
        let txt = ""
        for (n in altResults) {
            txt += " " + altResults[n][i]
        }
        newAltResults.push(txt)
    }
    for (let i in newAltResults) {
        resultsText += newAltResults[i] + "<br>"
    }
    if (resultsText == "<b>Secondary answers:</b><br>") {
        resultsText = "<b>Secondary answers:</b><br>No secondary answers found."
    }
    if (document.getElementById("secondary-answers" + String(msg)).innerHTML == "") {
        document.getElementById("secondary-answers" + String(msg)).innerHTML = resultsText
        document.getElementById("secondary-button" + String(msg)).style.transform = "scaleY(-1)"
    }
    else {
        document.getElementById("secondary-answers" + String(msg)).innerHTML = ""
        document.getElementById("secondary-button" + String(msg)).style.transform = "scaleY(1)"
    }
}



function replaceAllCaseInsensitive(input, search, replacement) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'gi');
    return input.replace(regex, replacement);
}


function imgButtonChange(btn) {
    if (imgMatrix[btn] == "0") {
        imgMatrix = imgMatrix.replaceAt(btn, "1")
        document.getElementById("img_button_" + String(btn)).style.backgroundColor = "white"
        document.getElementById("img_button_" + String(btn)).style.color = "white"
}
else {
    imgMatrix = imgMatrix.replaceAt(btn, "0")
    document.getElementById("img_button_" + String(btn)).style.backgroundColor = "black"
    document.getElementById("img_button_" + String(btn)).style.color = "black"
}
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function addImage() {
    if (imgMatrix.length < 101) {
        while (imgMatrix.length < 101) {
            imgMatrix += "1"
        }
    }
    else if (imgMatrix.length > 101) {
        while (imgMatrix.length > 101) {
            imgMatrix = imgMatrix.substring(0, str.length - 1);
        }
    }
    database.push(document.getElementById("teach").value + "[" + document.getElementById("imgName").value + "]" + imgMatrix + ".")
    document.getElementById("imgName").value = ""
    imgMatrix = ""
    for (let i = 0; i < 100; i++) {
        imgMatrix += "1"
    }
    for (let i = 0; i <= 100; i++) {
        if (i != 0) {
        document.getElementById("img_button_" + String(i)).style = "width: 20px; height: 20px; margin: 1px; background-color: white; color: white; border: none"
        if (i % 10 == 0) {
            document.getElementById("teachArea").innerHTML += "<br>"
        }
    }
    }
}

function combineStrings(strings) {
    const maxLength = Math.max(...strings.map(str => str.length));
    let result = '';
    for (let i = 0; i < maxLength; i++) {
      const charCount = {};
  
      for (const str of strings) {
        if (str[i] !== undefined) {
          const char = str[i];
          charCount[char] = (charCount[char] || 0) + 1;
        }
      }
      let maxChar = '';
      let maxCount = 0;
      for (const [char, count] of Object.entries(charCount)) {
        if (count > maxCount) {
          maxChar = char;
          maxCount = count;
        }
      }
      result += maxChar;
    }
    return result;
  }