/////////////////////////////////////////////////////   APP CONTROLLER
var app = ((DataCtrl, UICtrl) => {
  var siteName = 'https://hta218.github.io/tk-random/';
  var url = window.location.href;
  var query = url.replace(siteName, '');

  var api = 'https://script.google.com/macros/s/AKfycbwGR4Kpw-1lpyU2lBRfO7RftXNRKyeS_UNCLBZLesA3JhYMjG6D/exec';

  // api += query;                // PRODUCTION
  api += '?className=c4e16';     //  TESTING

  var getRandomStudent = (studentList, passedList) => {
    let numb = -1;
    var finding = true;
    while (finding) {
      numb = studentList[Math.floor(Math.random() * studentList.length)];
      if (passedList.indexOf(numb) === -1) {
        finding = false;
      }
    }
    
    return numb;
  }

  var setUpEventListener = function() {
    var studentId, idNumber;
    
    // show student info
    $('.show-student').on('click', function() {
      studentId = $(this).parents('.student').attr('id').replace("student", "");
      
      UICtrl.showStudent(studentId);
    });

    // remove/unremove student from list
    $('.remove').on('click', function() {
      studentId = $(this).parents('.student').attr('id');
      idNumber = Number(studentId.replace('student', ''));

      if (DataCtrl.getData().bannedList.includes(idNumber)) {
        DataCtrl.removeFromBannedList(idNumber);
        UICtrl.enableStudent(idNumber);
      } else {
        DataCtrl.removeFromStudentList(idNumber);
        DataCtrl.addToBannedList(idNumber);
        UICtrl.disableStudent(idNumber);
      }
    });

    // return to find other student
    $('#layout').click(function() {
      UICtrl.hideStudent();
    });
  }

  //////////////////////////////////////////////////////        HANDLE EVENT
  var handleRandomProcess = function() {
    $("#random").click(function() {
      var studentList, bannedList, passedList, foundStudent, moveCount, studentNo, bugName;
      studentList  = DataCtrl.getData().studentList;

      if (studentList.length) {
        bannedList  = DataCtrl.getData().bannedList;
        
        // TODO get studentList & bannedList;
        foundStudent = studentList.pop();
        passedList = [];

        moveCount = 0;
        var moveBug = function() {
          if (moveCount !== studentList.length) {
            UICtrl.hideBug();
            
            studentNo = getRandomStudent(studentList, passedList);
            bugName = '#bug' + studentNo;

            UICtrl.showBug(bugName);

            passedList.push(studentNo);
            setTimeout(moveBug, 200);
          } else {
            bugName = '#bug' + foundStudent;

            UICtrl.hideBug();
            UICtrl.showBug(bugName);
            
            UICtrl.showStudent(foundStudent);
            // DataCtrl.removeFromStudentList(foundStudent);
            DataCtrl.addToBannedList(foundStudent);
            UICtrl.disableStudent(foundStudent);
          }
          moveCount++;
        }
        moveBug();
      }
    });
  }

  var init = function() {
    $.get(api, function(data, status) {
      students = data;
      UICtrl.renderAllStudent(students);

      DataCtrl.setData(students);
      setUpEventListener();
      // NOTE: The block code 'remove student from list' MUST be put in block 'render student'
      // because the js event click render before the HTML element .remove render
    });
  }

  return {
    run: () => {
      console.log('App has started');
      init();
      handleRandomProcess();
    }
  }

})(DataController, UIController);











//////////////////////////////////// RUN APP
$(document).ready(function() {
  app.run();
});