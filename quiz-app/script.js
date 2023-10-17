const quizData = [
    {
        question: "How old is ELi?",
        a: '10',
        b: '15',
        c: '18',
        d: '24',
        correct: 'c'
    }, {
        question: "What is the best programming language?",
        a: 'Javascript',
        b: 'Python',
        c: 'C++',
        d: 'Java',
        correct: 'd'
    }, {
        question: "Who is the president of the US?",
        a: 'Joe Biden',
        b: 'Elon Musk',
        c: 'Joe Rogan',
        d: 'Andrew Tate',
        correct: 'a'
    }, {
        question: "What does html stand for?",
        a: 'Hypertext Markup Language',
        b: 'Hot tiny model lingerie',
        c: 'High tea making life',
        d: 'Hungry tigers manage love',
        correct: 'a'
    }, {
        question: "What year was Javascript launched?",
        a: '2023',
        b: '1995',
        c: '2065',
        d: 'None of the above',
        correct: 'b'
    }
];

var questionEl;
var a_text, b_text, c_text, d_text;
var submit;

let currentQuestion = 0;
let score = 0;

window.onload = () => {

    questionEl = document.getElementById("question");
    a_text = document.getElementById("a_text");
    b_text = document.getElementById("b_text");
    c_text = document.getElementById("c_text");
    d_text = document.getElementById("d_text");

    loadQuiz();

    submit = document.getElementById("submit");
    submit.addEventListener("click", ()=> {
        updateScore();
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuiz();
        }
        else showResults();
    });
}

function loadQuiz() {
    clear()

    questionEl.innerText = quizData[currentQuestion].question;
    a_text.innerText = quizData[currentQuestion].a;
    b_text.innerText = quizData[currentQuestion].b;
    c_text.innerText = quizData[currentQuestion].c;
    d_text.innerText = quizData[currentQuestion].d;

}

function getSelected() {
    if (a.checked) return a;
    if (b.checked) return b;
    if (c.checked) return c;
    if (d.checked) return d;

    return null;
}

function clear() {
    a.checked = false;
    b.checked = false;
    c.checked = false;
    d.checked = false;
}

function updateScore() {
    let chosen = getSelected();
    if (chosen == null) {
        alert("Select a value before submitting");
    }else {
        score += (chosen.id == quizData[currentQuestion].correct) ? 1 : 0;
        console.log(chosen.id, quizData[currentQuestion].correct);
    }
}

function showResults() {
    alert(`You completed the quiz \nYour score was ${score}/${quizData.length}`)
    currentQuestion = 0;
}