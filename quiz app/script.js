const arr = [
  {
    question: "What is the full form of JS?",
    options: ["Javascript", "JavaAscript", "Joloscript", "Jasscript"],
    correctAnswer: "Javascript"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Leo Tolstoy", "William Shakespeare", "Charles Dickens", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Iron", "Silver"],
    correctAnswer: "Oxygen"
  }
];

let i = 0;
let score = 0;
const userResponse = []; 


function updateQuestionAndOptions() {
  if (i < arr.length) {
    document.getElementById('OptionA').textContent = arr[i].options[0];
    document.getElementById('OptionB').textContent = arr[i].options[1];
    document.getElementById('OptionC').textContent = arr[i].options[2];
    document.getElementById('OptionD').textContent = arr[i].options[3];
    document.getElementById('Question').textContent = arr[i].question;
  } else {
    document.getElementById('Question').textContent = `Your Score: ${score} out of ${arr.length}`;
    document.getElementById('OptionA').style.display = "none";
    document.getElementById('OptionB').style.display = "none";
    document.getElementById('OptionC').style.display = "none";
    document.getElementById('OptionD').style.display = "none";
  }
}


function handleResponses(selectedAnswer) {

  userResponse[i] = selectedAnswer;

  if (selectedAnswer === arr[i].correctAnswer) {
    score++;
  }

  console.log(`Stored Response for Question ${i + 1}: ${selectedAnswer}`);
  console.log(`Current Score: ${score}`);

  i++;
  updateQuestionAndOptions();
}


document.getElementById('OptionA').addEventListener('click', () => {
  handleResponses(arr[i].options[0]);
});
document.getElementById('OptionB').addEventListener('click', () => {
  handleResponses(arr[i].options[1]);
});
document.getElementById('OptionC').addEventListener('click', () => {
  handleResponses(arr[i].options[2]);
});
document.getElementById('OptionD').addEventListener('click', () => {
  handleResponses(arr[i].options[3]);
});


window.onload = () => {
  updateQuestionAndOptions(); 
};
