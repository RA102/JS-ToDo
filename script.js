/*
* убрать повторы кода
*
*
*/
window.onload = function(event) {

    let clearList = document.getElementById('btn-remove-all');
    let enter = document.getElementById('btn-inter');
    let input = document.getElementById('new-todo');
    let ol = document.getElementById('list-not-ready');
    let ul = document.getElementById('list-ready');
    //let remoteComplite = document.getElementById('btn-remove-completed');

    // LocalStorage список дел
    let listNotReady = localStorage.getItem('list-not-ready') ? JSON.parse(localStorage.getItem('list-not-ready')) : [];
    localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
    let dataNotReady = JSON.parse(localStorage.getItem('list-not-ready'));


    // localStorage Список законченых дел
    let listReady = localStorage.getItem('list-ready') ? JSON.parse(localStorage.getItem('list-ready')) : [];
    localStorage.setItem('list-ready', JSON.stringify(listReady));
    let dataReady = JSON.parse(localStorage.getItem('list-ready'));

    // ф-ция Создание строк обоих списков
    function addRow (value) {
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.setAttribute('class', 'del')
        cross.innerHTML = '&#215;';

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        let li = document.createElement('li');
        li.setAttribute('class', 'task');
        let span = document.createElement('span');
        span.textContent = value;
        li.append(cross);
        li.append(checkbox);
        li.append(span);
        return li;
    }


    function deleteDo(obj) {
        obj.remove();
    }

    function saveList() {

        listNotReady = [];
        let ol = document.getElementById('list-not-ready');
        let tmpListNotReady = ol.childNodes;
        tmpListNotReady.forEach(item => {
            listNotReady.push(item.lastChild.textContent);
        });
        localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));

        listReady = [];
        let ul = document.getElementById('list-ready');
        let tmpListReady = ul.childNodes;
        tmpListReady.forEach(item => {
            listReady.push(item.lastChild.textContent);
        });
        localStorage.setItem('list-ready', JSON.stringify(listReady));

    }

    // генератор Id
    function idDeal()
    {
        return Math.random().toString(36).substr(2,16);
    }

    document.addEventListener('keydown', keyboardEvent => {
        /*
        * FixMe
        *  повтор блок 1
        * */
        if (input.value.trim().length !== 0 && keyboardEvent.code === 'Enter') {
            listNotReady.push(input.value);
            localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
            ol.appendChild(addRow(input.value));
            input.value = '';
        }
    });


    enter.addEventListener('click', event => {
        event.preventDefault();
        /*
        * FixMe
        *  повтор блок 1
        * */
        if (input.value.trim().length !== 0) {
            listNotReady.push(input.value);
            localStorage.setItem('list-not-ready', JSON.stringify(listNotReady));
            ol.appendChild(addRow(input.value));
            input.value = '';
        }
    });

    dataNotReady.forEach(item => {
        ol.appendChild(addRow(item));
    });

    dataReady.forEach(item => {
        ul.appendChild(addRow(item));
    });

    // галочки в списке выполненых
    let checkbox = ul.getElementsByTagName('input');
    [].forEach.call(checkbox, function (element) {
        element.setAttribute('checked', 'checked');
    });



    clearList.addEventListener('click', function(event) {
        localStorage.clear();
        while(ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    });



    ol.addEventListener('click', function(event) {
        if (event.target.type === 'checkbox' && event.toElement.checked == true) {
            let clone = event.target.parentElement;  // получил всю строку => li
            ul.appendChild(clone);  // перенес в list-ready
            saveList();
        } else if (event.target.className === 'del') {
            let del = event.target.parentElement;
            deleteDo(del);
            saveList();
        }
    });



    ul.addEventListener('click', function(event) {
        if (event.target.type === 'checkbox' && event.toElement.checked === false) {
            let clone = event.target.parentElement; // получил li
            ol.appendChild(clone); // перенос в
            saveList();
        } else if (event.target.className === 'del') {
            let del = event.target.parentElement;
            deleteDo(del);
            saveList();
        }
    });

    document.getElementById('btn-remove-completed').onclick = function() {
        localStorage.removeItem('list-ready');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }


}



