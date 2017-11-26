$(document).ready(function() {

  var siteName = 'https://hta218.github.io/tk-random/';
  var url = window.location.href;
  var query = url.replace(siteName, '');

  var api = 'https://script.google.com/macros/s/AKfycbwGR4Kpw-1lpyU2lBRfO7RftXNRKyeS_UNCLBZLesA3JhYMjG6D/exec';

  // var testapi = api + '?className=c4e13';

  api += query;

  var $main = $('#main');
  var students = [];
  var bannedList = [];
  var finding = false;
  var foundStudentId = '';

  // render students
  $.get(api, function(data, status) {
    students = data;

    for (var i = 0; i < students.length; i++) {
      var bugId = 'bug' + i;
      var studentId = 'student' + i;

      // set bug id and student id
      $('#student-form .bug').attr('id', bugId);
      $('#student-form .student').attr('id', studentId);

      // set image src and student name
      $('#student-form img').attr('src', students[i].image);
      $('#student-form #student-name').text(students[i].name);

      var $student = $('#student-form').html();
      $main.append($student);
    }

    // show student info
    $('.show-student').on('click', function() {
      var studentId = $(this).parents('.student').attr('id');
      var idNumber = Number(studentId.replace('student', ''));

      showFoundStudent(idNumber);

    });

    // remove student from list
    $('.remove').on('click', function() {
      var studentId = $(this).parents('.student').attr('id');
      var idNumber = Number(studentId.replace('student', ''));

      if (bannedList.includes(idNumber)) {
        bannedList.splice(bannedList.indexOf(idNumber), 1);
        $('#' + studentId + ' img').animate({
          'opacity' : '1'
        }, 200);
      } else {
        bannedList.push(idNumber);
        $('#' + studentId + ' img').animate({
          'opacity' : '0.3'
        }, 200);
      }
    });
    // NOTE: The block code 'remove student from list' MUST be put in block 'render student'
    // because the js event click render before the HTML element .remove render
  });

  // handle random event
  $("#random").click(function() {
    var numbers = []
    for (var i = 0; i < students.length; i++) {
      if (!bannedList.includes(i)) {
        numbers.push(i);
      }
    }

    var findStudent = function() {
      if (!numbers.length) {

        showFoundStudent(foundStudentId);

      } else {
        $('.bug').hide().css({
          'opacity' : '0.3'
        });
        $('.bug i').css({
          'opacity' : '0.2'
        });
        var num = numbers[Math.floor(Math.random() * numbers.length)]
        var index = numbers.indexOf(num);

        var bugName = '#bug' + num;
        var student = '#student' + num;

        if (numbers.length === 1) {
          foundStudentId = numbers[0]; // get the last item
        }
        $(bugName).show().animate({
          'opacity' : '1'
        }, 200);
        $(bugName + ' i').animate({
          'opacity' : '1'
        }, 300);

        // remove num from numbers
        numbers.splice(index, 1);

        setTimeout(findStudent, 200);
      }
    }

    if (!finding && numbers.length) {
      finding = true;
      findStudent();
    }

  });

  // return to find other student
  $('#layout').click(function() {
    finding = false;
    hideFoundStudent();

    // remove found-student from bannedList
    $('#student' + foundStudentId + ' img').animate({
      'opacity' : '0.3'
    }, 200);
    bannedList.push(Number(foundStudentId));
  });
});
