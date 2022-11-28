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
        const title = document.querySelector("title");
        title.textContent = album.title;
        console.log(album);

        let template = `
        <h2>${album.title}</h2>
            <h4><a href="#" class="text-light text-decoration-none">${album.artiste}</a></h4>
            <h6><span>${album.year}</span> - <span>${album.genre}</span></h6>
            <div class="container row mt-3">
            <div class="col-md-8 col-lg-6 mx-auto">
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
            </div>
            <div class="container ">
            <a href="/edit.html?id=${album.id}" class="btn btn-outline-light card-link"> Edit </a>
                <button  class="delete-btn btn btn-outline-light">Delete</button>
            </div>
        `;

        main.innerHTML = template;
    } catch (error) {
        main.innerHTML =
            "<p>something went wrong :(</p>\n<p>return <a href='/index.html'>home</a></p>";
    }

    //
    document.querySelector(".delete-btn").addEventListener("click", async () => {
        await fetch(`http://localhost:8080/albums/${id}`, { method: "DELETE" });
        window.location.replace("/index.html");
    });
};
// <li class="list-group-item bg-dark text-light border-secondary text-start">${ song.name }</li>
window.addEventListener("DOMContentLoaded", () => mainFunc());
