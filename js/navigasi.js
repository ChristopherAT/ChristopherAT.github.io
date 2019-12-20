document.addEventListener("DOMContentLoaded", function () {
  // Load page content
  var page = window.location.hash.substr(1);
  if (page == "" || page == "home") {
    page = "home";
    document.getElementById("body-home").style.display = "block";
    document.getElementById("body-content").style.display = "none";
  }
  else {
    document.getElementById("body-home").style.display = "none";
    document.getElementById("body-content").style.display = "block";
    loadPage(page);
  }

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<center><h2>Error 404<br>Halaman tidak ditemukan</h2></center>";
        } else {
          content.innerHTML = "<center><h2>Ups...<br>Halaman tidak dapat diakses</h2></center>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  document.querySelectorAll(".sidenav a, .topnav a, .brand-logo").forEach(function (elm) {
    elm.addEventListener("click", function (event) {
      // Tutup sidenav
      var sidenav = document.querySelector(".sidenav");
      M.Sidenav.getInstance(sidenav).close();

      // Muat konten halaman yang dipanggil
      page = event.target.getAttribute("href").substr(1);
      if (page == "" || page == "home") {
        page = "home";
        document.getElementById("body-home").style.display = "block";
        document.getElementById("body-content").style.display = "none";
      }
      else {
        document.getElementById("body-home").style.display = "none";
        document.getElementById("body-content").style.display = "block";
        loadPage(page);
      }
    });
  });
});