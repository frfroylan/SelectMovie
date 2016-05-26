var pos = 0;
movieScript = function(){
	var movieData = "http://test.frontendhero.nl/movie-challenge/movies.json";
	var myRequest;

	//Test if XMLHttpRequest is available in active browser
	try{
		myRequest = new XMLHttpRequest();
	}
	catch(e){
		try{
			myRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				myRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				alert("Something broke!");
				return false;
			}
		}
	}
	myRequest.onreadystatechange = function(){
		if(myRequest.readyState === 4 && myRequest.status === 200){
			var jsonObj = JSON.parse(myRequest.responseText);//Grabs json object
			var data = jsonObj.data; //Grabbing data objects from json
			var assets; //Will hold array of data objects
			movies =[]; //Array for actionMovie objects

			generateMovies = function(userGenre){
				movies.splice(0, movies.length);
				//Outer level of json
				for(var key in data){
					assets = data[key].assets;

					//Movie data of the json file cross checked with user selected genre
					for(var x in assets){
						if(assets[x].genre === userGenre){
							movies.push(assets[x]);
						}
					}
				}
				pos = 0;
				pushToDom(movies,pos);
			}
		}
	}
	myRequest.open("GET", movieData, true);
	myRequest.send();
}
pushToDom = function(movies, pos){
	var domTitles = document.getElementById('movieTitles');
	var domImgs = document.getElementById('movieImgs');
	domTitles.innerHTML = movies[pos].title;
	domImgs.setAttribute('src', movies[pos].img);
}
changeMovie = function(val){
	if(pos === 0 && val === -1){
		pos = movies.length - 1;
		fade();
		pushToDom(movies, pos);
	}
	else if(pos === movies.length && val === 1){
		pos = 0;
		fade();
		pushToDom(movies, pos);
	}
	else{
		pos = pos + val;
		fade();
		pushToDom(movies, pos);
	}
}

fade = function(){
	var fadeMovie = document.getElementById('singleMovie');

	console.log(fadeMovie.classList.contains('fade-in'));
	if(fadeMovie.classList.contains('fade-out') === true){
		fadeMovie.classList.add('fade-in');
	}
	else{
		fadeMovie.classList.add('fade-out');
	}
}