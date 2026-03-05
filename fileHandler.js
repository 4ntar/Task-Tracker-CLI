const fs = require('fs');

function readTasks(){
  const data = fs.readFileSync("tasks.json","utf-8")
  return JSON.parse(data)
}

function writeTasks(tasks){
  fs.writeFileSync("tasks.json", JSON.stringify(tasks,null,2));
}

module.exp = {
  readTasks,
  writeTasks
}
