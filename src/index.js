document.addEventListener('DOMContentLoaded', function () {
    // Function to populate film details
    const filmdetails = (film) => {
        document.getElementById('poster').src = film.poster;
        document.getElementById('title').textContent = film.title;
        document.getElementById('runtime').textContent = film.runtime + ' minutes';
        document.getElementById('film-info').textContent = film.description;
        document.getElementById('showtime').textContent = film.showtime;
        const ticketsleft = film.capacity - film.tickets_sold;
        document.getElementById('ticket-num').textContent = ticketsleft;
        // this checks if all available tickets have been purchased. if they have it should input sold out in the button text
        if (ticketsleft === 0) {
            document.getElementById('buy-ticket').textContent = 'Sold Out';
            document.getElementById('buy-ticket').disabled = true;
            const filmItems = document.querySelectorAll('#films li');
            filmItems.forEach((item) => {
                if (item.textContent === film.title) {
                    item.classList.add('sold-out');
                }
            });
        }
    };

    // this fetches the film's  info 
    const fetchfilmData = (idoffilm) => {
        fetch('http://localhost:3000/films' + idoffilm)
            .then(reply => reply.json())
            .then(film => {
                filmdetails(film);
            })
            .catch(error => {
                console.error('film data is currently unavailable', error);
            });
    };

    // this updates the film list
    const changefilmlist = (films) => {
        const filmsList = document.getElementById('films');
        films.forEach((film) => {
            const filmItem = document.createElement('li');
            filmItem.classList.add('film', 'item');
            filmItem.textContent = film.title;
            filmsList.appendChild(filmItem);
        });
    };

    // Function to fetch film list
    const fetchfilmList = () => {
        fetch('http://localhost:3000/films')
            .then(reply => reply.json())
            .then(films => {
                changefilmlist(films);
// this displays the default film automatically
                fetchfilmData(films[0].id);
            })
            .catch(error => {
                console.error('Error fetching film list:', error);
            });
    };

    // the list of films is fetched when the page loads
    fetchfilmList();
});
