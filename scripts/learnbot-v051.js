// Learnbot v0.51


const removeWords = ["what", "when", "who", "why", "how", "where", "do", "often", "much", "does", "many", "it", "about", "which"];
const botname = "Learnbot"
let database = []
const punctuation = [".", "!", "?"]


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
    let database1 = [];
    splitText(document.getElementById("input").value).forEach(i => {
    i.split(".").forEach(n => database1.push(n));
    });
    message(document.getElementById("input").value, "You")
    let question = document.getElementById("input").value
    document.getElementById("input").value = ""
    let dot = ""
    if (question[question.length-1] != ".") {
    dot = "."
    }
    let learnCommand = false
    if (question.toLowerCase().startsWith("/learn ")) {
    learnCommand = true
    if (question.replace("/learn ", "") == "math") {
    math = ""
    for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
    math = math + String(a) + "+" + String(b) + " is " + String(a+b) + "."
    math = math + String(a) + "-" + String(b) + " is " + String(a-b) + "."
    math = math + String(a) + "*" + String(b) + " is " + String(a*b) + "."
    math = math + String(a) + "/" + String(b) + " is " + String(a/b) + "."
    }
    }
    document.getElementById("teach").value += math
    changeDatabase()
    }
    else {
    document.getElementById("teach").value += question.replace("/learn ", "") + dot
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
    for (let z = 0; z<=database5.length-1; z++) {
    let ask = database5[z]
    if (ask != "") {
    let words = ask.split(/\s+/).map(word => word.replace(/[.,!?;:]/g, '').toLowerCase());
    let keywords = words.filter(word => !removeWords.includes(word.toLowerCase()));
    let results = [];

    database.forEach(sentence => {
        let load = 0;
        keywords.forEach(keyword => {
            if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                load += 1;
            }
        });
        if (load === keywords.length) {
            results.push(sentence);
        }
    });

let answer = ""
if (results.length != 0) {
let answerArray = []

results[0].split(/\s+/).map(word => word.replace(/[.,!?;:]/g, '')).forEach(i => {
if (i == "created") {
if (Math.random() < 0.5) {
answerArray.push("made");}
else {answerArray.push(i)}
}

else if (i == "made") {
if (Math.random() < 0.5) {
answerArray.push("created");}
else {answerArray.push(i)}
}


else if (i == "think") {
if (Math.random() < 0.5) {
answerArray.push("believe");}
else {answerArray.push(i)}
}

else if (i == "cool") {
if (Math.random() < 0.5) {
answerArray.push("fun");}
else {answerArray.push(i)}
}

else if (i == "fun") {
if (Math.random() < 0.5) {
answerArray.push("cool");}
else {answerArray.push(i)}
}

else if (i == "developed") {
if (Math.random() < 0.5) {
answerArray.push("created");}
else {answerArray.push(i)}
}

else if (i == "AI") {
if (Math.random() < 0.5) {
answerArray.push("artificial intelligence");}
else {answerArray.push(i)}
}

else if (i == "very") {
if (Math.random() < 0.5) {
answerArray.push("really");}
else {answerArray.push(i)}
}

else if (i == "good") {
if (Math.random() < 0.5) {
answerArray.push("great");}
else {answerArray.push(i)}
}

else if (i == "great") {
if (Math.random() < 0.5) {
answerArray.push("good");}
else {answerArray.push(i)}
}

else if (i == "great") {
if (Math.random() < 0.5) {
answerArray.push("good");}
else {answerArray.push(i)}
}

else if (i == "great") {
if (Math.random() < 0.5) {
answerArray.push("good");}
else {answerArray.push(i)}
}

else if (i == "below") {
if (Math.random() < 0.5) {
answerArray.push("under");}
else {answerArray.push(i)}
}

else {
answerArray.push(i);
}
})

answer = answerArray.join(" ")

     answer = answer.charAt(0).toUpperCase() + answer.slice(1);
     if (punctuation.includes(answer[answer.length-1])) {
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
        answers = answers + newline + "No answer found";
    }
    }
}

        message(answers, botname);
}

function message(message, sender) {
    document.getElementById("conversation").innerHTML += "<br><br><b style=\"font-size: 15px; text-align: left\">" + sender + "</b><br>" + message;
    window.scrollTo(0, document.body.scrollHeight);
}
