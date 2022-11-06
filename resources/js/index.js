// Disable loading page
window.addEventListener('load', (event) => {
  $(".section-loading-page").fadeOut("slow");
});


// Enable and disable full screen
$("#button-full-screen").click(() => {
  if (!document.fullscreenElement && 
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      console.log("[Braza Info] O app foi colocado em tela cheia.")
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
      console.log("[Braza Info] O app foi colocado em tela cheia.")
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
      console.log("[Braza Info] O app foi colocado em tela cheia.")
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      console.log("[Braza Info] O app foi colocado em tela cheia.")
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      console.log("[Braza Info] O app foi retirado da tela cheia.")
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      console.log("[Braza Info] O app foi retirado da tela cheia.")
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      console.log("[Braza Info] O app foi retirado da tela cheia.")
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      console.log("[Braza Info] O app foi retirado da tela cheia.")
    }
  }
});


// Restart APP
$("#button-reload-app").click(() => {
  location.reload();
});


// Operation of the research field
$('#search-input').keyup(function(e) {
  if (e["key"] == "Enter") {
    searchField = $("#search-input")
    if (searchField.val() == "" || searchField.val() == " ") {
      console.warn("Você precisa escrever o nome de usuário no campo de pesquisa.")
      return;
    }

    $(".section-loading-page").fadeIn("slow");

    $.get(`https://api.github.com/users/${searchField.val()}`, (data) => {
      searchField.val("");
      
      $("#response-error-request").hide();
      $(".navbar-photo-profile-card").css({background: `url(${data["avatar_url"]})`, backgroundSize: "cover"});
      $("#profile-name").text(`${data["login"]}`);
      $("#a-view-profile").prop("href", data["html_url"]);
      $("#a-view-repos").prop("href", `https://github.com/${data["login"]}?tab=repositories`);
      $("#a-view-followers").prop("href", `https://github.com/${data["login"]}?tab=followers`);
      $("#a-view-followings").prop("href", `https://github.com/${data["login"]}?tab=following`);
      
      if (data["name"] == null) {
        $("#data-extra-name").text("Nome não encontrado");  
      } else {
        $("#data-extra-name").text(data["name"]);
      }

      $("#data-extra-id").text(data["id"]);

      if (data["email"] == null) {
        $("#data-extra-email").text("E-mail não encontrado");
      } else {
        $("#data-extra-email").text(data["email"]);
      }

      if (data["location"] == null) {
        $("#data-extra-location").text("Localização não encontrada");
      } else {
        $("#data-extra-location").text(data["location"]);
      }

      if (data["bio"] == null) {
        $("#data-extra-bio").text("Biografia não encontrada");
      } else {
        $("#data-extra-bio").text(data["bio"]);
      }

      if (data["company"] == null) {
        $("#data-extra-company").text("Empresa não encontrada");
      } else {
        $("#data-extra-company").text(data["company"]);
      }

      let numberRepos = $("#results-count-repos");
      let minRepos = 1;
      let maxRepos = data["public_repos"];

      for (var i = minRepos; i <= maxRepos; i++) {
        setTimeout(function(nr) {
          numberRepos.text(nr);
        }, i * 7000 / maxRepos, i);
      }

      let numberFollowers = $("#results-count-followers");
      let minFollowers = 1;
      let maxFollowers = data["followers"];

      for (var i = minFollowers; i <= maxFollowers; i++) {
        setTimeout(function(nr) {
          numberFollowers.text(nr);
        }, i * 7000 / maxFollowers, i);
      }

      let numberFollowings = $("#results-count-followings");
      let minFollowings = 1;
      let maxFollowings = data["following"];

      for (var i = minFollowings; i <= maxFollowings; i++) {
        setTimeout(function(nr) {
          numberFollowings.text(nr);
        }, i * 7000 / maxFollowings, i);
      }


      $(".section-loading-page").fadeOut("slow");
    }).fail((data) => {
      $("#response-error-request").show();
      $(".section-loading-page").fadeOut("slow");
    })
  }
}); 







