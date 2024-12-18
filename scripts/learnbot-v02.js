// Learnbot v0.2


const removeWords = ["what", "when", "who", "why", "how", "do", "often", "much", "does", "many"];
const botname = "Learnbot"
let database = []
const punctuation = [".", "!", "?"]

function splitText(text) {
    let sentences = [];
    text.split(". ").forEach(i => {
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

// Splitting text by multiple delimiters
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
    let ask = document.getElementById("input").value;
    document.getElementById("input").value = ""
    message(ask, "You")
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

if (i == "developed") {
if (Math.random() < 0.5) {
answerArray.push("created");}
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


    if (results.length > 0) {
        message(answer, botname);
    } else {
        message("No answer found.", botname);
    }
}

function message(message, sender) {
    document.getElementById("conversation").innerHTML += "<br><br><b style=\"font-size: 15px; text-align: left\">" + sender + "</b><br>" + message;
}
