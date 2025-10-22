//console.log("Javacript file has been loaded");

const searchForm = document.querySelector("form");
const address = document.querySelector("input");

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    fetch("/weather?address=" + address.value ).then( (response) => {
      
        response.json().then((data) => {
            
            if(data.Error){
                document.getElementById("msg-1").textContent = data.Error;
                hidden(true);
            }else{
                console.log(data);
                document.getElementById("msg-1").textContent = data.current;
                document.getElementById("msg-2").textContent = data.temperature;
                document.getElementById("msg-3").textContent = data.minimumTemperature;
                document.getElementById("msg-4").textContent = data.location;
                document.getElementById("msg-5").textContent = data.province;
                document.getElementById("msg-6").textContent = data.country;

                hidden(false);
            }
        
        });
    });

});

function hidden(enabled){
    document.getElementById("msg-2").hidden = enabled;
    document.getElementById("msg-3").hidden = enabled;
    document.getElementById("msg-4").hidden = enabled;
    document.getElementById("msg-5").hidden = enabled;
    document.getElementById("msg-6").hidden = enabled;
}