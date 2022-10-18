// get id of album from query string
const id = new URLSearchParams(window.location.search).get("id");

//
const main = document.querySelector(".main");

const mainFunc = async () => {
    try {
        const uri = `http://localhost:8080/albums/${id}`;
        // make request to json server using id
        const res = await fetch(uri);
        // redirect if bad req
        if (!res.ok) window.location.replace("/");
        //
        const album = await res.json();

        console.log(album);

        let template = `
        <h2>${album.title}</h2>
            <h4><a href="#" class="text-light text-decoration-none">${album.artiste}</a></h4>
            <h6><span>${album.year}</span> - <span>${album.genre}</span></h6>
            <div class="container w-50 mt-3">
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
            <div class="container">
                <a href="/albums/${album._id}/?_method=delete" class="btn btn-outline-light">Delete</a>
            </div>
        `;

        main.innerHTML = template;
    } catch (error) {
        main.innerHTML = "<p>something went wrong :(</p>";
    }
};
// <li class="list-group-item bg-dark text-light border-secondary text-start">${ song.name }</li>
window.addEventListener("DOMContentLoaded", () => mainFunc());
