// Learnbot v0.87


const botname = "Learnbot"
let database = []
const punctuation = [".", "!", "?"]
const punctuationAll = [".", "!", "?", ",", ";"]
const noAnswer = "No answer found."
const math_regex = /\b\d+(\.\d+)?\s*[-+*/]\s*\d+(\.\d+)?\b/;
let conversationAI = []
let conversationUser = []
let conversationAlternate = []
let userFontSize = 15
let context = ""
let current_mode = 0
let word_importance = {}
let reply_length = 2

const linking_phrases = ["In addition,", "Additionally,", "Furthermore,", "Along with that,", "Also,", "Moreover,"]

let optn_reply_length = "medium"
let optn_you_i = true


document.getElementById("teachArea").innerHTML += "<button id=\"teachTopicBtn\" onclick=\"teachTopic()\"style=\"font-size: 20px; width: 35px;\" class=\"btn2\">+</button>"
document.getElementById("teachArea").innerHTML += "<button id=\"preTrainedBtn\" onclick=\"preTrainedModels()\"style=\"font-size: 20px;\" class=\"btn2\">Pre-trained models</button>"

let prevHTML = document.getElementById("form").innerHTML
document.getElementById("form").innerHTML = "<button type=\"button\" id=\"modeBtn\" onclick=\"changeMode()\"\>+</button>" + prevHTML
document.getElementById("modeBtn").style = "font-size: 20px; background-color: #2f2f2f; padding: 10px; border-radius: 10px; color: white; width: 35px; border: 0px;"

let isMobile = false

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true
    document.getElementById("form").style.width = "100%"
    document.getElementById("form").style.left = "0%"
    document.getElementById("form").style.transform = "translateX(0%)"
    document.getElementById("input").style.width = "70%"
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
    document.getElementById("teach").style.width = "100%"
    document.getElementById("preTrainedBtn").style.fontSize = "40px"
    document.getElementById("preTrainedBtn").style.position = "fixed"
    document.getElementById("preTrainedBtn").style.right = "-20px"
    document.getElementById("preTrainedBtn").style.top = "-50px"
    document.getElementById("teachTopicBtn").style.fontSize = "40px"
    document.getElementById("teachTopicBtn").style.width = "70px"
    document.getElementById("teachTopicBtn").style.position = "fixed"
    document.getElementById("teachTopicBtn").style.right = "-90px"
    document.getElementById("teachTopicBtn").style.top = "-50px"
    document.getElementsByClassName("infoBoxContent")[0].style.width = "90%"
    document.getElementById("infoTitle").style.fontSize = "60px"
    document.getElementById("close").style.fontSize = "40px"
    document.getElementById("modeBtn").style.fontSize = "40px"
    document.getElementById("modeBtn").style.width = "55px"
    userFontSize = 40
}

const urlParams2 = new URLSearchParams(window.location.search);
let current_dataset_name = "untrained"


function add_to_database(data) {
    document.getElementById("teach").value = data + " " + document.getElementById("teach").value
    changeDatabase()
}

function setPreTrained(name) {
    if (pre_trained_data[name] == "") {
        urlParams2.delete("database")
        window.location.search = urlParams2
    }
    else {
        urlParams2.set('database', name);
        window.location.search = urlParams2
    }
}

let dataset = urlParams2.get('database');
if (dataset != null) {
    document.getElementById("teach").value = pre_trained_data[dataset]
    current_dataset_name = dataset
    changeDatabase()
}

function preTrainedModels() {
    document.getElementById("infoBox").style.display = "block"
    document.getElementById("pre_trained_list").innerHTML = ""
    document.getElementById("infoTitle").innerHTML = "Select a pre-trained model"
    let modelNames = Object.keys(pre_trained_data)
    for (let i in modelNames) {
        let name = modelNames[i].charAt(0).toUpperCase() + modelNames[i].slice(1);
        name = name.replaceAll("_", " ")
        let btn = document.createElement('button');
        if (current_dataset_name == modelNames[i]) {
            btn.className = "btn_pre_trained_current"
        }
        else {
            btn.className = "btn_pre_trained"
        }
        btn.innerHTML = name
        btn.style.fontSize = String(userFontSize + 5) + "px"
        btn.addEventListener('click', function () {
            setPreTrained(modelNames[i])
        });
        document.getElementById("pre_trained_list").appendChild(btn);
    }
}



function changeMode() {
    if (current_mode == 0) {
        current_mode = 1
    }
    else {
        current_mode = 0
    }
    if (current_mode == 0) {
        document.getElementById("modeBtn").style.backgroundColor = "#2f2f2f"
    }
    else {
        document.getElementById("modeBtn").style.backgroundColor = "#5d6b77"
    }
}

