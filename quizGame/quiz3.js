document.addEventListener("DOMContentLoaded", function() {
    const next=document.getElementsByClassName("next");
    const prev=document.getElementsByClassName("prev");
    const submit=document.getElementsByClassName("submit");
    const start=document.getElementsByClassName("start");
    const refresh=document.getElementsByClassName("refresh");
    const options=document.getElementsByClassName("options");
    const eOption=document.getElementsByClassName("option");
    const rulesNguide=document.getElementsByClassName("rulesNguide");
    const progress_b=document.getElementsByClassName("bar1");
    const progress_b2=document.getElementById("bar2");
    const question=document.getElementsByClassName("question");
    const controls=document.getElementsByClassName("qButton");

    let f_qdata={
        "questions":[],
        "options":[],
        "answers":[],
    }
    async function qDataFetch(){
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();
        return data;
    }
    async function getQuestion(){
        let qData=await qDataFetch();
        let questions=[];
        let options=[];
        let answer=[];
        for(let i=0;i<5;i++){
            questions[i]=qData[i]?.question["text"];
            options[i]=qData[i]?.incorrectAnswers;
            let rnd=Math.floor(Math.random()*3);
            answer[i]=qData[i]?.correctAnswer;
            options[i].splice(rnd,0,answer[i]);
            
        }
        f_qdata={
            "questions":questions,
            "options":options,
            "answers":answer,
        }
       
        
    }

    async function main() {
        await getQuestion();
        
        let currentQuestionIndex = 0;


        refresh[0].addEventListener("click", function() {
            start[0].textContent = "START";
            rulesNguide[0].style.display = "block";
            options[0].style.display = "none";
            progress_b[0].style.display = "none";
            question[0].textContent = "";
            controls[0].style.display = "none";
        
             main();
        });
       


        async function waitForNextPrev(direction) {
            return new Promise(resolve => {
                function nextHandler() {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < 5) {
                        next[0].removeEventListener("click", nextHandler);
                        prev[0].removeEventListener("click", prevHandler);
                        resolve("pressed next");
                    }
                }
        
                function prevHandler() {
                    currentQuestionIndex--;
                    if (currentQuestionIndex >= 0) {
                        next[0].removeEventListener("click", nextHandler);
                        prev[0].removeEventListener("click", prevHandler);
                        resolve("pressed prev");
                    }
                }
        
                if (direction === 1) {
                    next[0].addEventListener("click", nextHandler);
                } else if (direction === -1) {
                    prev[0].addEventListener("click", prevHandler);
                }
            });
        }
        
        


        start[0].addEventListener("click",async function() {
            currentQuestionIndex=0;
            start[0].textContent="RESTART";
            rulesNguide[0].style.display = "none";
            options[0].style.display = "flex";
            progress_b[0].style.display = "inline-block";
            
            question[0].style.display = "flex";
            controls[0].style.display = "flex";

   
                while (currentQuestionIndex >= 0 && currentQuestionIndex < 5) {
                    
                    
                    if(currentQuestionIndex<=0){
                        prev[0].style.display="none";
                    }
                    else if(currentQuestionIndex>4){
                        next[0].style.display="none";
                        if(currentQuestionIndex==4){
                            submit[0].style.display="flex";
                        }
                    }
                    else{
                        prev[0].style.display="flex";
                        next[0].style.display="flex";
                        if(currentQuestionIndex==4){
                            submit[0].style.display="flex";
                        }
                    }
                    progress_b2.style.display="flex";
                    console.log(currentQuestionIndex)
                    let percent=((currentQuestionIndex+1)/5)*100
                    console.log(percent)
                    progress_b2.style.width=`${percent}%`
                    question[0].textContent = `Q${currentQuestionIndex+1}. ${f_qdata.questions[currentQuestionIndex]}`;
                    let op = f_qdata.options[currentQuestionIndex];
                    op.forEach(function(choice,j){
                        eOption[j].textContent=choice;
                        
                    });
                    
                    // function waitForCLick(){
                    //     return new Promise(resolve =>{
                    //         next[0].addEventListener("click", function nextHandler() {
                    //             currentQuestionIndex++;
                    //             if (currentQuestionIndex < 5) {
                    //                 next[0].removeEventListener("click")
                    //                 resolve("pressed next")
                                    
                                    
                    //             }
                    //         });
    
                    //         prev[0].addEventListener("click", function prevHandler() {
                    //             currentQuestionIndex--;
                    //             if (currentQuestionIndex >= 0) {
                    //                 resolve("pressed prev")
                                    
                                    
                    //             }
                    //         });

                    //     });
                    // }

                     let result =await Promise.race([
                        waitForNextPrev(1),
                        waitForNextPrev(-1) 
                
                    ]);
                    console.log(result);
                        
                        // ... rest of your code ...

                        // Resolve the promise when the quiz ends
                        if (currentQuestionIndex === 5) {
                            
                        }
                    
                } 
            

            // ... rest of your code ...
        });

        // ... rest of your code ...
    }

    main();
});
