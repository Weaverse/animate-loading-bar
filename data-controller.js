const DataController = (() => {
  var studentList, bannedList;
  studentList = [];
  bannedList = [];
  
  return {
    addToBannedList: (idNumber) => bannedList.push(idNumber),

    removeFromBannedList: (idNumber) => bannedList.splice(bannedList.indexOf(idNumber), 1),

    removeFromStudentList: (foundStudent) => { studentList.splice(studentList.indexOf(foundStudent), 1) },

    addToStudentList: (idNumber) => studentList.push(idNumber),

    setData: function(students) {
      students.forEach((s, index) => {
        studentList.push(index);
      });

      // For customization (Then update randomProcess in script.js - line 72)
      studentList = [18, 13, 12, 11     ,14, 3, 8, 0, 7, 6, 2, 10, 4, 5, 16,   1, 9, 15, 17 ];
    },

    getData: function() {
      return {studentList, bannedList};
    },

    testing: () => {
      return {studentList, bannedList};
    }
  }

})();