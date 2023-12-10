document.addEventListener("DOMContentLoaded", () => {
  
    const added = [];
    
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
    const artistApi = JSON.parse(artists);
    const genreApi = JSON.parse(genres);   
    console.log("songs object", songsApi);
 
    
    // Function for the Filter options 
    function createOption(title) {
       const option = document.createElement("option");
       option.value = title;
       option.textContent = title;
       return option;
    }
    
    // Function to Default search by Title and creating the table 
    function differentSearch(title, parent) {
       const option = createOption(title);
       parent.appendChild(option);
    }
    
    //Title, Artist, and Genre Search
    songsApi.forEach(song => {
       differentSearch(song.title, document.querySelector("#titleSearch"));
    })
    artistApi.forEach((artist) => {
       differentSearch(artist.name, document.querySelector("#artistSearch"));
    });
    genreApi.forEach((genre) => {
       differentSearch(genre.name, document.querySelector("#genreSearch"));
    });
 
    // Creating the table 
    const table = document.querySelector('#table');
    const column = document.querySelector('#table');
 
    //Sort table to default to sort by title
    const titleSort = songsApi.sort((a, b) => a.title.localeCompare(b.title));

    // creating the tablesort
    createTable(titleSort);
 
    //event listener that acts on the user's sorting choice in the table
    column.addEventListener('click', function(e){
          
       const titleSelect = document.querySelector('#Title');
       const artistSelect = document.querySelector('#Artist');
       const yearSelect = document.querySelector('#Year');
       const genreSelect = document.querySelector('#Genre');
       const popularitySelect = document.querySelector('#Popularity');
 
       if(e.target == titleSelect){
          songsApi.sort((a, b) => a.title.localeCompare(b.title));
          createTable(songsApi);
       }
       else if (e.target == artistSelect)
       {
          songsApi.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
          createTable(songsApi);
       }
       else if (e.target == yearSelect)
       {
          songsApi.sort((a,b) => a.year < b.year?-1:1);createTable(songsApi);
       }else if (e.target == genreSelect)
       {
          songsApi.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
          createTable(songsApi);
       }
       else if (e.target == popularitySelect)
       {
          songsApi.sort((a,b) => a.details.popularity > b.details.popularity?-1:1);
          createTable(songsApi);
       }  
    });
 
 
    // Function to add songs to playlist 
    function addSongstoPlaylist(){
       const button = document.querySelectorAll('.addButton');
    
       for(let b of button){
             b.addEventListener('click',function(){
                const found = songsApi.find(s => s.song_id == b.getAttribute('id'));  
                if (!added.includes(found)){
                   added.push(found);
                   makeSnack('Song Has Been Added', "#snack", 3000);
                }
                else
                {
                   makeSnack('Song Has Already Been Added', "#snack", 3000);
                }
             });
          }
    }
 
 
    // Function to remove songs from the playlist 
    function removesongsforPlaylist() {
       const playTable = document.querySelector('#playlistView table');
       const button = document.querySelectorAll('.removeButton');
   
       function removeSong(event) {
           const clickedButton = event.target;
           const index = added.findIndex(song => song.song_id == clickedButton.getAttribute('id'));
           
           if (index !== -1) {
               added.splice(index, 1);
               removeTable(added, playTable);
               makeSnack('Song Has Been Removed', "#snack", 3000);
           }
       }
       for (let b of button) {
           b.addEventListener('click', removeSong);
       }
   }
   
 
 
    //Function create the main table
    function createTable(songArray){
       table.textContent = "";
       const headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];
       
       const headerRow = document.createElement('tr');
 
       //creates headers for each row
       headers.forEach(headerText => {
          const header = document.createElement('th');
          header.setAttribute('id',headerText);
          const textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
       });
 
       table.appendChild(headerRow);
       
       //loops array data to output table
       for(let sp of songArray) {
          
        // Creating the Element for Playlist table
          const tr = document.createElement('tr');
          
          const title = document.createElement('td');
          title.textContent = sp.title;
          tr.appendChild(title);
       
          const artist = document.createElement('td');
          artist.textContent = sp.artist.name;
          tr.appendChild(artist);
             
          const year = document.createElement('td');
          year.textContent = sp.year;
          tr.appendChild(year);
             
          const genre = document.createElement('td');
          genre.textContent = sp.genre.name;
          tr.appendChild(genre);
          
          const popularity = document.createElement('td');
          popularity.textContent = sp.details.popularity;
          tr.appendChild(popularity);
             
          const button = document.createElement('button');
          
          button.setAttribute('id',sp.song_id);
          button.setAttribute('class','addButton');
          button.textContent = '+';
          tr.appendChild(button);
          
          table.appendChild(tr);
       
          //creates single songles information 
          [title,artist,year,genre,popularity].forEach((title) => {
             title.addEventListener("click", function() {
                
                songInfo = document.querySelector("#songView");
                viewSearch = document.querySelector("#searchView");
                songInfo.classList.toggle('hidden');
                viewSearch.classList.toggle('hidden');
                
                // Creating Element for the song data
                const goBack = document.createElement("button");
                const viewPageTitle = document.createElement("h1");
                const songTitle = document.createElement("h3");
                const songArtist = document.createElement("h3");
                const songGenre = document.createElement("h3");
                const songYear = document.createElement("h3");
                const songDuration = document.createElement("h3");
 
                // Analysis data for single song 
                const bpm = document.createElement("ul");
                const energy = document.createElement("ul");
                const dance = document.createElement("ul");
                const liveness = document.createElement("ul");
                const valence = document.createElement("ul");
                const acoustic = document.createElement("ul");
                const speech = document.createElement("ul");
                const popularity = document.createElement("ul");
 
 
                const infoDiv = document.createElement("div");
                infoDiv.setAttribute("class", "songInfo");
 
                const songDetails = document.createElement("div");
                songDetails.setAttribute("class", "songDetails");
                
                goBack.textContent = "Go Back to Search"; 
 
                goBack.setAttribute("class", "infoBackButton");
                songInfo.appendChild(goBack);
 
                goBack.addEventListener("click", function() { 
                   songInfo.classList.toggle('hidden');
                   viewSearch.classList.toggle('hidden');
                   songInfo.textContent = "";
                }); 
 
                viewPageTitle.textContent = "Song Information";
                infoDiv.appendChild(viewPageTitle);
             
                songTitle.textContent = "Title:  " + sp.title;
                infoDiv.appendChild(songTitle);
 
                songArtist.textContent = "Artist:  " + sp.artist.name;
                infoDiv.appendChild(songArtist);
 
                songGenre.textContent = "Genre:  " + sp.genre.name;
                infoDiv.appendChild(songGenre);
 
                songYear.textContent = "Year:  " + sp.year;
                infoDiv.appendChild(songYear)
                
                songDuration.textContent = "Duration:  " + timeDuration(sp.details.duration);
                infoDiv.appendChild(songDuration);
                
                songInfo.appendChild(infoDiv);
                infoDiv.appendChild(songDetails);
 
 
             //Data for analysis radar on single song page
                bpm.textContent =  "BPM:  " + sp.details.bpm;
                songDetails.appendChild(bpm);
                
                energy.textContent = "Energy:  " + sp.analytics.energy;
                songDetails.appendChild(energy);
                
                dance.textContent = "Danceability:  " + sp.analytics.danceability;
                songDetails.appendChild(dance);
 
                liveness.textContent = "Liveness:  " + sp.analytics.liveness;
                songDetails.appendChild(liveness);
                
                valence.textContent = "Valence:  " + sp.analytics.valence;
                songDetails.appendChild(valence);
                
                acoustic.textContent = "Acousticness:  " + sp.analytics.acousticness;
                songDetails.appendChild(acoustic);
                
                speech.textContent = "Speechiness:  " + sp.analytics.speechiness;
                songDetails.appendChild(speech);
 
                popularity.textContent = "Popularity:  " + sp.details.popularity;
                songDetails.appendChild(popularity);
               
 
                //appends the radar chart to the page
                songInfo.appendChild(makeData(sp));
 
             });
          });
       }
       addSongstoPlaylist();
    }
 
    
   // Function to remove playlist view
    function removeTable(songsPassed,table){
       table.innerHTML = "";
       const headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];
       
       const headerRow = document.createElement('tr');
 
       headers.forEach(headerText => {
          const header = document.createElement('th');
          header.id = headerText;
          header.textContent = headerText;
          headerRow.appendChild(header);
       });
       
       table.appendChild(headerRow);
       
       for(let sp of songsPassed) {
          const tr = document.createElement('tr');
          const title = document.createElement('td');
 
          title.textContent = sp.title;
          tr.appendChild(title);
       
          const artist = document.createElement('td');
 
          artist.textContent = sp.artist.name;
          tr.appendChild(artist);
             
          const year = document.createElement('td');
 
          year.textContent = sp.year;
          tr.appendChild(year);
             
          const genre = document.createElement('td');
 
          genre.textContent = sp.genre.name;
          tr.appendChild(genre);
          
          const popularity = document.createElement('td');
 
          popularity.textContent = sp.details.popularity;
          tr.appendChild(popularity);
             
          const btn = document.createElement('button');
       
          btn.setAttribute('id',sp.song_id);
          btn.setAttribute('class','removeButton');
          btn.textContent = 'Remove';
          tr.appendChild(btn);
 
          table.appendChild(tr);
 
          [title,artist,year,genre,popularity].forEach((title) => {
             title.addEventListener("click", function() {
                songInfo = document.querySelector("#songView");
                preview = document.querySelector("#playlistView");
                songInfo.classList.toggle('hidden');
                preview.classList.toggle('hidden');
                
                // Creating elements for the Song data
                const goBack = document.createElement("button");
                const viewPageTitle = document.createElement("h1");
                const songTitle = document.createElement("h3");
                const songArtist = document.createElement("h3");
                const songGenre = document.createElement("h3");
                const songYear = document.createElement("h3");
                const songDuration = document.createElement("h3");

                // Creating the elements for analytic data
                const bpm = document.createElement("ul");
                const energy = document.createElement("ul");
                const dance = document.createElement("ul");
                const liveness = document.createElement("ul");
                const valence = document.createElement("ul");
                const acoustic = document.createElement("ul");
                const speech = document.createElement("ul");
                const popularity = document.createElement("ul");
                const infoDiv = document.createElement("div");
                infoDiv.setAttribute("class", "songInfo");
                const songDetails = document.createElement("div");
                songDetails.setAttribute("class", "songDetails");
                
                //Go back to playlist button
                goBack.textContent = "Go Back to Playlist"; 
                goBack.setAttribute("class", "infoBackButton");
                songInfo.appendChild(goBack);
                goBack.addEventListener("click", function() { 
 
                   songInfo.classList.toggle('hidden');
                   preview.classList.toggle('hidden');
                   songInfo.innerHTML = "";
                
                }); 
 
                // Show the song Information after the playlist view 
                viewPageTitle.textContent = "Song Information";
                songTitle.textContent = "Title:  " + sp.title;
                songArtist.textContent = "Artist:  " + sp.artist.name;
                songGenre.textContent = "Genre:  " + sp.genre.name;
                songYear.textContent = "Year:  " + sp.year;
                songDuration.textContent = "Duration:  " + timeDuration(sp.details.duration);

                // Appending the song information 
                infoDiv.appendChild(viewPageTitle);
                infoDiv.appendChild(songTitle);
                infoDiv.appendChild(songArtist);
                infoDiv.appendChild(songGenre);
                infoDiv.appendChild(songYear);
                infoDiv.appendChild(songDuration);
                songInfo.appendChild(infoDiv);
                infoDiv.appendChild(songDetails);

                bpm.textContent =  "BPM:  " + sp.details.bpm;
                energy.textContent = "Energy:  " + sp.analytics.energy;
                dance.textContent = "Danceability:  " + sp.analytics.danceability;
                liveness.textContent = "Liveness:  " + sp.analytics.liveness;
                valence.textContent = "Valence:  " + sp.analytics.valence;
                acoustic.textContent = "Acousticness:  " + sp.analytics.acousticness;
                speech.textContent = "Speechiness:  " + sp.analytics.speechiness;
                popularity.textContent = "Popularity:  " + sp.details.popularity;
                
                songDetails.appendChild(bpm);
                songDetails.appendChild(energy);
                songDetails.appendChild(dance);
                songDetails.appendChild(liveness);
                songDetails.appendChild(valence);
                songDetails.appendChild(acoustic);
                songDetails.appendChild(speech);
                songDetails.appendChild(popularity);
 
                songInfo.appendChild(makeData(sp));
 
             });
          });
       }
       removesongsforPlaylist();
       
    }
 
    // function to display the number of songs in list 
    function updatedplaylistinfo(playlist) {
       const playAvgInfo = document.querySelector('#playlistInfo'); 
       playAvgInfo.innerHTML = 'Songs already In the Playlist : ${playlist.length}';
    }
 
    //Check for radio selection 
    const selectionInputs = document.querySelectorAll('input[name="selection"]');
    if (selectionInputs.length > 0) {
    selectionInputs.forEach((element) => {
       element.addEventListener("change", function(event) {
          const item = event.target.value;
          console.log(item);
          filterSelect(event);
       });
        });
    }
 
 
    // Filter for main page that changes the sort based on user selection
    function filterSelect(event) {
       const filter = event.target.value;
       const hide = document.querySelectorAll("#searchType .hide");
       hide.forEach(hidden => hidden.classList.remove("hide"));
   
       const word = [];
   
       if (filter == "filterTitle") {
           word.push(document.querySelector("#artistSearch").parentElement);
           word.push(document.querySelector("#genreSearch").parentElement);
       } 
       else if (filter == "filterArtist") 
       {
           word.push(document.querySelector("#titleSearch").parentElement);
           word.push(document.querySelector("#genreSearch").parentElement);
       } 
       else if (filter == "filterGenre") 
       {
           word.push(document.querySelector("#titleSearch").parentElement);
           word.push(document.querySelector("#artistSearch").parentElement);
       }
   
       word.forEach(elementType => elementType.classList.add("hide"));
    }
 
 
    //Filter button to apply current filters and search
    document.querySelector("#filterButton").addEventListener("click", (e) => {
       e.preventDefault();
       let searchType;
       let filter;
       
       if (document.querySelector('#titleSearch').value) {
          searchType = 'title';
          filter = document.querySelector('#titleSearch').value;
       }
        else if (document.querySelector('#artistSearch').value) 
        {
          searchType = 'artist';
          filter = document.querySelector('#artistSearch').value;
        } 
       else if (document.querySelector('#genreSearch').value)
        {
          searchType = 'genre';
          filter = document.querySelector('#genreSearch').value;
        }
 
       //creates new array to generate table
       let newArray = [];
 
       if (searchType == 'title'){
          newArray = songsApi.filter(s => s.title.toLowerCase().includes(filter.toLowerCase()));
          document.querySelector('#titleSearch').value = '';
 
       }else if (searchType == 'artist'){
 
          newArray = songsApi.filter(s => s.artist.name == filter);
          document.querySelector('#artistSearch').value = '';
       }else if (searchType == 'genre'){
 
          newArray = songsApi.filter(s => s.genre.name == filter);
          document.querySelector('#genreSearch').value = '';
       }  
       createTable(newArray);
    });
 
    //clear button to clear filters on mainview
    document.querySelector("#clearButton").addEventListener("click", function (e){
       e.preventDefault();
       createTable(songsApi);
    });
 
    //view playlist button to go to the playlist view   
    document.querySelector("#viewPlaylist").addEventListener("click", function(e){
    e.preventDefault();
 
    const playView = document.querySelector('#playlistView');
    const makeTable = document.createElement('table');
    
    playView.appendChild(makeTable);
 
    //selects the new table made in playlist view
    const playTable = document.querySelector('#playlistView table');
 
    //variables to access each view
    const playlistView = document.querySelector("#playlistView");
    const viewSearch = document.querySelector("#searchView");
    
    //unhides playlist view, hides view search 
    playlistView.classList.toggle('hidden');
    viewSearch.classList.toggle('hidden');
 
    removeTable(added, playTable);
   });
    
    //clear playlist button to clear songs in playlist
    document.querySelector("#clearPlaylist").addEventListener("click", function () {
       added.length = 0;
    
       const playTable = document.querySelector('#playlistView table');
       removeTable(added, playTable);
    });
    
 
    //button to close the playlist view and go back to main view
    function closePlayviewClick() {
       const playlistView = document.querySelector("#playlistView");
       const viewSearch = document.querySelector("#searchView");
   
       playlistView.classList.toggle('hidden');
       viewSearch.classList.toggle('hidden');
    }
   
   document.querySelector("#closePlayview").addEventListener("click", closePlayviewClick);
   
 
    //credits button 
    const showCreditsSnack = () => {
       makeSnack('', "#credits-snack", 5000);
    };
 
    document.querySelector('#credits-btn').addEventListener('mouseover', showCreditsSnack);
    
  
    // function for snack bar 
    function makeSnack(notify, snackBar, timer) {
       const snack = document.querySelector(snackBar);
       if (snackBar === '#snack') {
          snack.textContent = notify;
       }
       snack.classList.add("show");
       setTimeout(() => { snack.classList.remove("show") }, timer);
    }
    
 
    //Function to calculate the duration COME BACK
    function timeDuration(sec) {
     let min = Math.floor(sec / 60);
     newSec = sec % 60;
     min = min < 10 ? + min : min;
     newSec = newSec < 10 ? "0" + newSec : newSec;
     return min + ":" + newSec;
    }
 
 
   //Function that makes the data visible on the radarr ca
    function makeData(song) {
       const div = document.createElement("div");
       const radarDiv = document.createElement("div");
       radarDiv.setAttribute('id', 'radarContainer');
       const canvas = document.createElement("canvas");
       canvas.setAttribute('id', 'radarChart');
       
       radarDiv.appendChild(canvas);
 
       radarDiv.style.width = 500 + "px";
       radarDiv.style.height = '500px';
 
       drawChart(canvas, song);
       div.appendChild(radarDiv);
       return div;
    }
 
  
    function drawChart(canvas, song) {
       console.log(song)
       new Chart(canvas, {
          type: 'radar',
          data: {
             //labels needed
             labels: ['Dance',
                      'Energy', 
                      'Speech', 
                      'Acoustic', 
                      'Liveness', 
                      'Valence'],
 
             datasets: [{
                   label: 'Song Analytics',
                   data: [song.analytics.danceability, 
                          song.analytics.energy, 
                          song.analytics.speechiness, 
                          song.analytics.acousticness, 
                          song.analytics.liveness, 
                          song.analytics.valence],
 
                   fill: true,
 
                   backgroundColor: 'rgba(30, 215, 96, 0.5)',
                   borderColor: '#1DB954',
                   pointBackgroundColor: '#1DB954',
                   pointBorderColor: '#fff',
                   pointHoverBackgroundColor: '#fff',
                   pointHoverBorderColor: 'rgb(255, 99, 132)'
             }]
          },
          //styling for the radar
          options: {
             plugins: {
                legend:{
                   display: true,
                   labels: {color: "white"},
                },
                title: {
                   display: true,
                   text: `${song.title}`,
                   align: 'center',
                   color: 'white',
                   font:{
                         family: 'serif',
                         color: 'white',
                         size: 20,
                         weight: 400
                   }
                }
             },
             scales: {
                r: {
                   ticks: {
                         color: "white",
                         backdropColor: "transparent",
                         textStrokeWidth: 5,
                         font:{
                            family: 'serif',
                            size: 13
                         }
                   },
                   pointLabels: {
                         color: 'white',
                         font:{
                            family: 'serif',
                            size: 14,
                            weight: 'bold'
                         }
                   },
                   grid: {
                         circular: true,
                         color: "white"
                   },
                   suggestedMin: 0,
                }
             },
             responsive: true,
             elements: {
                line: {
                   borderWidth: 2
                }
             }
       }
       });
    }
 });
 
 
 