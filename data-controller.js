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

      // For customization
      // studentList = [4,8,3,1,6,5,14,12,11,      10, 0, 2, 7, 16, 9, 15, 13];
    },

    getData: function() {
      return {studentList, bannedList};
    },

    testing: () => {
      return {studentList, bannedList};
    }
  }

})();