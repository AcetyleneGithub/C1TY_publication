/**
 * 
 */

//問題と解答
qa = new Array();
qa[0] = ["赤色、青色、黄色、これらの色を英語で表したとき、共通して出てくるアルファベットは？"," R","E","L","Y",2];
qa[1] = ["エレベーターで屋上を表すアルファベットはRです。では地下を表すアルファベットは以下のうちどれか？"," B","U","L","G",1];
qa[2] = ["浮く風船などにも使われるこれを吸うと、声が高くなることで知られている元素記号Heで表される元素は次のうちどれか？"," 水素","ヘリウム","窒素","ベリウム",2];
qa[3] = ["惑星の周りを回る星を衛星と言いますが、以下の太陽系の惑星で衛星を持たないものはどれでしょう？"," 水星","木星","土星","金星",1];
qa[4] = ["英語でレッドペッパーといえばトウガラシですが、グリーンペッパーといえばどんな野菜か？"," パプリカ","アスパラガス","ピーマン","レタス",3];
qa[5] = ["日本では桃太郎、中国では三蔵法師のお供として登場する動物は以下のうちどれか？"," ウマ","ブタ","サル","ヘビ",3];
qa[6] = ["客のふりをして商品をほめ、他の人にその商品を買わせようとするヒトのことを何と呼ぶか？","アジサイ","サクラ","ヒマワリ","カエデ",2];
qa[7] = ["１から１０までの数字を漢字にしたとき、一番画数が多いのは以下のうちどれか？"," 10","5","4","9",3];
qa[8] = ["ひいきをするときは持ち、張り合うときは並べ、威勢のいいときは風を切る、といったら次の身体の部分のうちどれか？"," 頭","膝","肩","腕",3];
qa[9] = ["うまい話が2重、3重と重なってくることのたとえでカモがしょって来る野菜は次のうちどれか？"," にんじん","ニラ","ごぼう","ネギ",4];

//初期設定
count = 0; //問題番号
q_sel = 4; //選択肢の数
var qletnum; //問題文字列のカウント
var qstr = null;

//最初の問題
//quiz();
function firstly(){
	document.getElementById("text-button").onclick = null;
	document.getElementById("text_q").innerHTML = "";
	var per0 = "";
	var per1 = "";
	if(document.getElementById("per0").value == ""){
		per0 = "A0";
	}else{
		per0 = document.getElementById("per0").value;
	}
	if(document.getElementById("per1").value == ""){
		per1 = "A1";
	}else{
		per1 = document.getElementById("per1").value;
	}
	async function run(){
		let answerer = await eel.quizbutton(per0,per1)();
		document.getElementById("text_k").innerHTML = "回答権は、" + answerer + "さんです!";
		clearInterval(quesInterval);
		qstr = null;
	}
	quiz();
	document.getElementById("text_k").innerHTML = "回答権は・・・";
	document.getElementById("text_a").innerHTML = "";
	document.getElementById("text").innerHTML = "次の問題へ";
	run();
}
document.getElementById("text-button").onclick = firstly;

//問題表示
function onebyone(){
	qstr = qa[count][0];
	var qstrlen = qstr.length;
	document.getElementById("text_q").innerHTML = qstr.slice(0,qletnum);
	if(qletnum < qstrlen){
		qletnum++;
	}else{
		clearInterval(quesInterval);
		qstr = null;
	}
}

function quiz() {
	var s, n;
	//問題
	document.getElementById("text_qn").innerHTML = "第"+(count + 1) +"問"
	//document.getElementById("text_q").innerHTML = qa[count][0];
	//選択肢
	s = "";
	for (n=1;n<=q_sel;n++) {
		s += "<a class = 'text-buttons' href='javascript:anser(" + n + ")'>" + n + " : " + qa[count][n] + "</a>";
	}
	document.getElementById("text_s").innerHTML = s;
	qletnum = 1;
	quesInterval = setInterval(onebyone, 150);
}

//解答表示
function anser(num) {
	var s;
	s = "第"+(count + 1)+"問：";
	//答え合わせ
	if (num == qa[count][q_sel + 1]) {
		//正解
		s += "正解！答えは" + qa[count][num] + "なので、1点獲得です！";
	} else {
		s += "不正解！答えは" + qa[count][5] + "番でした、、1点減点です！";
	}
	document.getElementById("text_a").innerHTML = s;
	clearInterval(quesInterval);
	qstr = null;

	//次の問題を表示
	count++;

  document.getElementById("text-button").onclick = function() {
	document.getElementById("text-button").onclick = null;
	  var per0 = "";
	  var per1 = "";
	  if(document.getElementById("per0").value == ""){
			per0 = "A0";
		}else{
			per0 = document.getElementById("per0").value;
		}
		if(document.getElementById("per1").value == ""){
			per1 = "A1";
		}else{
			per1 = document.getElementById("per1").value;
		}
	async function run(){
		let answerer = await eel.quizbutton(per0,per1)();
		document.getElementById("text_k").innerHTML = "回答権は、" + answerer + "さんです!";
		clearInterval(quesInterval);
		qstr = null;
	}
	document.getElementById("text_q").innerHTML = "";
	document.getElementById("text_a").innerHTML = "";
	if (count < qa.length) {
		quiz();
		document.getElementById("text_k").innerHTML = "回答権は・・・";
		run();
	} else {
		//終了
		document.getElementById("text_qn").innerHTML = "";
		document.getElementById("text_q").innerHTML = "結果発表！";
		document.getElementById("text_s").innerHTML = "";
		document.getElementById("text_k").innerHTML = "";
		document.getElementById("text").innerHTML = "最初に戻る";
		document.getElementById("text-button").onclick = function(){
			document.getElementById("text_qn").innerHTML = "ここに問題が表示されます。";
			document.getElementById("text_q").innerHTML = "";
			document.getElementById("text_k").innerHTML = "Are you ready?";
			document.getElementById("text").innerHTML = "ゲームスタート！";
			count = 0;
			document.getElementById('number').innerHTML = "0";
			document.getElementById('numbers').innerHTML = "0";
			document.getElementById("text-button").onclick = firstly;
		}
  }
}
}

//Aさんポイント
let add = document.getElementById('increment');
let remove = document.getElementById('decrement');

let int = document.getElementById('number');
let integer = 0;

add.addEventListener('click', function(){
  integer += 1;
  int.innerHTML = integer;
})

remove.addEventListener('click', function(){
  integer -= 1;
  int.innerHTML = integer;
})

//Bさんポイント
let adds = document.getElementById('increments');
let removes = document.getElementById('decrements');

let ints = document.getElementById('numbers');
let integers = 0;

adds.addEventListener('click', function(){
  integers += 1;
  ints.innerHTML = integers;
})

removes.addEventListener('click', function(){
  integers -= 1;
  ints.innerHTML = integers;
})