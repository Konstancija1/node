document.addEventListener('DOMContentLoaded', function () {
  var groupId = getParameterByName('group_id');
  if (groupId) {
    loadBills(groupId);
  }
});

function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadBills(groupId) {
  var token = localStorage.getItem('token');

  fetch('/bills/' + groupId, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        var billList = document.getElementById('bill-list');
        billList.innerHTML = '';

        data.bills.forEach(function (bill) {
          var listItem = document.createElement('li');
          listItem.textContent =
            'Amount: ' + bill.amount + ', Description: ' + bill.description;
          billList.appendChild(listItem);
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
  .getElementById('add-bill-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    var groupId = getParameterByName('group_id');
    var amount = document.getElementById('amount').value;
    var description = document.getElementById('description').value;
    var token = localStorage.getItem('token');

    fetch('/bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        group_id: groupId,
        amount: amount,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadBills(groupId);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
