## CodeAsylums Test
Welcome to the fullstack challenge part :

### Objective 
Your aim is to make a `Tech-Profile` website from scratch which enable users to showcase their tech skills be it be coding skills, development skills or machine learning skills to world. This website will create a personalized page for every techie which sums them altogether, people can search, follow and collaborate with other friends. Updating your skills on regular basis is recommended. Just a single link to view your or your friend's tech profile.

### Project 
To make a "Community-Website" where users can Register/SignIn, fill up their information and display all information in the single page.
The pages requirements are given below, customization are always welcomed.

Let's take a walk through requirements: 

1. Tech enthusiasts can register successfully or login successfully in the platform.
2. Users can fill up their personal data, skills, alias of platforms such as HackerRank, Github etc. and other details.
This can be edited on demand, and not mandatory.
3. Final Dashboard, should display all the information in a well-organized way, with profile picture (dummy can be used), along with all the top-3's. This can be skills, projects, publications, submissions, contributions etc.
4. `Searching of other fellow techies` should be enabled along with follow option. Other people can `view your profile`, without the admin edit rights.
5. A `Download` option, to create a CV/Resume based out of your profile should be present which creates the CV based in any format.

##### Technology Usage 
1. For **Frontend**, basics as well as advanced part are present. 
- Basics can start with simple `HTML, CSS, Bootstrap, JS`.
- Advanced can try creating with `React`.
2. For **Backend**, implementation should be done with `NodeJs` and `MongoDB`.


Below is the sample walk through of the website, that could have possibly thought of.

####  1. Register/Login page

1. Users can Register with basic information like, Full Name, E-mail_Id, Password etc.
2. Login can be through any unique-Id and password.

####  2. Profile Page

1. First time users, need to fill up their profile in these buckets :
- For the `User Profile` get the user details such as username, latest educational qualification and work experience etc.
- For the `Coding Profile` get the coding profile details such as Hackerrank_Id, Hackerearth_Id, Spoj_Id etc. 
- For the `Development Profile` get the github_Id, bitbucketId, gitlab_Id etc.
- For the `Machine Learning Profile` take their kaggle_Id, or any relevant platforms
- `Skills profile` will let users to enter top 3 skills, their top 3 publications, certifications, projects etc.
2. Already registered people can edit this info, as per convenience.

#### 3. Landing Page

This page is crucial for "showcase", hence it should contain all the info in a particular order to avoid dump effect.
1. Here, profile pic (can be dummy) with minimalism, personal details needs to be shown, with top 3 skills.
2. A button to toggle between coding, development, machine learning buckets is present.
Upon choosing a bucket, a div with 3 cards are shown. Different scenarios may happen.
- Coding bucket cards can have a total problems solved from multiple platforms, with other insights.
- Development bucket can show top 3 projects from github pinned or else.
- Machine learning can show any kaggle challenges won or participated info.
3. A button at corner to create resume and download the same. Format and customization are in your hands.  
4. Search section is present is navbar to search other people based on handle or any unique value.
5. Follow button at side of profile pic, to follow any friend techie.
6. Notification bar, to update any news of the followed people.

#### Organization of files

This folder has 2 sub-folders `frontend` and `backend`. `MERN` tech stack is preferred for the development.
