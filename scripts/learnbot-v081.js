// Learnbot v0.81


const botname = "Learnbot"
let database = []
const punctuation = [".", "!", "?"]
const punctuationAll = [".", "!", "?", ",", ";"]
const noAnswer = "No answer found."
let conversationAI = []
let conversationUser = []
let conversationAlternate = []
let userFontSize = 15
let context = ""

const linking_phrases = ["In addition,", "Additionally,", "Furthermore,", "Along with that,", "Also,", "Moreover,"]


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


function splitText(text) {
    let sentences = [];
    text.split(". ").forEach(i => {
        i.split("! ").forEach(j => {
            j.split("? ").forEach(k => {
                k.split("; ").forEach(l => {
                    sentences.push(l.trim());
                });
            });
        });
    });
    return sentences;
}


function changeDatabase() {
    let teach = document.getElementById("teach").value;
    database = splitText(teach)
}

document.getElementById("input").placeholder = "Message " + botname

function askQuestion() {
    event.preventDefault();
    let answers = ""
    let preAnswers = []
    let allResults = []
    let database1 = splitText(document.getElementById("input").value)

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
                    math = math + String(a) + "+" + String(b) + " = " + String(a + b) + ". "
                    math = math + String(a) + "-" + String(b) + " = " + String(a - b) + ". "
                    math = math + String(a) + "*" + String(b) + " = " + String(a * b) + ". "
                    math = math + String(a) + "/" + String(b) + " = " + String(a / b) + ". "
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

    let database5 = database1

    if (learnCommand) {
        let msg = question.replace("/learn ", "") + dot
        database5 = [msg]
    }
    let has_answer = false
    for (let z = 0; z <= database5.length - 1; z++) {
        let ask = database5[z]
        if (ask != "") {
            for (let i in punctuationAll) {
                ask = ask.replaceAll(punctuationAll[i], " ")
            }
            ask = " " + ask

            ask = ask.slice(1)
            let words = ask.split(/\s+/).map(word => word.replace(/[.,!?;:]/g, '').toLowerCase());
            let keywords = words
            let results = [];
            let newResults = [];
            let prevResults = [];

            // This is where the main word processing happens:
            database.forEach(sentence => {
                let load = 0;
                keywords.forEach(keyword => {
                    let pronouns = ["he", "she", "it", "they", "him", "her", "its", "them"]
                    if (pronouns.includes(keyword.toLowerCase())) {
                        let word_meaning = splitText(context)[0]
                        let pronoun_score = 0
                        for (let w in word_meaning.split(" ")) {
                            if (sentence.toLowerCase().includes(word_meaning.split(" ")[w].toLowerCase())) {
                                if (pronoun_score < 3) {
                                    pronoun_score += (word_meaning.split(" ")[w].length) * 0.1
                                }
                            }
                        }
                        console.log(pronoun_score)
                        load += pronoun_score
                    }
                    else {
                        if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                            load += keyword.length;
                        }
                        if (synonyms.hasOwnProperty(keyword.toLowerCase())) {
                            if (sentence.toLowerCase().includes(synonyms[keyword.toLowerCase()][0]) || sentence.toLowerCase().includes(synonyms[keyword.toLowerCase()][1])) {
                                load += keyword.length
                            }
                        }
                    }

                });
                if (load > 0) {
                    prevResults.push([sentence, load]);
                }
            });
            prevResults.sort((a, b) => b[1] - a[1]);
            console.log(prevResults)
            for (let r in prevResults) {
                if (r <= 5) {
                    results.push(prevResults[r][0])
                }
            }

            let answer = ""
            if (results.length != 0) {
                for (let i in results) {
                    answer = " " + results[i]
                    answer = processLanguage(answer)
                    newResults.push(answer)
                }
                answer = " " + results[0]
                answer = processLanguage(answer)
                if (prevResults.length > 1) {
                    if (prevResults[1][1] / prevResults[0][1] > 0.7) {
                        answer += " " + linking_phrases[Math.floor(Math.random() * (linking_phrases.length))] + " " + newResults[1]
                    }
                }
            }

            if (results.length > 0) {
                has_answer = true
                preAnswers.push(answer)
                if (document.getElementById("pagetitle").innerHTML == "Learnbot") {
                    document.getElementById("pagetitle").innerHTML = question.charAt(0).toUpperCase() + question.slice(1);
                }
            } else {
                preAnswers.push("_-_NO_ANSWER_-_")
            }
            allResults.push(newResults)

        }
    }
    if (has_answer) {
        for (let i in preAnswers) {
            if (preAnswers[i] != "_-_NO_ANSWER_-_") {
                let newline = ""
                if (answers != "") {
                    newline = "<br><br>"
                }
                answers += newline + preAnswers[i]
            }
        }
        context = answers
    }
    else {
        answers = noAnswer
    }
    conversationAlternate.push(allResults)
    message(answers, botname, has_answer);
}

