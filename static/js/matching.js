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
  console.log(sumInitial("고기")); // "ㄱㄱ"
  console.log(sumInitial("고기")=="ㄱㄱ"); // true
  
//   let userList = {
//     user1: 0,
//     user2: 1,
//     user3: 2,
//     user4: 3
//   };
  
//   userList['user1'] = 2;
//   console.log(userList);
  
  
  
  
  