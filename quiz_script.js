const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const resultButton = document.getElementById('show-result-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultElement = document.getElementById('result')
const resultText = document.getElementById('result-text')

const progressBar = document.getElementById('progress')
const progressText = document.getElementById('progress-text')

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
resultButton.addEventListener('click', showResult)

function startGame() {
 console.log('started')
 startButton.classList.add('hide')
 resultElement.classList.add('hide')
 // shuffledQuestions = questions.sort(()=>Math.random()-0.5)
 shuffledQuestions = questions
 currentQuestionIndex=0;
 score = 0;
 questionContainerElement.classList.remove('hide')
 nextButton.classList.remove('hide')
 progressBar.classList.remove('hide')
 setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateProgressBar(currentQuestionIndex);
}

function showQuestion(question) {
    questionElement.innerText =  question.question
    question.answers.forEach( answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function updateProgressBar(currentQuestionIndex) {
    progressText.innerText = `Pytanie ${currentQuestionIndex+1} z ${shuffledQuestions.length}`;
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.disabled = true;
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    let correct = selectedButton.dataset.correct

    if (correct == 'true') {
        score += 1;
    }

    selectedButton.classList.add('selected-answer')
    Array.from(answerButtonsElement.children).forEach(
        button => {setStatusClass(button, button.dataset.correct)}
    )
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.disabled = false;
    } else {
        nextButton.classList.remove('transparent')
        nextButton.classList.add('hide')
        resultButton.classList.remove('hide')
    }
}

function showResult() {
    questionContainerElement.classList.add('hide')
    resultButton.classList.add('hide')
    progressBar.classList.add('hide')
    resultElement.classList.remove('hide')
    if (score > (3/4)*shuffledQuestions.length) {
        resultText.innerText = `Brawo! Jesteś wiedźmińskim ekspertem! \nTwój wynik to ${score} na ${shuffledQuestions.length} punktów.`
    } else if (score > shuffledQuestions.length/2){
        resultText.innerText = `Całkiem nieźle! \nWidać, że wiedźmiński świat nie jest Ci obcy. \nTwój wynik to ${score} na ${shuffledQuestions.length} punktów.`
    } else if (score > shuffledQuestions.length/3) {
        resultText.innerText = `Masz zadatki na wiedźmina, chociaż brakuje Ci jeszcze trochę wiedzy.\nTwój wynik to ${score} na ${shuffledQuestions.length} punktów. \nMoże spróbujesz go poprawić?`
    } else {
        resultText.innerText = `Oj, Vesemir nie byłby zadowolony... \nTwój wynik to ${score} na ${shuffledQuestions.length} punktów. \nMoże spróbujesz go poprawić?`
    }
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct') 
    element.classList.remove('wrong') 
}



questions = [
    {
        question: "Dlaczego (według książki) wiedźmini noszą ze sobą dwa miecze?",
        answers: [
            { text: "Na niektóre potwory działa tylko srebrne ostrze, na inne jedynie żelazo", correct: true }, 
            { text: "Miecz żelazny jest na ludzi, srebrny na potwory", correct: false }, 
            { text: "Żelazny miecz jest zapasowy, w razie gdyby srebrny się zgubił lub uszkodził w walce.", correct: false }, 
            { text: "Wiedźmini zawsze używają do walki obu mieczy jednocześnie, tak są szkoleni w Kaer Morhen", correct: false }, 
        ]
    },
    {
        question: "Z kim Geralt miał romans w Toussaint?",
        answers: [
            { text: "Z Shani", correct: false }, 
            { text: "Z Filippą Eilhart", correct: false }, 
            { text: "Z Triss Merigold", correct: false }, 
            { text: "Z Fringillą Vigo", correct: true }, 
        ]
    },
    {
        question: "Kto uratował Jaskra, gdy Rience torturami próbował wyciągnąć z niego informacje o Ciri?",
        answers: [
            { text: "Geralt", correct: false }, 
            { text: "Yennefer", correct: true }, 
            { text: "Vilgefortz", correct: false }, 
            { text: "Emiel Regis", correct: false }, 
        ]
    },
    {
        question: "Jaki kolor oczu miała Yennefer?",
        answers: [
            { text: "fiołkowy", correct: true }, 
            { text: "szmaragdowy", correct: false }, 
            { text: "kasztanowy", correct: false }, 
            { text: "szafirowy", correct: false }, 
        ]
    },
    {
        question: "Jak nazywały się wszystkie konie Geralta?",
        answers: [
            { text: "Skoczka", correct: false }, 
            { text: "Płotka", correct: true }, 
            { text: "Pegaz", correct: false }, 
            { text: "Kelpie", correct: false }, 
        ]
    },
    {
        question: "Jak nazywa się niewielka rzeczka stanowiąca naturalną granicę świętego lasu driad, Brokilonu?",
        answers: [
            { text: "Jaruga", correct: false }, 
            { text: "Tamiza", correct: false }, 
            { text: "Wstążka", correct: true }, 
            { text: "Pontar", correct: false }, 
        ]
    }
];


    