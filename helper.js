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
  studentNameDistanceToTop -= 80;
  studentNameDistanceToTop += 'px';

  maxWidthToScale += 'px';
  maxHeightToScale += 'px';

  return [maxWidthToScale, maxHeightToScale, studentNameDistanceToTop]
};

var createKeyframe = (left, top, maxWidthToScale, maxHeightToScale) => {
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

