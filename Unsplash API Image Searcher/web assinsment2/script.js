const key = "i3rK8R7M0xW5fHsRWp4VXYc8w-9kFchGyBDplHLmVuE";

const formE = document.querySelector("form");
const input = document.getElementById("search-input");
const search_results = document.querySelector(".search-results");
const show_more = document.getElementById("show-more");
const clear_results = document.getElementById("clear-results");

let inputData = "";
let page = 1;

async function search_image() {
    inputData = input.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        const results = data.results;

        if (results.length === 0) {
            alert("No results found. Try a different search term.");
        }

        if (page === 1) {
            search_results.innerHTML = "";
        }

        results.map((result) => {
            const image_box = document.createElement("div");
            image_box.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small; 
            image.alt = result.alt_description; 

            const imgLink = document.createElement("a");
            imgLink.href = result.links.html; 
            imgLink.target = "_blank"; 
            imgLink.textContent = result.alt_description; 

            const userInfo = document.createElement("p");
            userInfo.textContent = `By ${result.user.username}`; 

            const likesInfo = document.createElement("p");
            likesInfo.textContent = `Likes: ${result.likes}`; 

            const downloadLink = document.createElement("a");
            downloadLink.href = result.links.download; 
            downloadLink.target = "_blank"; 
            downloadLink.textContent = "Download"; 

            // append html elements to the search results container to show on the web page
            image_box.appendChild(image);
            image_box.appendChild(imgLink);
            image_box.appendChild(userInfo);
            image_box.appendChild(likesInfo);
            image_box.appendChild(downloadLink);

            search_results.appendChild(image_box);
        });

        page++;

        if (page > 1 && results.length > 0) {
            show_more.style.display = "block";
            clear_results.style.display = "block";
        }
    } else {
        // handle errors and display informative messages to the user
        results.addEventListener("invalid", anError);
    }
}

function anError() {
    alert("An error occurred when fetching data. Please try again later.");
}

formE.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    search_image();
});

show_more.addEventListener("click", () => {
    search_image();
});

clear_results.addEventListener("click", () => {
    search_results.innerHTML = "";
    page = 1;
    show_more.style.display = "none";
    clear_results.style.display = "none";
});
