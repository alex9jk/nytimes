function xhr(getOrPost, listName) {
    return $.ajax({
        type: getOrPost,
        url: `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=lPPJjroH9qBXlRkTw1YEJwmpKa5FyR72`,
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
function createHtml(book, i) {
    let column = document.createElement('div');
    column.setAttribute('class', 'four wide column');
    document.getElementsByClassName('ui grid')[0].append(column);

    let parent = document.createElement('div');
    parent.setAttribute('class', 'ui card');
    document.getElementsByClassName('four wide column')[i].append(parent);

    let divImage = document.createElement('div');
    divImage.setAttribute('class', 'image');
    document.getElementsByClassName('ui card')[i].append(divImage);

    let image = document.createElement('img');
    image.setAttribute('src', book.book_image);
    image.setAttribute('height', 250);
    image.setAttribute('width', 166);
    document.getElementsByClassName('image')[i].append(image);

    let contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'contentDesc');
    document.getElementsByClassName('ui card')[i].append(contentDiv);

    let h3 = document.createElement('h3');
    let titleText = document.createTextNode(book.rank + ". " + capitalize(book.title));
    h3.appendChild(titleText);
    document.getElementsByClassName('contentDesc')[i].append(h3);

    let metaDiv = document.createElement('div');
    metaDiv.setAttribute('class', 'meta');
    document.getElementsByClassName('contentDesc')[i].append(metaDiv);

    let span = document.createElement('span');
    let spanText = document.createTextNode('Author: ' + book.author);
    span.appendChild(spanText);
    document.getElementsByClassName('meta')[i].append(span);

    let descDiv = document.createElement('div');
    descDiv.setAttribute('class', 'description');
    let descText = document.createTextNode(book.description);
    descDiv.appendChild(descText);
    document.getElementsByClassName('contentDesc')[i].append(descDiv);

    let linkToAmazon = document.createElement('a');
    linkToAmazon.setAttribute('href',book.amazon_product_url);
    let linkText = document.createTextNode('Buy on Amazon');
    linkToAmazon.appendChild(linkText);
    document.getElementsByClassName('contentDesc')[i].append(linkToAmazon);

}
function createHeader(title) {
    let h3 = document.createElement('h3');
    let headerText = document.createTextNode(title);
    h3.appendChild(headerText);
    document.getElementById('headerPrint').append(h3);
}
function getFictPaper() {
    xhr('GET', 'trade-fiction-paperback').done(function (json) {
        console.log(json);
        createHeader("Paperback Trade Fiction");
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })

}
function getFictHard() {
    xhr('GET', 'hardcover-fiction').done(function (json) {
        createHeader("Hardcover Fiction");
        console.log(json);
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })



}
function getFiction() {
    xhr('GET', 'combined-print-and-e-book-fiction').done(function (json) {
        console.log(json);
        createHeader("Fiction Combined Print and E-Books");
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })
}

function getEbookNon(){
    xhr('GET', 'combined-print-and-e-book-nonfiction').done(function (json) {
        createHeader("Combined Print & E-Book Non Fiction");
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })
}

function getHardNon() {
    xhr('GET', 'hardcover-nonfiction').done(function (json) {
        createHeader("Hardcover Non Fiction");
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })

}
function getPaperNon(){
    xhr('GET', 'paperback-nonfiction').done(function (json) {
        createHeader("Paperback Non Fiction");
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })
}

function getMiscNon(){
    xhr('GET', 'advice-how-to-and-miscellaneous').done(function (json) {
        console.log(json);
        createHeader("Advice, How To $ Miscellaneous");
        json.results.books.forEach(function (book, i) {
            createHtml(book, i);
        })
    })
}

$(document).ready(function () {
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