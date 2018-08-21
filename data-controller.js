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
      studentList = [5, 12, 0, 6, 4, 7, 9,          1, 2, 3, 8, 10, 11, 13];
    },

    getData: function() {
      return {studentList, bannedList};
    },

    testing: () => {
      return {studentList, bannedList};
    }
  }

})();