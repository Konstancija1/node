document.addEventListener('DOMContentLoaded', function () {
  loadGroups();
});

function loadGroups() {
  var token = localStorage.getItem('token');

  fetch('/groups', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        var groupList = document.getElementById('group-list');
        groupList.innerHTML = '';

        data.groups.forEach(function (group) {
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = 'bills.html?group_id=' + group.id;
          link.textContent = group.name;

          listItem.appendChild(link);
          groupList.appendChild(listItem);
        });
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

document
  .getElementById('join-group-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    var groupId = document.getElementById('group-id').value;
    var token = localStorage.getItem('token');

    fetch('/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        group_id: groupId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadGroups();
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
