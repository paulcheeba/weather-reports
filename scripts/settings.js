Hooks.once("ready", function () {
  game.settings.register("weather-reports", "theme", {
    name: "Change weather reports theme",
    hint: "Changes the weather reports theme for changelog and chat cards.",
    type: String,
    choices: {
        "a": "Light Theme",
        "b": "Dark Theme",
        "c": "Organic Theme",
        "d": "Synthetic Theme"
             },
        default: "a",
    scope: "client",
    config: true,
    onChange: value => { // A callback function which triggers when the setting is changed
    console.log(value)
  }
  });
    if (!game.user.isGM) {
        return;
    } 
  game.settings.register("weather-reports", "isHidden", {
    name: "Hide weather reports changelog",
    hint: "Hides the weather reports changelog until next update",
    default: false,
    type: Boolean,
    scope: "client",
    config: true,
  });
});