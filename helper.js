
var getSizeToScale = (realImageWidth, realImageHeight) => {
  var maxWidthToScale = realImageWidth;
  var maxHeightToScale = realImageHeight;
  var ratio = 1.5;

  if (realImageWidth > 800 && realImageHeight < 600) {
    ratio = realImageWidth / 800;
    maxWidthToScale = 800;
    maxHeightToScale = realImageHeight / ratio;
  }
  else if (realImageWidth < 800 && realImageHeight > 600) {
    ratio = realImageHeight / 600;
    maxHeightToScale = 600;
    maxWidthToScale = realImageWidth / ratio;
  }
  else if (realImageWidth > 800 && realImageHeight > 600) {
    widthRatio = realImageWidth / 800;
    heightRatio = realImageHeight / 600;
    if (widthRatio > heightRatio) {
      maxWidthToScale = 800;
      maxHeightToScale = realImageHeight / widthRatio;
    } else {
      maxHeightToScale = 600;
      maxWidthToScale = realImageWidth / widthRatio;
    }
  }

  var studentNameDistanceToTop = ($(window).height() - maxHeightToScale) / 2;
  studentNameDistanceToTop += maxHeightToScale;
  studentNameDistanceToTop -= 100;
  studentNameDistanceToTop += 'px';

  maxWidthToScale += 'px';
  maxHeightToScale += 'px';

  return [maxWidthToScale, maxHeightToScale, studentNameDistanceToTop]
};

var createKeyframes = (left, top, maxWidthToScale, maxHeightToScale) => {
  // create keyframe animation
  var KeyFrame = {
     init: function(){
       if(!KeyFrame.check)
       {
         // set the style and append to head
         var css = $(
           `<style>
              @keyframes move-y {
                from {
                  left : ${left};
                }
                to {
                  left : 50%;
                }
              }
              @keyframes move-x {
                from {
                  top : ${top};
                }
                to {
                  top : 50%;
                  transform: translate(-50%, -50%);
                }
              }
              @keyframes scale {
                from {
                  width : 180px;
                  height: 120px;
                }
                to {
                  width : ${maxWidthToScale};
                  height: ${maxHeightToScale};
                }
              }

           </style>`
         ).appendTo('head');
         /*
         make sure you don't carriage return the css inline statement,
         or else it'll be error as ILLEGAL
         so u don't keep appending style to head
         */
         KeyFrame.check = true;
       }
      }
    }

    return KeyFrame;
};

var showFoundStudent = (foundStudentId) => {
  var $foundStudent = $('#student' + foundStudentId);
  $foundStudent.addClass('found-student');

  var top = $foundStudent.position().top + 'px';
  var left = $foundStudent.position().left + 'px';
  var imgSrc = $('#student' + foundStudentId + ' img').attr('src');
  var name = $('.found-student #student-name').text();

  $('#image-to-get-size').attr('src', imgSrc);

  var realImageWidth = $('#image-to-get-size').width();
  var realImageHeight = $('#image-to-get-size').height();

  var sizes = getSizeToScale(realImageWidth, realImageHeight);

  var maxWidthToScale = sizes[0];
  var maxHeightToScale = sizes[1];
  var studentNameDistanceToTop = sizes[2];

  var $result = $("#result");
  $foundStudent.css({
    'animation' : 'disappear 0.1s 1 ease-in forwards'
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

  var KeyFrame = createKeyframes(left, top, maxWidthToScale, maxHeightToScale);

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
}

var hideFoundStudent = () => {
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
}
