var fs = require('fs');

fs.readFile('task7.txt','utf8', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
  console.log(file);
  
//   console.log(file.split('\r\n'));
  list = file.split('\r\n')

  for(let i =0 ; i<list.length ; i++){
    // console.log(list[i]);
    // line = [...new Set(list[i])]
    // console.log(line);
    var object = {}

    for(let j = 0 ; j<list[i].length ; j++){
        // console.log(list[i][j]);
        // console.log(Object.keys(object));
        if(Object.keys(object).includes(list[i][j])){
            object[list[i][j]].push(j)
        }
        else{
            object[list[i][j]] = [j]
        }
        
    }
    console.log(object);
    
  }
  
});