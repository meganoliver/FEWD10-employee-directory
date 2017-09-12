$(document).ready(function () {
  const url = "https://randomuser.me/api?results=12&inc=name,email,picture,location,cell,login,dob&nat=us";

  function displayInfo(employees) {
    let empHTML = '<div id="emp-container">';
    let modHTML = '<div id="mod-container">';
    $.each(employees.results, function(i, person) {
      //create variables for all data
      let photo = person.picture.medium;
      let firstName = '<b>' + person.name.first + '</b>';
      let lastName = '<b>' + person.name.last + '</b>';
      let name = [firstName, lastName];
      let fullName = '<span>' + firstName + " " + lastName + '</span>'//done capitalizing
      let email = person.email;
      let phone = person.cell;
      let street = person.location.street;
      let city = person.location.city;
      let state = '<b>' + person.location.state + '</b>';
      let zip = person.location.postcode;
      let address = '<span>' + street + ", " + city + ", " + state + " " + zip + '</span>';
      let bday = person.dob;

    //employee div
      empHTML += '<section class="emp-card">';
      empHTML += '<img class="emp-photo" alt="employee picture" src=' + photo + '>';
      empHTML += '<ul class="emp-info">';
      empHTML += '<li>' + fullName + '</li>';
      empHTML += '<li>' + email + '</li>';
      empHTML += '<li class="capitalize">' + city + '</li></ul></section>';

    //modal div
      modHTML += '<div class="mod-card">';
      modHTML += '<span class="close">X</span>';
      modHTML += '<div class="flex-div">'
      modHTML += '<div class="mod-info">';
      modHTML += '<img class="emp-photo" alt="employee picture" src=' + photo + '>';
      modHTML += '<li>' + fullName + '</li>';
      modHTML += '<li>' + email + '</li>';
      modHTML += '<li class="capitalize">' + city + '</li></div>';
      modHTML += '<div class=".modDetails">';
      modHTML += '<li>' + phone + '</li>';
      modHTML += '<li>' + address + '</li>';
      modHTML += '<li>' + 'Birthday: ' + bday + '</li></div></div></div>';
    }); //end html each loop
      empHTML += '</div>';
      modHTML += '</div>';
      $('#employees').html(empHTML);
      $('#modal').html(modHTML);

      $('section').click(function() {
        $('#overlay').css("visibility", "visible");
        let empCard = document.getElementsByClassName('emp-card');
        let modCard = document.getElementsByClassName('mod-card');
        let index = $(this).index();
        $(modCard[index]).css("left", "28%");
        $(modCard[index]).css("transition", "left, 8000, ease-in");
      });//end click function

      $('span').click(function() {
        if(this.className === 'close') {
          console.log('hi');
          $('.mod-card').css("left", "100%");
          $('#overlay').css("visibility", "hidden");
        }
      });//end close click

  } //end displayInfo function
  $.getJSON(url, displayInfo);



}); //end ready
