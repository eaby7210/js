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
let user_choice=[-1,-1,-1,-1,-1];

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
function resetOption(){
    for(let j=0;j<eOption.length;j++){
        eOption[j].style.backgroundColor="#a86ef3";
    }
}
function score(i,j){



}

  function qiuz(i,k){
        let j=-1;
        progress_b2.style.display="flex";
        if(i<=0){
            prev[0].style.display="none";
        }
        else if(i>=k-1){
            next[0].style.display="none";
            if(i==k-1){
                submit[0].style.display="flex";
            }
        }
        else{
            prev[0].style.display="flex";
            next[0].style.display="flex";
        }
        
        if(i>=0 && i<k){
            if(f_qdata!=null)
            {
               
                question[0].textContent=f_qdata.questions[i];
                let op=f_qdata.options[i]
                console.log(f_qdata.answers[i])
                op.forEach(function(choice,j){
                    // console.log(choice);
                    // console.log(j)
                    eOption[j].textContent=choice;
                    
                });
                for(let n=0;n<eOption.length;n++){
                    eOption[n].addEventListener("click",(function optionselect(index){
                        return function (){
                        score(i,index);
                        resetOption();
                        eOption[index].style.backgroundColor="#d0a9f3";
                        eOption[0].removeEventListener("click",optionselect)
                        };
                    })(n));
                }
                

                next[0].addEventListener("click", (function nextHandler(index,tq) {
                    return function() {
                        next[0].removeEventListener("click",nextHandler)
                        console.log(`pressed next`)
                        console.log(`question index ${index}`)
                        quiz((index + 1), tq);
                        
                    };
                })(i,k));
                
                prev[0].addEventListener("click", (function prevHandler(index,tq) {
                    return function() {
                        
                        prev[0].removeEventListener("click",prevHandler)
                        console.log(`pressed prev`)
                        console.log(`question index ${index}`)
                        quiz((index - 1), tq);
                        
                    };
                })(i,k));
                submit[0].addEventListener("click",() =>{

                })
                
 
            }
            
            else{
                question[0].textContent="Quiz data is null";
            }
           
        }
        else{
            alert("End of the question.");
        }
        
    
    
    }


async function main() {
    
  await getQuestion();
  refresh[0].addEventListener("click",function(){
    start[0].textContent = "START";
    rulesNguide[0].style.display = "block";
    options[0].style.display = "none";
    progress_b[0].style.display = "none";
    question[0].textContent = "";
    controls[0].style.display = "none";

    // Fetch new questions and reset the quiz data
     main();
  })

  start[0].addEventListener("click",function(){

    // console.log(start[0].innerText);
    start[0].textContent="RESTART";
    rulesNguide[0].style.display = "none";
    options[0].style.display = "flex";
    progress_b[0].style.display = "inline-block";
    
    question[0].style.display = "flex";
    controls[0].style.display = "flex";
    quiz(0,5);
    })
   

    
}


main();
 });

