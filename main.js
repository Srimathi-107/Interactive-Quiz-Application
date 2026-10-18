let ques = document.getElementById("ques");
let timer = document.getElementById("timer");
let list = document.getElementById("list");
let outofque = document.getElementById("outofque");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let quizcontainer = document.getElementById("quizcontainer");
let startquiz = document.getElementById("startquiz");
let startquizdiv = document.getElementById("startquizdiv");
let cancel = document.getElementById("cancel");
let continues = document.getElementById("continues");
let par = document.getElementById("par");
let rules = document.getElementById("rules");
startquiz.addEventListener("click",()=>{
  rules.classList.add("activerules")
  startquizdiv.classList.add("removequizdiv")
})
cancel.addEventListener("click",()=>{
  rules.classList.remove("activerules")
  startquizdiv.classList.remove("removequizdiv")
  
})
continues.addEventListener("click",()=>{
  rules.classList.remove("activerules")
  quizcontainer.classList.add("showquizdiv")
  shuffleques()
  sample(index, number);
  timerfunc();
})
let questions = [
  {
    question: "What is HTML stands for ?",
    options: [
      "HyperText Markup Language",
      "HyperTest Machine Language",
      "Hyper Markup Language",
      "HTML Language",
    ],
    ans: 0,
  },
  {
    question: "What is CSS Current version ?",
    options: ["CSS-3", "CSS-4", "CSS-5", "CSS-2"],
    ans: 2,
  },
  {
    question: "What is JS stands for ?",
    options: ["JackScript", "Jason Script", "JavaScripting", "JavaScript"],
    ans: 3,
  },
  {
    question: "What is React ?",
    options: [
      "Framework",
      "Js library",
      "Programming Language",
      "Machine Language",
    ],
    ans: 1,
  },
  {
    question: "What is Bootstrap stands for ?",
    options: [
      "Structure Content in webpage",
      "Apply Style instead of CSS",
      "Used by logic",
      "Perform function / operation in JS",
    ],
    ans: 1,
  },
];

let index = 0;
let score = 0,
scoreans = false,
finished = false;
let number = 1;
let review=[];

function sample(i, n) {
  let q = questions[i];
  ques.innerHTML = `${q.question}`;
  let crtans=q.options[q.ans]
  for(let i=q.options.length-1;i>0;i--){
    let randomopt=Math.floor(Math.random()*(i+1))
    console.log("opt",randomopt)
    let temp=q.options[i]
    q.options[i]=q.options[randomopt]
    q.options[randomopt]=temp
  }
  q.ans=q.options.indexOf(crtans)
  list.innerHTML = `
    <li>${q.options[0]}</li>
    <li>${q.options[1]}</li>
    <li>${q.options[2]}</li>
    <li>${q.options[3]}</li>
    `;
  outofque.innerHTML = `${n} out of ${questions.length} Questions`;
}
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    if (scoreans) return;
    let q = questions[index];
    let a = q.ans;
    let answer = q.options[a];
    review[index]=({
      question:q.question,
      userans:e.target.textContent,
      correctans:answer
    })
    if (e.target.textContent === answer) {
      score++;
      scoreans = true;
      console.log(score);
      e.target.style.backgroundColor = "green";
      e.target.style.color = "white";
    } else {
      scoreans=true
      e.target.style.backgroundColor = "red";
      e.target.style.color = "white";

      list.children[a].style.backgroundColor = "green";
      list.children[a].style.color = "white";
    }
  }
  console.log(review)
});
next.addEventListener("click", () => {
  if (index >= questions.length - 1) {
    scorefunc();
    return;
  }
  scoreans = false;
  index++;
  number++;
  timerfunc();
  sample(index, number);
});
prev.addEventListener("click", () => {
  if (index <= 0) {
    // index=0
    // prev.disabled="true"
    return;
  }
  scoreans = true;
  index--;
  number--;

  timerfunc();
  sample(index, number);
});

let i;

