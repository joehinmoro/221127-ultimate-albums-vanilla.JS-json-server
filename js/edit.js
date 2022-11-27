// get id from query string
const id = new URLSearchParams(window.location.search).get("id");

// Query DOM element
const main = document.querySelector("main");

// load function
const loadFunc = async () => {
    try {
        const uri = `http://localhost:8080/albums/${id}`;
        const response = await fetch(uri);
        const album = await response.json();
        album.songs = album.songs.join(", ");
        console.log(album);
        const title = album;

        main.innerHTML = `
    <h2 class="text-center">Edit Album</h2>
    <div class="container mt-5 form-container-div"></div>
    <div class="col-md-8 col-lg-6 col-xl-5 mx-auto">
    <form>
        <div class="row">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control bg-dark text-light"
                        id="floatingInput"
                        placeholder="Title"
                        name="title"
                        value="${album.title}"
                    />
                    <label for="floatingInput">Title</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control bg-dark text-light"
                        id="floatingInput"
                        placeholder="Artiste"
                        name="artiste"
                        value="${album.artiste}"
                    />
                    <label for="floatingInput">Artiste</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control bg-dark text-light"
                        id="floatingInput"
                        placeholder="Songs"
                        name="songsCSV"
                        value="${album.songs}"
                    />
                    <label for="floatingInput">
                        Songs (seperate with single space and comma)
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control bg-dark text-light"
                        id="floatingInput"
                        placeholder="Genre"
                        name="genre"
                        value="${album.genre}"
                    />
                    <label for="floatingInput">Genre</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control bg-dark text-light"
                        id="floatingInput"
                        placeholder="Year Released"
                        name="year"
                        value="${album.year}"
                    />
                    <label for="floatingInput">Year</label>
                </div>
            </div>
        </div>

        <div class="container text-center mt-4">
            <button class="btn btn-lg btn-outline-light">Edit Album</button>
        </div>
    </form>
</div>    
`;
    } catch (error) {
        formContainer.innerHTML =
            "<p>something went wrong :(</p>\n<p>return <a href='/index.html'>home</a></p>";
    }

    //
    //
    // select form
    const form = document.querySelector("form");

    form.addEventListener("submit", async (evt) => {
        //
        evt.preventDefault();
        const artiste = form.artiste.value;
        const title = form.title.value;
        const songsCSV = form.songsCSV.value;
        const genre = form.genre.value;
        const year = form.year.value;
        console.log(artiste, title, songsCSV, genre, year);

        //
        const songs = songsCSV.split(", ");
        const requestBody = { artiste, title, songs, genre, year };
        //
        await fetch(`http://localhost:8080/albums/${id}`, {
            method: "PATCH",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
        });
        //
        window.location.replace("/index.html");
    });
};

// window on load
window.addEventListener("DOMContentLoaded", loadFunc);
