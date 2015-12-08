// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var ich = require("icanhaz");
var $ = document.querySelector.bind(document);
var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));

var questionTemplate = require("./_questionTemplate.html");
ich.addTemplate("questionTemplate", questionTemplate);

var score = 0;
var id = 0;
var quizLength = Object.keys(quizData).length;

document.querySelector(".quiz-container").addEventListener("click", function(e) {
  if (e.target.classList.contains("retake")) {
    score = 0;
    id = 0;
    showQuestion(id);
    $(".answers").classList.remove("hidden");
    $(".index").classList.remove("hidden");
  }
});

qsa(".answer").forEach(function(el) {
  el.addEventListener("click", function(e) {
    var answer = e.target.innerHTML;
    if (answer == "yes") { score += 1 }

    if ((id + 1) < quizLength) {
      id += 1;
      showQuestion(id);
    } else {
      var obj = {score: score};
      if (score < 5) {
        obj.green = true;
      } else if (score < 11) {
        obj.yellow = true;
      } else {
        obj.red = true;
      }
      $(".question").innerHTML = `
        <div class="score">Your ACE score: ${score}</div>
        <div class="retake"><i class="fa fa-undo"></i> Retake</div>
      `;
      $(".answers").classList.add("hidden");
      $(".index").classList.add("hidden");
    }
  });
});
  
var showQuestion = function(id) {
  $(".question").innerHTML = ich.questionTemplate(quizData[id]);
  $(".index").innerHTML = (id + 1) + " / " + quizLength;
};

showQuestion(id);
