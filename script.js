// Default Control Options
const defaultControlOptions = {
    numberOfUsers: '100',   // 1-250
    usersPerPage: '10',     // 10, 25, 50, or infinite
    sortingOption: 'random' // random, alphLast, or alphFirst
};

// Vue Instance
const vm = new window.Vue({
    el: '#app',
    data: {
        controls: {
            numberOfUsers: defaultControlOptions.numberOfUsers,
            prevNumberOfUsers: null,
            usersPerPage: defaultControlOptions.usersPerPage,
            sortingOption: defaultControlOptions.sortingOption,
        },
        users: null,
        sortedUsers: null,
        pages: [],
        currentPage: null,

    },
});

// Get Users Function
const getUsers = async (getOrUpdate, numberOfUsers, usersPerPage, sortingOption) => {
    // Get New Users
    if (getOrUpdate == 'get') {
        await fetch(`https://randomuser.me/api/?nat=us&results=${numberOfUsers}&inc=name,location,email,dob,phone,picture`)
        .then(response => response.json())
        .then(data => {
            vm.users = data.results;
            vm.controls.prevNumberOfUsers = numberOfUsers;
        });
    // Update Users
    } else if (getOrUpdate == 'update') {
        vm.controls.numberOfUsers = vm.controls.prevNumberOfUsers;
    }
    // List Users
    // Sorting Option
    vm.sortedUsers = vm.users;
    if (sortingOption != 'random') {
        let sortingObj = { primary: null, secondary: null };
        if (sortingOption == 'alphLast') {
            sortingObj = { primary: 'last', secondary: 'first' };
        } else if (sortingOption == 'alphFirst') {
            sortingObj = { primary: 'first', secondary: 'last' };
        }

        ({ primary, secondary } = sortingObj);

        vm.sortedUsers.sort((a, b) => a.name[primary] < b.name[primary] ? -1 : a.name[primary] > b.name[primary] ? 1 : a.name[secondary] < b.name[secondary] ? -1 : a.name[secondary] > b.name[secondary] ? 1 : 0)
    }
    // Users per Page
    vm.pages = [];
    document.querySelector('nav').style.display = '';
    if (usersPerPage == 'infinite') {
        usersPerPage = vm.sortedUsers.length;
        document.querySelector('nav').style.display = 'none';
    }
    const numUsersPerPage = parseInt(usersPerPage, 10);
    for (let i = 0; i < vm.users.length / numUsersPerPage; i++) {
        let page = []
        for (let j = 0; j < numUsersPerPage; j++) {
            if (j < vm.users.length - (i * numUsersPerPage)) {
                page.push(vm.sortedUsers[j + (i * numUsersPerPage)])
            }
        }
        vm.pages.push(page);
    }
    vm.currentPage = 0;
};

// API Controls
document.querySelector('#numberOfUsers').addEventListener('input', (event) => vm.controls.numberOfUsers = event.target.value);
document.querySelector('#usersPerPage').addEventListener('input', (event) => {
    vm.controls.usersPerPage = event.target.value;
    for (input of document.querySelectorAll('#usersPerPage input')) {
        if (input.value == vm.controls.usersPerPage) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    }
});
document.querySelector('#sortingOption').addEventListener('change', (event) => {
    vm.controls.sortingOption = event.target.value;
    for (input of document.querySelectorAll('#sortingOption input')) {
        if (input.value == vm.controls.sortingOption) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    }
});
document.querySelector('#updateUsers').addEventListener('click', (event) => {
    event.preventDefault();
    getUsers('update', vm.controls.numberOfUsers, vm.controls.usersPerPage, vm.controls.sortingOption);
});
document.querySelector('#getNewUsers').addEventListener('click', (event) => {
    event.preventDefault();
    getUsers('get', vm.controls.numberOfUsers, vm.controls.usersPerPage, vm.controls.sortingOption);
});

// Navigation
document.querySelector('#prevPage').addEventListener('click', () => {
    if (vm.currentPage > 0) {
        vm.currentPage--
    }
});
document.querySelector('nav').addEventListener('click', (event) => {
    if (event.target.classList.contains('pageNumber')) {
        vm.currentPage = parseInt(event.target.textContent, 10) - 1;
    }
});
document.querySelector('#nextPage').addEventListener('click', () => {
    if (vm.currentPage < vm.pages.length - 1) {
        vm.currentPage++
    }
});

// Page Initialization
document.addEventListener('DOMContentLoaded', () => getUsers('get', vm.controls.numberOfUsers, vm.controls.usersPerPage, vm.controls.sortingOption));