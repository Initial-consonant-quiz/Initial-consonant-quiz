var socket = io()
var user_list = []
var rank = []

/* 접속 되었을 때 실행 */
socket.on('connect', function () {
  /* 이름을 입력받고 */
  var name = prompt('반갑습니다!', '')

  /* 이름이 빈칸인 경우 */
  if (!name) {
    name = '익명'
  }

  rank.push({"id":name, "score":0});
  console.log("ㅁㄴㅇㄻㄴㅇㄹ")
  console.log(rank)

  /* 서버에 새로운 유저가 왔다고 알림 */
  socket.emit('newUser', name)

  // let rank = document.getElementById("rank");
  // rank.innerHTML += `<div class="user_name">${name}</div>`
  // user_list.push(name)
  // console.log("user_list",user_list)
})

/* 서버로부터 데이터 받은 경우 */

socket.on('broadcast', function(data) {
  // broadcast된 랜덤 문자 처리
  var wordContainer = document.getElementById('question1');
  wordContainer.textContent = data.join(''); // 받은 문자를 요소에 표시
});

socket.on('update', function (data) {
  var chat = document.getElementById('chat')
  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch (data.type) {
    case 'message':
      className = 'other'
      // scoreUpdate();
      break

    case 'connect':
      className = 'connect'
      // scoreUpdate();
      break

    case 'disconnect':
      className = 'disconnect'
      rank = rank.filter(function(item) {
        return item.id !== idToDelete;
      });

      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)
  // scoreUpdate()
})

/* 메시지 전송 함수 */
function send() {
  // console.log("ㅁㄴㅇㄻㄴㅇㄹ")
  // 입력되어있는 데이터 가져오기
  var message = document.getElementById('test').value
  
  var answer_consonant = document.getElementById('question1')
  console.log(answer_consonant)
  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('test').value = ''
  let answer = sumInitial(message)
  console.log(answer)

  
  

  // 내가 전송할 메시지 클라이언트에게 표시


  // 서버로 message 이벤트 전달 + 데이터와 함께
  if (answer_consonant == answer) {
    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(message)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)
    socket.emit('message', { type: 'message', message: message })

    rank = rank.map(function (item) {
      if (item.id === idToUpdate) {
        return { ...item, score: item.score + 1 };
      }
      return item;
    });

    rank.sort(function compare(a, b) {
      return a.score - b.score;
    });

    scoreUpdate();


  } else {
    alert("초성을 잘못 입력하셨습니다")
  }

}


function initial(word) { // 한 글자 초성
  const initWord = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
    'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
    'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const START_UNICODE = 44032;
  const wordUnicocde = word.charCodeAt(0);
  const word_size = wordUnicocde - START_UNICODE;
  const initial_idx = parseInt(word_size / 588);
  return initWord[initial_idx];
};

function sumInitial(word) { // 두 글자로 나눠 초성 더하기
  const stWord = word[0];
  const lsWord = word[1];

  return initial(stWord) + initial(lsWord);
}

function scoreUpdate(){
  for (var i = 0; i < 3; i++) {
    var userNameDiv = document.querySelector('#user_name' + (i + 1));
    var userScoreDiv = document.querySelector('#user_score' + (i + 1));
    if (userNameDiv) {
      userNameDiv.innerHTML = rank[i].id;
      userScoreDiv.innerHTML = rank[i].score;
    }
  }
 }