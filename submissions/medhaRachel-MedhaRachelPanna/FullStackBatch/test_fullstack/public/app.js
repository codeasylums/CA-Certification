console.log("APP.js")
const userID='5f12fe406b7789b7581165d1'
let left=document.getElementById('second')
left.innerHTML="<center><h3> User</h3></center>";
let middle=document.getElementById('third');

async function getUpdate(){
  let gitID=document.getElementById('gitID').value;
  let codeforcesID=document.getElementById('codeforcesID').value;
  let kaggleID=document.getElementById('kaggleID').value;
middle.innerHTML=`<h2>${gitID} ${codeforcesID} ${kaggleID}</h2>`
}


let third=document.getElementById('third');



async function showSkill(){
  var xhttp=new XMLHttpRequest();
  var jo;
  xhttp.onreadystatechange=async function(){
    if(this.readyState==4&& this.status==200){
      jo=JSON.parse(this.responseText);
      console.log("working")
      console.log(jo.arrList[0].gitID);
      let res = await fetch(`https://api.github.com/users/${jo.arrList[0].gitID}`);
      let data = await res.json();
     
     
      third.innerHTML=`<div class="row justify-content-md-center">
      <div class=col>
        <div class="d" style="max-width: 100%">
          <div class="card-body">
            <h4>GitHub Profile</h4>
            <img src="" alt="avatar">
            <p>Login ID: defunkt</p>

            <p>Followers :11</p>

            <p>Following: 11</p>

            <p>public Repo: 11</p>

            <p>git repo: 11</p>

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

    </div>`
      console.log(data)
    }
  }
  
 
  xhttp.open('GET',"log/showSkill",true);
  xhttp.send();
   
}