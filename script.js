//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
};

// to remove from summary p tag
function cleanSummary(epi) {
  if (epi.includes)
    return epi.replace("<p>", "")
      .replace("</p>", "");
};
// main function
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // select List
  const selectEl = document.createElement('select');
  selectEl.setAttribute('name', 'selectEp');
  selectEl.id = "filter";
  episodeList.map(opElm => {
    const optionEl = selectEl.appendChild(document.createElement('option'));
    optionEl.setAttribute('value', 'opEl');
    optionEl.id = 'episode-select'
    optionEl.textContent = `${opElm.name} - S0${opElm.season}E0${opElm.number}`;
    optionEl.addEventListener("click", e => {
      const selectedEp = e.target.textContent;
      const headEp = document.querySelectorAll('.episode-card');
      let c = [];
      headEp.forEach(function (selectEpd) {
        const item = selectEpd.firstChild.textContent;
        if (selectedEp === item) {
          selectEpd.style.display = '';
          c.push(Array.from(selectEpd));

        } else {
          selectEpd.style.display = 'none';
        }

      });
      hEl.innerText = `Got ${c.length} / ${episodeList.length} episode(s)`;
    })
  }
  );
  rootElem.appendChild(selectEl);


  // input filter
  const inputEl = document.createElement('input');
  inputEl.setAttribute('type', "text");
  inputEl.setAttribute('name', "filter");
  inputEl.id = "filter";
  rootElem.appendChild(inputEl);
  inputEl.addEventListener("keyup", e => {
    const filEpisode = e.target.value.toLowerCase();
    const filly = document.querySelectorAll('.episode-card');
    let c = [];
    filly.forEach(function (filterEpd) {

      const item = filterEpd.firstChild.textContent;
      if (item.toLowerCase().indexOf(filEpisode) !== -1) {
        filterEpd.style.display = '';
        c.push(Array.from(filterEpd));

      } else {
        filterEpd.style.display = 'none';
      }
    });

    hEl.innerText = `Got ${c.length} / ${episodeList.length} episode(s)`;
  }
  );
  const filtEl = document.querySelectorAll('.episode-card').length;
  const hEl = document.createElement("span");
  hEl.className = 'span1';
  hEl.innerText = `Got ${0} / ${episodeList.length} episode(s)`;
  rootElem.append(hEl);


  // episode element
  const epdLists = document.createElement("div");
  epdLists.id = "list";
  for (let episode of episodeList) {
    const episodeWrapper = document.createElement("div");
    episodeWrapper.className = "episode-card";
    const episodeImage = document.createElement("img");
    episodeImage.className = "img";
    const episodeSummary = document.createElement("p");
    const header = document.createElement("header");
    header.className = "header";
    header.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`;
    episodeImage.src = episode.image.medium;
    episodeSummary.className = "episode-description";
    episodeSummary.innerText = `${cleanSummary(episode.summary)}`;
    episodeWrapper.append(header, episodeImage, episodeSummary);
    epdLists.append(episodeWrapper)
  }
  rootElem.append(epdLists);
};


window.onload = setup;
