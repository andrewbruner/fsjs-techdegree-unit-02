// https://randomuser.me/api/?nat=us&results=500&inc=name,location,email,dob,phone,picture

const getUsers = async () => {
    await fetch('https://randomuser.me/api/?nat=us&results=500&inc=name,location,email,dob,phone,picture')
    .then(response => response.json())
    .then(data => {
        console.log('Success: ', data);
        vm.users = data;
    })
    .catch(error => console.log('Error: ', error))
};

document.addEventListener('DOMContentLoaded', getUsers)

/*
// GLOBAL VARIABLES
const masterList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;
const pageDiv = document.querySelector('.page');

// GLOBAL FUNCTION to create an element and modify its properties
const createElement = (name, property, value) => {
    const element = document.createElement(name);
    element[property] = value;
    return element;
};

// GLOBAL FUNCTION to remove previous <div>s
const removeDiv = selector => {
    const prevDiv = pageDiv.querySelector(selector);
    if (prevDiv) {
        prevDiv.remove();
    }
};

// GLOBAL FUNCTION to build, append, and add functionality to searchbar
const appendSearchbox = () => {

    // local variables
    const pageHeaderDiv = document.querySelector('.page-header');
    const studentListDiv = document.querySelector('.student-list');
    
    // local function to run search and display results
    const runSearch = event => {
        
        // local variables
        const searchTerm = event.target.parentElement.querySelector('input').value.toLowerCase();
        const searchList = [];
        
        // for each item matching searchTerm, push to searchList array
        masterList.forEach(item => {
            const itemTextContent = item.querySelector('h3').textContent.toLowerCase();
            if (itemTextContent.includes(searchTerm)) {
                searchList.push(item);
            }
        });
        
        // if searchList array is empty, show error message; if not, hide it
        if (searchList.length === 0) {
            errorDiv.style.display = '';
        } else {
            errorDiv.style.display = 'none';
        }
        
        // show the search results and append page links
        showPage(searchList, 1);
        appendPageLinks(searchList); 
    };
    
    // if error message exists, remove it
    removeDiv('.error');
    
    // build error message to display on 0 search results
    const errorDiv = createElement('div', 'className', 'page-header cf error')
    errorDiv.style.display = 'none'
    const errorH2 = createElement('h2', 'textContent', 'No results found');
    errorDiv.appendChild(errorH2);
    pageDiv.insertBefore(errorDiv, studentListDiv);
    
    // build searchbox
    const searchDiv = createElement('div', 'className', 'student-search');
    const searchInput = createElement('input', 'placeholder', 'Search for students...');
    const searchButton = createElement('button', 'textContent', 'Search');
        
    // add listeners for `click` and `keyup` events
    searchButton.addEventListener('click', runSearch);
    searchInput.addEventListener('keyup', runSearch);
    
    // append searchbox
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    pageHeaderDiv.appendChild(searchDiv);
}


// GLOBAL FUNCTION to show each page, using array of items and page number as parameterS
const showPage = (list, page) => {    
    
    // set the starting/ending index for first/last item on page
    const start = (page * itemsPerPage) - itemsPerPage;
    const end = (page * itemsPerPage) - 1;
    
    // begin by hiding all masterList items
    masterList.forEach(item => {
        item.style.display = 'none';
    });
    
    // show only list items in the index range
    list.forEach((item, i) => {
        if (i >= start && i <= end) {
            item.style.display = '';
        }
    });
};


// GLOBAL FUNCTION to build, append and add functionality to page links
const appendPageLinks = list => {

    // local variables
    const numberOfitems = list.length;
    const numberOfPageLinks = Math.ceil(numberOfitems / itemsPerPage);
    
    // if pagination linksexist, remove them
    removeDiv('.pagination');    
    
    // create .pagination <div> and <ul> elements
    const paginationDiv = createElement('div', 'className', 'pagination');
    const paginationUl = document.createElement('ul');

    // create .pagination <li> and <a> elements
    for (let i = 0; i < numberOfPageLinks; i++) {

        const paginationLi = document.createElement('li');
        paginationLi.style.cursor = 'pointer';

        const paginationA = createElement('a');
        paginationA.attributes.href = '#';
        paginationA.textContent = i + 1;
        if (i === 0) {
            paginationA.className = 'active';
        }

        // add functionality to <a> elements when clicked
        paginationA.addEventListener('click', (event) => {
            const array = document.querySelectorAll('.pagination a');
            const page = event.target.textContent;

            for (i = 0; i < numberOfPageLinks; i++) {
                if (i === page - 1) {
                    array[i].className = 'active';
                } else {
                    array[i].className = '';
                }
            }

            showPage(list, page);
        });

        // finish building .pagination <li> and <a> elements
        paginationLi.appendChild(paginationA);
        paginationUl.appendChild(paginationLi);
    }

    // finish building .pagination <div> and <ul> elements
    paginationDiv.appendChild(paginationUl);    
    pageDiv.appendChild(paginationDiv);
};


// GLOBAL EVENT LISTENERS - on page load, show searchbar, the first page of items, and append page links
document.addEventListener('DOMContentLoaded', appendSearchbox());
document.addEventListener('DOMContentLoaded', showPage(masterList, 1));
document.addEventListener('DOMContentLoaded', appendPageLinks(masterList));
*/