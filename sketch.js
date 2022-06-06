
function notInList(val) {
    var items = document.querySelectorAll('li');
    for (var i = 0; i < items.length; i++) {
        if (items[i].children[1].innerText == val) {
            return false;
        }
    }
    return true;
}

window.onload=function(){
    
    chrome.storage.sync.get(['key'], function(result) {
        console.log('Value currently is ');
        document.querySelector('#set').innerHTML = result.key;
    });
    
    let button = document.getElementById('addTask');

    console.log('sketch.js');
    
    button.addEventListener('click', addTask);
    
    function addTask() {
        console.log('addTask');
        var task = document.getElementById('taskInput').value.trim();
        if (task.length > 0 && notInList(task)) {
            var taskList = document.querySelector('ul');
            var li = document.createElement('li');
            let checkBoxInput = document.createElement('input');
            let taskLabel = document.createElement('label');
            taskLabel.innerHTML = task;
            checkBoxInput.setAttribute('type', 'checkbox');
            li.appendChild(checkBoxInput);
            li.appendChild(taskLabel);
            taskList.appendChild(li);
        }
        let value = document.querySelector('#set').innerHTML;
        chrome.storage.sync.set({key: value}, function() {
            console.log('Value is set to ');
            console.log(value);
        });
    }

    let checkBoxes = document.querySelector('ul');
    checkBoxes.addEventListener('change', function(e) {
        // remove all checkboes which are checked
        console.log(e)
        console.log(e.target)
        if (e.target.checked) {
            e.target.parentElement.remove();
        }
        let value = document.querySelector('#set').innerHTML;
        chrome.storage.sync.set({key: value}, function() {
            console.log('Value is set to ');
            console.log(value);
        });
    });
}