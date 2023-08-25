document.addEventListener("DOMContentLoaded", function() {
    // ... (other initializations)
    
    // Initialize FSM state and current question index
    let state = "start";
    let currentQuestionIndex = 0;
    
    // Add event listener to the "Next" button
    next[0].addEventListener("click", function() {
        if (state === "start") {
            state = "quiz";
        }
        
        if (state === "quiz" && currentQuestionIndex < 4) {
            currentQuestionIndex++;
            updateQuestion(currentQuestionIndex);
        }
        
        // Check if we're at the last question
        if (currentQuestionIndex === 4) {
            next[0].style.display = "none";
        } else {
            next[0].style.display = "flex";
        }
        
        // Enable the "Prev" button
        prev[0].style.display = "flex";
    });
    
    // Add event listener to the "Prev" button
    prev[0].addEventListener("click", function() {
        if (state === "quiz" && currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuestion(currentQuestionIndex);
        }
        
        // Check if we're at the first question
        if (currentQuestionIndex === 0) {
            prev[0].style.display = "none";
        } else {
            prev[0].style.display = "flex";
        }
        
        // Enable the "Next" button
        next[0].style.display = "flex";
    });
    
    // Function to update the question based on the current index
    function updateQuestion(index) {
        question[0].textContent = f_qdata.questions[index];
        let op = f_qdata.options[index];
        op.forEach(function(choice, j) {
            eOption[j].textContent = choice;
        });
    }
    
    // Fetch quiz data and initialize the first question
    async function main() {
        await getQuestion();
        updateQuestion(currentQuestionIndex);
    }
    
    // Call the main function to start the quiz
    main();
});