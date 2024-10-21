
const country_code = [
    { value: "AR", label: "ARS" },
    { value: "BO", label: "BOB" },
    { value: "BR", label: "BRL" },
    { value: "CL", label: "CLP" },
    { value: "CO", label: "COP" },
    { value: "EC", label: "USD" },
    { value: "GY", label: "GYD" },
    { value: "PY", label: "PYG" },
    { value: "PE", label: "PEN" },
    { value: "SR", label: "SUR" },
    { value: "UY", label: "UYU" },
    { value: "VE", label: "VEB" },
    { value: "US", label: "USD" },
    { value: "SV", label: "USD" },
    { value: "PA", label: "PAB" },
    { value: "DE", label: "EUR" },
    { value: "FR", label: "EUR" },
    { value: "ES", label: "EUR" },
    { value: "IT", label: "EUR" },
    { value: "PT", label: "EUR" },
    { value: "IE", label: "EUR" },
    { value: "AT", label: "EUR" },
    { value: "GR", label: "EUR" },
    { value: "BE", label: "EUR" },
    { value: "FI", label: "EUR" },
    { value: "JP", label: "JPY" },
    { value: "GB", label: "GBP" },
    { value: "FK", label: "GBP" },// FALKLAND ISLAND
    { value: "GI", label: "GIP" },
    { value: "AU", label: "AUD" },
    { value: "KI", label: "AUD" },
    { value: "NR", label: "AUD" },
    { value: "CA", label: "CAD" },
    { value: "CH", label: "CHF" },
    { value: "LI", label: "CHF" }, //PAIS SUPER ESTRANHO
    { value: "CN", label: "RMB" },
    { value: "NZ", label: "NZD" },
    { value: "CK", label: "NZD" },
    { value: "NU", label: "NZD" },
    { value: "HK", label: "HKD" }
];





let opcoes = document.querySelectorAll(".opcao");
let select = document.querySelector("#select-pais");
let select2 = document.querySelector("#select-ps");
let img = document.querySelector("#imagem1");

let img2 = document.querySelector("#imagem2");

let botaoTrocar = document.querySelector(".botton-swap");
let botaoConversao = document.querySelector(".state-layer");
let moedaDe;
let moedaPara;
let taxaConversao = null;
let input = document.querySelector("#input");
let output = document.querySelector("#output");


select.addEventListener("change", async ()=> {
    img.src = `https://flagsapi.com/${select.value}/flat/64.png`;
    for (let i = 0; i<country_code.length; i++){
        if (country_code[i].value === select.value){
            moedaDe = country_code[i].label;
            console.log(moedaDe);
            break;
        }
    }
    

    


});
select2.addEventListener("change", async ()=> {
    img2.src = `https://flagsapi.com/${select2.value}/flat/64.png`;
    for (let i = 0; i<country_code.length; i++){
        if (country_code[i].value === select2.value){
            moedaPara = country_code[i].label;
            console.log(moedaPara);
            break;
        }
    }

    
    
});



botaoTrocar.addEventListener("click", ()=>{
    let selectTemp = select.value;
    select.value = select2.value;
    select2.value = selectTemp;
    let imgTemp = img.src;
    img.src = img2.src;
    img2.src = imgTemp;
    //let moedaTemp = moedaPara;
    //moedaPara = moedaDe;
    //console.log(moedaDe);
    //moedaDe = moedaTemp;
    //console.log(moedaPara);
})


async function pegarTaxaConversao (moedaDe, moedaPara) {
    
    let moedasRequest = moedaDe+"-"+moedaPara;
    let url = "https://economia.awesomeapi.com.br/last/"+moedasRequest;
    let moedasJson = moedaDe+moedaPara;
    const request = new Request(url) ;
    
    const result = await fetch(request)
    dados = await result.json()
    taxaConversao = await dados[moedasJson].ask;
    console.log(taxaConversao)
    

}



//chama a funcao dps retorna o valor








function pegarCodigoDaMoeda(SiglaPais){
    for (let i = 0; i<country_code.length; i++){
        if(country_code[i].value === SiglaPais){
            return country_code[i].value;
        }

    }
    return undefined;

}








function botao(){
    console.log("click!");
    if(moedaDe!== undefined && moedaPara!== undefined && moedaDe!==moedaPara){
       pegarTaxaConversao(moedaDe, moedaPara);

    }
    if(input.value!== ""){
        console.log(input.value)
        output.textContent = input.value*taxaConversao;
        console.log(input.value*taxaConversao);

    }
 
}


















