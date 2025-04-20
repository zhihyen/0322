let question, option1, answerInput, submitButton, result;
let questions;
let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function preload() {
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() { //這是一個初始設定函數，只會執行一次
  //產生一個全新的畫布
  createCanvas(windowWidth, windowHeight);
  //設定背景顏色
  background("#cddafd");

  // 設定題目
  question = createP('');
  question.style('color', '#1d2d44');
  question.style('font-size', '35px');

  // 設定選項
  option1 = createRadio();
  option1.style('color', '#0d3b66');

  // 設定答案輸入框
  answerInput = createInput();
  answerInput.style('color', '#0d3b66');
  answerInput.style('font-size', '25px');

  // 設定送出按鈕
  submitButton = createButton('下一題');
  submitButton.mousePressed(nextQuestion);

  // 設定結果顯示
  result = createP('');
  result.style('color', '#1d2d44');
  result.style('font-size', '25px');

  loadQuestion(currentQuestion);
}

function draw() { //這是一個繪圖函數，會一直執行
  background("#cddafd");
  
  // 設定矩形顏色
  fill("#dfe7fd");
  
  // 計算矩形的位置和大小
  let rectWidth = windowWidth / 2;
  let rectHeight = windowHeight / 2;
  let rectX = (windowWidth - rectWidth) / 2;
  let rectY = (windowHeight - rectHeight) / 2;
  
  // 繪製矩形
  rect(rectX, rectY, rectWidth, rectHeight);

  // 更新題目和選項的位置
  question.position(windowWidth / 2 - question.size().width / 2, windowHeight / 2 - 150);
  option1.position(windowWidth / 2 - option1.size().width / 2, windowHeight / 2 - 50);
  answerInput.position(windowWidth / 2 - answerInput.size().width / 2, windowHeight / 2 - 50);
  submitButton.position(windowWidth / 2 - submitButton.size().width / 2, windowHeight / 2 + 50);
  result.position(windowWidth / 2 - result.size().width / 2, windowHeight / 2 + 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function loadQuestion(index) {
  if (index < questions.getRowCount()) {
    let q = questions.getRow(index);
    question.html(q.get('question'));
    let type = q.get('type');
    if (type === 'choice') {
      option1.show();
      answerInput.hide();
      option1.html('');
      option1.option(q.get('option1'));
      option1.option(q.get('option2'));
      option1.option(q.get('option3'));
      option1.option(q.get('option4'));
    } else if (type === 'fill') {
      option1.hide();
      answerInput.show();
      answerInput.value('');
    }
  } else {
    showResults();
  }
}

function checkAnswer() {
  let q = questions.getRow(currentQuestion);
  let type = q.get('type');
  let answer = type === 'choice' ? option1.value() : answerInput.value();
  let correctAnswer = q.get('answer');
  if (answer === correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
}

function nextQuestion() {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < questions.getRowCount()) {
    loadQuestion(currentQuestion);
  } else {
    showResults();
  }
}

function showResults() {
  question.html('');
  option1.html('');
  answerInput.hide();
  submitButton.html('再試一次');
  submitButton.mousePressed(restartQuiz);
  result.html(`答對了 ${correctAnswers} 題，答錯了 ${incorrectAnswers} 題`);
}

function restartQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  result.html(''); // 隱藏結果
  answerInput.show(); // 顯示輸入框
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
  loadQuestion(currentQuestion);
}
