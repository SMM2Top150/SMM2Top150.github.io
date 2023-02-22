function hamburgur(x) {
    x.classList.toggle("change");
  }

  PointPiviot = 3;
  function PointCalc(PlaceMent) {
    return Math.pow(1.054411903089, (PlaceMent + 40) / 1.4);
  }

  function ClearPoints(Array) {
    index = 0;
    total = 0;
    while (index < Array.length) {
      total += PointCalc(101 - Array[index] + PointPiviot - 1);
      index += 1;
    }
    return total;
  }

  function ProgressCalc(Placement, Progress) {
    PointPrecent = (Progress / 10.0) * (Progress / 10.0) * 0.01;
    return PointCalc(Placement + PointPiviot - 1) * PointPrecent * 0.9;
  }

  function ProgressPoint(ProgressArray, LevelArray) {
    index = 0;
    total = 0;
    while (index < ProgressArray.length) {
      total += ProgressCalc(101 - LevelArray[index], ProgressArray[index]);
      index += 1;
    }
    return total;
  }

  function MasterPoints(ProgressArray, ProgressLevelArray, ClearArray) {
    return (
      ProgressPoint(ProgressArray, ProgressLevelArray) +
      ClearPoints(ClearArray)
    );
  }

  const url =
    "https://script.google.com/macros/s/AKfycbxzmGDJZuBf8p536PG-Zp5HdhihYQB77kBCdGIok9NhKwcsLKwb-xSZ18frTuQzujZt/exec?action=getData";

  async function GET(url) {
    const response = await fetch(url);
    var JSON = await response.json();
    console.log(JSON);
    HTMLshower(JSON);
  }

  GET(url);

  function HTMLshower(JSON) {
    var disp = "";

    for (i = 0; i < JSON.length; i++) {
      YTID = JSON[i].ClearVideo.split("=");
      if (YTID[1] != undefined) {
        var Thumbnail =
          "https://i3.ytimg.com/vi/" +
          YTID[1].slice(0, -1) +
          "/maxresdefault.jpg";
      } else {
        var Thumbnail =
          "https://tgrcode.com/mm2/level_thumbnail/" + JSON[i].CourseID;
      }

      disp +=
        `
        <div class="grid-levelSlots">
    <div class="parent">
      <div class="div1">
        <div class="div2-description" style="text-align: center;">
          <p class="description-text">Created By:` +
        JSON[i].Creators +
        `</p>
          <p class="description-text">Uploaded By: TGR API</p>
        </div>
      </div>
      <div class="div2">
        <div class="div2-description">
          <p class="description-text">
          ` +
        JSON[i].Description +
        `
          </p>
        </div>
      </div>
      <div class="div3">
        <p class="div3-title">
          #` +
        (i + 1) +
        `: ` +
        JSON[i].Title +
        `
        </p>
      </div>
      <div class="div4">
        <img
          class="div4-flag"
          src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
        />
      </div>
      <div class="div5">
        <img
          href="` +
        JSON[i].ClearVideo +
        `"
          class="div5-thumbnail"
          src="https://i3.ytimg.com/vi/RlsX9mX1fus/maxresdefault.jpg"
        />
      </div>
      <div class="div6">
        <div class="div2-description" style="text-align: center;">
          <p class="description-text">Completion: ` +
        PointCalc(100 - i).toFixed(2) +
        ` </p>
          <p class="description-text">List Progress: ` +
        ProgressCalc(100 - i, 55).toFixed(2) +
        ` </p>
          <p class="description-text">Clear Rate: TGR API</p>
        </div>
      </div>
      <div class="div7">
        <div>
          <p class="description-text">ID: ` +
        JSON[i].CourseID +
        `</p>
          <p class="description-text">29-5-2022 14:25:33</p>
        </div>
      </div>
    </div>
  </div>
        `;
    }

    // Setting innerHTML as tab variable
    document.getElementById("done").innerHTML = disp;
  }
