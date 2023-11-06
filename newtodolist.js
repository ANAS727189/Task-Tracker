window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
  
    
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
      createTaskElement(task);
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const task = input.value;
      if (!task) {
        alert("Please Add a Task !!");
        return;
      }
  
      createTaskElement(task);
      input.value = "";
  
     
      saveTasks();
    });
  
    list_el.addEventListener('click', (e) => {
      const target = e.target;
  
      if (target.classList.contains("check")) {
       
        const task = target.parentElement.parentElement;
        task.classList.toggle("completed");
        saveTasks();
      } else if (target.classList.contains("edit")) {
       
        const task_input_el = target.parentElement.parentElement.querySelector(".text");
        if (task_input_el.readOnly) {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          target.innerText = "Save";
        } else {
          task_input_el.setAttribute("readonly", true);
          target.innerText = "Edit";
          saveTasks();
        }
      } else if (target.classList.contains("delete")) {
       
        const task = target.parentElement.parentElement;
        list_el.removeChild(task);
        saveTasks();
      }
    });
  
    function createTaskElement(taskText) {
      const task_el = document.createElement("div");
      task_el.classList.add("task");
  
      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");
  
      task_el.appendChild(task_content_el);
  
      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = taskText;
      task_input_el.setAttribute("readonly", true);
  
      task_content_el.appendChild(task_input_el);
  
      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");
  
      const task_check_el = document.createElement("button");
      task_check_el.classList.add("check");
      task_check_el.innerHTML = "Check";
  
      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerHTML = "Edit";
  
      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = "Delete";
  
      task_actions_el.appendChild(task_check_el);
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
  
      task_el.appendChild(task_actions_el);
  
      list_el.appendChild(task_el);
    }
  
    function saveTasks() {
      const tasks = Array.from(list_el.querySelectorAll(".task .text")).map((input) => input.value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }



  });
  