let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        mlists: [],
    }
});





let query = getParam('q');
let page = 1;
console.log(query)

let turl = 'http://localhost:3000/search?q=' + query + '&p=' + page

$.get(turl, function (data) {
    console.log(data.results);
    app.mlists = data.results
    for (let list of app.mlists) {
        list.backdrop_path = 'https://image.tmdb.org/t/p/w1280' + list.poster_path;
    }
});


function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}