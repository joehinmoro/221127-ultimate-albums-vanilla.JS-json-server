// page title
const title = document.querySelector("title");
title.textContent = "Albums";

// page main content div
const main = document.querySelector(".main");

const mainFunc = async () => {
    try {
        // fetch album data
        const response = await fetch("http://localhost:8080/albums");
        const data = await response.json();
        console.log(data);

        // create template
        let template = `
<h3 class="heading mt-3">All Albums</h3>
<div class="content row mt-3">
`;

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
    await fetch(`http://localhost:8080/albums/${id}`, { method: "DELETE" });
    window.location.replace("/index.html");
};
// await dom load
window.addEventListener("DOMContentLoaded", () => mainFunc());
