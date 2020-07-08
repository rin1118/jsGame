
const canvas = document.getElementById("jsCanvas");                 //canvase 요소 가져와서 넣어주기
const ctx = canvas.getContext("2d");                                //canvase 요소안의 픽셀요소들을 가져와서 넣어주는것
const colors = document.getElementsByClassName("jsColor");          //색상선택바 요소를 가져와서 넣어주기
const range = document.getElementById("jsRange");                   //브러쉬 사이즈바 요소를 가져와서 넣어주기
const mode = document.getElementById("jsMode");                     //fillBtn 요소를 가져와서 넣어주기
const save = document.getElementById("jsSave");                     //saveBtn 요소를 가져와서 넣어주기

const initial_color = "#2c2c2c";                                    //색상 초기화(default 색상 값)
const canvas_size = 700;                                            //캔버스 크기 초기화

canvas.width = canvas_size;                                         //canvase의 안의 픽셀들을 컨트롤 하고싶으면 우선 canvase의 크기를 설정해야함 
canvas.height = canvas_size;

ctx.fillStyle = "white";                                            //캔버스의 기본 배경색(하얀색)을 지정해주기위해 먼저 하얀색 네모로 캔버스를 꽉 채워준다
ctx.fillRect(0, 0, canvas_size, canvas_size);

ctx.strokeStyle = initial_color;    
ctx.fillStyle = "";                                                 //canvase 안의 픽셀의 색깔, default색깔은 black으로 줌
ctx.lineWidth = 2.5;                                                //canvase 안의 픽셀의 크기, default크기는 2.5로 줌

ctx.fillStyle = initial_color;

let painting = false;                                               //painting 상태인지 아닌지 체크하기위해 const대신 let으로 만들어줌
let filling = false;

function stopPainting(){                                            //painting이 중단됐을 때 실행하는 함수                                            
    painting = false;
}

function startPainting(){                                           //painting이 실행됐을 때 실행하는 함수
    painting = true;
}

function onMouseMove(event){                                        //painting 하는 함수
    const x = event.offsetX;                                        //캔버스상의 마우스 좌표
    const y = event.offsetY;                                        //캔버스상의 마우스 좌표
    if(!painting){                                                  
        ctx.beginPath();                                            //path를 생성, path는 선이라고 생각하면됨
        ctx.moveTo(x, y);                                           //마우스 좌표에 따라 path가 이동
    } else {
        ctx.lineTo(x, y);                                           //밑에 설명
        ctx.stroke();
    }
}


function handleColorClick(event){                                   //색상을 변경하는 함수
    const Color = event.target.style.backgroundColor;               //클릭 이벤트가 발생한 색상의 컬러를 가져와서 넣어줌
    ctx.strokeStyle = Color;                                        //canvas의 픽셀의 색깔을 클릭한 색깔로 변경해줌
    ctx.fillStyle = Color;                                              //채우기 색도 선택한 색깔로 변경
}


function handleRangeChange(event){                                  //range 이벤트를 받아 range의 value 값을 size에 넣은뒤 lineWidth에 size 값을 넣어 브러쉬 사이즈 변경
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){                                         //filing의 default값은 false
    if(filling === true){                                           //그리기(paint) 버튼을 누름                                                                            
        filling = false;        
        mode.innerText = "Fill"                                     //mode 버튼의 text를 채우기(fill)로 텍스트 변경
    } else {                                                        //채우기(fill) 버튼을 누름
        filling = true;                                             
        mode.innerText = "Paint";                                   //mode 버튼의 text를 그리기(paint)로 텍스트 변경
        
    }
}

function handleCanvasClick(){
    if (filling) {                                                  //fill 상태면 filling의 값은 true여서 캔버스 크기만한 사각형을 화면 전체에 채움, paint 상태면 false여서 조건문 실행x
        ctx.fillRect(0, 0, canvas_size, canvas_size);
    }
}


function handleRightClick(event){
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();                               //toDataURL()은 canvas의 데이터를 저장해 url 형식으로 반환해줌, 이미지포맷 설정가능(기본은 png)
    const link = document.createElement("a");                       //a태그 만들기
    link.href = image;                                              //<a href="반환된 이미지 경로">
    link.download = "PaintJs[👍]";                                  //이미지를 저장했을 때 파일명
    link.click();                                                   //link에 클릭 이벤트
    
    console.log(link);
    console.log(image);
}




if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);              //canvas위에 마우스가 움직일 때
    canvas.addEventListener("mousedown", startPainting);            //canvas에서 마우스를 누르는 이벤트, let painting = ture로 바뀜 
    canvas.addEventListener("mouseup", stopPainting);               //canvas에서 마우스를 누르다가 뗐을 때
    canvas.addEventListener("mouseleave", stopPainting);            //canvas밖으로 마우스가 나갔을 때
    canvas.addEventListener("click", handleCanvasClick);            //fill버튼을 누르고 canvas에 클릭 했을 때
    canvas.addEventListener("contextmenu", handleRightClick);       //contextmenu는 마우스 클릭하면 새 창열기, 다른이름으로 저장~ 이런거 뜨는 메뉴
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
/*foreach로 color를 돌려서 addeventListener("click", handleColorClick) 호출,
forEach(color => color~~~~) 여기서 color는 potato든 element든 아무거나 상관없음
왜냐하면 배열안의 요소들을 대표하는 이름일뿐이여서 상관없음
*/

console.log(Array.from(colors));                                    //object로부터 배열을 만들어줌


/*
    캔버스위에 마우스를 이동시켜 누르면 startPainting 함수를 실행-> 여전히 누른채로 움직이고 있다면
    onMouseMove 함수가 실행-> 이떄 let painting 함수 값은 true가 들어가 if(!painting) 조건문의 값이 false가 되어
    if문은 실행이 되지않고 else문이 실행
    lineTo 메소드 : 그 전 위치부터 현재 마우스 위치까지 선을 만듬 
    (내가 직선으로 그었다고 치면 ㅡ  이게 아니고 ---- 이렇게 픽셀단위의 선이 만들어져서 직선으로 보이게됨,
     이후 stroke메소드까지 써줘야지 화면상에 선이 보임)
    stroke 메소드 : 현재의 sub-path(선)를 storke style로 획을 그음


    내가 만약 캔버스에서 그리지않고 마우스만 올려두면 일단 onMouseMove 함수 실행->painting 함수의 값은 default값인
    false인 상태,
    if(!painting)이면 조건문의 값이 true가 되어 else문이 아닌 if문이 실행

*/

if(range){                                                          //range 요소가 있다면 range에 이벤트 추가
    range.addEventListener("input", handleRangeChange);
}

if(mode){                                                           //mode 요소가 있다면 mode에 이벤트 추가
    mode.addEventListener("click", handleModeClick);
}

if(save){                                                           //save 요소가 있다면 save에 이벤트 추가
    save.addEventListener("click", handleSaveClick);
}