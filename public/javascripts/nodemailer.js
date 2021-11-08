/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */

$ = function(id) {
  return document.getElementById(id);
}

var show = function(id) {
	$(id).style.display ='block';
}
var hide = function(id) {
	$(id).style.display ='none';
  notif = undefined;
}

