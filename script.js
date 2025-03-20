'use strict';

async function fetchStations() {
    const container = document.getElementById("stations");
    const searchInput = document.getElementById("searchInput").value.trim();
    
    if (!searchInput) {
        container.innerHTML = "Insira a sigla de algum país";
        return;
    }

    const url = `https://api.railway-stations.org/${searchInput}/stations`;
    container.innerHTML = "Carregando...";

    try {            
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados = await response.json();
        
        if (dados.length > 0) {
            container.innerHTML = "";
            
            dados.forEach(station => {
                const div = document.createElement("div");
                div.className = "station";
                div.innerHTML = `<strong>${station.title}</strong> - ${station.country}`;
                container.appendChild(div);
            });
        } else {
            container.innerHTML = "Nenhuma estação encontrada. Insira uma sigla válida!";
        }
    } catch (error) {
        console.error("Erro ao buscar as estações:", error);
        container.innerHTML = "Ocorreu um erro ao buscar os dados.";
    }
}

document.getElementById("listStationsButton").addEventListener("click", fetchStations);
