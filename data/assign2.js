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



    //  songsApi.forEach(song => {
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

    // Sort by title, artist and genre
    songsApi.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);    
    generateTable(songsApi);

    // artist.forEach((artist) => {
    //     outputList(artist.name, document.querySelector("#artistSearch"));
    // })

    // genre.forEach((genre) => {
    //     outputList(genre.name, document.querySelector("genreSearch"));
    // })


        document.querySelector('#table').addEventListener('click', function (e) {
            handleTableClick(e);
        });
    
        function handleTableClick(e) {
            const selectId = e.target.id;
        
            switch (selectId) {
                case 'Title':
                    sortTable(songsApi, 'title', 'title');
                    break;
                case 'Artist':
                    sortTable(songsApi, 'artist.name', 'artist');
                    break;
                case 'Year':
                    sortTable(songsApi, 'year', 'year');
                    break;
                case 'Genre':
                    sortTable(songsApi, 'genre.name', 'genre');
                    break;
                case 'Popularity':
                    sortTable(songsApi, 'details.popularity', 'popularity');
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

            for(let b of button){
                b.addEventListener('click', function(){
                    const found = songsApi.find(s.song_id == b.getAttribute('id')); 
                    if(!added,includes(found)) {
                        added.push(found); 
                        console.log('song has been added');
                    }
                    else {
                        console.log('song has already been added'); 
                    }
                })
            }
         
            // buttons.forEach(button => {
            //     button.addEventListener('click', function () {
            //         const songId = button.getAttribute('id');
            //         const found = songsApi.find(song => song.song_id == songId);
         
            //         if (found && !added.includes(found)) {
            //             added.push(found);
            //             console.log('Song Has Been Added');
            //         } else {
            //             console.log('Song Has Already Been Added');
            //             console.log('Duplicate');
            //         } // Change these to display as a pop-up***
            //     });
            // });
         }


         // function to display the playlist view 

         function playtable(songspassed, table){
           table.innerHTML = "";
            const headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];

            const headerRow = document.createElement('tr'); 

            headers.forEach(headerText => {
                const header = document.createElement('th'); 
                header.setAttribute('id',headerText);
                const innerHTML = document.createTextNode(headerText); 
                header.appendChild(textNode); 
                headerRow.appendChild(header); 
            }); 

            table.appendChild(headerRow); 

            for(let sp of songspassed) {
                const tr = document.createElement('tr');
                const title = document.createElement('td');

                title.textContent = sp.artist.name; 
                tr,appendChild(artist);

                const year = document.createElement('td'); 
                year.innerHTML = sp.year;
                tr.appendChild(year);

                const genre = document.createElement('td');
                genre.innerHTML=sp.genre.name;
                tr.appendChild(genre);

                const popularity = document.createElement('td');
                popularity.innerHTML = s.details.popularity;
                tr.appendChild(popularity);

                const button = document.createElement('button');
                button.setAttribute('id', sp.song_id); 
                button.setAttribute('class', 'removebutton'); 
                button.textContent = "Remove";
                tr.appendChild(button); 

                table.appendChild(tr); 
                

                [title,artist,yrar,genre,popularity].forEach((title) => {
                    title.addEventListener("click", function(){
                        songinformation = document.querySelector('#songView');
                        display = document.querySelector('#playlistView');
                        songinformation.classList.toggle('hidden');
                        display.classList.toggle('hidden'); 

                        const returnback = document.createElement("button");
                        const viewpagetitle = document.createElement("h1"); 
                        const songtitle = document.createElement("h3");
                        const songartist = document.createElement("h3");
                        const songgenre = document.createElement("h3");
                        const songyear = document.createElement("h3");
                        const songduration = document.createElement("h3"); 

                        returnback.textContent = "Back to playlist";
                        returnback.setAttribute("class", "BackButton"); 
                        songinformation.appendChild(goback);
                        goback.addEventListener("click", function() {
                            songinformation.classList.toggle('hidden');
                            display.classList.toggle('hidden');
                            songinformation.innerHTML = ""; 

                        

                        });

                        const bpm = document.createElement("li"); 
                        bpm.textContent = "BPM: " +sp.details.bpm;
                        songdetails.appendChild(bpm);
                        const energy = document.createElement("li"); 
                        energy.textContent = "Energy: " +sp.analytics.energy;
                        songdetails.appendChild(energy);
                        const dance = document.createElement("li"); 
                        dance.textContent = "Danceability: " +sp.analytics.danceability;
                        songdetails.appendChild(dance);
                        const liveness = document.createElement("li"); 
                        liveness.textContent = "Liveness: " +sp.analytics.liveness;
                        songdetails.appendChild(liveness);
                        const valence = document.createElement("li"); 
                        valence.textContent = "Valence: " +sp.analytics.valence;
                        songdetails.appendChild(valence);
                        const acoustic = document.createElement("li"); 
                        acoustic.textContent = "Acousticness: " +sp.analytics.acoustic;
                        songdetails.appendChild(acoustic);
                        const speech = document.createElement("li"); 
                        speech.textContent = "Speechiness: " +sp.analytics.speechiness;
                        songdetails.appendChild(speech);
                        const popularity = document.createElement("li"); 
                        popularity.textContent = "Popularity: " +sp.details.popularity;
                        songdetails.appendChild(popularity);


                        const informationdiv = document.createAttribute("div");
                        informationdiv.setAttribute("class", "song information");
                        const songdetails = document.createElement("div");
                        songdetails.setAttribute("class", "songDetails");

                        viewpagetitle.textContent = "song information"; 
                        informationdiv.appendChild(viewpagetitle);

                        songtitle.textContent = "Title: " + sp.title;
                        informationdiv.appendChild(songtitle); 

                        songartist.textContent = "Artist: " + sp.artist.name;
                        informationdiv.appendChild(songartist); 

                        songgenre.textContent = "Genre: " + sp.genre.name;
                        informationdiv.appendChild(songgenre); 

                        songyear.textContent = "Year: " + sp.year;
                        informationdiv.appendChild(songyear); 

                        songduration.textContent = "Duration: " + timeduration(sp.details.duration); 
                        informationdiv.appendChild(songduration); 

                           
                        songinformation.appendChild(informationdiv);
                        informationdiv.appendChild(songdetails); 

                        songinformation.appendChild(makedata(s));

                    });
                });

             }

             playtable(); 

             // Number of the songs in the list 
             let songsinlist = document.querySelector('#playlistInfo'); 

             songsinlist.innerHTML = `Songs in the List for the Playlist: ${added.length}`;
         }
    

         // view playlist button 
         document.querySelector("#playlistView").addEventListener("click", function(e){
            e.preventDefault(); 

            const playView = document.querySelector("#playlistView"); 
            const maketable = document.createElement('table');

            playlistView.appendChild(maketable); 
            const playtable = document.querySelector("#playlistView"); 
            const playlistView = docuemnt.querySelector("#playlistView"); 
            const searchPage = document.quertselector("#searchView"); 
            playlistView.classList.toggle('hidden'); 
            searchPage.classList.toggle('hidden'); 

            playtable(added, playtable); 
         });
         

         // function to remove playlist 
         function removeplaylist(){
            const generateTable = document.querySelector('#playlistview'); 
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
         function makedata(song){
            const div = document.createElement("div");
            let radardiv = document.createElement("div");
            radardiv.setAttribute('id', 'radarContainer');
            let canvas = document.createElement("canvas");
            canvas.setAttribute('id', 'radarchart'); 

            radardiv.appendChild(canvas);
            radardiv.style.width = 500 + "px";
            radardiv.style.height = '500px';

            chart(canvas, song);
            div.appendChild(radardiv);
            return div;
         }

         function chart(canvas, song){
            console.log(song)
            new chart(canvas, {
                type: 'Radar chart',
                data: {
                    labels: [
                    'Danceability',
                    'energy',
                    'valence',
                    'speechiness',
                    'loudness',
                    'Liveness'
                ], 
                datasets: [{
                    label: 'Song Analytics',
                    data: [
                        song.analytics.danceability,
                        song.analytics.energy,
                        song.analytics.valence,
                        song.analytics.speechiness,
                        song.analytics.acoustic,
                        song.analytics.liveness
                    ],
                    Fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }]
                }, 

                
            })
         }

    });
  