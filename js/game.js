let timer = null;
const max=4;
let y=999;
let point=0;
let count=0;
const APPLICATION_KEY = "62ed9a81b7ecb47ddecee439cb318f38d4eca24011de3bace134196c3e9e31a2";
const CLIENT_KEY = "0f3825fe700f2b8bbf9564f9068805fc01b203581e7e4bd7735f521d501595e7";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";
let TestClass = ncmb.DataStore(DBName);
let b=document.getElementById("bb");
let orizin=b.style.display;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
    b.style.display="none"
  }
}

function gameStart() {
  let size=5;
  let qNum=Math.floor(Math.random()*q.length);

  for(let i=0;i<size*size;i++){
    let s=document.createElement("span");
    s.textContent=q[qNum][0];
    s.setAttribute("id","num"+i);
    s.addEventListener('click',function(){
      if(this.textContent==q[qNum][1]){
        //alert("ok");
        correct.play();
        count=count+1
        while(cells.firstChild){
          cells.removeChild(cells.lastChild)
        }
        gameStart();
        if(count==max){
          alert("game clear!");
          while(cells.firstChild){
            cells.removeChild(cells.lastChild)
          }
          clearTimeout(timer);
          save();
          timer=null;
          count=0;
          b.style.display=orizin

        }
      }else{
        //alert("fuck");
        wrong.play();
      }
    })
    cells.appendChild(s);
    if(i%size==size-1){
      const br=document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p=Math.floor(Math.random()*size*size);
  let ans=document.getElementById("num"+p);
  ans.textContent=q[qNum][1];
}

function time() {
    let now=new Date();
    let etime=parseInt((now.getTime()-start.getTime())/1000);
    score.textContent=etime;
    timer=setTimeout("time()",1000);
}

function save(){
  let test = new TestClass();
  let key = "message";
  let value=(timer-1);
  test.set(key,value);
  test.save()
  .then(function(){
    console.log("ok!");
    load();
  })
  .catch(function(err){
    console.log("error"+err);
  });
}
function load(){
  TestClass
  .order("message")
  .fetchAll()
  .then(function(results){
    for(let i=0;i<results.length;i++){
      if(y>results[i].message){
        y=results[i].message;
        console.log("hoge");
        point=1;
      }
    }
    if(point==1){
      console.log(y+"highscore!!");
    }
  })
  .catch(function(err){
    console.log(err);
  });
};
