/* Variables and setters */

	var selectedCarId = "null";
	var selectedCar = null;
	var sharedCarDB = new Object;
	
	function setSelectedOption(option){
		selectedOption = option;
	}

	function setSelectedCarId(descriptionCar){
		selectedCarId = document.getElementById("optionList").options[document.getElementById("optionList").selectedIndex].value;
		if(selectedCarId=="null"){
			document.getElementById('description-car').style.display = 'none';	
		}
		else{
			document.getElementById('description-car').style.display = 'block';
			document.getElementById('description').innerHTML = "&nbsp&nbsp" + descriptionCar;
		}
	}

	/* Insert shared vehicle owners mail in array SharedCar */
	function insertSharedCar(carId, sharedUsers){ //Falta lista sharedUsers
		var splited = sharedUsers.split(",");
		var arrayAux = new Array();
		for (var i = 0; i < splited.length; i++) {
			arrayAux.push(splited[i]);
		};
		sharedCarDB[carId] = arrayAux;
		sharedCarDB[carId] = arrayAux;
	}

	/* Save changes to car into DB */
	function saveChanges(){
		if(selectedCarId == "null"){
			$('#lblNoCarSelected').show();
		}
		else if(selectedCarId =="new"){
			var newDescription = document.getElementById('newDescription').value;
			window.open("newCar?&newdescription="+newDescription.toUpperCase(),"_self");
		}
		else{
			var newDescription = document.getElementById('newDescription').value;
			window.open("editCar?&newdescription="+newDescription.toUpperCase()+"&shared="+sharedCarDB[selectedCarId]+"&id="+selectedCarId,"_self");
		}
	}

	/* Remove car in DB */
	function removeCar(){
	    if (confirm("¿Estás seguro de que deseas eliminar el coche seleccionado?")) {
			window.open("deleteCar?&id="+selectedCarId,"_self");
	    }
	}

	/* Check if mail is correct and change label */
	function inputMail(){
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var email = document.getElementById("inputMailShared").value;
		if(re.test(email)){
			document.getElementById('labelSharedMailIncorrect').style.display = 'none';
			createLabelMail(email);
			sharedCarDB[selectedCarId].splice(0,0,email);
			document.getElementById("inputMailShared").value = "";
		}
		else{
			document.getElementById('labelSharedMailIncorrect').style.display = 'block';
    	}
    }

    /* Clear labels of shared users */
    function clearWellSharedMail(){
    	var wellSharedMail = document.getElementById("wellSharedMail");
    	while (wellSharedMail.firstChild) {
    		wellSharedMail.removeChild(wellSharedMail.firstChild);
    	}
    }

    /* Create and append label for shared vehicle owners mails */
    function createLabelMail(mail){
    	if(mail!=""){
	    	var newDiv = document.createElement("div");
	    	newDiv.className = "alert alert-info alert-dismissible label-mail";
	    	newDiv.innerHTML = mail;
	    	var btnClose = document.createElement("button");
	    	btnClose.className = "close label-mail-close";
	    	btnClose.setAttribute("aria-label", "Close");
	    	var chrClose = document.createElement("span");
	    	chrClose.setAttribute("aria-hidden", "true");
	    	chrClose.innerHTML = "&times;";
	    	btnClose.appendChild(chrClose);
	    	btnClose.onclick = function() {
	    		$(this).parent().remove();
	    		removeSharedUser(mail);
	    	};
	    	newDiv.appendChild(btnClose);
	    		document.getElementById("wellSharedMail").appendChild(newDiv);
	    	}
    }

    /* Hide label shared vehicle owners mail when close button pressed */
    function closeButton(){
    	$(this).parent().hide();
    }

    /* Remove shared vehicle owners from array */
    function removeSharedUser(mailSharedUser){
    	var index = sharedCarDB[selectedCarId].indexOf(mailSharedUser);
    	sharedCarDB[selectedCarId].splice(index,1);
    }

    $(document).ready(function() {
    	setSelectedCarId("null");
    	document.getElementById("btnRemove").disabled = true;
    	$('.form-control').on('change', function(){
    		var slc = $(this).find("option:selected").text();
    		var slcID = document.getElementById("optionList").options[document.getElementById("optionList").selectedIndex].value;
    		if (slc != ""){
    			clearWellSharedMail();
    			setSelectedCarId(slc);
    			splitSharedUsers = sharedCarDB[slcID];
    			if (splitSharedUsers != ""){
    				for (var i = 0; i < splitSharedUsers.length; i++) {
    					createLabelMail(splitSharedUsers[i]);
    				};}
    			}
    			if(slc=="null" || slc=="new"){
    				document.getElementById("btnRemove").disabled = true;
    			}
    			else{
    				document.getElementById("btnRemove").disabled = false;
    			}
    		});
    });
