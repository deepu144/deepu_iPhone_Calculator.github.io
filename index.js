const divide=document.getElementById('/');
divide.addEventListener("click",ChangeOperatorColor.bind(this,divide));

const multi=document.getElementById("*");
multi.addEventListener("click",ChangeOperatorColor.bind(this,multi));

const minus=document.getElementById("-");
minus.addEventListener("click",ChangeOperatorColor.bind(this,minus));

const plus=document.getElementById("+");
plus.addEventListener("click",ChangeOperatorColor.bind(this,plus));

/*
    1)flag => I used to find whether the input number is before press the operator or after.So,that to call displayNumber1 and displayNumber2 functions.
    2)check => I used it to find whether user clicked equal.So,I would find calculator process is end or continue.
    3)end => end is related to "check" variable , if user proceed operator after equal , calculator process must continue or else it must again startup.
    4)a => it contains displayNumber1's value in a string format.
    5)c => it contains displayNumber2's value in a string format.
    6)User => It holds the all expression includes Numbers and operators.
    7)x => I used "x" to determine the displayNumber1/displayNumber2 is concate with next number or previos number.
*/

let flag=1;
let Test;
function ChangeOperatorColor(operator)
{
    flag=1;
    Test=CheckOperator(operator);
    NumberString(Test);
    if(flag)
    {
        operator.style.backgroundColor="white";
        operator.style.color="rgb(255,159,10)";
        flag=0;
        ChangeSpecifyOperator(Test);
    }
}

function ChangeSpecifyOperator(Symbol){
    
    let AllOperator=['+','-','*','/'];
    AllOperator.forEach(x=>{
        if(x!=Symbol){
            document.getElementById(x).style.backgroundColor="rgb(255,159,10)";
            document.getElementById(x).style.color="white";
        }
    })
}

let check=false;
for(let i=0;i<=9;i++)
{
    document.getElementById(i.toString()).addEventListener("click",()=>{
        if(flag){
            DisplayNumber1(i);
        }
        else{
            DisplayNumber2(i);
            BacktoOperatorColor();
        }
        NumberString(i);
    })
}

let x=0;
let User='';
let end=true;
function NumberString(num){
    if(check && end){
        User='';
        check=false;
        end=false;
    }
    else{
        check=false;
        end=true;
    }
    num=num.toString();
    let b=User.concat(num);
    User=b;
    console.log(User);
}

let a='';
function DisplayNumber1(num){
    if(check){
        a='';
        x=0;
    }
    num=num.toString();
    let b=a.concat(num);
    if(flag)
    document.getElementById("display").innerHTML=b;
    if(x==0)
    a=b;
    console.log("a=",a);
}

let c='';
function DisplayNumber2(num){
    num=num.toString();
    let b=c.concat(num);
    if(flag==0)
    document.getElementById("display").innerHTML=b;
    if(x==1)
    c=b;
    console.log("c=",c);
}

function BacktoOperatorColor(){
    let AllOperator=['/','*','-','+'];
    for(let i=0;i<AllOperator.length;i++){
        document.getElementById(AllOperator[i]).style.backgroundColor="rgb(255,159,10)";
        document.getElementById(AllOperator[i]).style.color="white";
    }
}

let Ac=document.getElementById("clear");
Ac.addEventListener("click",()=>{
    document.getElementById("display").innerHTML=0;
    a='';
    c='';
    User='';
    flag=1;
    BacktoOperatorColor()
})

let Answer=document.getElementById("equal");
Answer.addEventListener("click",()=>{
    check=true;
    flag=1;
    c='';
    Evaluate();
});

function Evaluate(){
    BacktoOperatorColor();
    let FinalAnswer;
    if(HasNeg2){
        User=`${User}`;
        console.log('varuthu',User);
    }
    FinalAnswer=eval(User);
    document.getElementById("display").innerHTML=FinalAnswer;
    User=FinalAnswer.toString();
    LikeEqual=0;
}

let operator;

function CheckOperator(Symbol){
    if(Symbol==divide)
    operator='/';
    else if(Symbol==multi)
    operator="*";
    else if(Symbol==minus)
    operator='-';
    else if(Symbol==plus)
    operator='+';
    Evaluate();
    x=1;
    c='';
    if(check){
        end=false;
    }
    HasNeg2=true;
    return operator;
}

let Percent=document.getElementById('%');
Percent.addEventListener("click",ChangePercentile);

