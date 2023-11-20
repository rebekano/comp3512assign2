
/* url of song api --- https versions hopefully a little later this semester */	

const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const samples = JSON.parse(sampleSongs);

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
document.addEventListener('DOMContentLoaded', function() {
    
/* Create table head - different approach */
//    function generateTableHead(table) {
//        let thead = table.createTHead();
//        let row = thead.insertRow();
//        
//        for (let sample of samples) {
//            const th = document.createElement('th');
//            let text = document.createTextNode(sample.title); // not working
//            th.appendChild(text);
//            row.appendChild(th);
//        }
//    }
//    
//    const table = document.querySelector('table');
//    generateTableHead(table);
    
    function generateTable(table) {
        for (let sample of samples) {
            const row = table.insertRow();
            for (key in sample) {
                const cell = row.insertCell();
                const text = document.createTextNode(sample[key]);
                cell.appendChild(text);
            }
        }
    }
    
    const table = document.querySelector('table');
    generateTable(table);
    
});