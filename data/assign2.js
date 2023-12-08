document.addEventListener("DOMContentLoaded", function () {

    // fetching the data 

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
        songs = JSON.parse(localStorage.getItem("song"));
        loadSongs(songs);
    }

    // function to load the songs 

    function loadSongs(data) {
        console.log(data);
        localStorage["song"] = JSON.stringify(data);
    }

    const songsApi = JSON.parse(localStorage.getItem("song"));
    const artist = JSON.parse(artists);
    const genre = JSON.parse(genres);   
    console.log("songs object", songsApi);


    //Filter (not working)
    function listOutput(title, parent) {
        const option = document.createElement("option");
        option.value = title;
        option.textContent = title;
        parent.appendChild(option);
     }



    //  songApi.forEach(song => {
    //     listOutput(song.title, document.querySelector("#titleSearch")); 
    //  })
    //  const titlesort = song.sort((a,b) => a.title.localeCompare(b.title)); 
    //  generateTable(titlesort);

  
     
    const added = []; 

    // Reusable function to output a list
    function outputList(data, target) {
        data.forEach(item => {
            listOutput(item.name, document.querySelector(target));
        });
    }

    outputList(songsApi, "#titleSearch");
    outputList(artist, "#artistSearch");
    outputList(genre, "#genreSearch");

    const generatetable = document.querySelector('#table'); 
    let column = document.querySelector('#table'); 

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
     



     // Filters the search bease on the selected value 
     function filterselect(event){
        const filter = event.target.value;
        console.log(event.target); 

        const hide = document.querySelectorAll("#searchType .hide"); 
        hide.forEach(hidden => (hidden.classList.remove("hide")));
        const word = [];
        console.log(filter);

        if (filter == "titlefilter") {
            word.push(document.querySelector("#artistSearch").parentElement);
            word.push(document.querySelector("#genreSearch").parentElement); 
        }
        else if (filter == "artistfilter") {
            word.push(document.querySelector("#titleSearch").parentElement); 
            word.push(document.querySelector("#genreSearch").parentElement);
        }
        else if (filter == "genrefilter") {
            word.push(document.querySelector("#titleSearch").parentElement); 
            word.push(document.querySelector("#genreSearch").parentElement);
        }
        word.forEach(elementType => (elementType.classList.add("hide"))); 
     }


     // filter button 
        
    //   function to display the main table 
    function generateTable(songsApi) {
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
        
        tableRow.appendChild( createSongColumn(s, 'title') );
        tableRow.appendChild( createSongColumn(s.artist, 'name') );
        tableRow.appendChild( createSongColumn(s, 'year') );
        tableRow.appendChild( createSongColumn(s.genre, 'name') );
        tableRow.appendChild( createSongColumn(s.details, 'popularity') );
				
        const button = document.createElement('button');
               
        button.setAttribute('id',s.song_id);
        button.setAttribute('class','addBtn');
        button.textContent = '+';
        tableRow.appendChild(button);
               
        table.appendChild(tableRow);
     }
        // instead of a lot of copy and pasting of rows
        function createSongColumn(obj, fieldName) {
            const td = document.createElement('td');
            td.textContent = obj[fieldName];
            return td;
        }
    }

        // creating and adding songs to playlist 
        function addPlaylist() {
            const buttons = document.querySelectorAll('.addButton');
         
            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const songId = button.getAttribute('id');
                    const found = songsApi.find(song => song.song_id == songId);
         
                    if (found && !added.includes(found)) {
                        added.push(found);
                        console.log('Song Has Been Added');
                    } else {
                        console.log('Song Has Already Been Added');
                        console.log('Duplicate');
                    } // Change these to display as a pop-up***
                });
            });
         }

         // function to display the playlist view 


         // function to remove playlist 
         function removeplaylist(){
            let generateTable = document.querySelector('#playlistview'); 
            const button = document.querySelectorAll('.removebtn'); 

            for(let b of button){
                b.addEventListener('click', function(){
                    const index = added.findIndex(song => {
                        return song.song_id == b.getAttribute('id');
                    }); 
                    button.splice(index, 1); 
                    removetable(added, generateTable); 
                    console.log('Song has been removed');
                });
            }
         }


         // function to generate table for playlist view 
        
    
         // function to clear songs from playlist 

         document.querySelector("#clearPlaylist").addEventListener("click", function(){
            while(added.length > 0) {
                added.pop(); 
            }
            let playlisttable = document.querySelector('#playlistView table');
            removeplaylist(added, playlisttable);
         }); 

         // function to close playlist view 
         document.querySelector("#closePlaylist").addEventListener("click", function(){
            let playlistView = document.querySelector("#playlistView");
            let searchPage = document.querySelector("#searchPage");

            playlistView.classList.toggle('hidden');
            searchPage.classList.toggle('hidden');
         });


         // radar analytics 
         
    });
  