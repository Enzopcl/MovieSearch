// Selectors
const form = document.querySelector('#searchForm');
const input = document.querySelector('#searchInput');
const container = document.querySelector('#container');
const imgDiv = document.querySelector('.imgDiv');

// Event Listeners 
form.addEventListener('submit', async function(e){
    e.preventDefault();
    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${input.value}`);
        input.value = "";
        clearBox();
        infoImg(res.data);
    } catch (e) {
        console.log('Error', e);
    }
});

// Functions 
const infoImg = (img) => {
    for( let result of img){
        if(result.show.image) {
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('imgDiv');
            // create img
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            imgDiv.appendChild(img);
            // Append To list
            container.appendChild(imgDiv);
            // Event Listener
            img.addEventListener('click', (e) => {
                const item = e.target;
                if(item.src){
                // Blur the img
                item.classList.toggle('info');
                    // add Text 
                    if(imgDiv.childNodes.length < 2) {
                        const ratingDiv = document.createElement('div');
                        ratingDiv.classList.add('rating');
                        const text = document.createElement('p');
                        text.classList.add('infoResource');
                        const rating = document.createElement('p');
                        // If network not null
                        text.innerHTML = result.show.network !== null ? result.show.network.name : 'None';
                        rating.innerHTML = result.show.rating !== null ? result.show.rating.average : 'None';
                        rating.classList.add('infoResource');
                        imgDiv.appendChild(ratingDiv);
                        ratingDiv.appendChild(rating);
                        ratingDiv.appendChild(text);
                    } else {
                        imgDiv.childNodes[1].classList.toggle('gone');
                    }
                }
            })
          }
    }
}

function clearBox(){
    if(container.childNodes.length !== 0){
        document.getElementById('container').innerHTML = "";
    }
}

