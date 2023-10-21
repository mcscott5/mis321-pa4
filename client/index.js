const url = 'http://localhost:5088/api/Exercise';

async function handleOnLoad() {
  let response = await fetch(url);
  let exerciseList = await response.json();
  console.log(exerciseList);

  let exerciseHTML;
  exerciseList.forEach(function (item, index) {
    exerciseHTML += "<tr>";
    exerciseHTML += "<td>" + item.activityType + "</td>";
    exerciseHTML += "<td>" + item.distance + "</td>";
    exerciseHTML += "<td>" + item.dateCompleted + "</td>";
    if (item.pinned === true) {
      exerciseHTML +=
        "<td><button onclick=\"pinExercise('" +
        item.exerciseId +
        '\')" class="btn btn-secondary"> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg> Pinned</button><button onclick="deleteExercise(\'' +
        item.exerciseId +
        '\')" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg> Delete</button></td>';
    } else {
      exerciseHTML +=
        "<td><button onclick=\"pinExercise('" +
        item.exerciseId +
        '\')" class="btn btn-secondary"> Unpinned</button><button onclick="deleteExercise(\'' +
        item.exerciseId +
        '\')" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg> Delete</button></td>';
    }
    exerciseHTML += "</tr>";
  });

  document.querySelector("#exerciseTable tbody").innerHTML = exerciseHTML;
}

async function addExercise() {
  if (validateForm() === true) {
    let activityType = document.getElementById("activityType").value;
    let distance = document.getElementById("distance").value;
    let dateCompleted = document.getElementById("dateCompleted").value;

    let exercise = {
      activityType: activityType,
      distance: distance,
      dateCompleted: dateCompleted,
      pinned: false,
      deleted: false,
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    document.getElementById("activityType").value = "";
    document.getElementById("distance").value = "";
    document.getElementById("dateCompleted").value = "";
    handleOnLoad();
  }
}

// function uuidv4() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
//     .replace(/[xy]/g, function (c) {
//         const r = Math.random() * 16 | 0,
//             v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

function handleHomeClick(){
    document.querySelector("#add-exercise-form").style.display = "none"
}

function validateForm() {
  let activityType = document.getElementById("activityType").value;
  let distance = document.getElementById("distance").value;
  let dateCompleted = document.getElementById("dateCompleted").value;

  if (activityType === "") {
    alert("Activity Type is Required");
    return false;
  }
  if (distance === "") {
    alert("Distance is Required");
    return false;
  }
  if (dateCompleted === "") {
    alert("Date is Required");
    return false;
  }

  return true;
}

// const sortExercises = function(exerciseList){
//     return exerciseList.sort(function(a, b){
//         if(a.dateCompleted > b.dateCompleted) {
//             return -1
//         } else if(a.dateCompleted < b.dateCompleted){
//             return 1
//         } else {
//             return 0
//         }
//     })
// }

// function handleOnLoad(){
//     let exerciseList;

//     if (localStorage.getItem("exerciseList") === null){
//         exerciseList = []
//     }
//     else {
//         exerciseList = JSON.parse(localStorage.getItem("exerciseList"))
//     }

//     let exerciseHTML = ""

//     exerciseList = sortExercises(exerciseList)

//     exerciseList.forEach(function(item, index){
//         exerciseHTML += "<tr>"
//         exerciseHTML += "<td>" + item.activityType + "</td>"
//         exerciseHTML += "<td>" + item.distance + "</td>"
//         exerciseHTML += "<td>" + item.dateCompleted + "</td>"
//         if (item.pinned === true){
//             exerciseHTML += '<td><button onclick="pinExercise(\'' + item.exerciseId + '\')" class="btn btn-secondary"> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg> Pinned</button><button onclick="deleteExercise(\'' + item.exerciseId + '\')" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg> Delete</button></td>'
//         } else {
//             exerciseHTML += '<td><button onclick="pinExercise(\'' + item.exerciseId + '\')" class="btn btn-secondary"> Unpinned</button><button onclick="deleteExercise(\'' + item.exerciseId + '\')" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg> Delete</button></td>'
//         }
//         exerciseHTML += "</tr>"
//     })

//     document.querySelector("#exerciseTable tbody").innerHTML = exerciseHTML

// }

// document.onload = handleOnLoad()

function handleAddClick(){
    document.querySelector("#add-exercise-form").style.display = "block"
}

// function addExercise(){
//     if(validateForm() === true){
//         let activityType = document.getElementById("activityType").value
//         let distance = document.getElementById("distance").value
//         let dateCompleted = document.getElementById("dateCompleted").value

//         let exerciseList;
//         if (localStorage.getItem("exerciseList") == null){
//             exerciseList = []
//         }
//         else {
//             exerciseList = JSON.parse(localStorage.getItem("exerciseList"))
//         }

//         const id = uuidv4()

//         exerciseList.push({
//             exerciseId: id,
//             activityType: activityType,
//             distance: distance,
//             dateCompleted: dateCompleted,
//             pinned: false,
//             deleted: false
//         })

//         localStorage.setItem("exerciseList", JSON.stringify(exerciseList))
//         handleOnLoad()
//         document.getElementById("activityType").value = ""
//         document.getElementById("distance").value = ""
//         document.getElementById("dateCompleted").value = ""

//     }

// }

// function deleteExercise(id){
//     let exerciseList;
//     if (localStorage.getItem("exerciseList") == null){
//         exerciseList = []
//     }
//     else {
//         exerciseList = JSON.parse(localStorage.getItem("exerciseList"))
//     }

//     const exerciseIndex = exerciseList.findIndex(function(item){
//         return item.exerciseId === id
//     })
//     console.log(exerciseIndex);
//     exerciseList.splice(exerciseIndex, 1)
//     localStorage.setItem("exerciseList", JSON.stringify(exerciseList))
//     handleOnLoad()
// }

// function pinExercise(id){
//     let exerciseList;
//     if (localStorage.getItem("exerciseList") == null){
//         exerciseList = []
//     }
//     else {
//         exerciseList = JSON.parse(localStorage.getItem("exerciseList"))
//     }

//     const exerciseIndex = exerciseList.findIndex(function(item){
//         return item.exerciseId === id
//     })

//     if (exerciseList[exerciseIndex].pinned === true){
//         exerciseList[exerciseIndex].pinned = false;
//     } else {
//         exerciseList[exerciseIndex].pinned = true;
//     }

//     localStorage.setItem("exerciseList", JSON.stringify(exerciseList))
//     handleOnLoad()
// }
