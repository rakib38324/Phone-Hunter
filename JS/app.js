const loadPhone = async (searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}

const displayPhone = (phones,dataLimit) => {
    
    const phoneContainer = document.getElementById('phone-Container');
    phoneContainer.innerHTML = '';



    const showall = document.getElementById('showall');
    if(dataLimit && phones.length > 10 ){
        phones = phones.slice(0,10);
        
        showall.classList.remove('d-none')
    }

    else{
        showall.classList.add("d-none")
    }

    const noPhone = document.getElementById('no-found-massage');

    if(phones.length == 0){
        noPhone.classList.remove('d-none')
    }

    else{
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement("Div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        
        `;

        phoneContainer.appendChild(phoneDiv);


    });

// stop loader
toggleSpinner(false)

}


document.getElementById('btn-Search').addEventListener('click',function(){
    
    processesSearch(10);
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');

    if(isLoading){
        loaderSection.classList.remove('d-none')
    }

    else{
        loaderSection.classList.add('d-none')
    }
}

const processesSearch = (dataLimit) =>{
    toggleSpinner(true)

    const phoneSearchText = document.getElementById('phoneSearchText');
    const searchPhone = phoneSearchText.value;
    loadPhone(searchPhone,dataLimit);
}

document.getElementById('btn-show-all').addEventListener('click',function(){
    processesSearch();
})
// loadPhone();