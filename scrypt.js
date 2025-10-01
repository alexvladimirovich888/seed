document.addEventListener("DOMContentLoaded", function () {
  const seedTypes = {
    luckberry: {
      name: "Luckberry",
      color: "#80c975",
      img: "./img/Green.png",
      desc: "Sprouts in random spots. Grows faster during chaos. You don't find it — it finds you.",
      personality: "Unpredictable, playful, contagious",
    },
    heartseed: {
      name: "Heartseed",
      color: "#cc4242",
      img: "./img/Red.png",
      desc: "Beats like a pulse. Bonds with nearby seeds and helps them grow stronger.",
      personality: "Warm, steady, protective",
    },
    fortuna: {
      name: "Fortuna Sprout",
      color: "#e8c900",
      img: "./img/yellow.png",
      desc: "Born from pure chance. Sometimes doubles, sometimes vanishes.",
      personality: "Risky, playful, rare",
    },
    dreamroot: {
      name: "Dreamroot",
      color: "#6643a9",
      img: "./img/Blue.png",
      desc: "Grows while you rest. Feeds on dreams, ideas, and moonlight.",
      personality: "Quiet, deep, mysterious",
    },
    sparkleaf: {
      name: "Sparkleaf",
      color: "#f4822a",
      img: "./img/orange.png",
      desc: "Ignites others with inspiration. Burns fast, but leaves light behind.",
      personality: "Intense, creative, short-lived",
    },
  };

  const fakeUsernames = [
    "8GzB9...4k",
    "D5eUN...GR",
    "4Txzt...4D",
    "9Ptd2...PZ",
    "7LCeo...Pa",
    "HrEiM...XW",
    "BrxqD...Qh",
    "Ez7dA...dM",
    "6Tn1W...Bd",
    "FbMpx...nN",
    "2uRhX...5n",
    "HhvPA...XL",
    "5aBN3...HF",
    "7ZdUp...9Y",
    "CpN3H...gS",
  ];

  const gardenGrid = document.getElementById("gardenGrid");
  const numInitialSeeds = Math.floor(Math.random() * 4) + 7;

  for (let i = 0; i < numInitialSeeds; i++) {
    const seedType =
      Object.keys(seedTypes)[
        Math.floor(Math.random() * Object.keys(seedTypes).length)
      ];
    const username =
      fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)];
    addSeedToGarden(seedType, username);
  }

  let selectedSeed = null;
  const seedOptions = document.querySelectorAll(".seed-option");

  seedOptions.forEach((option) => {
    option.addEventListener("click", function () {
      seedOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      selectedSeed = this.getAttribute("data-seed");
    });
  });

  document.getElementById("plantButton").addEventListener("click", function () {
    if (!selectedSeed) {
      alert("Please select a seed type first!");
      return;
    }

    const username = document.getElementById("usernameInput").value.trim();
    const displayName =
      username ||
      fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)];

    addSeedToGarden(selectedSeed, displayName);

    seedOptions.forEach((opt) => opt.classList.remove("selected"));
    selectedSeed = null;
    document.getElementById("usernameInput").value = "";
  });

  function addSeedToGarden(seedType, username) {
    const seed = seedTypes[seedType];

    const seedElement = document.createElement("div");
    seedElement.className = "seed";

    seedElement.innerHTML = `
            <img src="${seed.img}" class="seed-img" alt="${seed.name}">
            <div class="seed-name">${username}</div>
            <div class="tooltip">
                <div class="tooltip-title">${seed.name}</div>
                <div class="tooltip-desc">${seed.desc}</div>
                <div class="tooltip-personality">${seed.personality}</div>
            </div>
        `;

    gardenGrid.appendChild(seedElement);
  }

  const bgMusic = document.getElementById("bgMusic");
  const audioControl = document.getElementById("audioControl");
  let audioEnabled = false;

  function enableAudio() {
    if (!audioEnabled) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch((e) => console.log("Audio play failed:", e));
      audioEnabled = true;
      audioControl.textContent = "🔊";
      document.removeEventListener("click", enableAudio);
    }
  }

  document.addEventListener("click", enableAudio);

  audioControl.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play();
      this.textContent = "🔊";
    } else {
      bgMusic.pause();
      this.textContent = "🔇";
    }
  });
});
