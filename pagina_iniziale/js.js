let btnInventory = document.getElementById("inventory");
if (sessionStorage.length>0){
    var pokemon = new Set (JSON.parse(sessionStorage.getItem("pokemon")));
}
else var pokemon = new Set();

btnInventory.addEventListener("click" , function(){
    sessionStorage.setItem('pokemon', JSON.stringify(Array.from(pokemon)));
    document.location.href = '../pagina_catch/catch.html';
})

document.getElementById("n_mypokemon").innerHTML = pokemon.size;

let limite = 20;
let partenza = 1;

let mostra_altro = document.getElementById("See_more");

window.addEventListener("load", function() {
    mostra_pokemon(limite, partenza);
        
});

function mostra_pokemon(limite, partenza) {
    let pokemon_ordinati = [];
    function fetchAndStoreData(index) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/` + index)
            .then(response => response.json());
    }
    let promises = [];
    // Avviamo tutte le richieste e collezioniamo le promesse
    for (let index = partenza; index < limite; index++) {
        promises.push(
            fetchAndStoreData(index)
                .then(data => {
                    pokemon_ordinati[index] = data;
                })
                .catch(error => {
                    console.error('Si è verificato un errore');
                })
        );
    }
    // Attendiamo che tutte le promesse vengano risolte
    Promise.all(promises)
        .then(() => {
            // Una volta raccolti tutti i dati, ordiniamo e visualizziamo
            pokemon_ordinati.sort((a, b) => a.id - b.id); // Ordinamento per ID
            for (let index = 0; index < 20; index++) {
                visualizza_pokemon(pokemon_ordinati[index]);
            }
        });
}

function visualizza_pokemon(data){
        let div = document.createElement("div");
        div.id = data.id;
        div.textContent = data.name.toUpperCase();
        div.style ="font-weight: bolder; font-family: system-ui, -apple-system, BlnikMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; "
        div.style.display = "inline-block";

        switch (data.types[0].type.name) {
            case "grass": div.style.backgroundColor = "green"; break;
            case "fire": div.style.backgroundColor = "red";break;
            case "water": div.style.backgroundColor = "rgb(173, 216, 230)";break;
            case "electric": div.style.backgroundColor = "yellow";break;
            case "ground": div.style.backgroundColor = "brown";break;
            case "rock": div.style.backgroundColor = "gray";break;
            case "steel": div.style.backgroundColor = "rgb(128, 128, 128)";break;
            case "psychic": div.style.backgroundColor = "purple";break;
            case "dark": div.style.backgroundColor = "black";
            div.style.color = 'white';
            break;
            case "normal": div.style.backgroundColor = "beige";break;
            case "flying": div.style.backgroundColor = "rgb(0, 0, 139)";break;
            case "poison": div.style.backgroundColor = "purple";break;
            case "fighting": div.style.backgroundColor = "rgb(139, 0,0)";break;
            case "bug": div.style.backgroundColor = "green";break;
            case "ghost": 
            div.style.backgroundColor = "black";
            div.style.color = 'white';
            break;
            case "dragon": div.style.backgroundColor = "rgb(0, 0, 128)";break;
            case "ice": div.style.backgroundColor = "white";break;
            case "fairy": div.style.backgroundColor = "pink";break;
            default:
                div.style.backgroundColor = "green";
                break;
        }

        let img = document.createElement("img");
        img.src = data.sprites.front_default;

        let btn = document.createElement("button");
        btn.id = data.id; 
        btn.addEventListener( "click" , function () {
            catturaPokemon(btn.id)
        } 
        )
        btn.textContent = "Catch";
        div.append(btn);


        let btn2 = document.createElement("button");
        btn2.textContent = "Info";

        btn2.addEventListener("click", () => {
            const modal = document.getElementById("myModal");
            const pokemonDetails = document.getElementById("pokemonDetails");
            const caratteristiche = document.getElementById("caratteristiche");

        
            pokemonDetails.innerHTML = `
                <p style="font-weight: bolder; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Nome: ${data.name.toUpperCase()}</p>
                <img src="${data.sprites.front_default}">
                <p style="font-weight: bolder; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">ID: ${data.id}</p>

            `;


            caratteristiche.innerHTML = `
                <table style="font-weight: bolder; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                <td >Abilities:</td>
                <td>
                ${data.abilities[0] ? data.abilities[0].ability.name : ''}
                ${data.abilities[1] ? ', ' + data.abilities[1].ability.name : ''}
                </td>

                    <tr>
                        <td>Base experience:</td>
                        <td>${data.base_experience}</td>
                    </tr>
                    <tr>
                        <td>Move:</td>
                        <td>${data.moves[0].move.name}</td>
                    </tr>
                    <tr>
                        <td>Height:</td>
                        <td>${data.height}</td>
                    </tr>
                    <tr>
                        <td>Type:</td>
                        <td>${data.types[0].type.name}</td>
                    </tr>
                    <tr>
                        <td>Weight:</td>
                        <td>${data.weight + ' kg'}</td>
                    </tr>
                </table>
            `;

            modal.style.display = "block";
            modal.style.transform = "translate(-50%, -50%) scale(1)";

        });
        
        div.append(img);
        div.append(btn);
        div.append(btn2);
        document.body.append(div);
}


document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});


function catturaPokemon(id){
    pokemon.add(id)
    document.getElementById("n_mypokemon").innerHTML = pokemon.size;
}

window.addEventListener("load", function() {
    var bottoneTornaInAlto = document.getElementById("tornaInAlto");
  
    window.addEventListener("scroll", function() {
      if (window.scrollY > 100) {
        bottoneTornaInAlto.style.display = "block";
      } else {
        bottoneTornaInAlto.style.display = "none";
      }
    });
  
    bottoneTornaInAlto.addEventListener("click", function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

mostra_altro.addEventListener("click", () => {
    partenza = limite;
    limite += 20;
    mostra_pokemon(limite, partenza);
    
});

document.addEventListener("DOMContentLoaded", function () {
    const seeMoreButton = document.getElementById("See_more");
    const tornaInAltoButton = document.getElementById("tornaInAlto");
    function mostraBottoneSeeMore() {
        const altezzaFinestra = window.innerHeight;
        const altezzaDocumento = document.documentElement.scrollHeight;
        const posizioneScroll = window.scrollY;
        if (altezzaFinestra + posizioneScroll + 40 >= altezzaDocumento) {
            seeMoreButton.style.display = "block";
        } else {
            seeMoreButton.style.display = "none";
        }
    }
    window.addEventListener("scroll", mostraBottoneSeeMore);
        tornaInAltoButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});