function filterLetters(str, lettersToRemove) {
    lettersToRemove.forEach(function (letter) {
        str = str.replaceAll(letter, '');
    })
    return str
}

function processLanguage(answer) {
    /*
    for (let i in Object.keys(synonyms)) {
        if (Math.random() > 0.3) {
            let cleanans = filterLetters(answer, punctuationAll) + " "
            if (cleanans.replace(" " + Object.keys(synonyms)[i] + " ", "") != cleanans) {
                answer = answer.replace(Object.keys(synonyms)[i], synonyms[Object.keys(synonyms)[i]][Math.round(Math.random())])
            }
        }
    }
    */
    answer = answer.replaceAll(/\[.*?\]/g, '');
    answer = replaceAllCaseInsensitive(answer, "i am", "you're")
    answer = replaceAllCaseInsensitive(answer, "you are", "I'm")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " i ", " _-_you_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " you ", " _-_I_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " your ", " _-_my_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " my ", " _-_your_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " yours ", " _-_mine_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " mine ", " _-_yours_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(" " + answer, " me ", " _-_you_-_ ")
    answer = answer.slice(1);
    answer = replaceAllCaseInsensitive(answer, "_-_", "")
    answer = answer.charAt(0).toUpperCase() + answer.slice(1);
    if (punctuation.includes(answer[answer.length - 1])) {
        answer = answer
    }
    else {
        answer = answer + "."
    }
    return answer
}

function message(message, sender, has_answer) {
    document.getElementById("conversation").innerHTML += "<br><br><b style=\"font-size:" + String(userFontSize) + "px; text-align: left\">" + sender + "</b><br>" + message;
    if (sender == botname) {
        if (!has_answer) {
            document.getElementById("conversation").innerHTML += "<br><button style=\"font-size:" + String(userFontSize) + "px\" onclick=\"badResponse(" + String(conversationUser.length - 1) + ")\" class=\"btn2\"\">What should Learnbot have replied?</button>"
        }
        conversationAI.push(message)
        document.getElementById("conversation").innerHTML += "<br><button onclick=\"goodResponse(" + String(conversationAI.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/like.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"badResponse(" + String(conversationUser.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/like.png\" style=\"transform: scaleY(-1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"readAloud(" + String(conversationAI.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/read-aloud.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"copy(" + String(conversationAI.length - 1) + ")\" class=\"responseButton\"\"><img src=\"images/copy.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<button onclick=\"secondaryResults(" + String(conversationAI.length - 1) + ")\" id=\"secondary-button" + String(conversationAI.length - 1) + "\" class=\"responseButton\"\"><img src=\"images/secondary-answers.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button>"
        document.getElementById("conversation").innerHTML += "<div id=\"secondary-answers" + String(conversationAI.length - 1) + "\"></div>"
    }
    else if (sender == "You") {
        conversationUser.push(message)
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth', })
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
    userQ = " " + userQ
    userQ = userQ.slice(1)
    console.log(userQ)
    document.getElementById("teach").value = "[" + userQ + "]" + correctAnswer + dot + " " + document.getElementById("teach").value
    changeDatabase()
}

function goodResponse(msg) {
    userQ = conversationUser[msg]
    userQ = " " + userQ
    for (let i in punctuationAll) {
        userQ = userQ.replaceAll(punctuationAll[i], " ")
    }
    userQ = " " + userQ
    userQ = userQ.slice(1)
    console.log(userQ)
    document.getElementById("teach").value = "[" + userQ + "]" + conversationAI[msg].replaceAll("<br>", "") + " " + document.getElementById("teach").value
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
        resultsText += newAltResults[i] + "<button onclick=\"goodAlternate(" + String(conversationAI.length - 1) + "," + String(i) + ")\" class=\"responseButton\"\"><img src=\"images/like.png\" style=\"transform: scaleY(1);\" height=\"" + String(userFontSize * 1.3) + "px\"></button><br>"
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

function goodAlternate(msg, alt) {
    userQ = conversationUser[msg]
    userQ = " " + userQ
    for (let i in punctuationAll) {
        userQ = userQ.replaceAll(punctuationAll[i], " ")
    }
    userQ = " " + userQ
    userQ = userQ.slice(1)
    let altResults = []
    let newAltResults = []
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
    console.log(newAltResults)
    document.getElementById("teach").value = "[" + userQ + "]" + newAltResults[alt].replaceAll("<br>", "") + document.getElementById("teach").value
    changeDatabase()
}