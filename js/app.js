

/*****************************\
       GRAB THE ELEMENTS
\*****************************/
const phoneContainer = document.getElementById('book-container')
const result = document.getElementById('result')
const searchText = document.getElementById('search-text');


/***********************************\
    SEARCH BUTTON HANDLER SPINNER
\***********************************/
document.getElementById('search-btn').addEventListener('click', () => {
    phoneContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border text-success" role="status">
         <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;



    /************************************\
        ERROR HANDLING FOR BLANK INPUT
    \************************************/
    if (searchText.value == '') {
        phoneContainer.innerHTML = '';
        result.innerHTML = "Please search with a valid phone name!";
        result.style.background = '#1e272d';
    } else {

        const api = `https://openapi.programming-hero.com/api/phones?search=${searchText.value}`;


        searchText.value = '';
        result.innerHTML = '';
        result.style.background = 'transparent';
        fetch(api)
            .then(res => res.json())
            .then(data => showData(data.data));
        // .then(data => console.log(data.data));
    }
});


const showData = (phones) => {
    console.log(phones);
    /*************************\
        FILTER THE DATA
    \*************************/
    const phoneBox = phones.filter(element => element.brand !== undefined && element.phone_name !== undefined && element.image !== undefined && element.slug !== undefined);


    /*********************************\
        VALIDATION FOR WRONG INPUT
    \*********************************/
    if (phoneBox.length === 0) {
        result.innerHTML = '';
        result.innerHTML = 'No Result Found!';
        result.style.background = '#1e272d';
        phoneContainer.innerHTML = '';
    } else {
        const totalResult = phoneBox.length;
        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = `Total Search Result <b class="text-white">${totalResult}</b> phones showing <b class='text-white'>${phoneBox.length}</b> phones`;
        result.style.background = '#1e272d';
        result.innerHTML = '';
        result.appendChild(newParagraph);
        phoneContainer.innerHTML = '';
        phoneBox.forEach(phn => {
            const newDiv = document.createElement('div');
            const newDetailsDiv = document.createElement('div');


            /*********************************\
                DYNAMIC HTML FOR PHONE CARD
            \*********************************/
            newDiv.innerHTML = `
            <div class="card-group ">
                <div class="card shadow mb-5" style="width: 15rem;min-height:450px">
                    <img class="card-img-top img-fluid" style="width:100%; height:250px" src='${phn.image}'>
                    <div class="card-body">
                        <h5 class="card-title title "> <span class='author'>Brand: </span> ${phn.phone_name}</h5>
                        <p class="card-text publisher">Model: <span class="span">${phn.brand}</span></p>
                         <a href="#view"><button onclick='detailsLoad("${phn.slug}")' class="btn btn-primary">Details</button></a>
                        
                        
                    </div>
                </div>
            </div>`;
            phoneContainer.appendChild(newDiv);
        })
    }
}


/*****************************************\
    Function for fetch result details
\*****************************************/

const detailsLoad = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(dataset => displayDetails(dataset.data))
}


/*****************************************\
     Function for display details
\*****************************************/

const displayDetails = details => {
    const display = document.getElementById('details-card');
    display.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `

            <div class="container">
                <div class="row align-items-center ">
                    <div class="col-12 col-lg-4">
                        <img src="${details.image}" class=" ">
                    </div>
                    <div class="col-12 col-lg-8 my-auto py-2">
                        <div>
                            <h5 class="card-title title "> <span class='author'>Brand: </span> ${details.brand}</h5>
                            
                            <p class="card-subtitle author">Model: <span class="span">${details.name}</span></p>
                            <p class="card-subtitle author">Release: <span class="span">${details?.releaseDate ? details?.releaseDate : 'Not Found'}</span></p>
                            <p class="card-subtitle author">Bluetooth: <span class="span">${details.others?.Bluetooth ? details.others?.Bluetooth : "Not found"}</span></p>
                            <p class="card-subtitle author">WLAN: <span class="span">${details.others?.WLAN ? details.others?.WLAN : 'Not found'}</span></p>
                            <p class="card-subtitle author">GPS: <span class="span">${details.others?.GPS ? details.others?.GPS : 'Not found'}</span></p>
                            <p class="card-subtitle author">USB: <span class="span">${details?.others?.USB ? details?.others?.USB : 'Not found'} </span></p>
                            
                            <p class="card-subtitle author">Display: <span class="span">${details?.mainFeatures?.displaySize}</span></p>
                            <p class="card-subtitle author">ChipSet: <span class="span"> ${details?.mainFeatures?.chipSet}</span></p>
                            <p class="card-subtitle author">Sensors: <span class="span">${details?.mainFeatures?.sensors}</span></p>
                            <p class="card-subtitle author">Storage: <span class="span">${details?.mainFeatures?.storage}</span></p>
                            <p class="card-subtitle author">Memory: <span class="span">${details?.mainFeatures?.memory}</span></p>
                                                   
                        </div>
                    </div>

                </div>
            </div>
    `;

    display.appendChild(div);

}