if (!isMobile) {
    document.getElementById("logo").innerHTML += "<br>"
}
document.getElementById("logo").innerHTML += "<button onclick=\"settings()\" id=\"settings\" class=\"btn2\"><img src=\"images/settings.png\" width=\"30px\"></button>"


function teachTopic() {
    document.getElementById("infoBox").style.display = "block"
    document.getElementById("pre_trained_list").innerHTML = ""
    document.getElementById("infoTitle").innerHTML = "Teach new topic"
    let container = document.createElement("div")
    container.style.textAlign = "left"
    let label1 = document.createElement("text")
    label1.style.color = "white";
    label1.style.fontSize = String(userFontSize + 5) + "px"
    label1.innerHTML = "Name"
    let input1 = document.createElement("input")
    input1.id = "teachTopicName"
    input1.style = "background-color: #2f2f2f; padding: 10px; border-radius: 10px; color: white; border: 0px; margin-left: 10px"
    input1.style.fontSize = String(userFontSize + 5) + "px"
    let label2 = document.createElement("text")
    label2.style.color = "white";
    label2.style.fontSize = String(userFontSize + 5) + "px"
    label2.innerHTML = "Information:"
    let input2 = document.createElement("textarea")
    input2.id = "teachTopicData"
    input2.style = "background-color: #2f2f2f; padding: 10px; border-radius: 10px; color: white; border: 0px; resize: none; width: 90%; height: 200px"
    input2.style.fontSize = String(userFontSize + 5) + "px"
    let btn = document.createElement('button');
    btn.innerHTML = "Add to database"
    btn.className = "btn2"
    btn.style.fontSize = String(userFontSize + 5) + "px"
    btn.addEventListener('click', function () {
        addTopic()
    });
    container.appendChild(label1);
    container.appendChild(input1);
    container.innerHTML += "<br><br>"
    container.appendChild(label2);
    container.innerHTML += "<br>"
    container.appendChild(input2);
    container.innerHTML += "<br>"
    container.appendChild(btn);
    document.getElementById("pre_trained_list").appendChild(container);
}

function addTopic() {
    document.getElementById("infoBox").style.display = "none"
    let name = document.getElementById("teachTopicName").value
    let data = document.getElementById("teachTopicData").value
    let sentences = splitText(data)
    let full_text = ""
    for (let i in sentences) {
        let text = "[" + name + "]" + sentences[i] + ". "
        full_text += text
    }
    add_to_database(full_text)
}

function settings() {
    document.getElementById("infoBox").style.display = "block"
    document.getElementById("pre_trained_list").innerHTML = ""
    document.getElementById("infoTitle").innerHTML = "Settings"
    let container = document.createElement("div")
    let label1 = document.createElement("text")
    label1.innerHTML = "Reply Length"
    label1.style.marginRight = "10px"
    label1.style.fontSize = String(userFontSize + 3) + "px"
    container.appendChild(label1)
    let select = document.createElement("select")
    select.name = "optn_reply_length"
    select.id = "optn_reply_length"
    select.onchange = function () { changeOption(0) }
    select.innerHTML = "<option style=\"font-size:18px\" value=\"short\">Short</option><option style=\"font-size:18px\" value=\"medium\">Medium (default)</option><option style=\"font-size:18px\" value=\"long\">Long</option>"
    select.value = optn_reply_length
    select.style = "background-color: #2f2f2f; padding: 10px; border-radius: 10px; color: white; border: 0px;"
    select.style.fontSize = String(userFontSize + 3) + "px"
    container.appendChild(select)
    let label2 = document.createElement("text")
    label2.innerHTML = "<br><br>You/I swapping"
    label2.style.marginRight = "10px"
    label2.style.fontSize = String(userFontSize + 3) + "px"
    container.appendChild(label2)
    let checkbox1 = document.createElement("input")
    checkbox1.type = "checkbox"
    checkbox1.id = "optn_you_i"
    checkbox1.checked = optn_you_i
    checkbox1.style = "width: 25px; height: 25px;"
    checkbox1.onclick = function () { changeOption(1) }
    container.appendChild(checkbox1)
    document.getElementById("pre_trained_list").appendChild(container);
}

function changeOption(optnId) {
    if (optnId == 0) {
        optn_reply_length = document.getElementById("optn_reply_length").value
        if (optn_reply_length == "short") {
            reply_length = 1
        }
        else if (optn_reply_length == "medium") {
            reply_length = 2
        }
        else if (optn_reply_length == "long") {
            reply_length = 6
        }
    }
    else if (optnId == 1) {
        optn_you_i = document.getElementById("optn_you_i").checked
    }
}

document.getElementById("close").onclick = function () {
    document.getElementById("infoBox").style.display = "none"
}

function splitText(text) {
    let sentences = [];
    text.split(". ").forEach(i => {
        i.split("! ").forEach(j => {
            j.split("? ").forEach(k => {
                k.split("; ").forEach(l => {
                    l.split("\n").forEach(m => {
                        sentences.push(m.trim());
                    });
                });
            });
        });
    });
    return sentences;
}


