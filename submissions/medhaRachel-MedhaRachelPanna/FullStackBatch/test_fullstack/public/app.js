async function load(){
    let res = await fetch(`/log/details`);
    const data1 = await res.json();
    const data=data1.arrList[0];
    console.log(data);
    document.getElementById('second').innerHTML =" ";
    let ldata=`<span>Name: ${data.name}</span><br>
                <span>Email: ${data.email}</span><br>
                <span>Username: ${data.userName}</span><br>
                <span>Contact: ${data.phoneNumber}</span><br>`
    document.getElementById('second').innerHTML= ldata;
}

//Coding Profile Search
async function DataSearchCoding() {
    let titleOrName = document.getElementById('search').value;
    console.log(titleOrName);
    document.getElementById('homePageContent').innerHTML =" ";
    titleOrName.trim();
    titleOrName.replace("/\s/g", '%20');
    let res = await fetch(`https://codeforces.com/api/user.info?handles=${titleOrName}`);
    const data1 = await res.json();
    const data=data1.result[0];
    console.log(data);
    let header = `
    <div class="page-title wb">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <h2><i class="fa fa-leaf bg-green"></i> Search results: ${titleOrName}</h2>
                </div><!-- end col -->
                <div class="col-lg-4 col-md-4 col-sm-12 hidden-xs-down hidden-sm-down">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">${data.firstName} ${data.lastName}</li>
                    </ol>
                </div><!-- end col -->                    
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end page-title -->`;
    document.getElementById('homePageContent').innerHTML= header;
    let containerForData = `
    <section class="section wb">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div class="page-wrapper">
                        <div class="blog-list clearfix" id="result">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
    document.getElementById('homePageContent').innerHTML += containerForData;
    if (data != null && typeof data != undefined && data != "") {
        if (data.totalItems == 0) {
            let noData = `
            <p>
                <h3><strong>Sorry... user with handle ${titleOrName} is not available</strong></h3>
            </p>
        `;
            document.getElementById('homePageContent').innerHTML = noData;
            return;
        }
            let dataForArray = `
            <div class="blog-box row">
                <div class="col-md-4">
                    <div class="post-media">
                        <a href="https://codeforces.com/profile/${titleOrName}" title="">
                            <img src="${data.titlePhoto}" alt="" class="img-fluid">
                            <div class="hovereffect"></div>
                        </a>
                    </div><!-- end media -->
                </div><!-- end col -->

                <div class="blog-meta big-meta col-md-8">
                    <span class="bg-aqua">${data.firstName} ${data.lastName}</span><br>
                    <span class="bg-aqua" onclick="addToFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Follow</span> <br>
                    <span class="bg-aqua" onclick="delFromFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Unfollow</span> <br>
                    <span class="bg-aqua" onclick="addToBooksCart('${data.id}')" id="${data.id}><i class="fa fa-search"></i>Add to friends       </span>
                    <span class="bg-aqua" onclick="delFromBooksCart('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Unfriend</span> <br><br>
                    <div style="height: 200px; overflow-y: scroll;">
                    <p>Last Online: ${data.lastOnlineTimeSeconds}<br>
                    Handle: ${data.handle}<br>
                    Country: ${data.country}<br>
                    City: ${data.city}<br>
                    Friends: ${data.friendOfCount}<br>
                    Contribution: ${data.contribution}<br>
                    Organisation: ${data.organization}<br>
                    Rank: ${data.rank}<br>
                    Max Rank: ${data.maxRank}<br>
                    Max Rating: ${data.maxRating}<br>
                    Registration Time(s):${data.registrationTimeSeconds}<br>
                    </p>
                    </div>
                    
                </div><!-- end meta -->
            </div>`;
            document.getElementById('result').innerHTML += dataForArray;
    } else {
        let noData = `
            <p>
                <h3><strong>Sorry... the user ${titleOrName} is not available</strong></h3>
            </p>
        `;
        document.getElementById('homePageContent').innerHTML = noData;
    }
}


//Development profile search

async function DataSearchDev() {
    let titleOrName = document.getElementById('search').value;
    console.log(titleOrName);
    document.getElementById('homePageContent').innerHTML = "";
    titleOrName.trim();
    titleOrName.replace("/\s/g", '%20');
    let res = await fetch(`https://api.github.com/users/${titleOrName}`);
    const data1 = await res.json();
    const data=data1;
    console.log(data);
    let header = `
    <div class="page-title wb">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <h2><i class="fa fa-leaf bg-green"></i> Search results: ${titleOrName}</h2>
                </div><!-- end col -->
                <div class="col-lg-4 col-md-4 col-sm-12 hidden-xs-down hidden-sm-down">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">${data.name}</li>
                    </ol>
                </div><!-- end col -->                    
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end page-title -->`;
    document.getElementById('homePageContent').innerHTML = header;
    let containerForData = `
    <section class="section wb">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div class="page-wrapper">
                        <div class="blog-list clearfix" id="result">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
    document.getElementById('homePageContent').innerHTML += containerForData;
    if (data != null && typeof data != undefined && data != "") {
        if (data.totalItems == 0) {
            let noData = `
            <p>
                <h3><strong>Sorry... user with handle ${titleOrName} is not available</strong></h3>
            </p>
        `;
            document.getElementById('homePageContent').innerHTML = noData;
            return;
        }
            let dataForArray = `
            <div class="blog-box row">
                <div class="col-md-4">
                    <div class="post-media">
                        <a href="https://github.com/${data.login}" title="">
                            <img src="${data.avatar_url}" alt="" class="img-fluid">
                            <div class="hovereffect"></div>
                        </a>
                    </div><!-- end media -->
                </div><!-- end col -->

                <div class="blog-meta big-meta col-md-8">
                    <span class="bg-aqua">${data.name}</span><br>
                    <span class="bg-aqua" onclick="addToFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Follow</span> <br>
                    <span class="bg-aqua" onclick="delFromFavourites('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Unfollow</span> <br>
                    <span class="bg-aqua" onclick="addToBooksCart('${data.id}')" id="${data.id}><i class="fa fa-search"></i>Add to friends       </span>
                    <span class="bg-aqua" onclick="delFromBooksCart('${data.id}')" id="${data.id}><i class="fa fa-heart"></i>Unfriend</span> <br><br>
                    <div style="height: 200px; overflow-y: scroll;">
                    <p style="max-width: 100%"">
                    Name: ${data.name}<br>
                    Bio: ${data.bio}<br>
                    City: ${data.location}<br>
                    Following: ${data.following}<br>
                    Followers: ${data.followers}<br>
                    Company: ${data.company}<br>
                    Created: ${data.created_at}<br>
                    Last Updated: ${data.updated_at}<br>
                    </p>
                    </div>
                    
                </div><!-- end meta -->
            </div>`;
            document.getElementById('result').innerHTML += dataForArray;
    } else {
        let noData = `
            <p>
                <h3><strong>Sorry... the user ${titleOrName} is not available</strong></h3>
            </p>
        `;
        document.getElementById('homePageContent').innerHTML = noData;
    }
}