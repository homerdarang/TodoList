'use strict';


window.addEventListener('load', () => {
    let add = document.querySelector('.add');
    let input = document.querySelector('#user-input');
    let invalid = document.querySelector('.invalid-task');
    let taskList = document.querySelector('#list-task');
    let rightDisplay = document.querySelector('.right-side');
    let brdrLeft = document.querySelector('.left-side');
    let tasks = document.querySelector('.tasks');
    let p = document.createElement('p');

    // function to add border class
    const borderLeft = function() {
        brdrLeft.classList.add('border-end', 'border-warning', 'rounded-start');
        brdrLeft.classList.remove('rounded');
    };

    // function to remove border class
    const deleteBorderLeft = function() {
        brdrLeft.classList.remove('border-end', 'border-warning', 'rounded-start');
        brdrLeft.classList.add('rounded');
    }

    // Will add the new todo or task.
    add.addEventListener('click', () => {
        let inputTask = input.value;

        if(!inputTask) {
            // alert('wrong');
            invalid.textContent = 'Invalid task!';
            return false;
        } else {
            invalid.textContent = '';
        };

        tasks.classList.toggle('hidden');
        // Create element for taskList
        const ul = document.createElement('ul');
        const newInput = document.createElement('input');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        const btnView = document.createElement('button');
        btnView.textContent = 'View';
        btnView.classList.add('btn', 'btn-primary');
        btnDelete.textContent = 'Delete';
        btnDelete.classList.add('btn', 'btn-outline-danger', 'me-2');
        btnEdit.textContent = 'Edit';
        btnEdit.classList.add('btn', 'btn-success', 'me-2');
        newInput.classList.add('me-2', 'form-control', 'w-100');
        newInput.value = inputTask;
        newInput.setAttribute('readonly', 'readonly');
        ul.appendChild(newInput);
        ul.appendChild(btnEdit);
        ul.appendChild(btnDelete);
        ul.appendChild(btnView);
        taskList.append(ul);

        
        // Set empty input again after adding task
        input.value = '';

        // Adding listener to edit button for todo save content
        btnEdit.addEventListener('click', () => {
            if (btnEdit.textContent === 'Edit'){
                newInput.removeAttribute('readonly');
                newInput.focus();
                btnEdit.textContent = 'Save';
            } else {
                inputTask = newInput.value; //this will update the todo details once u edit ur todo.
                newInput.setAttribute('readonly', 'readonly');
                btnEdit.textContent = 'Edit';
            }
        });

        // Adding listener to delete button for todo save content
        btnDelete.addEventListener('click', () => {
            tasks.classList.toggle('hidden');
            taskList.removeChild(ul);
            rightDisplay.classList.add('hidden');
            p.textContent = '';
            deleteBorderLeft();
        });

        // Displaying content detail to right side view
        // addlistener to newInput to display the content here
        btnView.addEventListener('click', () => {
            borderLeft();
            if(btnView.textContent === 'View') {
                rightDisplay.classList.remove('hidden');
                rightDisplay.appendChild(p);
                p.classList.add('fs-6');
                p.textContent = inputTask;
                btnView.textContent = 'Hide';
            } else {
                rightDisplay.classList.add('hidden');
                btnView.textContent = 'View';
                deleteBorderLeft();
            }
        });
    });
    // Adding keypress listener for good ux to add task
    document.addEventListener('keyup', (evt) => {
        evt.preventDefault();
        if(evt.key === 'Enter') {
            add.click();
        }
    });

});
