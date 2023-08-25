// Quiz data
let questions=Array(5).fill({
    "question":"",
    "choices":[],
    "correctAnswer":null
});
  async function qDataFetch(){
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    return data;
}
async function getQuestion(n){
    
    let qData=await qDataFetch();
    // console.log(qData)
    
    for(let i=0;i<n;i++){
        
        
        let questionData = qData[i];
        questions[i] = {
            question: questionData?.question["text"],
            choices: questionData?.incorrectAnswers,
            correctAnswer: null
        };
        let rnd=Math.floor(Math.random()*3);
        
        questions[i].choices.splice(rnd,0,(qData[i]?.correctAnswer));
        questions[i].correctAnswer=rnd
        console.log(rnd);

        // console.log(questions[i].question)
        // console.log(questions[i].choices)
        // console.log(qData[i]?.correctAnswer)
        // console.log(questions[i].correctAnswer)
        
    }
    
}
  
  // DOM elements
  const startButton = document.querySelector(".start");
  const refreshButton = document.querySelector(".refresh");
  const bar2 = document.getElementById("bar2");
  const questionElement = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  const option =document.getElementsByClassName("option")
  const prevButton = document.querySelector(".prev");
  const submitButton = document.querySelector(".submit");
  const nextButton = document.querySelector(".next");
  const resultElement = document.querySelector(".result");
  const quizContainer = document.querySelector(".quiz");
  const start=document.getElementsByClassName("start");
  const options=document.getElementsByClassName("options");
  const rulesNguide=document.getElementsByClassName("rulesNguide");
  const progress_b=document.getElementsByClassName("bar1");
  const qButton=document.getElementsByClassName("qButton")
  const q= document.getElementsByClassName("q")
  const a=document.getElementsByClassName("a")
  const QandA=document.getElementsByClassName("QandA")
  let s=null;
  
  let currentQuestionIndex = 0;
  let userAnswers = new Array(questions.length).fill(null);
  
  // Start button click event
  startButton.addEventListener("click", startQuiz);
  
  // Refresh button click event
  refreshButton.addEventListener("click", () => {
    location.reload();
  });
  
  // Start the quiz
  async function startQuiz() {
    if(s==null){
        
        s=1;
        await getQuestion(5)
    }
    userAnswers =Array(questions.length).fill(null);
    currentQuestionIndex=0;
    QandA[0].style.display="none";
    bar2.style.width ="0%";
    start[0].textContent="RESTART";
    rulesNguide[0].style.display = "none";
    optionsContainer.style.display = "flex";
    options[0].style.display = "flex";
    progress_b[0].style.display = "inline-block";
    prevButton.style.display = "flex";
    nextButton.style.display = "flex";
    questionElement.style.display="flex"
    qButton[0].style.display="flex";
    submitButton.style.display="flex"
    loadQuestion(currentQuestionIndex);
  }
  
  // Load question and choices
  function loadQuestion(index) {
    const currentQuestion = questions[index];
    // console.log(questions[index])

    questionElement.innerHTML = `Q${index+1}.&nbsp;   ${currentQuestion.question}`;
  
    optionsContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice, choiceIndex) => {
        // console.log(choiceIndex)
        
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("option");
      if(userAnswers[index]!=null && userAnswers[index]==choiceIndex){
        button.style.backgroundColor="#ddc8fb"}
      button.addEventListener("click", () => selectChoice(choiceIndex));
      optionsContainer.appendChild(button);
      
    });
  
    
    updateNavigationButtons();
  }
  
  // Update progress bar
  function updateProgressBar() {
    bar2.style.display="flex";
    let count=1
    for(let i=0;i<userAnswers.length;i++){
        if(userAnswers[i]!=null){
            count++;
        }
    }
    const progressPercentage = ((count) / questions.length) * 100;
    bar2.style.width = progressPercentage + "%";
  }
  
  // Update navigation buttons
  function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
    submitButton.disabled = currentQuestionIndex === questions.length - 1 ? false : true;
  }
  
  // Handle choice selection
  function selectChoice(choiceIndex) {
    updateProgressBar();
    userAnswers[currentQuestionIndex] = choiceIndex;
    const options = optionsContainer.querySelectorAll(".option");
    options.forEach((option, index) => {
        if (index === choiceIndex) {
            option.style.backgroundColor = "#ddc8fb"; 
          } else {
            option.style.backgroundColor = "#a86ef3"; 
          }
    //   option.classList.toggle("selected", index === choiceIndex);
    });
  }
  
  // Previous button click event
  prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion(currentQuestionIndex);
    }
  });
  
  // Next button click event
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    }
  });
  
  // Submit button click event
  submitButton.addEventListener("click", () => {
    const score = calculateScore();
    displayResult(score);
  });
  
  // Calculate user's score
  function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return (score/5)*100;
  }
  
  // Display quiz result
  function displayResult(score) {
    qButton[0].style.display="none"
    options[0].style.display="none";
    questionElement.style.display="none";
    rulesNguide[0].style.display="flex";
    rulesNguide[0].innerHTML="";
    const hScore= document.createElement("h2")
    const dScore= document.createElement("h3")
    QandA[0].style.display="flex";
    hScore.textContent="Your Score is:-";
    dScore.textContent=score;
    rulesNguide[0].appendChild(hScore)
    rulesNguide[0].appendChild(dScore)
    for(let i=0;i<questions.length;i++)
    {
        q[i].innerHTML=`Question ${i+1}&nbsp; .${questions[i].question}`
        if (userAnswers[i] === questions[i].correctAnswer ) {
        a[i].innerHTML=`<span class="righta">
        =>${questions[i].choices[questions[i].correctAnswer]}</span>`
        }
        else if(userAnswers[i]!=null){
            a[i].innerHTML=`<span class="usera">=>${questions[i].choices[userAnswers[i]]}</span>
            <span class="righta">=>${questions[i].choices[questions[i].correctAnswer]}</span>`
        }
        else if(userAnswers[i]==null){
            a[i].innerHTML=`<span class="usera">=></span>
            <span class="righta">=>${questions[i].choices[questions[i].correctAnswer]}</span>`
        }
    }

    
  }
  
  // Initialize the quiz
  startButton.style.display = "inline-block";
  refreshButton.style.display = "inline-block";
  



