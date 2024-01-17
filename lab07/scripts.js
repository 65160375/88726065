document.addEventListener("DOMContentLoaded",function() {
    // ดึง Object ของแต่ละ element มาเก็บไว้
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");


    // สร้าง Array ว่างสำหรับเก็บ Todo
    let todos = [];

    /*

    ฟังก์ชันเพิ่ม Todo

    โดยจะดึงค่าที่กรอกจาก Input มาเช็คว่ามีการกรอกหรือไม่
    จากนั้นสร้าง Json เพื่อเก็บค่า attribute สองตัว
    text : สำหรับเก็บชื่อของ Todo
    completed : สำหรับเก็บสถานะของ Todo ว่าสำเร็จแล้วหรือไม่

    จากนั้นนำไปเพิ่มไว้ใน Array todos แล้วรีเซ็ต Input

    */

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            const todoItem = {
                text: todoText,
                completed: false,
            };
            todos.push(todoItem);
            renderTodoList();
            todoInput.value = "";
        }
    }
    
    /*

    ฟังก์ชันลบ Todo

    โดยจะรับค่าพารามิเตอร์ index คือตำแหน่งของ Todo ใน Array โดยจะทำการลบตำแหน่งที่ระบุตามค่าของ index
    จากนั้นลบออกแล้วสั่งให้แสดงผล Todo List ใหม่

    */

    function deleteTodo(index) {
        todos.splice(index,1);
        renderTodoList();
    }

    /*

    ฟังก์ชันปรับสำเร็จ / ยกเลิกของ Todo

    โดยจะรับค่าพารามิเตอร์ index คือตำแหน่งของ Todo ใน Array โดยจะปรับค่า completed ของ Todo ที่ระบุ
    ให้เป็นค่าตรงข้ามจากค่าเดิม แล้วสั่งเรนเดอร์ใหม่

    */

    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodoList();
    }    

    /*

    ฟังก์ขันเรนเดอร์ Todo List

    */

    function renderTodoList() {
        // Log Array todos ออกมาใน console
        console.log(todos);
        // ล้าง Element ในพื้นที่แสดงผลออกทั้งหมด
        todoList.innerHTML = "";

        // Loop Array todos
        for(let i = 0; i < todos.length; i++) {
            // แทนค่า Object ของ Array
            const todoItem = todos[i];
            // สร้าง Element 
            const listItem = document.createElement("li");
            // กำหนด Text ของ Element เป็นขื่อของ Todo รายการนั้น ๆ
            listItem.textContent = todoItem.text;
            // หาก Attribute completed เป็น true ให้เพิ่มลงไปใน class completed สำหรับ CSS
            if(todoItem.completed) {
                listItem.classList.add("completed");
            }
            // สร้าง Element ปุ่มลบ
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            // กำหนด Event Listener เมื่อคลิกของปุ่มลบเพื่อเรียกใช้ฟังก์ชัน deleteTodo และส่ง Argument i ไปด้วย
            deleteButton.addEventListener("click", () => deleteTodo(i));
            // สร้าง Element ปุ่มสำเร็จ
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            // กำหนด Event Listener เมื่อคลิกปุ่มสำเร็จเพื่อเรียกใช้ฟังก์ชัน toggleComplete และส่ง Argument i ไปด้วย
            completeButton.addEventListener("click", () => toggleComplete(i));
            // กำหนดให้ทั้งสองปุ่มอยู่ภายใต้ Element listItem
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            todoList.appendChild(listItem);
        }
    }

    // หากกดปุ่ม เพิ่ม ให้เรียกใช้ฟังก์ชัน addTodo    
    addButton.addEventListener("click", addTodo);

    // หากกดปุ่ม Enter ให้เรียกใช้ฟังก์ชัน addTodo

    todoInput.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            addTodo();
        }
    });
    renderTodoList();
});