document.addEventListener("DOMContentLoaded", function () {

    if (!localStorage.getItem("song")) {
        const url = "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                loadSongs(data);
            })
            .catch(err => {
                console.error("Error fetching:", err);
            });
    } else {
        const songs = JSON.parse(localStorage.getItem("song"));
        loadSongs(songs);
    }

    function loadSongs(data) {
        console.log(data);
        localStorage["song"] = JSON.stringify(data);
    }

    const songsApi = JSON.parse(localStorage.getItem("song"));
    const artist = JSON.parse(artists); // Note: 'artists' variable is not defined in the provided code.
    const genre = JSON.parse(genres);   // Note: 'genres' variable is not defined in the provided code.
    console.log("songs object", songsApi);

    //Filter (not working)
    function listOutput(title, parent) {
        const option = document.createElement("option");
        option.value = title;
        option.textContent = title;
        parent.appendChild(option);
     }

    // Reusable function to output a list
    function outputList(data, target) {
        data.forEach(item => {
            listOutput(item.name, document.querySelector(target));
        });
    }

    outputList(songsApi, "#titleSearch");
    outputList(artist, "#artistSearch");
    outputList(genre, "#genreSearch");


    // Sort by title
    songsApi.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);    
    generateTable(songsApi);


        document.querySelector('#table').addEventListener('click', function (e) {
            handleTableClick(e);
        });
    
        function handleTableClick(e) {
            const selectId = e.target.id;
        
            switch (selectId) {
                case 'Title':
                    sortTable(samp, 'title', 'title');
                    break;
                case 'Artist':
                    sortTable(samp, 'artist.name', 'artist');
                    break;
                case 'Year':
                    sortTable(samp, 'year', 'year');
                    break;
                case 'Genre':
                    sortTable(samp, 'genre.name', 'genre');
                    break;
                case 'Popularity':
                    sortTable(samp, 'details.popularity', 'popularity');
                    break;
                default:
                    break;
            }
        }
    
        function sortTable(data, key, id) {
            const keys = key.split('.');
        
            data.sort((a, b) => {
                let aValue = a;
                let bValue = b;
        
                for (const k of keys) {
                    aValue = aValue[k];
                    bValue = bValue[k];
                }
        
                return aValue > bValue ? 1 : -1;
            });
        
            generateTable(data);
        }
        
    function generateTable(songsApi){
    table.textContent = "";
    const headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];
                    
    // Using 'map' to create header for table 
    const headerRow = document.createElement('tr');

    headers.map(headerText => {
        const header = document.createElement('th');
        header.id = headerText;
        header.appendChild(document.createTextNode(headerText));
        return header;
    }).forEach(header => headerRow.appendChild(header));
    
     table.appendChild(headerRow);
            
   //loop to output table

     for(let s of songsApi) {
        const tableRow = document.createElement('tr');

        const title = document.createElement('td');
        title.textContent = s.title;
        tableRow.appendChild(title);
            
        const artist = document.createElement('td');
        artist.textContent = s.artist.name;
        tableRow.appendChild(artist);
                  
        const year = document.createElement('td');
        year.textContent = s.year;
        tableRow.appendChild(year);
                  
        const genre = document.createElement('td');
        genre.textContent = s.genre.name;
        tableRow.appendChild(genre);
               
        const popularity = document.createElement('td');
        popularity.textContent = s.details.popularity;
        tableRow.appendChild(popularity);
                  
        const button = document.createElement('button');
               
        button.setAttribute('id',s.song_id);
        button.setAttribute('class','addBtn');
        button.textContent = '+';
        tableRow.appendChild(button);
               
        table.appendChild(tableRow);
            
            }}});
  