function xhr(getOrPost) {
    return $.ajax({
        type: getOrPost,
        url: `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=lPPJjroH9qBXlRkTw1YEJwmpKa5FyR72`,
        cache: false,
        async: true,
        dataType: 'json',
        beforeSend: function (xhr) {
            console.log("before send");
            //xhr.setRequestHeader("Authorization", "Basic OTdlMjVmNWJiMTdjNzI2MzVjOGU3NjlhOTI3ZTA3M2Q5MWZmMTA3ZDM2YTZkOWE5Og==");
            //put out a spinner if pId is defined...
            // $(pId).append('<img src="gears.gif" class="funkyThing"/>');
        }
        //always fires when data is returned
        //always good for clean up
    }).always(function () {


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);

    });

}
function getFiction(){
    

    xhr('GET').done(function(json){
        let h3 = document.createElement('h3');
        let headerText = document.createTextNode("Fiction Combined Print and E-Books");
        h3.appendChild(headerText);
        document.getElementById('headerPrint').append(h3);
        json.results.books.forEach(function(book, i){
            let column = document.createElement('div');
            column.setAttribute('class', 'four wide column');
            document.getElementsByClassName('ui grid')[0].append(column);

            let parent = document.createElement('div');
            parent.setAttribute('class','ui card');
            document.getElementsByClassName('four wide column')[i].append(parent);

            let divImage = document.createElement('div');
            divImage.setAttribute('class','image');
            document.getElementsByClassName('ui card')[i].append(divImage);

            let image = document.createElement('img');
            image.setAttribute('src', book.book_image);
            image.setAttribute('height',book.book_image_height);
            image.setAttribute('width',book.book_image_width);
            document.getElementsByClassName('image')[i].append(image);

            let contentDiv = document.createElement('div');
            contentDiv.setAttribute('class','contentDesc');
            document.getElementsByClassName('ui card')[i].append(contentDiv);

            let h3 = document.createElement('h3');
            let titleText = document.createTextNode(book.rank +". " + capitalize(book.title));
            h3.appendChild(titleText);
            document.getElementsByClassName('contentDesc')[i].append(h3);

            let metaDiv = document.createElement('div');
            metaDiv.setAttribute('class','meta');
            document.getElementsByClassName('contentDesc')[i].append(metaDiv);

            let span = document.createElement('span');
            let spanText = document.createTextNode('Author: ' + book.author);
            span.appendChild(spanText);
            document.getElementsByClassName('meta')[i].append(span);

            let descDiv = document.createElement('div');
            descDiv.setAttribute('class','description');
            let descText = document.createTextNode(book.description);
            descDiv.appendChild(descText);
            document.getElementsByClassName('contentDesc')[i].append(descDiv);


            

        })
    })
}
$( document ).ready(function() {
    $('.ui.dropdown').dropdown()
;
});

function capitalize(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}