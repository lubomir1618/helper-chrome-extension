let isValidHostname = /^http:.*\.cloud\.opta\.net\/helper\/v3\/#\/football\/.*$|^.*\.optadev\.com\/#\/football\/.*$|^.*\/release_development\/build\/.*autobuild=.*\/football\/.*$/.test(
  window.location.href
);

// OMO id -  opId Premier League, Bundesliga, A-League
//const favCompetitions = [8, 27, 214];
// weird html parameter id, doesn't match with real competition id
const favCompetitions = [9, 19, 95];
let reorderedComp = "";

function getComps() {
  let competitions = document.getElementsByClassName("chosen-results")[0];
  reorderedComp = "";
  if (competitions) {
    competitions = [...competitions.querySelectorAll(".active-result")];

    competitions.length > 0
      ? reorderComps(competitions)
      : () => {
          return;
        };
  }
}

function reorderComps(competitions) {
  competitions.sort((a, b) => {
    if (
      favCompetitions.includes(
        Number(a.attributes["data-option-array-index"].value)
      ) &&
      !favCompetitions.includes(
        Number(b.attributes["data-option-array-index"].value)
      )
    ) {
      return 1;
    } else {
      return -1;
    }
  });
  competitions.reverse().forEach(competition => {
    reorderedComp += competition.outerHTML;
  });

  document.getElementsByClassName(
    "chosen-results"
  )[0].innerHTML = reorderedComp;
}

if (isValidHostname) {
  document.addEventListener("click", getComps);
  document.body.style.backgroundColor = "lightgreen";
}
