var bandit_arms;
var trialIndex = 0;
var stageIndex = 0;
var nTrials = 3;
var nStages = 3; // should be 5 in the main experiment
var nActions = 3;

var create_agent = function() {
  get_info()
}

var get_info = function() {
  bandit_arms = {
    1: {"p_reward": 0.45, "reward_amount": 6 },
    2: {"p_reward": 0.15, "reward_amount": 2 },
    3: {"p_reward": 0.1, "reward_amount": 5 },
  }
  newTrial();
}

nextStage = function() {
  stageIndex++;
  if (stageIndex > nStages) {
    setTimeout(newTrial, 3000);
  } else {
    renderStage();
  }
}

newTrial = function() {
  // reset the game
  trialIndex++;
  stageIndex = 1;
  $(".main_div").html("");
  if (trialIndex <= nTrials) {
    $(".main_div").append(`<h1 class="trial-label" id="trial-${trialIndex}-label">Trial ${trialIndex}</h1>`);
    renderStage();
  } else {
    endExperiment();
  }
}

renderStage = function() {
  $(".main_div").append(`<div class="stage" id="stage-${stageIndex}"></div>`);
  $(`#stage-${stageIndex}`).append(`<h2 class="stage-label">Stage ${stageIndex}</p>`);
  $(`#stage-${stageIndex}`).append(`<div class id="stage-${stageIndex}-actions"></div>`);
  $(`#stage-${stageIndex}-actions`).append(`<p>Choose an action:</p>`);
  for (var i = 1; i <= nActions; i++) {
    $(`#stage-${stageIndex}-actions`).append(`<button type="button" class="btn btn-primary action" id="stage-${stageIndex}-action-${i}">Action ${i}</button>`);
    $(`#stage-${stageIndex}-action-${i}`).click(makeActionFn(stageIndex, i))
  }
  $(`#stage-${stageIndex}`).append(`<div class="result" id="stage-${stageIndex}-result" style="display: none;">Reward: <span id="stage-${stageIndex}-reward"></span></div>`);
}

var makeActionFn = function(stageIndex, actionNum) {
  var takeAction = function() {
    // disable the actions
    for (var i = 1; i <= nActions; i++) {
      if (i != actionNum) {
        $(`#stage-${stageIndex}-action-${i}`).addClass("disabled");
      }
      $(`#stage-${stageIndex}-action-${i}`).prop("onclick", null).off("click");
    }
    // compute and display the reward
    var reward = Math.random() < bandit_arms[actionNum]["p_reward"] ? bandit_arms[actionNum]["reward_amount"] : 0;
    $(`#stage-${stageIndex}-reward`).html(reward);
    $(`#stage-${stageIndex}-result`).show();
    nextStage();
  }
  return takeAction;
}

var endExperiment = function() {
  $(".main_div").append("<p>Experiment complete!</p>")
}
