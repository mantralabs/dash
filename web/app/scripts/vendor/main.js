'use strict';
/* ==========================================================================
HOME PAGE & PROJECT PAGE
========================================================================== */

function myFunction3()
{
  document.getElementById('comment-box').style.display='block';
}

function myFunction4()
{
  document.getElementById('doc').style.visibility='hidden';
}

/* ==========================================================================
TASKS PAGE
========================================================================== */
function myFunction5()
{
  document.getElementById('comments').style.display='block';
}

function changeColor()
{
  var elem = document.getElementsByClassName('change-color');

  for (var i = 0;i < elem.length; i++)
  {
    elem[i].style.color = '#4b9ff2';
  }
}