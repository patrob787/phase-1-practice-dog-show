let tableBody = document.getElementById('table-body')
let dogForm = document.getElementById('dog-form');
let allDogs = [];
let dogToEdit;

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => {
        allDogs = data
        renderTable(allDogs)
    })
})

function renderTable(dogObj) {
    dogObj.forEach((dog) => {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdBreed = document.createElement('td');
        let tdSex = document.createElement('td');
        
        tdName.textContent = dog.name;
        tdBreed.textContent = dog.breed;
        tdSex.textContent = dog.sex;

        let tdEdit = document.createElement('td');
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Dog'
        
        editBtn.addEventListener('click', () => {
            dogForm.name.value = dog.name;
            dogForm.breed.value = dog.breed;
            dogForm.sex.value = dog.sex;

            dogToEdit = dog
        })

        tdEdit.append(editBtn);


        tr.append(tdName, tdBreed, tdSex, tdEdit);
        tableBody.appendChild(tr)
    })
}

dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    dogToEdit.name = e.target.name.value;
    dogToEdit.breed = e.target.breed.value;
    dogToEdit.sex = e.target.sex.value

   fetch(`http://localhost:3000/dogs/${dogToEdit.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dogToEdit)
   }).then(resp => resp.json())
   .then(data => console.log(data))

   tableBody.innerHTML = ""
   e.target.name.value = ""
   e.target.breed.value = ""
   e.target.sex.value = ""
   
   renderTable(allDogs);

})