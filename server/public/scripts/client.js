console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#viewKoalas').on('click', '#delete_btn', deleteKoala);
  // delet koala listener

  $('#viewKoalas').on('click', '#transfer_btn', changeTransfer)

  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };

    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
    console.log('koala:',koalaToSend)
  }); 
}

function changeTransfer() {
  console.log(`--- In changeTransfer fucntion! ---`);
  
  let koalaId = $(this).parents('tr').data('koala-id');

  let updateTransfer;

  if($(this).parents('tr').children('.transfer_status').text()=== 'N') {
    updateTransfer = {
      ready_to_transfer: 'Y'
    };
  }
  else if($(this).parents('tr').children('.transfer_status').text()=== 'Y') {
    updateTransfer = {
      ready_to_transfer: 'N'
    };
  }
  else {
    console.log(`Something BIG WRONG in change transfer!`)
  };

  console.log(`Changing transfer status to:`, updateTransfer);

  $.ajax({
    method: 'PUT',
    url:`/koalas/${koalaId}`,
    data: updateTransfer
  })
  .then(res => {
    console.log(`PUT transfer update Success!`);
    getKoalas(); // refresh the page with updated koala data
  })
  .catch(err => {
    console.log(`PUT transfer update Failed!`, err);
  });
}

function deleteKoala() {
  console.log('--- In deleteKoala function! ---');

  let koalaId = $(this).parents('tr').data('koala-id');

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  })
  .then(() => {
    console.log(`Delete Success!`);

    getKoalas(); // refresh the page with updated koala data
  })
  .catch((err) => {
    console.log(`Delete Failed`, err);
  });
};

function getKoalas(){
  console.log( 'in getKoalas' );
  $('#viewKoalas').empty();
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then(function(response) {
    console.log('getting koalas from server',response);
    for (item of response) {
      $('#viewKoalas').append(`
      <tr data-koala-id= "${item.id}">
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.gender}</td>
        <td class="transfer_status">${item.ready_to_transfer}</td>
        <td>${item.notes}</td>
        <td>
          <button id="transfer_btn">Ready for Transfer</button>
        </td>
        <td>
          <button id="delete_btn">Delete</button>
        </td>
       </tr> 
      `);
    }
  })
  .catch(function(err){
  console.log('in ajax.catch',err);
  alert()
  });
} // end getKoalas



function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas

  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function(response){
    getKoalas();
    console.log('in ajax post:', response);
  }).catch(function(err){
    console.log('ERROR IN POST', err);
    alert('unable to add koalas');
  })

 
}
