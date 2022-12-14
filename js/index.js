// handle page title
const title = document.querySelector("title");
title.textContent = "Albums";

let recent = true;
let desc = true;

// page main content div
const main = document.querySelector(".main");
// search div
// <form class="search-form"
document.querySelector(".search-container").innerHTML = `
<div class="row">
    <div class="col-sm-12 col-md-4 col-lg-3 ms-auto">
        <div class="form-floating mb-3">
            <input
                type="text"
                class="form-control bg-dark text-light search"
                id="floatingInput"
                placeholder="search"
                name="search"
            />
            <label for="floatingInput">search</label>
        </div>
    </div>
</div>
`;
// </form>

// main function (index route)
const mainFunc = async (term) => {
    try {
        // construct uri
        let uri = `http://localhost:8080/albums?_sort=&_order=`;

        // validate search term
        if (term) uri += `&q=${term}`;

        // fetch album data
        const response = await fetch(uri);
        const data = await response.json();
        console.log(data);

        // create template
        let template = `
<h3 class="heading mt-3">${term ? term : "All Albums"}</h3>
<div class="content row mt-3">
`;
        // insert all album data to template if search term is valid
        if (data.length) {
            data.map((album) => {
                template += `      
<div class="col-sm-12 col-md-6 col-lg-4 mt-3">
        <div class="card text-bg-dark border-light mx-auto h-100 text-center">
        <div class="card-body">
            <h5 class="card-title">
                <a href="#" class="text-light text-decoration-none"> ${album.title} </a>
            </h5>
            <h6 class="card-subtitle mb-2">
                <a href="" class="text-muted text-decoration-none"> ${album.artiste} </a>
            </h6>
            <h6 class="card-subtitle mb-2">
                <a href="" class="text-muted text-decoration-none">
                    ${album.genre} | ${album.year}
                </a>
            </h6>
            <ol class="list-group list-group-numbered list-group-flush">
        `;

                album.songs.map((song) => {
                    template += `
            <li class="list-group-item bg-dark text-light border-secondary text-start">${song}</li>
            `;
                });

                template += `
            </ol>
        </div>
        <div class="card-footer">
            <a href="/details.html?id=${album.id}" class="btn btn-outline-light btn-sm card-link"> Expand </a>
            <a href="/edit.html?id=${album.id}" class="btn btn-outline-light btn-sm card-link"> Edit </a>
            <button onclick="delFunc(${album.id})"  class="delete-btn btn btn-sm btn-outline-light card-link">Delete</button>
        </div>
    </div>
</div>
`;
            });
        } else {
            // search term not found
            template += `
    <div><p>${term} not found :(</p></div>            
`;
        }
        // closing div tag for row
        template += "</div>";
        // set main div to template
        main.innerHTML = template;
    } catch (error) {
        // handle errors
        console.log(error);
        main.innerHTML = `<p>something went wrong :(</p>`;
    }
};

// delete album function (inline)
const delFunc = async function (id) {
    // delete request
    await fetch(`http://localhost:8080/albums/${id}`, { method: "DELETE" });
    // redirect to index
    window.location.replace("/index.html");
};

// handle search
document.querySelector(".search").addEventListener("input", function () {
    console.log(this.value);
    mainFunc(this.value.trim());
});

// await dom load
window.addEventListener("DOMContentLoaded", () => mainFunc());