function ChangePercentile(){
   let ans=eval(User);
   ans=ans/100;
   document.getElementById("display").innerHTML=ans;
   User=ans;
   check=true;
   flag=1;
   c='';
}
function FindOperator(){
    console.log(`test=${Test}`);
    return Test;
}
let HasNeg=false;
let HasNeg2=false;
let Negative=document.getElementById("plus-minus");
Negative.addEventListener("click",(Test)=>{
    Test=FindOperator();
    if(HasNeg){
        HasNeg2=true;
    }
    let neg='-';
    if(HasNeg2){
        if(Test=='+'){
            let index=User.lastIndexOf('+');
            User=User.slice(0,index+1)+`(${neg}`;
            console.log(`NEG=${User}`);
        }
        else if(Test=='-'){
            let index=User.lastIndexOf('-');
            User=User.slice(0,index+1)+`(${neg}`;
            console.log(`NEG=${User}`);
        }
        else if(Test=='*'){
            let index=User.lastIndexOf('*');
            User=User.slice(0,index+1)+`(${neg}`;
            console.log(`NEG=${User}`);
        }
        else if(Test=='/'){
            let index=User.lastIndexOf('/');
            User=User.slice(0,index+1)+`(${neg}`;
            console.log(`NEG=${User}`);
        }
    }
    else{
        User=neg.concat(User);
    }
    HasNeg=true;
    if(x && flag==0){
        c=neg.concat(c);
        document.getElementById("display").innerHTML=c;
    }
    else{
        a=neg.concat(a);
        document.getElementById("display").innerHTML=a;
    }
})

let dot=document.getElementById('.');
dot.addEventListener("click",()=>{
    if(flag){
        DisplayNumber1('.');
        NumberString('.');
    }
    else{
        DisplayNumber2('.');
        NumberString('.');
    }
});

//CODE FOR ACCESSING KEYBOARD.

let KeyClass;
let operatorColorChecker=false;
let key=document.getElementById('key');
key.addEventListener("keydown",(event)=>{
    if(!isNaN(event.key)||event.key=='.'){
        if(operatorColorChecker){
            BacktoOperatorColorForKeyBoard();
        }
        HoverAtNumberKeyPress(event.key);
        if(flag){
            DisplayNumber1(event.key);
            NumberString(event.key);
        }
        else{
            DisplayNumber2(event.key);
            NumberString(event.key);
        }
    }
    else if(event.key=='+' || event.key=='-'||event.key=='/'||event.key=='*'){
        if(check){
            end=false;
        }
        ChangeOperatorColorKeyboard(event.key);
    }
    else if(event.key=="Enter"){
        if(operatorColorChecker){
            BacktoOperatorColorForKeyBoard();
        }
        HoverAtEqual();
        check=true;
        flag=1;
        c='';
        Evaluate();
    }
    else if(event.key=="Delete"){
        if(operatorColorChecker){
            BacktoOperatorColorForKeyBoard();
        }
        HoverAtAc();
        document.getElementById("display").innerHTML=0;
        a='';
        c='';
        User='';
        flag=1;
    }
    else if(event.key=='%'){
        if(operatorColorChecker){
            BacktoOperatorColorForKeyBoard();
        }
        HoverAtPercent();
        ChangePercentile();
    }
})

function ChangeOperatorColorKeyboard(operator)
{
    flag=1;
    x=1;
    c='';
    EvaluateATClickOperatorBykeyboard();
    NumberString(operator);
    flag=0;
    document.getElementById(operator).style.backgroundColor="white";
    document.getElementById(operator).style.color="#ff9f0a";
    operatorColorChecker=true;
}

function BacktoOperatorColorForKeyBoard(){
    let operator=['+','-','*','/'];
    for(let i=0;i<operator.length;i++){
        document.getElementById(operator[i]).style.backgroundColor="#ff9f0a";
        document.getElementById(operator[i]).style.color="white";
    }
    operatorColorChecker=false;
}

function EvaluateATClickOperatorBykeyboard(){
    let FinalAnswer;
    FinalAnswer=eval(User);
    document.getElementById("display").innerHTML=FinalAnswer;
    User=FinalAnswer.toString();
}

function HoverAtNumberKeyPress(key){
    document.getElementById(key).style.backgroundColor="#646464";
    setTimeout(()=>{
        document.getElementById(key).style.backgroundColor="#333333";
    },150); 
}

function HoverAtPercent(){
    document.getElementById('%').style.backgroundColor="#d7d7d7";
    setTimeout(()=>{
        document.getElementById('%').style.backgroundColor="#a5a5a5";
        document.getElementById('%').style.color="black";
    },150); 
}

function HoverAtAc(){
    document.getElementById('clear').style.backgroundColor="#d7d7d7";
    setTimeout(()=>{
        document.getElementById('clear').style.backgroundColor="#a5a5a5";
        document.getElementById('clear').style.color="black";
    },150); 
}

function HoverAtEqual(){
    document.getElementById('equal').style.backgroundColor="#fbc78d";
    setTimeout(()=>{
        document.getElementById('equal').style.backgroundColor="#ff9f0a";
    },150);
}

//END
