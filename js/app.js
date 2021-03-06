$(document).ready(function () {
  const url = "https://randomuser.me/api?results=12&inc=name,email,picture,location,cell,login,dob&nat=us";

  function displayInfo(employees) {
    let empHTML = '<div id="emp-container">';
    let modHTML = '<div id="mod-container">';
    let selectHTML ='<datalist id="select-employees">';

    $.each(employees.results, function(i, person) {
      //create variables for all data
      let photo = person.picture.large;
      let firstName = person.name.first;
      let lastName = person.name.last;
      let fullName = firstName + " " + lastName;
      let email = person.email;
      let phone = person.cell;
      let street = '<span class="capitalize">' + person.location.street + '</span>';
      let city = '<span class="capitalize">' + person.location.city + '</span>';
      let state = '<span class="capitalize">' + person.location.state + '</span>';
      let zip = person.location.postcode;
      let address = '<span>' + street + ", " + city + ", " + state + " " + zip + '</span>';
      let bday = person.dob;
      let formatDOB = new Date(Date.parse(bday));
      let dob = formatDOB.toLocaleDateString('en-US');

    //employee div
      empHTML += '<section class="emp-card">';
      empHTML += '<img class="emp-photo" alt="employee picture" src=' + photo + '>';
      empHTML += '<ul class="emp-info">';
      empHTML += '<li class="empName capitalize">' + fullName + '</li>';
      empHTML += '<li">' + email + '</li>';
      empHTML += '<li>' + city + '</li></ul></section>';

    //modal div
      modHTML += '<div class="mod-card">';
      modHTML += '<div class="flex-div">';
      modHTML += '<div class="navigate">';
      modHTML += '<span class="previous">' + '< previous' + '</span>';
      modHTML += '<span class="close">' + 'close' + '</span>';
      modHTML += '<span class="next">' + 'next >' + '</span></div>';
      modHTML += '<div class="mod-info">';
      modHTML += '<img class="mod-photo" alt="employee picture" src=' + photo + '>';
      modHTML += '<li class="modName capitalize">' + fullName + '</li>';
      modHTML += '<a href="mailto:' + email + '">' + email + '</a>';
      modHTML += '<li>' + city + '</li></div>';
      modHTML += '<div class=".modDetails">';
      modHTML += '<li>' + phone + '</li>';
      modHTML += '<li>' + address + '</li>';
      modHTML += '<li>' + 'Birthday: ' + dob + '</li></div></div></div>';

    //select options

      selectHTML += '<option class="options" value="' + fullName + '">';

    }); //end html each loop

    empHTML += '</div>';
    modHTML += '</div>';
    selectHTML += '</div>';
    $('#employees').html(empHTML);
    $('#modal').html(modHTML);
    $('#select').html(selectHTML);

      $('section').click(function() {
        $('#overlay').css("visibility", "visible");
        $('#mod-container').css("z-index", "5");
        let empCard = document.getElementsByClassName('emp-card');
        let modCard = document.getElementsByClassName('mod-card');
        let index = $(this).index();
        $(modCard[index]).css("left", "28%");
        $(modCard[index]).css("transition", "left .5s ease-in");
      });//end open modal click

      $('.previous').click(function() {
        let modCard = document.getElementsByClassName('mod-card');
        let index = $(this.parentElement.parentElement.parentElement).index();
        if(index > 0) {
          $(modCard[index]).css("left", "150%");
          $(modCard[index - 1]).css("left", "28%");
          $(modCard[index]).css("transition", "none");
        }
      });//end previous click

      $('.next').click(function() {
        let modCard = document.getElementsByClassName('mod-card');
        let index = $(this.parentElement.parentElement.parentElement).index();
        if(index < modCard.length - 1) {
          $(modCard[index]).css("left", "150%");
          $(modCard[index + 1]).css("left", "28%");
          $(modCard[index]).css("transition", "none");
        }
      });//end next click

      $('span').click(function() {
        if(this.className === 'close') {
          $('#mod-container').css("z-index", "-5");
          $('.mod-card').css("left", "150%");
          $('.mod-card').css("transition", "left .5s ease-in")
          $('#overlay').css("visibility", "hidden");
          ;
        }
      });//end close click

      $('#select').keyup(function() {
        let search = $(this).val().toLowerCase(); //collect search
        let names = [];
        $('.modName').each(function() {//create array of names
          names.push($(this).text())
        }); //end each loop
        $.each(names, function(i, name) {
          if(search === name) {
            $('#overlay').css("visibility", "visible");
            $('#mod-container').css("z-index", "5");
            let empCard = document.getElementsByClassName('emp-card');
            let modCard = document.getElementsByClassName('mod-card');
            let index = $(this).index();
            $(modCard[i]).css("left", "28%");
          } //end if statement
        }); //end loop
      }); //end keyup

  } //end displayInfo function
  $.getJSON(url, displayInfo);



}); //end ready
