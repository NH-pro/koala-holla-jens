console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
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
      <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.gender}</td>
        <td>${item.ready_to_transfer}</td>
        <td>${item.notes}</td>
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
