var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  const title = 'Home';
  console.log(req.query.q);
  // res.send(String())

  const header = {
    'Content-type': 'application/json'
  };
  const data = {
    api_key: '11810f1f82cd28fef246cf1c6db7df8e',
    language: 'ja-JP',
    query: req.query.q,
    page: req.query.p,
    include_adult: 'true'
  };
  const options = {
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    headers: header,
    qs: data,
    json: true,
  }

  let testdata = {"page":1,"total_results":9,"total_pages":3,"results":[{"popularity":20.058,"id":869,"video":false,"vote_count":2538,"vote_average":5.7,"title":"PLANET OF THE APES／猿の惑星","release_date":"2001-07-25","original_language":"en","original_title":"Planet of the Apes","genre_ids":[53,878,28,12],"backdrop_path":"\/rF0Y0fYVsNFEvGve8Nq0Ij9EDCM.jpg","adult":false,"overview":"西暦2029年。土星付近で調査活動中の米空軍宇宙船オベロンには乗組員と遺伝子操作を受けて高い知能を持つ多数の類人猿も実験動物として搭乗していた。宇宙空間で磁気嵐を発見しチンパンジーが操縦するポッドを調査に向かわせるが通信途絶してしまう。宇宙飛行士のレオもポッドで捜索に向かうが嵐に吸い込まれ惑星に不時着する。そこは高い知能を持つ猿が人間を支配しており、レオは捕まって将軍セードに危険人物としてマークされるが人間に好意的なアリの助けで身近な人々と共に町を脱走する。","poster_path":"\/wYNrLhOWy22fZvB4rVVIwZ352xp.jpg"},{"popularity":20.194,"id":871,"video":false,"vote_count":1937,"vote_average":7.6,"title":"猿の惑星","release_date":"1968-02-07","original_language":"it","original_title":"Planet of the Apes","genre_ids":[878,12,18,28],"backdrop_path":"\/zRo7v3syLG19ZaLxZRFRLN1L9iX.jpg","adult":false,"overview":"地球を飛び立った宇宙船は１年余りの宇宙航行の末、とある惑星に不時着した。乗組員のテイラーたちは沈没してしまった宇宙船をあとにし、その陸地を彷徨い歩くと猿人たちが人間狩りをしている驚愕の光景を目にする。この星では高等動物の猿が、口の聞けない下等動物の人間を支配していたのだ。テイラーたちも捕まり、奴隷のように理不尽な扱いを受ける。しかし、テイラーはチンパンジーのジーラ博士とコーネリアス博士の理解と協力を得て、同じ人間の女性ノヴァと共に逃亡、新天地を探し求めていく。","poster_path":"\/nNpWtIygieoXVRjg5Y5qyW3GqNm.jpg"},{"popularity":29.254,"id":119450,"video":false,"vote_count":7940,"vote_average":7.3,"title":"猿の惑星：新世紀（ライジング）","release_date":"2014-06-26","original_language":"en","original_title":"Dawn of the Planet of the Apes","genre_ids":[878,28,18,53],"backdrop_path":"\/dsM8mX7sKz583zRbqeMdPIivRzp.jpg","adult":false,"overview":"カリスマ的な統率力を誇る猿のシーザーが、仲間を率いて人類への反乱を起こしてから10年後。遺伝子の進化、知能と言語の獲得により猿たちはさらに進化を遂げ、独自の文明を形成、森の奥に平和なコミュニティを築いていた。一方、10年前に自らが生み出したウイルスにより人類は90％が死に追いやられ、僅かな生存者グループは、荒廃した都市部の一角に身を潜め、希望なき日々を過ごしている。そんなある日、人間たちが資源を求めて森に足を踏み入れたことから、猿たちとの間に危うい緊張が走る。","poster_path":"\/t3NIWBz0BMGLeFrlN9BOjjmGhvn.jpg"},{"popularity":10.417,"id":1688,"video":false,"vote_count":438,"vote_average":6.2,"title":"猿の惑星・征服","release_date":"1972-06-29","original_language":"en","original_title":"Conquest of the Planet of the Apes","genre_ids":[28,878],"backdrop_path":"\/knncaKHJzrc4JdBAupaQxavSMMt.jpg","adult":false,"overview":"コーネリアスの語ったとおり、疫病により犬や猫は死滅し、猿が第一位のペットとなった。1991年、日々深まるサルたちの奴隷としての扱い、コーネリアスの息子シーザーの養父も同然だった人間アルマンドの死をきっかけに、シーザーは反乱を決意。高度の知能とテレパシーを武器に猿たちのリーダーとなり、ついに反乱を起こす。","poster_path":"\/ssLvA8CwUmQp3SNKi2zQXMSPsSK.jpg"},{"popularity":15.064,"vote_count":693,"video":false,"poster_path":"\/x7Jw1t9ofWNMoeTTwSe2T0DtVvB.jpg","id":1685,"adult":false,"backdrop_path":"\/ju9R3sS3EbRlPvE0BwILlo4GTeO.jpg","original_language":"en","original_title":"Beneath the Planet of the Apes","genre_ids":[12,9648,878],"title":"続・猿の惑星","vote_average":6.3,"overview":"禁断地帯を旅するテイラーとノバは、突如大きな地割れと炎に襲われテイラーは行方不明となってしまう。テイラーを追ってきたブレントの元にノバが現れ、ノバはテイラーの言付けに従い、ジーラに会うため町に案内する。ブレントはジーラ達の協力で禁断地帯へと向かうが、兵士に発見され地下に逃げ込んだ際、荒廃した地下鉄駅を見付け、未来の地球であることを知る。地下を進みニューヨークの廃墟にたどり着くと人類文明を破壊したコバルト爆弾を信仰し超能力を持つミュータント化した人類に出会う。","release_date":"1970-05-01"},{"popularity":23.755,"id":61791,"video":false,"vote_count":8234,"vote_average":7.2,"title":"猿の惑星：創世記（ジェネシス）","release_date":"2011-08-03","original_language":"en","original_title":"Rise of the Planet of the Apes","genre_ids":[53,28,18,878],"backdrop_path":"\/4ZyVdTzUSnxWFl8r4rjHPLVr0Dg.jpg","adult":false,"overview":"ピエール・ブール原作のＳＦ映画の金字塔「猿の惑星」を基に、その起源となる人類文明崩壊への道のりを明らかにしていくＳＦアクション大作。 　アメリカ、サンフランシスコ。製薬会社の研究所でアルツハイマー治療の研究をする神経科学者、ウィル・ロッドマンは、開発中の新薬を投与したチンパンジーの知能が驚異的に発達したことを確認し、その成果を発表する。しかし、そのチンパンジーは突然暴れ出し警備員によって射殺されてしまう。事態を重く見た所長によってプロジェクトは中止を余儀なくされるが、射殺されたチンパンジーは妊娠中だったことから、ウィルは生まれたばかりの赤ん坊を秘かに引き取るとシーザーと名付け、自ら育てることに。そして、次第にウィルとシーザーのあいだに人間の親子のような絆が芽生えていく。その一方で、シーザーは並外れた知性を発揮し始めていく。ところが、すっかり成長したシーザーはある日、ウィルの父を助けようとして隣人とトラブルを起こしてしまう。それが原因でウィルと引き離され、類人猿保護施設の檻の中で屈辱と絶望の日々を送ることになるシーザーだったが…。","poster_path":"\/xmQ5TZg5IMoUUsqDMl1eo9YlWkH.jpg"},{"popularity":10.164,"vote_count":527,"video":false,"poster_path":"\/eTfhvS1ePR0cAMkhqfr17nrchq.jpg","id":1687,"adult":false,"backdrop_path":"\/5Y2V0yEI8w9xr8Jge6fkFKDILrI.jpg","original_language":"en","original_title":"Escape from the Planet of the Apes","genre_ids":[28,878],"title":"新・猿の惑星","vote_average":6.4,"overview":"ミュータント人類と猿類との戦争は、地球の消滅で幕を閉じた。コーネリアスとジーラはその直前に宇宙船で脱出したが、たどり着いたのは1973年の地球であった。最初はサルを好意的に受け入れた米国社会だったが、地球の未来が「サルによる人間の支配」であることが判明し、動揺が広がる。人間達はコーネリアス達を疎むようになり、2匹は命を狙われ始める。","release_date":"1971-05-20"},{"popularity":12.308,"id":1705,"video":false,"vote_count":449,"vote_average":5.7,"title":"最後の猿の惑星","release_date":"1973-06-15","original_language":"en","original_title":"Battle for the Planet of the Apes","genre_ids":[28,878],"backdrop_path":"\/ftwsAkyzGEqqiDh1E2tdeOSKS4l.jpg","adult":false,"overview":"シーザーが主導した人間への反乱は、最終的に核戦争へと発展し、地球の支配者は人間から猿に移り変わった。2003年、シーザーは原野に新たな集落を築き、人間を召使としてだが共存して暮らしていた。補佐役である人間のマクドナルドは人間と猿の対等な関係を求めるが、シーザーは過去の経緯から人間の解放に慎重な態度をとっていた。ある日、シーザーは「死んだ両親の記録が壊滅した都市に保管されている」とマクドナルドから聞き、マクドナルドとヴァージルを連れて核戦争で壊滅した都市に向かう。","poster_path":"\/yR61TYav9pp1sUIkMmMpDjzCEKa.jpg"},{"popularity":24.28,"vote_count":5973,"video":false,"poster_path":"\/c2DIO5qX1AwvqCthZxrpzC0OlNk.jpg","id":281338,"adult":false,"backdrop_path":"\/w22CTHxmdAsUrXRbCQt4gOSOD6E.jpg","original_language":"en","original_title":"War for the Planet of the Apes","genre_ids":[18,878,10752],"title":"猿の惑星：聖戦記（グレート・ウォー）","vote_average":7.1,"overview":"猿と人類の全面戦争が始まってから2年が経ち、シーザーが率いる猿の群れは、森の奥深くのとりでに姿を隠していた。ある日、奇襲によってシーザーの妻と息子の命が奪われる。シーザーは人類の軍隊のリーダーである大佐に復讐するため、オランウータンのモーリスらと共に旅立つ。","release_date":"2017-07-11"}]}
  // res.json(testdata);
  let message = testdata;
  message.q = req.query.q

  // res.render("index", {title: title,message:message});

  request.get(options, function (error, response, body) {
    body.q = req.query.q;

    res.render("search", {title: title,message:body});
    // res.json(body);
  });
});

module.exports = router;
