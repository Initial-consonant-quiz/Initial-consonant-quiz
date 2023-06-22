<!DOCTYPE html>
<html>
<title>
  초성맞추기-초기화면
</title>

<body>

  <style>
    input[type=text] {
      width: 300px;
      height: 30px;
      margin-left: 10px;
    }
    input[type=submit] {
      width: 100px;
      height: 40px;
      margin-top: 30px;
    }
    h1{
      text-align:center; 
      padding: 100px 0; 
      font-size: 80px;
    }
    
  </style>

  <h1> 초성 맞추기</h1>


  <div style="text-align:center;">

    <form action="http://172.20.10.2:8080/computerNetwork1.html"  >
      <h3 style> 별명 :
        <input type="text" placeholder="이름을 입력해주세요." name="input"><br></h3>
      <input type="submit" value="시작하기">
    </form>
  </div>
</body>
</html>