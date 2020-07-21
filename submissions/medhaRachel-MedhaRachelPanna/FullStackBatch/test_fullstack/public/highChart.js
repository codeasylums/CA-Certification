let third = document.getElementById('third');
let fourth = document.getElementById('fourth')

async function showSkill() {
  var xhttp = new XMLHttpRequest();
  var jo;
  var a = 0, b, c, d;
  
  xhttp.onreadystatechange = async function () {

    if (this.readyState == 4 && this.status == 200) {
      jo = JSON.parse(this.responseText);
      console.log("working")
      console.log(jo.arrList[0].gitID);
      console.log(jo.arrList[0].codeforcesID)
      let res = await fetch(`https://api.github.com/users/${jo.arrList[0].gitID}`);
      let data = await res.json();
      console.log("highCharts")
      console.log(data)
      a = data.following
      b = data.followers
      c = data.public_gists
      d = data.public_repos
      console.log(a)
      console.log(b)
      console.log(c)
      console.log(d)
      console.log(jo.arrList[0].codeforcesID)
      let res_1 = await fetch(`https://codeforces.com/api/user.info?handles=${jo.arrList[0].codeforcesID}`);
      let data_1 = await res_1.json();
      console.log("data=")
      console.log(data_1.result[0].country)
      third.innerHTML = `
          <div class=col>
            <div class="d" style="max-width: 100%">
              <div class="card-body">
                <h4>GitHub Profile</h4>
                <img src="${data.avatar_url}" alt="avatar">
                <p>Login ID: ${data.login}</p>
    
                <p>Followers :${data.followers}</p>
    
                <p>Following: ${data.following}</p>
    
                <p>public Repo: ${data.public_repos}</p>
    
                <p>git repo: ${data.public_gists}</p>
    
                <script src="https://code.highcharts.com/highcharts.js"></script>
                <script src="https://code.highcharts.com/modules/exporting.js"></script>
                <script src="https://code.highcharts.com/modules/export-data.js"></script>
                <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    
                <figure class="highcharts-figure">
                  <div id="container"></div>
                  <p class="highcharts-description">
                    GitHub Profile
                  </p>
                </figure>
              </div>
            </div>
    
        </div>
        `
       

        fourth.innerHTML = `
        <div class=col>
          <div class="d" style="max-width: 100%">
            <div class="card-body">
              <h4>Coding  Profile</h4>
              <br>
              <img src="${data_1.result[0].titlePhoto}" alt="avatar">
              <p>First name : ${data_1.result[0].firstName}</p>
              <p>Last name : ${data_1.result[0].lastName}</p>
              <p>Country :${data_1.result[0].country}</p>
              <p>rating : ${data_1.result[0].rating}</p>
              <p>Friends Count : ${data_1.result[0].friendOfCount}</p>
              <p>rank : ${data_1.result[0].rank}</p>
              <p>Contribution : ${data_1.result[0].contribution}</p>
              <p>Maximum Rating : ${data_1.result[0].maxRating}</p>
  
             
            </div>
          </div>
  
      </div>
      `
      Highcharts.chart('container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Profile View'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
            name: 'Public Repo',
            y: d,
            sliced: true,
            selected: true
          }, {
            name: ' Git Repo',
            y: c
          }, {
            name: 'Followers',
            y: b
          }, {
            name: 'Following',
            y: a
          }]
        }]
      });

    }
  }
  xhttp.open('GET', "log/showSkill", true);
  xhttp.send();
}

 function showHome(){
  third.innerHTML=`  <div class="row justify-content-md-center" id=third>
  <div class=col>
    <div class="d" style="max-width: 100%">
      <div class="card-body">
       
         <img src="images/image1.jpg" alt="avatar">
         <br>
         <h3>
           Place To Showcase Your Skills
         </h3>
        <!--<p>Login ID: defunkt</p>

        <p>Followers : 1052</p>

        <p>Following: 422</p>

        <p>public Repo: 45</p>

        <p>git repo: 12</p> -->

        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>

        <figure class="highcharts-figure">
          <div id="container"></div>
          
        </figure>
      </div>
    </div>

  </div>

</div>`

fourth.innerHTML=` `
}