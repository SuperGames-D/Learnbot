// Learnbot v0.1


const removeWords = ["what", "when", "who", "why", "how", "do", "often", "much", "does", "many"];
const botname = "Learnbot"
let database = []

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

let database1 = splitText(teach);
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

    if (results.length > 0) {
        message(results[0], botname);
    } else {
        message("No answer found", botname);
    }
    console.log();
}

function message(message, sender) {
    document.getElementById("conversation").innerHTML += "<br><br><b style=\"font-size: 15px; text-align: left\">" + sender + "</b><br>" + message;
}