function changeDatabase() {
    let teach = document.getElementById("teach").value;
    database = splitText(teach)
    getWordImportance()
}

function getWordImportance() {
    let allWords = []
    for (let i in database) {
        let words = database[i].split(" ")
        for (let n in words) {
            allWords.push(words[n].toLowerCase())
        }
    }
    let importance = {}
    for (let i of allWords) {
        importance[i] = importance[i] ? importance[i] + 1 : 1;
    }
    let percent = {}
    let total = 0
    for (let i of Object.keys(importance)) {
        total += importance[i]
    }
    for (let i of Object.keys(importance)) {
        percent[i] = importance[i] / total
    }
    word_importance = percent
}

document.getElementById("input").placeholder = "Message " + botname


function getAnswer(question) {
    return getResponse(question, -1, false)[0]
}


function askQuestion() {
    event.preventDefault();
    message(document.getElementById("input").value, "You")
    let answers = ""
    let preAnswers = []
    let allResults = []
    let question = document.getElementById("input").value

    let canSetTitle = true



    document.getElementById("input").value = ""
    let dot = ""
    if (question[question.length - 1] != ".") {
        dot = ". "
    }
    let learnCommand = -1

    if (question.toLowerCase().startsWith("/learn ")) {
        learnCommand = 0
        /*
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
            document.getElementById("teach").value += ". " + math
            changeDatabase()
        }
        else {
            document.getElementById("teach").value = question.replace("/learn ", "") + dot + document.getElementById("teach").value
            changeDatabase()
        }
            */
        document.getElementById("teach").value = question.replace("/learn ", "") + dot + document.getElementById("teach").value
        changeDatabase()
    }
    else if (math_regex.test(question)) {
        learnCommand = 1
        let match = question.match(math_regex);
        let calculation = match ? match[0] : null;
        let operation = ""
        let teachString = ""
        if (calculation.includes("+")) {
            operation = "+"
        }
        else if (calculation.includes("-")) {
            operation = "-"
        }
        else if (calculation.includes("*")) {
            operation = "*"
        }
        else if (calculation.includes("/")) {
            operation = "/"
        }
        let num1 = parseFloat(calculation.split(operation)[0].replaceAll(" ", ""))
        let num2 = parseFloat(calculation.split(operation)[1].replaceAll(" ", ""))
        let result = 0
        console.log(num1, num2)
        console.log(question.split(operation))
        if (operation == "+") {
            result = num1 + num2
        }
        else if (operation == "-") {
            result = num1 - num2
        }
        else if (operation == "*") {
            result = num1 * num2
        }
        else if (operation == "/") {
            result = num1 / num2
        }
        teachString = calculation + " = " + result + ". "
        document.getElementById("teach").value = teachString + document.getElementById("teach").value
        changeDatabase()
    }
    else if (question.toLowerCase().includes("essay")) {
        learnCommand = 2
        question = question.replace("essay", "")
    }
    else if (question.toLowerCase().startsWith("/smart ")) {
        learnCommand = 3
        question = question.replace("/smart ", "")
    }

    if (current_mode == 1) {
        learnCommand = 3
    }

    let has_answer = false
    if (learnCommand != 2 && learnCommand != 3) {
        let response = getResponse(question, learnCommand, canSetTitle)
        answers = response[0]
        has_answer = response[1]
        allResults = response[2]
        conversationAlternate.push(allResults)
    }
    else if (learnCommand == 2) {
        let mainResponse = getResponse(question, learnCommand, false)[0]
        let words = mainResponse.split(" ")
        let responses = []
        answers = ""
        for (let r in words) {
            if (words[r].length > 3) {
                let resPrompt = words[r]
                let ans = getResponse(resPrompt, learnCommand, false)
                let toPush = ""
                for (let a in ans[2][0]) {
                    if (toPush == "") {
                        let thisAns = ans[2][0][a]
                        if (!responses.includes(thisAns) && mainResponse != thisAns) {
                            toPush = thisAns
                        }
                    }
                }
                if (toPush != "") {
                    responses.push(toPush)
                }
                /*
                console.log(ans[0])
                console.log(ans[2])
                if (responses.includes(ans[0])) {
                    if (ans[2].length > 0) {
                        responses.push(ans[2][0][1])
                    }
                }
                else {
                    responses.push(ans[0])
                }
                    */
            }
        }
        answers = mainResponse + "<br>"
        for (let r in responses) {
            let link = linking_phrases[Math.floor(Math.random() * (linking_phrases.length))]
            answers += link + " " + responses[r] + "<br>"
        }
        answers += "To conclude, " + mainResponse
        has_answer = true
    }
    else if (learnCommand == 3) {
        let response = getSmartResponse(question, learnCommand, canSetTitle)
        answers = response[0]
        has_answer = response[1]
    }

    message(answers, botname, has_answer);
}

