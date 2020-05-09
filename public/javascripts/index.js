// let app = new Vue({
//     el: '#app',
//     data: {
//         message: 'Hello Vue!',
//         mlists: [],
//         total_pages: 1,
//         page: 1,
//         pages: [1]
//     }
// });





// let query = getParam('q');
// let page = 1;
// console.log(query)

// let turl = 'http://localhost:3000/search?q=' + query + '&p=' + page

// $.get(turl, function (res) {
//     console.log(res.results);
//     app.mlists = res.results
//     for (let list of app.mlists) {
//         list.backdrop_path = 'https://image.tmdb.org/t/p/w1280' + list.poster_path;
//     }
//     app.total_pages = res.total_pages;
//     app.pages = [];
//     for(let i in app.total_pages){
//         app.pages.push(i);
//     }
// });


// function getParam(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }