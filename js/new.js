// select main div
const main = document.querySelector("main");

// main function (new route)
const mainFunc = () => {
    // insert new album form into main div
    main.innerHTML = `
<h2 class="text-center">New Album</h2>
            <div class="container mt-5">
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
                                    />
                                    <label for="floatingInput">Year</label>
                                </div>
                            </div>
                        </div>

                        <div class="container text-center mt-4">
                            <button class="btn btn-lg btn-outline-light">Create Album</button>
                        </div>
                    </form>
                </div>
            </div>
`;

    // select new album form and listen for submit
    const form = document.querySelector("form");
    form.addEventListener("submit", async (evt) => {
        // prevent submit and extract field values
        evt.preventDefault();
        const artiste = form.artiste.value;
        const title = form.title.value;
        const songsCSV = form.songsCSV.value;
        const genre = form.genre.value;
        const year = form.year.value;
        console.log(artiste, title, songsCSV, genre, year);

        // parse song csv to array
        const songs = songsCSV.split(", ");
        // new album array
        const requestBody = { artiste, title, songs, genre, year };
        // post request (new)
        await fetch("http://localhost:8080/albums", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
        });
        // redirect to index
        window.location.replace("/index.html");
    });
};

window.addEventListener("DOMContentLoaded", mainFunc);
