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

                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"> Show Details </button>
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

//search input fild enter key handle

document.getElementById('phoneSearchText').addEventListener('keypress',function(even){
    if (even.key === 'Enter'){
        processesSearch(10);
    }
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

const loadPhoneDetails =  async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone =>{
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    
    <p> <spam class = "fw-bold"> Release Date:</spam> ${phone.releaseDate ? phone.releaseDate : "No Release Date Found"} </p>
    <p> <spam class = "fw-bold"> Storage: </spam> ${phone.mainFeatures ? phone.mainFeatures.storage : "No Storage information Found"} </p>
    <p> <spam class = "fw-bold"> Display: </spam> ${phone.mainFeatures ? phone.mainFeatures.displaySize : "Display Information not Found"} </p>
    <p> <spam class = "fw-bold"> ChipSet: </spam> ${phone.mainFeatures ? phone.mainFeatures.chipSet : "ChipSet Information not Found"} </p>
    <p> <spam class = "fw-bold"> Bluetooth: </spam> ${phone.others ? phone.others.Bluetooth : "Bluetooth Informatio not Found"}</p>
    <p> <spam class = "fw-bold"> GPS: </spam> ${phone.others ? phone.others.GPS : "GPS Informatio not Found"}</p>
    <p> <spam class = "fw-bold"> NFC: </spam> ${phone.others ? phone.others.NFC : "NFC Informatio not Found"}</p>
    <p> <spam class = "fw-bold"> Radio: </spam> ${phone.others ? phone.others.NFC : "Radio Informatio not Found"}</p>
    <p> <spam class = "fw-bold"> USB: </spam> ${phone.others ? phone.others.USB : "USB Informatio not Found"}</p>
    <p> <spam class = "fw-bold"> WLAN: </spam> ${phone.others ? phone.others.WLAN : "WLAN Informatio not Found"}</p>

    `;


    
}
loadPhone("phone");