
        //fetchtodo START....................!!!!!!!!!!!!!!!!!!!!!!
        const userData = localStorage.getItem("user");
        if(!userData){
            window.location.href = "/login";
        }
        user = JSON.parse(userData); 
        console.log("User retrieved from localStorage:", user);
        setTimeout(() => {
            localStorage.removeItem("user");
            console.log("User data cleared from localStorage after 5 hours.");
        }, 5 * 60 * 60 * 1000); // 5 hours in milliseconds
        function fetchtodo(){
            document.getElementById("client").innerHTML=user.name;
    console.log("User Name:", user.name); 
        console.log(user.id);

            fetch(`/api/todolist/${user.id}`).then(response=>response.json())
            .then(data=>{
                console.log(data);
                var inner="";
                if(data.message){
                    inner+=`<li>${data.message}</li>`;
                    document.getElementById("list").innerHTML=inner;
                }else{
                    data.forEach(item => {
                        let formattedDate = new Date(item.date).toISOString().split('T')[0];
                        inner+=`<li>
                <div class="todo-name">${item.name}</div>
                <div class="todo-description">${item.description}</div>
                <div class="todo-date">${formattedDate}</div> 
                <div class="todo-status">
               

                    ${item.status ? '<div class="todo-complete"><button disabled>Completed 😀</button></div>'
                                :`<button onclick="update(${item.id})" style="background: linear-gradient(to right, #ffc107, #ff9800);"> 🔥 Active!</button>`
                                    }
                    
                    </div>
                     <button class="delete-button" onclick="remove(${item.id})">Remove</button></li>
                `
                    })
                    document.getElementById("list").innerHTML=inner;
                }
            })
            .catch(error => {
                console.error("Error fetching the todo list:", error);
            });
        }
        
         //fetchtodo END....................!!!!!!!!!!!!!!!!!!!!!!
        
        
        
         //SUBMIT section STArt....................!!!!!!!!!!!!!!!!!!!!!!
        document.getElementById("f").addEventListener("submit",(event)=>{
            event.preventDefault();
            var name_todo=document.getElementById("todo-name").value;
        var date_todo=document.getElementById("todo-date").value;
        var description_todo=document.getElementById("todo-description").value;
            fetch(`/api/todolist/${user.id}`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({name : name_todo,date : date_todo,description:description_todo})
        }).then(response=>response.json()).then(data=>{
            console.log(data.message);
        });
          
            document.getElementById("todo-name").value = "";
    document.getElementById("todo-date").value = "";
    document.getElementById("todo-description").value = "";
    fetchtodo();
            });
         //SUBMIT section END....................!!!!!!!!!!!!!!!!!!!!!!
        
        
        
        
        
         //update  START....................!!!!!!!!!!!!!!!!!!!!!!
        function update(id){
    
            fetch(`/api/todolist/${id}`,{
                method:"PUT",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({status:true})
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);// Log success message
        })
        .catch(error => {
            console.error('Error:', error); // Log errors
        });
        fetchtodo();
        }
         //update END....................!!!!!!!!!!!!!!!!!!!!!!
        
        
        //remove....................!!!!!!!!!!!!!!!!!!!!!!
        function remove(id) {
            fetch(`/api/todolist/${id}`, {
                method: 'DELETE'  // Ensure the method is DELETE here.
            }).then(response => response.json())
              .then(data => {
                console.log(data.message);
                fetchtodo();  // Reload the todos after deletion
            }).catch(error => console.error('Error:', error));
        }
        
        fetchtodo();
function logout(){
    localStorage.removeItem('user');
}
function feed(){
    window.location.href = "/feedback";
}