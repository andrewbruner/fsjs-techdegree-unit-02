const vue = window.Vue;
// Vue Instance
const vm = new vue({
    el: '#app',
    data: {
        users: null,
        pages: [],
        currentPage: null,
    }
});

// API Controls Function
const submitAPI = (e) => {
    e.preventDefault();

    // Find selected number of results
    const numberOfResults = document.querySelector('#numberOfResults').value;
    if (numberOfResults % 1 == 0 && numberOfResults > 0 && numberOfResults < 501) {
        document.querySelector('#numberOfResults').value = '';

        // Find selected results per page
        const resultsPerPageInputs = document.querySelectorAll('input[name="resultsPerPage"]');
        let resultsPerPage;
        for (input of resultsPerPageInputs) {
            if (input.checked) {
                resultsPerPage = input.value;
                document.querySelector('nav').style.visibility = '';
                if (resultsPerPage == 'infinite') {
                    resultsPerPage = numberOfResults;
                    document.querySelector('nav').style.visibility = 'hidden';
                }
                input.checked = false;
                break;
            }
        }

        // Find selected sorting option
        const sortingOptionInputs = document.querySelectorAll('input[name="sortingOption"]');
        let sortingOption;
        for (input of sortingOptionInputs) {
            if (input.checked) {
                sortingOption = input.value;
                input.checked = false;
                break;
            }
        }

        // Run API
        getUsers(numberOfResults, resultsPerPage, sortingOption);
    } else {
        console.log('error')
    }
};

// Navigation Functions
const prevPage = () => {
    if (vm.currentPage > 0) {
        vm.currentPage--
    }
};
const pageLink = (e) => {
    if (e.target.classList.contains('pageNumber')) {
        vm.currentPage = parseInt(e.target.textContent, 10) - 1;
    }
};
const nextPage = () => {
    if (vm.currentPage < vm.pages.length - 1) {
        vm.currentPage++
    }
};

// Get Users Function
const getUsers = async (numberOfUsers, resultsPerPage, sortingOption) => {
    await fetch(`https://randomuser.me/api/?nat=us&results=${numberOfUsers}&inc=name,location,email,dob,phone,picture`)
    .then(response => response.json())
    .then(data => {
        console.log('Success: ', data);
        vm.users = data.results;
        vm.pages = [];
        
        // get number of results per page
        const numResultsPerPage = parseInt(resultsPerPage, 10);

        // if sorting option is alphabetical, sort the users
        if (sortingOption == 'alphLast' || sortingOption == 'alphFirst') {
            let sortingObj;
            if (sortingOption == 'alphLast') {
                sortingObj = { primary: 'last', secondary: 'first' };
            } else if (sortingOption == 'alphFirst') {
                sortingObj = { primary: 'first', secondary: 'last' };
            }

            ({ primary, secondary } = sortingObj);

            vm.users.sort((a, b) => a.name[primary] < b.name[primary] ? -1 : a.name[primary] > b.name[primary] ? 1 : a.name[secondary] < b.name[secondary] ? -1 : a.name[secondary] > b.name[secondary] ? 1 : 0)
        }

        // populate user pages
        for (let i = 0; i < vm.users.length / numResultsPerPage; i++) {
            let page = []
            for (let j = 0; j < numResultsPerPage; j++) {
                if (j < vm.users.length - (i * numResultsPerPage)) {
                    page.push(vm.users[j + (i * numResultsPerPage)])
                }
            }
            vm.pages.push(page);
        }

        vm.currentPage = 0;
    })
    .catch(error => console.log('Error: ', error))
};


// API Controls Listener
document.querySelector('#submitBtn').addEventListener('click', submitAPI);

// Navigation Listeners
document.querySelector('#prevPage').addEventListener('click', prevPage);
document.querySelector('#nextPage').addEventListener('click', nextPage);
document.querySelector('nav').addEventListener('click', pageLink);

// Page Load Listener
document.addEventListener('DOMContentLoaded', () => getUsers('100', '10', 'random'));