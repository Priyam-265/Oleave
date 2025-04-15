function startLoader(){
    let counterElement=document.querySelector(".counter");
    let currentValue=0;

function updateCounter(){
    if(currentValue==100)
    {
        gsap.to(".counter",{
            duration:0.20,
            delay:0.3,
            opacity:0,
            onComplete:()=>{
                counterElement.remove();
            }    
        });        
        return;
    }
    currentValue+=Math.floor(Math.random()*10)+1;
    if(currentValue>100){
        currentValue=100;
    }
    counterElement.textContent=currentValue;
    let delay=Math.floor(Math.random()*200)+50;
    setTimeout(updateCounter,delay);
}
updateCounter();
}
startLoader();

