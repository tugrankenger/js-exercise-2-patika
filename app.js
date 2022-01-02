const listYeniUl = document.getElementById("list");

// sayfa refresh olunca localStorage'daki elemanlari getirme

const localdeVarOlanItemleriGostermek = function(){
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(!todos) { //hic tudu eklenmedi ise
        localStorage.setItem("todos",JSON.stringify([])); //bos array goster
    }else{
        for(let i=0; i<todos.length; i++){
            function newElementForLocal(){
                let yeniLi = document.createElement("li");
                let inputValue = todos[i].text;
                let valueMetni = document.createTextNode(inputValue);
                yeniLi.appendChild(valueMetni);

                let span = document.createElement("span");
                let carpi = document.createTextNode("X");

                span.className = "close";
                span.appendChild(carpi);
                yeniLi.appendChild(span);
                listYeniUl.appendChild(yeniLi);

                if(todos[i].isChecked == true){
                    yeniLi.classList.add("checked");
                }else{
                    yeniLi.classList.remove("checked");
                }
            };
            newElementForLocal();
        }
    }
}

localdeVarOlanItemleriGostermek();

let listItems = document.getElementsByTagName("li");

for(let i =0; i<listItems.length;i++){
    let span = document.createElement("span");
    let carpi = document.createTextNode("X");
    span.className="close";
    span.appendChild(carpi);
    listItems[i].appendChild(span);
}

let close = document.getElementsByClassName("close");

// close'a tiklayinca item div'ine d-none bas

for(let i=0; i<close.length; i++){
    close[i].onclick = function(){
        let div = this.parentElement;
        div.style.display= "none";
        
        // ilgili item'i local storage'dan silme
        // item metnini al local storage'da eslesenleri sil
        
        let icerikMetni = div.textContent;
        const icerikMetniKesilmis = icerikMetni.slice(0,icerikMetni.length-2) //carpi isaretini almiyoruz
        
        
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos = todos.filter(item => item != icerikMetniKesilmis);
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}

function yeniElement(){
    let yeniLi = document.createElement("li");
    let inputValue = document.getElementById("task").value;
    let valueMetni = document.createTextNode(inputValue);

    yeniLi.appendChild(valueMetni);

    if(inputValue === "" || inputValue.replace(/^\s+|\s+$/g,"").length==0){
        $(".error").toast("show");
    }else{
        $(".success").toast("show");
        listYeniUl.appendChild(yeniLi);
    }

    let span = document.createElement("span");
    let carpi = document.createTextNode("x");
    span.className="close";
    span.appendChild(carpi);
    yeniLi.appendChild(span);

    document.getElementById("task").value="";

    //close' tiklayinca item kaybolsun (yeni eklenenler icin)
    for(let i = 0; i<close.length; i++){
        close[i].onclick= function(){
            let div = this.parentElement;
            div.style.display= "none";
        }
    }

    const todo = {
        text:inputValue,
        isChecked:false
    }
    // yeni eklenen item'i local storage'a ekleme
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

    //enter ile yeni eleman ekle
    var input = document.getElementById("task");

    input.addEventListener("keyup", function(event){
        if(event.key=== 'Enter'){
            event.preventDefault;
            document.getElementById("liveToastBtn").click();
        }
    });

    //checked islemi

    listYeniUl.addEventListener("click",function(event){
        if(event.target.tagName==="LI"){
            event.target.classList.toggle("checked");

            const icerikMetni = event.target.textContent;
            const icerikMetniKesilmis= icerikMetni.slice(0,icerikMetni.length-2);

            //item checked oldugunda local'daki item da checked olsun
            if(event.target.classList.contains("checked")){
                const todos = JSON.parse(localStorage.getItem(todos));
                todos.forEach(element =>{
                    if(element.text == icerikMetniKesilmis){
                        element.isChecked= true;
                    }
                    localStorage.setItem("todos",JSON.stringify(todos));
                });
            }else if(!event.target.classList.contains("checked")){
                const todos = JSON.parse(localStorage.getItem(todos));
                todos.forEach(element =>{
                    if(element.text== icerikMetniKesilmis){
                        element.isChecked=false;
                    }
                    localStorage.setItem("todos",JSON.stringify(todos));
                });
            }
        }
    });
}