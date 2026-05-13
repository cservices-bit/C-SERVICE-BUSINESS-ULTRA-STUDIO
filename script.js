window.addEventListener("load",()=>{
  document.getElementById("loader").style.display="none";
});

const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");

menuToggle.addEventListener("click",()=>{
  navLinks.classList.toggle("active");
});

const counters=document.querySelectorAll('.counter');

counters.forEach(counter=>{
  counter.innerText='0';

  const updateCounter=()=>{
    const target=+counter.getAttribute('data-target');
    const c=+counter.innerText;

    const increment=target/200;

    if(c<target){
      counter.innerText=`${Math.ceil(c+increment)}`;
      setTimeout(updateCounter,10);
    }else{
      counter.innerText=target;
    }
  }

  updateCounter();
});

function publishNews(){

  const title=document.getElementById("newsTitle").value;
  const image=document.getElementById("newsImage").value;
  const desc=document.getElementById("newsDesc").value;

  const newsContainer=document.getElementById("newsContainer");

  const card=document.createElement("div");
  card.classList.add("business-card");

  card.innerHTML=`
    <img src="${image}" style="width:100%">
    <div style="padding:20px">
      <h3>${title}</h3>
      <p>${desc}</p>
      <small>${new Date().toLocaleDateString()}</small>
    </div>
  `;

  newsContainer.prepend(card);
}

function publishBusiness(){

  const title=document.getElementById("businessTitle").value;
  const price=document.getElementById("businessPrice").value;
  const image=document.getElementById("businessImage").value;
  const description=document.getElementById("businessDescription").value;

  const businessGrid=document.getElementById("businessGrid");

  const card=document.createElement("div");
  card.classList.add("business-card");

  card.innerHTML=`
    <img src="${image}" style="width:100%">

    <div style="padding:20px">
      <h3>${title}</h3>
      <h4>${price}</h4>
      <p>${description}</p>

      <a href="https://wa.me/243850406200" target="_blank">
        <button>Contacter</button>
      </a>
    </div>
  `;

  businessGrid.prepend(card);
}

function registerUser(){

  const username=document.getElementById("username").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  const user={username,email,password};

  localStorage.setItem("cserviceUser",JSON.stringify(user));

  alert("Inscription réussie");
}

function loginUser(){

  const storedUser=JSON.parse(localStorage.getItem("cserviceUser"));

  if(storedUser){

    document.getElementById("profileBox").innerHTML=`
      <div style="padding:20px;background:#111827;border-radius:20px;">
        <h3>${storedUser.username}</h3>
        <p>${storedUser.email}</p>
      </div>
    `;

    alert("Connexion réussie");
  }
}

function logoutUser(){
  localStorage.removeItem("cserviceUser");
  location.reload();
}

document.getElementById("darkToggle").addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");
});

const faqQuestions=document.querySelectorAll('.faq-question');

faqQuestions.forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.nextElementSibling.classList.toggle('active');
  });
});

function toggleAssistant(){

  const box=document.getElementById("assistantBox");

  if(box.style.display==="block"){
    box.style.display="none";
  }else{
    box.style.display="block";
  }
}

const backToTop=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

  if(window.scrollY>300){
    backToTop.style.display="block";
  }else{
    backToTop.style.display="none";
  }
});

backToTop.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:'smooth'});
});

const translations={
  fr:{
    home:"Accueil"
  },
  en:{
    home:"Home"
  },
  sw:{
    home:"Nyumbani"
  }
};

document.getElementById("languageSwitcher")
.addEventListener("change",(e)=>{

  const lang=e.target.value;

  console.log("Langue changée :",lang);
});
