    /* Elementos */
const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const numberInput = document.querySelector("#number");
const complementInput = document.querySelector("#complement");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const closeBtn = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");

// Validar CEP
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /^[0-9.,]+$/;
    const key = String.fromCharcode(e.keyCode);
        
        if (!onlyNumbers.test(key)) {
                e.preventDefault()
            return;
            }
});

// Buscar Endereço
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
        if (inputValue.length === 8) {
            getAddress(inputValue);
        }
});

// API ViaCEP
const getAddress = async (cep) => {
    toggleLoader();
    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();

            if (data.erro === "true") {
                if (!addressInput.hasAttribute("disabled")) {
                    toogleDisabled();
            }
            
            addressForm.reset();
            toggleLoader();
            toggleMessage("CEP não encontrado");
            return;
        }

        if (addressInput.value === "") {
            toggleDisabled();
          }

        addressInput.value = data.logradouro;
        cityInput.value = data.localidade;
        neighborhoodInput.value = data.bairro;
        regionInput.value = data.uf;

        toggleLoader();
    };

// Add/remove disable attribute
const toggleDisabled = () => {
    if (regionInput.hasAttribute("disabled")) {
      formInputs.forEach((input) => {
        input.removeAttribute("disabled");
      });
    } else {
      formInputs.forEach((input) => {
        input.setAttribute("disabled", "disabled");
      });
    }
  };

// exibir loading
const toggleLoader = () => { 
    const loaderElement = document.querySelector("#loader");
    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

// Mostrar/ocultar mensagem
const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");
    const messageElementText = document.querySelector("#message p");
    messageElementText.innerText = msg;
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

// Fechar mensagem
closeBtn.addEventListener("click", () => toggleMessage());

// Salvar endereço
addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    toggleLoader();
  
    setTimeout(() => {
      toggleLoader();
  
      toggleMessage("Endereço salvo com sucesso!");
  
      addressForm.reset();
  
      toggleDisabled();
    }, 1500);
  });