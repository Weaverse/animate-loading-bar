const UIController = (() => {
  return {
    renderAllStudent: function(students) {
        var i, bugId, studentId, $main, $student;
        $main = $('#main');

        for (i = 0; i < students.length; i++) {
          bugId = 'bug' + i;
          studentId = 'student' + i;

          // set bug id and student id
          $('#student-form .bug').attr('id', bugId);
          $('#student-form .student').attr('id', studentId);

          // set image src and student name
          $('#student-form img').attr('src', students[i].image);
          $('#student-form #student-name').text(students[i].name);

          $student = $('#student-form').html();
          $main.append($student);
        }
    },

    showStudent: function(studentId) {
      
      var foundStudent, top, left, imgSrc, name;

      studentId = `#student${studentId}`;

      $foundStudent = $(studentId);
      $foundStudent.addClass('found-student');

      top = $foundStudent.position().top + 'px';
      left = $foundStudent.position().left + 'px';
      imgSrc = $(studentId + ' img').attr('src');
      name = $('.found-student #student-name').text();

      $('#image-to-get-size').attr('src', imgSrc);

      var realImageWidth, realImageHeight, sizes, maxWidthToScale, maxHeightToScale, studentNameDistanceToTop, $result;

      realImageWidth = $('#image-to-get-size').width();
      realImageHeight = $('#image-to-get-size').height();

      sizes = getSizeToScale(realImageWidth, realImageHeight);

      maxWidthToScale = sizes[0];
      maxHeightToScale = sizes[1];
      studentNameDistanceToTop = sizes[2];

      $result = $("#result");
      $foundStudent.css({
        'opacity' : '0'
      });
      $('#result img').attr('src', imgSrc);

      $('#layout').css({
        'display' : 'block'
      });

      $result.css({
        'top' : top,
        'left': left,
        'display' : 'inline-block'
      });

      var KeyFrame = createKeyframe(left, top, maxWidthToScale, maxHeightToScale);

      KeyFrame.init();
      $result.css({
        'animation' : `move-y 0.3s 1 linear forwards,
                      move-x 0.3s 1 linear forwards,
                      scale 0.4s 1 0.3s linear forwards`
      });

      $('#layout').css({
        'animation' : 'change-background 0.2s 1 0.3s ease-in forwards'
      });

      $('#layout h1').text(name).css({
        'opacity' : '0',
        'top' : studentNameDistanceToTop,
        'width' : maxWidthToScale
      });
      $('#layout h1').css({
        'animation' : 'appear 0.2s 1 0.7s ease-in forwards'
      });
    },

    hideStudent: function() {
      $('#layout').css({
        'display' : 'none'
      });
      $('.found-student img').css({
        'border' : 'none'
      });
      $('.found-student .bug').css({
        'display' : 'none'
      });
      $('.found-student')
        .css({
        'opacity' : '1',
        'animation' : 'none'
      })
        .removeClass('found-student');
    },

    disableStudent: (studentId) => {
      $(`#student${studentId} img`).animate({
        'opacity' : '0.3'
      }, 200);
    },

    enableStudent: (studentId) => {
      $(`#student${studentId} img`).animate({
        'opacity' : '1'
      }, 200);
    },
  
    showBug: (bugName) => {
      $(bugName).show().animate({
        'opacity' : '1'
      }, 200);
      $(bugName + ' i').animate({
        'opacity' : '1'
      }, 300);
    },

    hideBug: () => {
      $('.bug').hide().css({
        'opacity' : '0.3'
      });
      $('.bug i').css({
        'opacity' : '0.2'
      });
    }
  }
})();
