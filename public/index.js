function myFunction() {
  var x = document.getElementById("myTopnav");
  var section = document.getElementById("section")
  var mq = window.matchMedia( "(max-width: 928px)" );
  if (x.className === "topnav") {
    x.className += " responsive";
    if(section.className === "section") {
      section.className += " section-mobile"
    }
  } else {
    x.className = "topnav";
    section.className = "section"
  }
}


function handleNavClick(e) {
  if (document.querySelector('#topnav a.active') !== null) {
    document.querySelector('#topnav a.active').classList.remove('active');
  }
  e.target.className = "active";
}
