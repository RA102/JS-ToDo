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

    // ф-ция Создание строк обоих списков
    function createRow (value, obj) {
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.setAttribute('class', 'del')
        cross.innerHTML = '&#215;';

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        (obj.tagName === 'UL') ? checkbox.setAttribute('checked', 'checked') : false;

        let li = document.createElement('li');
        li.setAttribute('class', 'task');
        let span = document.createElement('span');
        span.textContent = value;
        li.append(cross);
        li.append(checkbox);
        li.append(span);
        obj.appendChild(li);
    }

    function idDeal()
    {
        return Math.random().toString(36).substr(2,16);
    }




    enter.addEventListener('click', event => {
        event.preventDefault();
        if (input.value.trim().length !== 0) {
            listNotReady.push(input.value);
            localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
            createRow(input.value, ol);
            input.value = '';
        }
    });

    dataNotReady.forEach(item => {
        createRow(item, ol);
    });

    dataReady.forEach(item => {
        createRow(item, ul);
    })



    clearList.addEventListener('click', function(event) {
        localStorage.clear();
        while(ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    })

    ol.addEventListener('click', function(event) {


        let ol = document.getElementById('list-not-ready');
        let listNotReadyAll = ol.childNodes;

        let ul = document.getElementById('list-ready');
        let listReadyAll = ul.childNodes;

        if (event.target.type === 'checkbox' && event.toElement.checked == true) {
            let checked = event.target.parentElement;  // li весь
            let span = event.target.nextElementSibling;

            span.classList.toggle('ready');
            let ready = document.getElementById('list-ready');
            let clone = event.target.parentElement;
            ready.appendChild(clone);

            listNotReady = [];
            listNotReadyAll.forEach(item => {
                listNotReady.push(item.lastChild.textContent);
            })
            localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));

            listReady = [];
            listReadyAll.forEach(item => {
                listReady.push(item.lastChild.textContent);
            })
            localStorage.setItem('list-ready', JSON.stringify(listReady));


        } else if (event.target.className === 'del') {
            deleteDo(event);
        }


    });



    function deleteDo(event) {
        console.log(this.tagName);
        let del = event.target.parentElement;
        del.remove();
        let ol = document.getElementById('list-not-ready');
        let listAll = ol.childNodes;
        listNotReady = [];
        listAll.forEach(item => {
            listNotReady.push(item.lastChild.textContent);
        })
        localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
    }

    function saveList(event) {

    }


}



