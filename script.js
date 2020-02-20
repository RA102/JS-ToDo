window.onload = function(event) {

    let clearList = document.getElementById('btn-remove-all');
    let enter = document.getElementById('btn-inter');
    let input = document.getElementById('new-todo');
    let ol = document.getElementById('list-not-ready');
    let ul = document.getElementById('list-ready');

    // Список не законченых дел
    let listNotReady = localStorage.getItem('list-not-ready') ? JSON.parse(localStorage.getItem('list-not-ready')) : [];
    localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
    let dataNotReady = JSON.parse(localStorage.getItem('list-not-ready'));



    // Список законченых дел
    let listReady = localStorage.getItem('list-ready') ? JSON.parse(localStorage.getItem('list-ready')) : [];
    localStorage.setItem('list-ready', JSON.stringify(listReady));
    let dataReady = JSON.parse(localStorage.getItem('list-ready'));


    function createRow (value)
    {
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.setAttribute('class', 'del')
        cross.innerHTML = '&#215;';

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        let li = document.createElement('li');
        li.setAttribute('class', 'task');
        let span = document.createElement('span')
        span.textContent = value;
        li.append(cross);
        li.append(checkbox);
        li.append(span);
        ol.appendChild(li);
    };

    // function doneDeal (event) {
    //
    // }

    function idDeal()
    {
        return Math.random().toString(36).substr(2,16);
    }

    console.log(idDeal());

    enter.addEventListener('click', event => {
        event.preventDefault();
        if (input.value.trim().length !== 0) {
            listNotReady.push(input.value);
            localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
            createRow(input.value);
            input.value = '';
        }
    });

    dataNotReady.forEach(item => {
        createRow(item);
    });

    clearList.addEventListener('click', function(event) {
        localStorage.clear();
        while(ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }
    })

    ol.addEventListener('click', function(event) {
        let elem = event.toElement.checked;

        // console.log(event);
        // console.log(event.target);

        // if(event.target.type == 'checkbox' && event.toElement.checked) {
        //     let span = event.target.nextElementSibling;
        //     span.classList.add('ready');
        //
        // } else if (event.target.type == 'checkbox' && !event.toElement.checked) {
        //     let span = event.target.nextElementSibling;
        //     span.classList.remove('ready');
        // }
        if (event.target.type === 'checkbox') {
            let span = event.target.nextElementSibling;
            span.classList.toggle('ready');
            let ol = document.getElementsByTagName('ol');
            let listCheckbox = ol.children;
            // let li = event.target.parentNode;
            console.log(listCheckbox);
        }


    });



















}



