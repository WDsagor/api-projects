
// const lat = 58.7984;
// const lng = 17.8081;
// const params = 'windSpeed';
// fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
//   headers: {
//     'Authorization': 'd9003746-97e6-11ec-b0bb-0242ac130002-d9003804-97e6-11ec-b0bb-0242ac130002'
//   }
// }).then((response) => response.json())
// .then((jsonData) => {
//     console.log(jsonData);
//   // Do something wiath response data.
// });
const allPlayer = () => {
    const inputText = document.getElementById('inputText').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.player))
    // console.log(url);
};

const searchResult = (players) => {
    // console.log(players);
    for( player of players){
        const playerContainer = document.getElementById('player-container');
        const div = document.createElement('div');
        div.innerHTML =`
        <div class="col" >
        <div class="card" style="width: 20rem;">
                <img src="${player.strThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${player.strPlayer}</h5>
                  <p class="card-text">Birth Place: ${player.strBirthLocation}</p>
                  <a onclick=" details('${player.idPlayer}')"href="#" class="btn btn-primary">Details More</a>
                </div>
              </div>
        </div>
        
        `;
        playerContainer.appendChild(div);
    }

    
};
const details = (id) => {
    const url= `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
    .then( res => res.json())
    .then (data => showDetails(data.players[0]));
}
const showDetails =(eachId)=>{
    const playerDetails = document.getElementById('player-details');
    const modalClose = document.getElementById('close');
   
    const div = document.createElement('div');
    div.innerHTML = `
    <div class=" row player-details">
        <div class="col-12 col-md-6">
            <img class="img-fluid" src="${eachId.strThumb}" alt="">
        </div>
        <div class="col-12 col-md-6">
            <h3>Name:${eachId.strPlayer}</h3>
            <h4>Country: ${eachId.strNationality}</h4>
            <p> ${eachId.strDescriptionEN} </p>
        </div>
    </div>
    `;
    playerDetails.appendChild(div)
    console.log(eachId);
    playerDetails.style.visibility="visible";
    playerDetails.style.opacity="1";
    modalClose.addEventListener('click', function(){
        playerDetails.style.visibility="hidden";
        playerDetails.style.opacity="0";
        div.innerHTML=""
    })
    
}
