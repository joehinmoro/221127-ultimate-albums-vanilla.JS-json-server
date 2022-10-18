const main = document.querySelector(".main");
const content = document.querySelector(".content");
const title = document.querySelector(".title");

const mainFunc = async () => {
    // fetch album data
    const response = await fetch("http://localhost:8080/albums");
    const data = await response.json();
    console.log(data);

    // create template
    let template = ``;
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
            <li class="list-group-item bg-dark text-light border-secondary text-start d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    ${song.name}
                </div>
            <button class="badge btn btn-outline-light rounded-pill">${song.listenCount}</button>
            </li>
            `;
        });

        template += `
            </ol>
        </div>
        <div class="card-footer">
            <a href="#" class="btn btn-outline-light btn-sm card-link"> Expand </a>
            <a href="#" class="btn btn-outline-light btn-sm card-link"> Edit </a>
            <button class="btn btn-outline-light btn-sm card-link">Delete</button>
        </div>
    </div>
</div>
`;
    });
    content.innerHTML = template;
};

// await dom load
window.addEventListener("DOMContentLoaded", () => mainFunc());