function timerfunc() {
  clearInterval(i);

  let time = 15;

  timer.style.backgroundColor = "black";

  i = setInterval(() => {
    time--;
    timer.innerHTML = `⏱️ ${time} s`;
    if (time <= 0) {
      scoreans = true;
      clearInterval(i);
      let q = questions[index];
      let a = q.ans;
      let answer = list.children[a];
      review[index]=({
        question:q.question,
        userans:"none",
        correctans:answer.textContent
      })
      answer.style.backgroundColor = "green";
      answer.style.color = "white";
      timer.style.backgroundColor = "red";
      if (index < questions.length - 1) {
        setTimeout(() => {
          next.click();
        }, 800);
      }

      return;
    }
  }, 1000);
}

function scorefunc() {
  if (finished) return;

  finished = true;
  let div = document.createElement("div");
  div.className = "score-container";
  let correctcount=document.createElement("span")
  correctcount.innerHTML=`✅ Correct Answers : ${score}`
  let incorrectcount=document.createElement("span")
  incorrectcount.innerHTML=`❌ Wrong Answers : ${questions.length-score}`
  let img = document.createElement("img");
  img.src =
    "https://i.pinimg.com/736x/86/b5/3d/86b53d90fbd279ea28d04099ff7518f0.jpg";
  img.className = "scoreimg";

  let quereview=document.createElement("div")
  let close=document.createElement("i")
  close.setAttribute("class","ri-close-large-line")
  close.id="closebtn"
  close.addEventListener("click",()=>{
    quereview.classList.remove("activereview")
  })
  quereview.append(close)
  quereview.className="quesreview"
  review.forEach((r)=>{
    let h5=document.createElement("h2")
    h5.innerHTML=r.question
    let useransp=document.createElement("p")
    if(r.userans===r.correctans){
      useransp.innerHTML="Your Answer : "+"✅ "+r.userans
    }else{
      useransp.innerHTML="Your Answer : "+"❌ "+r.userans
    }
    let crtansp=document.createElement("p")
    crtansp.innerHTML="Correct Answer : "+r.correctans
    quereview.append(h5,useransp,crtansp)
  })

  let divprogress=document.createElement("div")
  divprogress.className="progress"
  let pertxt=document.createElement("span")
  pertxt.innerHTML="0%"
  divprogress.append(pertxt)
  let percentage=100*score/questions.length
  let current=0
  if(percentage>0){
  let per=setInterval(()=>{
      current++
      pertxt.innerHTML=`${current}%`
      let deg=current*3.6
      divprogress.style.background=`conic-gradient(green ${deg}deg,#ddd ${deg}deg)`
      if(current>=percentage){
        clearInterval(per)
      }
    },20)
  }
  let p = document.createElement("p");
  p.style.textAlign = "center";
  p.style.fontSize = "large";
  p.style.lineHeight = "32px";
  p.innerHTML = `You're Finished the quiz and your score is <br> <b>${score}</b> out of ${questions.length}`;
  let btn = document.createElement("button");
  btn.innerHTML = "Try again";
  btn.className = "tryagainbtn";
  let rvbtn=document.createElement("button")
  rvbtn.className="rvbtn"
  rvbtn.innerHTML="Review Your Answers"
  rvbtn.addEventListener("click",()=>{
    quereview.classList.add("activereview")
  })
btn.addEventListener("click", () => {
  clearInterval(i);
  index = 0;
  number = 1;
  score = 0;
  scoreans = false;
  finished = false;
  review = [];
  div.classList.add("scoreremove");
  quizcontainer.classList.remove("showquizdiv");
  startquizdiv.classList.remove("removequizdiv");
  rules.classList.remove("activerules");
  shuffleques();
  sample(index, number);
});
  quizcontainer.classList.add("scoreadded");
  // quizcontainer.classList.add("quiz-container")
  par.append(div);
  // document.body.remove(quizcontainer)
  div.append(img,p,divprogress,correctcount,incorrectcount,quereview, btn,rvbtn);
}

function shuffleques(){
  for(let i=questions.length-1;i>0;i--){
    let rand=Math.floor(Math.random()*i+1)
    let temp=questions[i]
    questions[i]=questions[rand]
    questions[rand]=temp
  }
}



