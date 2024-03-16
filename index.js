const express = require('express');
const cors = require('cors');

var fileupload = require("express-fileupload");
var bodyParser = require("body-parser")


const app = express();
app.use(cors());
app.use(express.json());

app.use(fileupload());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

app.get('/connect', (req, res) => {
  const {name} = req.query;

  res.send('Hello World!, ' + name);
});

let nexPersonId = 3;

app.post('/cham-bai-test', (req, res) => {
  try {    
    var logFile = req.files;
  
    //console.log(logFile);
    var buffer = Buffer.from(logFile.files.data);
    const fileLines = (buffer.toString('utf8'));
    const lines = fileLines.split(' ');
    //console.log(lines)
    const name = logFile.files.name.split('.')[0]
    let rs = 0;
    const ans1 = [2,5]
    lines.forEach((ans, index) => {
      if (ans1[index] == ans ) {
        rs++
      }
    })
    console.log(`Điểm của ${name}: ${rs}`)
    res.send(`Điểm của ${name}: ${rs}`);
  } catch (error) {
    console.log(error)
    res.send("submit fail roi em");
  }
 
});

app.post('/cham-bai', (req, res) => {
  try {    
    var logFile = req.files;
  
    //console.log(logFile);
    var buffer = Buffer.from(logFile.files.data);
    const fileLines = (buffer.toString('utf8'));
    const lines = fileLines.split(' ');
    //console.log(lines)
    const name = logFile.files.name.split('.')[0]
    let rs = 0;
    lines.forEach((ans, index) => {
      if (questions[index].answer == ans ) {
        rs++
      }
    })
    res.send(`Điểm của ${name}: ${rs}`);
  } catch (error) {
    console.log(error)
    res.send("submit fail roi em");
  }
 
});

const questions = [
  {id: 1, question: "Biển số xe của tỉnh Quảng Ninh là số bao nhiêu ?", answer: 14},
 
  {id: 2, question: "Ngô Quyền đánh bại quân Nam Hán trên sông Bạch Đằng năm bao nhiêu ?", answer: 938},
  {id: 3, question: "Tỉnh Quảng Ninh có tổng cộng bao nhiêu thành phố ?", answer: 4},
  {id: 4, question: "Nhiệt độ sôi (độ C) của nước nguyên chất ?", answer: 100},
  {id: 5, question: `Vừa gà vừa chó
  Bó lại cho tròn
  Ba mươi sáu con
  Một trăm chân chẵn
  
  Hỏi có bao nhiêu con gà ?`, answer: 22},
  {id: 6, question: "Hiệu điện thế tiêu chuẩn của hệ thống điện Việt Nam là bao nhiêu Volt (Vôn) (gợi ý 100V/110V/220V) ?", answer: 220},
  {id: 7, question: "Nhiệt độ sôi (độ C) của nước nguyên chất ?", answer: 100},
  {id: 8, question: "Kết quả của phép toán 9182342323 % 2 ?", answer: 1},
  //fibonaci
  {id: 9, question: `def f(n):
  if n == 0: return 0
  elif n == 1: return 1
  else: return f(n-1)+f(n-2)
  print (f(4))
  
  Chương trình trên in ra kết quả là ?`, answer: 3},
  {id: 10, question: `li = [12,24,35,70,88,120,155]
  a= [x for i,x in enumerate(li)if i%2!=0]
  print (a)
  
  Biết rằng a là 1 mảng gồm 3 phần tử, giá trị phần tử cuối cùng trong mảng là bao nhiêu?`, answer: 155},
];


app.get('/cau-hoi/:id', (req, res) => {
  try {
    const id = +req.params.id;
    if (id == 0) {
      res.send(`1.
Ngôn ngữ nhị phân gồm bao nhiêu chữ số ?
2.
1 Team Liên minh huyền thoại gồm bao nhiêu vị trí ?`)
      return
    }

    const question = questions.find(q => q.id === id);
  
    if(!question) {
      res.send("Không tìm thấy câu hỏi");
      return;
    }
  
    res.send(question.id + ':\n' + question.question);
  } catch (error) {
    console.log(error)
    res.send("Lấy câu hỏi thất bại");
  }

});

// app.post('/people', (req, res) => {
//   if(!req.body){
//     res.status(400).json({ error: 'Body not specified' });
//     return;
//   }

//   if(!req.body.name){
//     res.status(400).json({ error: 'No name specified' });
//     return;
//   }

//   if(!req.body.surname){
//     res.status(400).json({ error: 'No surname specified' });
//     return;
//   }

//   const newPerson = {
//     ...req.body,
//     id: nexPersonId++
//   };

//   people.push(newPerson);

//   res.send(newPerson);
// });