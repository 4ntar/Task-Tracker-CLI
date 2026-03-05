        const process = require('process');
        const fs = require('fs')
        const {readTasks, writeTasks} = require('./utils/fileHandler')

        if(!fs.existsSync("tasks.json")){
        fs.writeFileSync("tasks.json", "[]");
        console.log('file has been made')
        } 


        function createTask(newId,description){
            return{
          id:newId,
          description:description,
          status:"todo",
          createdAt:new Date().toLocaleString('sr-RS'),
          updatedAt:new Date().toLocaleString('sr-RS')}
        }

        const args = process.argv.slice(2);
        const command = args[0]

        if(command === "add"){
            const description = args.slice(1).join(" ");
            const tasks = readTasks()
            let newId;
            if(tasks.length === 0){
            newId = 1;
            }else{
            newId = tasks[tasks.length-1].id+1;
            }
            const newTask = createTask(newId,description)
            tasks.push(newTask)
            writeTasks(tasks)
            console.log(`✔ Task added successfully (ID: ${newId})`)
        } 

        if(command === "delete"){
            const description = args[1]
            const tasks = readTasks()
            const idToDelete = Number(args[1]);
            const updatedTasks = tasks.filter(task=>task.id !==idToDelete);
            writeTasks(updatedTasks)
        }

        if(command === "update"){
            const tasks = readTasks()
            const task = tasks.find(task=>task.id === Number(args[1]))
            task.description = args[2];
            task.updatedAt = new Date().toLocaleString('sr-RS');
            writeTasks(tasks)
        }

        if(command === "mark-in-progress" || command === "mark-done"){
            const tasks = readTasks()
            const task = tasks.find(task=>task.id === Number(args[1]))
            task.status = args[0];
            writeTasks(tasks)
        }

        if(command === "list"){
            const tasks = readTasks()
            console.log("ID | STATUS | DESCRIPTION")
            console.log("--------------------------")
            tasks.forEach(task=>{
            console.log(`${task.id} | ${task.status} | ${task.description}`)
            })}

        if(command ==="list done" && args[1] === "done"){
            const tasks = readTasks()
            tasks.filter(t=>t.status === "done").forEach(t=>{
                console.log(`${t.id}|${t.status}|${t.description}`)
            })}
        
        if(command ==="list-todo"){
            const tasks = readTasks()
            tasks.filter(t=>t.status === "todo").forEach(t=>{
                console.log(`${t.id}|${t.status}|${t.description}`)
            })
        }
        if(command ==="list-in-progress"){
            const tasks = readTasks()
            task.filter(t=>t.status ==="done").forEach(t=>{
                console.log(`${t.id}|${t.status}|${t.description}`)
            })
        }
        if(command === "help"){
            console.log(`Task Tracker CLI
            Commands:

            add "task description"
            update <id> "new description"
            delete <id>

            mark-in-progress <id>
            mark-done <id>

            list
            list done
            list todo
            list in-progress
            `)}