function getSmartResponse(question, learnCommand, canSetTitle) {
    let response = getResponse(question, learnCommand, canSetTitle)
    let set = ""
    for (let i in response[2]) {
        set += response[2][i] + " "
    }
    set = set.replaceAll(".", ". ")
    let wordsOld = set.split(" ")
    for (let i in wordsOld) {
        if (wordsOld[i].startsWith(",")) {
            wordsOld[i] = wordsOld[i].replace(",", "")
        }
    }
    let words = []
    for (let i in wordsOld) {
        if (wordsOld[i] != "") {
            words.push(wordsOld[i])
        }
    }
    let sentences = []
    if (words.length != 0) {
        let lastWord = words[0]
        let text = lastWord
        for (let s = 0; s < reply_length; s++) {
            for (let n = 0; n <= 100; n++) {
                if (words.includes(lastWord)) {
                    var indexes = [], i = -1;
                    while ((i = words.map(v => v.toLowerCase()).indexOf(lastWord.toLowerCase(), i + 1)) != -1) {
                        indexes.push(i);
                    }
                    console.log(words)
                    console.log(indexes)
                    let word = indexes[Math.floor(Math.random() * indexes.length)] + 1
                    console.log(word)
                    lastWord = words[word]
                    console.log(lastWord)
                    if (!lastWord) {
                        break;
                    }
                    text += " " + lastWord
                    if (lastWord.endsWith(".")) {
                        break;
                    }
                }
            }
            if (!sentences.includes(text)) {
                sentences.push(text)
            }
            text = ""
        }
    }
    let answers = ""
    if (sentences.length == 0) {
        answers = noAnswer
        has_answer = false
    }
    else {
        for (let i in sentences) {
            answers += sentences[i] + " "
        }
        has_answer = true
    }
    allResults = []
    return [answers, has_answer, allResults]
}

function getResponse(question, learnCommand, canSetTitle) {
    let answers = ""
    let preAnswers = []
    let allResults = []
    let database5 = splitText(question)

    if (learnCommand == 0) {
        let dot = ""
        if (question[question.length - 1] != ".") {
            dot = "."
        }
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
                if (sentence.replaceAll(" ", "") != "") {
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
                            load += pronoun_score
                        }
                        else {
                            if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                                load += keyword.length;
                            }
                            let splitSentence = sentence.toLowerCase().split(" ")
                            if (splitSentence.includes(keyword.toLowerCase()) && keyword.length >= 3) {
                                load += keyword.length * 0.5;
                            }
                            /*
                            for (let j in splitSentence) {
                                if (keyword.includes(splitSentence[j])) {
                                    load += keyword.length * 0.5;
                                }
                            }
                                */
                            if (learnCommand == 1) {
                                if (/^\d+(\s*[-+*/]\s*\d+)?$/.test(keyword)) {
                                    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                                        load += 4;
                                    }
                                }
                            }
                            if (synonyms.hasOwnProperty(keyword.toLowerCase())) {
                                if (sentence.toLowerCase().includes(synonyms[keyword.toLowerCase()][0]) || sentence.toLowerCase().includes(synonyms[keyword.toLowerCase()][1])) {
                                    load += keyword.length
                                }
                            }
                        }

                    });
                }
                if (load > 0) {
                    prevResults.push([sentence, load]);
                }
            });
            prevResults.sort((a, b) => b[1] - a[1]);
            for (let r in prevResults) {
                if (r <= 5) {
                    //console.log([prevResults[r][0], prevResults[r][1]])
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
                // Merge secondary answers into main answer
                let match_required = 0.7
                if (learnCommand == 3) {
                    match_required = 0.7
                }
                if (learnCommand != 2) {
                    for (let s = 1; s < reply_length; s++) {
                        if (prevResults.length > s) {
                            if (prevResults[s]) {
                                console.log(prevResults[s])
                                if (prevResults[s][1] / prevResults[0][1] > match_required) {
                                    answer += " " + linking_phrases[Math.floor(Math.random() * (linking_phrases.length))] + " " + newResults[s]
                                }
                            }
                        }
                    }
                }
            }

            if (results.length > 0) {
                has_answer = true
                preAnswers.push(answer)
                if (canSetTitle) {
                    if (document.getElementById("pagetitle").innerHTML == "Learnbot") {
                        document.getElementById("pagetitle").innerHTML = question.charAt(0).toUpperCase() + question.slice(1);
                    }
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

    return [answers, has_answer, allResults]
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
    if (optn_you_i) {
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
    }
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
    document.getElementById("teach").value = "[" + userQ + "]" + newAltResults[alt].replaceAll("<br>", "") + " " + document.getElementById("teach").value
    changeDatabase()
}
