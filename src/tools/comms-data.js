// COMMS PROTOCOL - Hotel Phrase Data
// Structure per phrase: { text, rom, pin }
// EN has no rom field because it is already Latin script.

export const LANGUAGES = [
  { key: "en", label: "English" },
  { key: "fr", label: "Français" },
  { key: "it", label: "Italiano" },
  { key: "de", label: "Deutsch" },
  { key: "es", label: "Español" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
  { key: "pt", label: "Português" }
];

export const CATEGORIES = [
  {
    id: "courtesies",
    label: "礼貌用语",
    sublabel: "COURTESIES",
    phrases: [
      {
        zh: "您好，欢迎光临",
        en: { text: "Welcome", pin: "威尔康姆" },
        fr: { text: "Bienvenue", rom: "Byahn-vuh-NEW", pin: "比昂弗尼" },
        it: { text: "Benvenuto / Benvenuta", rom: "Ben-veh-NOO-toh", pin: "本韦努托" },
        de: { text: "Willkommen", rom: "Vil-KO-men", pin: "维尔科门" },
        es: { text: "Bienvenido / Bienvenida", rom: "Byen-veh-NEE-doh", pin: "比恩韦尼多" },
        ja: { text: "いらっしゃいませ", rom: "Irasshaimase", pin: "伊拉夏伊马赛" },
        ko: { text: "어서오세요", rom: "Eo-seo-o-se-yo", pin: "鄂搜哦塞哟" },
        pt: { text: "Bem-vindo / Bem-vinda", rom: "Beh-VEEN-doo", pin: "本维多" }
      },
      {
        zh: "谢谢您",
        en: { text: "Thank you", pin: "三克尤" },
        fr: { text: "Merci", rom: "Mair-SEE", pin: "么西" },
        it: { text: "Grazie", rom: "GRAH-tsyeh", pin: "格拉兹耶" },
        de: { text: "Danke schön", rom: "DAHN-keh shurn", pin: "当克肖恩" },
        es: { text: "Gracias", rom: "GRAH-syahs", pin: "格拉西亚斯" },
        ja: { text: "ありがとうございます", rom: "Arigatō gozaimasu", pin: "阿里嘎多勾载马斯" },
        ko: { text: "감사합니다", rom: "Gam-sa-ham-ni-da", pin: "卡姆萨哈姆尼达" },
        pt: { text: "Obrigado / Obrigada", rom: "Oh-bree-GAH-doo", pin: "奥布里嘎多" }
      },
      {
        zh: "不客气",
        en: { text: "You're welcome", pin: "尤尔威尔康姆" },
        fr: { text: "De rien", rom: "Duh ryahn", pin: "得西安" },
        it: { text: "Prego", rom: "PREH-goh", pin: "普雷戈" },
        de: { text: "Bitte", rom: "BI-teh", pin: "必特" },
        es: { text: "De nada", rom: "Deh NAH-dah", pin: "德纳达" },
        ja: { text: "どういたしまして", rom: "Dō itashimashite", pin: "豆伊塔西马西特" },
        ko: { text: "천만에요", rom: "Cheon-man-e-yo", pin: "全满诶哟" },
        pt: { text: "De nada", rom: "Deh NAH-dah", pin: "德纳达" }
      },
      {
        zh: "请稍等",
        en: { text: "One moment, please", pin: "旺木门特普利兹" },
        fr: { text: "Un instant, s'il vous plaît", rom: "Uh(n) ahn-STAHN seel-voo-PLAY", pin: "安安斯当 西烹普雷" },
        it: { text: "Un momento, per favore", rom: "Oon moh-MEN-toh pair fah-VOH-reh", pin: "嗯莫门托 佩尔法沃雷" },
        de: { text: "Einen Moment, bitte", rom: "EYE-nen moh-MENT BI-teh", pin: "艾嫩莫门特必特" },
        es: { text: "Un momento, por favor", rom: "Oon moh-MEN-toh por fah-VOR", pin: "嗯莫门托 波尔法沃尔" },
        ja: { text: "少々お待ちください", rom: "Shōshō omachi kudasai", pin: "少少奥马奇库达赛" },
        ko: { text: "잠시만요", rom: "Jam-si-man-yo", pin: "占西慢哟" },
        pt: { text: "Um momento, por favor", rom: "Oom moh-MEN-too por fah-VOR", pin: "嗯莫门图 普尔法沃尔" }
      },
      {
        zh: "非常抱歉",
        en: { text: "I'm very sorry", pin: "爱姆维瑞索瑞" },
        fr: { text: "Je suis vraiment désolé(e)", rom: "Zhuh swee vreh-MAHN day-zoh-LAY", pin: "者斯维弗雷蒙 代佐雷" },
        it: { text: "Mi dispiace molto", rom: "Mee dis-PYAH-cheh MOL-toh", pin: "咪迪斯皮阿切 莫托" },
        de: { text: "Es tut mir sehr leid", rom: "Es toot meer zair lait", pin: "艾斯图特咪尔 泽尔莱特" },
        es: { text: "Lo siento mucho", rom: "Loh SYEN-toh MOO-choh", pin: "洛西恩托穆乔" },
        ja: { text: "大変申し訳ございません", rom: "Taihen mōshiwake gozaimasen", pin: "台痕毛西瓦克 勾载马森" },
        ko: { text: "정말 죄송합니다", rom: "Jeong-mal joe-song-ham-ni-da", pin: "正玛勤松哈姆尼达" },
        pt: { text: "Sinto muito", rom: "SEEN-too MWEE-too", pin: "新图咪图" }
      }
    ]
  },
  {
    id: "checkin",
    label: "入住",
    sublabel: "CHECK-IN",
    phrases: [
      {
        zh: "请问您有预订吗？",
        en: { text: "Do you have a reservation?", pin: "杜尤哈夫阿瑞泽维神" },
        fr: { text: "Avez-vous une réservation?", rom: "Ah-vay-VOO oon ray-zair-VAH-syohn", pin: "阿唯烹恩 雷泽瓦西翁" },
        it: { text: "Ha una prenotazione?", rom: "Ah OO-nah preh-noh-tah-TSYOH-neh", pin: "阿乌纳普雷诺塔兹奥内" },
        de: { text: "Haben Sie eine Reservierung?", rom: "HAH-ben zee EYE-neh reh-zair-VEER-oong", pin: "哈本西艾内 雷泽维荣" },
        es: { text: "¿Tiene una reserva?", rom: "TYEH-neh OO-nah reh-SAIR-vah", pin: "提耶内乌纳 雷塞尔瓦" },
        ja: { text: "ご予約はございますか？", rom: "Go-yoyaku wa gozaimasu ka?", pin: "勾哟雅库瓦 勾载马斯卡" },
        ko: { text: "예약하셨나요?", rom: "Ye-yak-ha-syeot-na-yo", pin: "耶雅克哈秀纳哟" },
        pt: { text: "Tem reserva?", rom: "Teh(n) heh-ZAIR-vah", pin: "腾黑泽瓦" }
      },
      {
        zh: "请出示您的护照 / 证件",
        en: { text: "Your passport / ID, please", pin: "尤尔帕斯波特/艾迪 普利兹" },
        fr: { text: "Votre passeport / pièce d'identité, s'il vous plaît", rom: "VOH-truh pahs-POR / pyess dee-dahn-tee-TAY seel-voo-PLAY", pin: "沃特帕斯坡/皮耶丝迪当提泰 西烹普雷" },
        it: { text: "Il suo passaporto, per favore", rom: "Eel SOO-oh pahs-sah-POR-toh pair fah-VOH-reh", pin: "伊苏哦帕萨波托 佩尔法沃雷" },
        de: { text: "Ihren Reisepass, bitte", rom: "EE-ren RY-zeh-pahs BI-teh", pin: "伊任莱泽帕斯 必特" },
        es: { text: "Su pasaporte, por favor", rom: "Soo pah-sah-POR-teh por fah-VOR", pin: "苏帕萨波特 波尔法沃尔" },
        ja: { text: "パスポートをお見せください", rom: "Pasupōto wo omise kudasai", pin: "帕斯波托沃 奥咪赛库达赛" },
        ko: { text: "여권을 보여주세요", rom: "Yeo-gwon-eul bo-yeo-ju-se-yo", pin: "哟跪乌尔波哟朱塞哟" },
        pt: { text: "O seu passaporte, por favor", rom: "Oo seh-oo pah-sah-POR-teh por fah-VOR", pin: "乌塞乌帕萨波特 普尔法沃尔" }
      },
      {
        zh: "请在这里签名",
        en: { text: "Please sign here", pin: "普利兹赛因黑尔" },
        fr: { text: "Signez ici, s'il vous plaît", rom: "See-NYAY ee-SEE seel-voo-PLAY", pin: "西捏伊西 西烹普雷" },
        it: { text: "Firmi qui, per favore", rom: "FEER-mee kwee pair fah-VOH-reh", pin: "菲尔咪魁 佩尔法沃雷" },
        de: { text: "Unterschreiben Sie hier, bitte", rom: "OON-ter-shry-ben zee heer BI-teh", pin: "翁特施莱本西黑尔 必特" },
        es: { text: "Firme aquí, por favor", rom: "FEER-meh ah-KEE por fah-VOR", pin: "菲尔美阿基 波尔法沃尔" },
        ja: { text: "こちらにサインをお願いします", rom: "Kochira ni sain wo onegaishimasu", pin: "科奇拉尼赛因沃 奥内盖西马斯" },
        ko: { text: "여기에 서명해 주세요", rom: "Yeo-gi-e seo-myeong-hae ju-se-yo", pin: "哟基耶搜命黑 朱塞哟" },
        pt: { text: "Assine aqui, por favor", rom: "Ah-SEE-neh ah-KEE por fah-VOR", pin: "阿西内阿基 普尔法沃尔" }
      },
      {
        zh: "这是您的房卡",
        en: { text: "Here is your room key card", pin: "黑尔伊兹尤尔鲁姆基卡" },
        fr: { text: "Voici votre clé de chambre", rom: "Vwah-SEE VOH-truh klay duh SHAHM-bruh", pin: "瓦西沃特 克雷得尚布" },
        it: { text: "Ecco la sua chiave", rom: "EK-koh lah SOO-ah KYAH-veh", pin: "艾科拉苏阿 基阿维" },
        de: { text: "Hier ist Ihre Zimmerkarte", rom: "Heer ist EE-reh TSIM-mer-kar-teh", pin: "黑尔伊斯特 伊日辰梅卡特" },
        es: { text: "Aquí está su llave / tarjeta", rom: "Ah-KEE es-TAH soo YAH-veh / tar-HEH-tah", pin: "阿基伊斯塔 苏亚维/塔黑塔" },
        ja: { text: "こちらがお部屋のカードキーです", rom: "Kochira ga oheya no kādo kī desu", pin: "科奇拉嘎奥黑雅诺 卡多基得斯" },
        ko: { text: "객실 카드키입니다", rom: "Gaek-sil ka-deu-ki-im-ni-da", pin: "给克西尔卡得基 伊姆尼达" },
        pt: { text: "Aqui está o cartão do quarto", rom: "Ah-KEE es-TAH oo kar-TAHN(g) doo KWAR-too", pin: "阿基伊斯塔 乌卡唐图阔图" }
      },
      {
        zh: "您的房间在 [X] 层",
        en: { text: "Your room is on floor [X]", pin: "尤尔鲁姆伊兹昂佛罗尔X" },
        fr: { text: "Votre chambre est au [X]e étage", rom: "VOH-truh SHAHM-bruh ay OH X ay-TAHZH", pin: "沃特尚布艾欧X 阿塔日" },
        it: { text: "La sua camera è al piano [X]", rom: "Lah SOO-ah KAH-meh-rah ay al PYAH-noh X", pin: "拉苏阿卡美拉艾阿尔 皮阿诺X" },
        de: { text: "Ihr Zimmer ist im [X]. Stock", rom: "Eer TSIM-mer ist im X Shtok", pin: "伊尔辰梅伊斯特 伊姆X斯托克" },
        es: { text: "Su habitación está en el piso [X]", rom: "Soo ah-bee-tah-SYON es-TAH en el PEE-soh X", pin: "苏阿比塔西翁伊斯塔 恩艾尔皮索X" },
        ja: { text: "お部屋は [X] 階です", rom: "Oheya wa X-kai desu", pin: "奥黑雅瓦X凯得斯" },
        ko: { text: "객실은 [X]층입니다", rom: "Gaek-sil-eun X-cheung-im-ni-da", pin: "给克西伦X层伊姆尼达" },
        pt: { text: "O quarto fica no [X]º andar", rom: "Oo KWAR-too FEE-kah noo X ahn-DAR", pin: "乌阔图菲卡诺X 安达尔" }
      }
    ]
  },
  {
    id: "checkout",
    label: "退房",
    sublabel: "CHECK-OUT",
    phrases: [
      {
        zh: "请问您今天退房吗？",
        en: { text: "Are you checking out today?", pin: "阿尤切克英奥特特得" },
        fr: { text: "Vous partez aujourd'hui?", rom: "Voo par-TAY oh-zhoor-DWEE", pin: "烹帕泰奥儒迪" },
        it: { text: "Sta partendo oggi?", rom: "Stah par-TEN-doh OD-jee", pin: "斯塔帕尔腾多奥基" },
        de: { text: "Reisen Sie heute ab?", rom: "RY-zen zee HOY-teh ahp", pin: "莱泽西霍伊特阿普" },
        es: { text: "¿Sale hoy?", rom: "SAH-leh oy", pin: "萨雷哦伊" },
        ja: { text: "本日チェックアウトですか？", rom: "Honjitsu chekku auto desu ka?", pin: "红基奇切库奥托 得斯卡" },
        ko: { text: "오늘 체크아웃 하시나요?", rom: "O-neul che-keu-a-ut ha-si-na-yo", pin: "哦呢尔切克阿乌特 哈西纳哟" },
        pt: { text: "Vai fazer check-out hoje?", rom: "Vai fah-ZER shek-OWT OH-zheh", pin: "瓦伊法泽尔谢克奥特奥热" }
      },
      {
        zh: "这是您的账单",
        en: { text: "Here is your bill", pin: "黑尔伊兹尤尔比尔" },
        fr: { text: "Voici votre facture", rom: "Vwah-SEE VOH-truh fak-TUR", pin: "瓦西沃特法克图尔" },
        it: { text: "Ecco il suo conto", rom: "EK-koh eel SOO-oh KON-toh", pin: "艾科伊苏哦康托" },
        de: { text: "Hier ist Ihre Rechnung", rom: "Heer ist EE-reh REKH-noong", pin: "黑尔伊斯特伊日雷赫宁" },
        es: { text: "Aquí está su cuenta", rom: "Ah-KEE es-TAH soo KWEN-tah", pin: "阿基伊斯塔苏克文塔" },
        ja: { text: "こちらがご請求書です", rom: "Kochira ga go-seikyūsho desu", pin: "科奇拉嘎勾塞库修得斯" },
        ko: { text: "계산서입니다", rom: "Gye-san-seo-im-ni-da", pin: "给散搜伊姆尼达" },
        pt: { text: "Aqui está a sua conta", rom: "Ah-KEE es-TAH ah SOO-ah KON-tah", pin: "阿基伊斯塔阿苏阿康塔" }
      },
      {
        zh: "请问您如何付款？",
        en: { text: "How would you like to pay?", pin: "好伍德尤来克特培" },
        fr: { text: "Comment souhaitez-vous payer?", rom: "Koh-MAHN soo-ay-TAY-voo pay-YAY", pin: "科蒙苏哀泰烹 佩耶" },
        it: { text: "Come desidera pagare?", rom: "KOH-meh deh-ZEE-deh-rah pah-GAH-reh", pin: "科美德兹德拉帕嘎雷" },
        de: { text: "Wie möchten Sie bezahlen?", rom: "Vee MUKH-ten zee beh-TSAH-len", pin: "维穆赫腾西贝扎伦" },
        es: { text: "¿Cómo desea pagar?", rom: "KOH-moh deh-SEH-ah pah-GAR", pin: "科莫德塞阿帕嘎尔" },
        ja: { text: "お支払い方法はどうなさいますか？", rom: "Oshiharai hōhō wa dō nasaimasu ka?", pin: "奥西哈拉伊后后瓦豆 纳赛马斯卡" },
        ko: { text: "결제는 어떻게 하시겠어요?", rom: "Gyeol-je-neun eo-tteo-ke ha-si-ge-sseo-yo", pin: "格尔节嫩鄂多克 哈西给搜哟" },
        pt: { text: "Como prefere pagar?", rom: "KOH-moo preh-FEH-reh pah-GAR", pin: "科莫普雷费雷帕嘎尔" }
      },
      {
        zh: "感谢您的入住",
        en: { text: "Thank you for staying with us", pin: "三克尤佛斯泰英威斯阿斯" },
        fr: { text: "Merci pour votre séjour", rom: "Mair-SEE poor VOH-truh say-ZHOOR", pin: "么西普尔沃特塞儒尔" },
        it: { text: "Grazie per il suo soggiorno", rom: "GRAH-tsyeh pair eel SOO-oh sod-JOR-noh", pin: "格拉兹耶佩尔伊苏哦索久尔诺" },
        de: { text: "Danke für Ihren Aufenthalt", rom: "DAHN-keh fur EE-ren OWF-ent-halt", pin: "当克菲尔伊任奥芬哈特" },
        es: { text: "Gracias por su estancia", rom: "GRAH-syahs por soo es-TAN-syah", pin: "格拉西亚斯波尔苏伊斯坦西阿" },
        ja: { text: "ご滞在ありがとうございました", rom: "Go-taizai arigatō gozaimashita", pin: "勾台载阿里嘎多 勾载马西塔" },
        ko: { text: "이용해 주셔서 감사합니다", rom: "I-yong-hae ju-syeo-seo gam-sa-ham-ni-da", pin: "伊咏黑朱秀搜 卡姆萨哈姆尼达" },
        pt: { text: "Obrigado pela sua estadia", rom: "Oh-bree-GAH-doo PEH-lah SOO-ah es-tah-DEE-ah", pin: "奥布里嘎多佩拉 苏阿伊斯塔迪阿" }
      }
    ]
  },
  {
    id: "room",
    label: "房间问题",
    sublabel: "ROOM ISSUES",
    phrases: [
      {
        zh: "请问有什么问题吗？",
        en: { text: "Is there a problem?", pin: "伊兹则尔阿普罗布伦" },
        fr: { text: "Y a-t-il un problème?", rom: "Ee ah-TEEL uh(n) proh-BLEM", pin: "伊阿提尔安普罗布雷姆" },
        it: { text: "C'è un problema?", rom: "Chay oon proh-BLEH-mah", pin: "切嗯普罗布雷马" },
        de: { text: "Gibt es ein Problem?", rom: "Gipt es ain proh-BLAYM", pin: "给普特艾斯艾因普罗布雷姆" },
        es: { text: "¿Hay algún problema?", rom: "Ai al-GOON proh-BLEH-mah", pin: "爱阿尔贡普罗布雷马" },
        ja: { text: "何かご不便はございますか？", rom: "Nanika go-fuben wa gozaimasu ka?", pin: "纳尼卡勾富本瓦 勾载马斯卡" },
        ko: { text: "불편하신 점이 있으신가요?", rom: "Bul-pyeon-ha-sin jeom-i i-sseu-sin-ga-yo", pin: "布尔篇哈新仲咦 伊斯新嘎哟" },
        pt: { text: "Há algum problema?", rom: "Ah al-GOOM proh-BLEH-mah", pin: "阿阿尔贡普罗布雷马" }
      },
      {
        zh: "我们会立即处理",
        en: { text: "We'll take care of it immediately", pin: "位尔泰克凯尔欧夫伊特 伊咪迪阿特利" },
        fr: { text: "Nous allons régler ça immédiatement", rom: "Noo za-LOHN ray-GLAY sah ee-may-dyat-MAHN", pin: "努扎龙雷格雷萨 伊美迪阿特蒙" },
        it: { text: "Ci occuperemo subito", rom: "Chee ok-koo-peh-REH-moh SOO-bee-toh", pin: "切奥库佩雷莫苏比托" },
        de: { text: "Wir kümmern uns sofort darum", rom: "Veer KUM-mern oons ZOH-fort dah-ROOM", pin: "维尔库梅恩乌斯 佐福特达路姆" },
        es: { text: "Lo solucionaremos enseguida", rom: "Loh soh-loo-syoh-nah-REH-mohs en-seh-GEE-dah", pin: "洛索卢西奥纳雷莫斯 恩塞基达" },
        ja: { text: "すぐに対応いたします", rom: "Sugu ni taiō itashimasu", pin: "斯古尼台奥伊塔西马斯" },
        ko: { text: "즉시 처리해 드리겠습니다", rom: "Jeuk-si cheo-ri-hae deu-ri-get-seum-ni-da", pin: "就西处里黑 得里给斯姆尼达" },
        pt: { text: "Trataremos disso imediatamente", rom: "Trah-tah-REH-mooz DEE-soo ee-meh-dyah-tah-MEN-teh", pin: "特拉塔雷莫斯迪苏 伊美迪阿塔门特" }
      },
      {
        zh: "需要更换毛巾 / 床单吗？",
        en: { text: "Would you like fresh towels / sheets?", pin: "伍德尤来克弗雷西唐沃斯/西兹" },
        fr: { text: "Désirez-vous des serviettes / draps propres?", rom: "Day-zee-RAY-voo day sair-VYET / drah PROH-pruh", pin: "代兹雷烹代塞维耶特/德拉普罗普" },
        it: { text: "Desidera asciugamani / lenzuola puliti?", rom: "Deh-ZEE-deh-rah ah-shoo-gah-MAH-nee / len-TSWO-lah poo-LEE-tee", pin: "德兹德拉阿修嘎马尼/ 伦兹沃拉普利提" },
        de: { text: "Möchten Sie frische Handtücher / Bettwäsche?", rom: "MUKH-ten zee FRI-sheh HANT-tu-kher / BET-ve-sheh", pin: "穆赫腾西弗里谢 汉特图赫/贝特韦谢" },
        es: { text: "¿Desea toallas / sábanas limpias?", rom: "Deh-SEH-ah toh-AH-yahs / SAH-bah-nahs LEEM-pyahs", pin: "德塞阿托阿亚斯/萨巴纳斯 林皮阿斯" },
        ja: { text: "タオル / シーツの交換はよろしいですか？", rom: "Taoru / shītsu no kōkan wa yoroshii desu ka?", pin: "塔奥鲁/西兹诺科坎瓦 哟罗西得斯卡" },
        ko: { text: "수건 / 시트 교체해 드릴까요?", rom: "Su-geon / si-teu gyo-che-hae deu-ril-kka-yo", pin: "苏根/西特格哟切黑 得里尔卡哟" },
        pt: { text: "Deseja toalhas / lençóis limpos?", rom: "Deh-ZEH-zhah toh-AH-lyahs / len-SOYSH LEEM-poosh", pin: "德泽哈托阿利阿斯/ 伦索伊什林普什" }
      },
      {
        zh: "需要叫醒服务吗？",
        en: { text: "Would you like a wake-up call?", pin: "伍德尤来克阿威克阿普科尔" },
        fr: { text: "Souhaitez-vous un réveil téléphonique?", rom: "Soo-ay-TAY-voo uh(n) ray-VAY tay-lay-foh-NEEK", pin: "苏哀泰烹安 雷韦泰雷佛尼克" },
        it: { text: "Desidera una sveglia telefonica?", rom: "Deh-ZEE-deh-rah OO-nah ZVEH-lyah teh-leh-FOH-nee-kah", pin: "德兹德拉乌纳 兹韦利阿泰雷佛尼卡" },
        de: { text: "Möchten Sie einen Weckruf?", rom: "MUKH-ten zee EYE-nen VEK-roof", pin: "穆赫腾西艾嫩韦克鲁夫" },
        es: { text: "¿Desea servicio de despertador?", rom: "Deh-SEH-ah sair-VEE-syoh deh des-pair-tah-DOR", pin: "德塞阿塞尔维西奥 德德斯佩尔塔多尔" },
        ja: { text: "モーニングコールはご利用になりますか？", rom: "Mōningu kōru wa go-riyō ni narimasu ka?", pin: "莫宁古科鲁瓦 勾里哟尼纳里马斯卡" },
        ko: { text: "모닝콜 서비스 이용하시겠어요?", rom: "Mo-ning-kol seo-bi-seu i-yong-ha-si-ge-sseo-yo", pin: "莫宁科尔搜比斯 伊咏哈西给搜哟" },
        pt: { text: "Deseja serviço de despertar?", rom: "Deh-ZEH-zhah sair-VEE-soo deh des-pair-TAR", pin: "德泽哈塞尔维苏 德德斯佩尔塔尔" }
      }
    ]
  },
  {
    id: "fb",
    label: "餐饮",
    sublabel: "F&B",
    phrases: [
      {
        zh: "餐厅在 [X] 层",
        en: { text: "The restaurant is on floor [X]", pin: "则瑞斯托朗伊兹昂佛罗尔X" },
        fr: { text: "Le restaurant est au [X]e étage", rom: "Luh res-toh-RAHN ay OH X ay-TAHZH", pin: "勒雷斯托朗艾欧X阿塔日" },
        it: { text: "Il ristorante è al piano [X]", rom: "Eel rees-toh-RAHN-teh ay al PYAH-noh X", pin: "伊尔里斯托兰特艾阿尔皮阿诺X" },
        de: { text: "Das Restaurant befindet sich im [X]. Stock", rom: "Das res-toh-RAHN beh-FIN-det zikh im X Shtok", pin: "达斯雷斯托朗贝芬德特 伊姆X斯托克" },
        es: { text: "El restaurante está en el piso [X]", rom: "El res-tow-RAHN-teh es-TAH en el PEE-soh X", pin: "艾尔雷斯套朗特伊斯塔 恩艾尔皮索X" },
        ja: { text: "レストランは [X] 階です", rom: "Resutoran wa X-kai desu", pin: "雷斯托兰瓦X凯得斯" },
        ko: { text: "레스토랑은 [X]층에 있습니다", rom: "Re-seu-to-rang-eun X-cheung-e it-seum-ni-da", pin: "雷斯托朗恩X层耶伊斯姆尼达" },
        pt: { text: "O restaurante fica no [X]º andar", rom: "Oo res-tow-RAHN-teh FEE-kah noo X ahn-DAR", pin: "乌雷斯套朗特菲卡诺X安达尔" }
      },
      {
        zh: "需要送餐服务吗？",
        en: { text: "Would you like room service?", pin: "伍德尤来克鲁姆瑟维斯" },
        fr: { text: "Souhaitez-vous le service en chambre?", rom: "Soo-ay-TAY-voo luh sair-VEES ahn SHAHM-bruh", pin: "苏哀泰烹勒塞维斯安尚布" },
        it: { text: "Desidera il servizio in camera?", rom: "Deh-ZEE-deh-rah eel sair-VEET-syoh een KAH-meh-rah", pin: "德兹德拉伊尔塞尔维兹奥 因卡美拉" },
        de: { text: "Möchten Sie Zimmerservice?", rom: "MUKH-ten zee TSIM-mer-zair-vees", pin: "穆赫腾西辰梅泽维斯" },
        es: { text: "¿Desea servicio a la habitación?", rom: "Deh-SEH-ah sair-VEE-syoh ah lah ah-bee-tah-SYON", pin: "德塞阿塞尔维西奥 阿拉阿比塔西翁" },
        ja: { text: "ルームサービスはいかがですか？", rom: "Rūmu sābisu wa ikaga desu ka?", pin: "鲁姆萨比斯瓦 伊卡嘎得斯卡" },
        ko: { text: "룸서비스 이용하시겠어요?", rom: "Rum-seo-bi-seu i-yong-ha-si-ge-sseo-yo", pin: "鲁姆搜比斯伊咏哈 西给搜哟" },
        pt: { text: "Deseja serviço de quarto?", rom: "Deh-ZEH-zhah sair-VEE-soo deh KWAR-too", pin: "德泽哈塞尔维苏德阔图" }
      },
      {
        zh: "请问有食物过敏吗？",
        en: { text: "Do you have any food allergies?", pin: "杜尤哈夫恩尼夫德阿勒基斯" },
        fr: { text: "Avez-vous des allergies alimentaires?", rom: "Ah-vay-VOO day za-lair-ZHEE ah-lee-mahn-TAIR", pin: "阿唯烹代扎雷基 阿里蒙泰尔" },
        it: { text: "Ha allergie alimentari?", rom: "Ah al-lair-JEE-eh ah-lee-men-TAH-ree", pin: "阿阿雷尔基耶 阿里门塔里" },
        de: { text: "Haben Sie Lebensmittelallergien?", rom: "HAH-ben zee LAY-bens-mi-tel-al-lair-geen", pin: "哈本西莱本斯米特 阿雷尔基恩" },
        es: { text: "¿Tiene alguna alergia alimentaria?", rom: "TYEH-neh al-GOO-nah ah-LAIR-hyah ah-lee-men-TAH-ryah", pin: "提耶内阿尔古纳 阿雷尔基阿阿里门塔里阿" },
        ja: { text: "アレルギーはございますか？", rom: "Arerugī wa gozaimasu ka?", pin: "阿雷鲁基瓦勾载马斯卡" },
        ko: { text: "음식 알레르기가 있으신가요?", rom: "Eum-sik al-le-reu-gi-ga i-sseu-sin-ga-yo", pin: "伊姆西克阿雷鲁基嘎 伊斯新嘎哟" },
        pt: { text: "Tem alguma alergia alimentar?", rom: "Teh(n) al-GOO-mah ah-lair-ZHEE-ah ah-lee-men-TAR", pin: "腾阿尔古马阿雷基阿 阿里门塔尔" }
      }
    ]
  },
  {
    id: "casino",
    label: "赌场",
    sublabel: "CASINO FLOOR",
    phrases: [
      {
        zh: "赌场在 [X] 层",
        en: { text: "The casino is on floor [X]", pin: "则卡西诺伊兹昂佛罗尔X" },
        fr: { text: "Le casino est au [X]e étage", rom: "Luh kah-ZEE-noh ay OH X ay-TAHZH", pin: "勒卡兹诺艾欧X阿塔日" },
        it: { text: "Il casinò è al piano [X]", rom: "Eel kah-zee-NOH ay al PYAH-noh X", pin: "伊尔卡兹诺艾阿尔皮阿诺X" },
        de: { text: "Das Casino befindet sich im [X]. Stock", rom: "Das kah-ZEE-noh beh-FIN-det zikh im X Shtok", pin: "达斯卡兹诺贝芬德特 伊姆X斯托克" },
        es: { text: "El casino está en el piso [X]", rom: "El kah-SEE-noh es-TAH en el PEE-soh X", pin: "艾尔卡西诺伊斯塔 恩艾尔皮索X" },
        ja: { text: "カジノは [X] 階です", rom: "Kajino wa X-kai desu", pin: "卡基诺瓦X凯得斯" },
        ko: { text: "카지노는 [X]층에 있습니다", rom: "Ka-ji-no-neun X-cheung-e it-seum-ni-da", pin: "卡基诺嫩X层耶伊斯姆尼达" },
        pt: { text: "O casino fica no [X]º andar", rom: "Oo kah-ZEE-noo FEE-kah noo X ahn-DAR", pin: "乌卡兹诺菲卡诺X安达尔" }
      },
      {
        zh: "赌场24小时开放",
        en: { text: "The casino is open 24 hours", pin: "则卡西诺伊兹奥彭 推恩提佛尔奥尔斯" },
        fr: { text: "Le casino est ouvert 24h/24", rom: "Luh kah-ZEE-noh ay oo-VAIR vahn-KAT-ur soor vahn-KAT", pin: "勒卡兹诺艾乌维尔旺卡" },
        it: { text: "Il casinò è aperto 24 ore su 24", rom: "Eel kah-zee-NOH ay ah-PAIR-toh VEN-tee-KWAT-roh OH-reh soo VEN-tee-KWAT-roh", pin: "伊尔卡兹诺艾阿佩托 文提夸托罗雷苏文提夸托" },
        de: { text: "Das Casino ist 24 Stunden geöffnet", rom: "Das kah-ZEE-noh ist FEER-unt-TSVAHN-tsikh SHTOON-den geh-UFF-net", pin: "达斯卡兹诺伊斯特 费尔翁兹万兹希斯滕格欧芙内特" },
        es: { text: "El casino está abierto las 24 horas", rom: "El kah-SEE-noh es-TAH ah-BYAIR-toh lahs VEN-tee-KWAT-roh OH-rahs", pin: "艾尔卡西诺伊斯塔阿比耶托 拉斯文提夸托奥拉斯" },
        ja: { text: "カジノは24時間営業しています", rom: "Kajino wa nijūyojikan eigyō shite imasu", pin: "卡基诺瓦尼珠哟基坎 艾基哟西特伊马斯" },
        ko: { text: "카지노는 24시간 운영합니다", rom: "Ka-ji-no-neun i-sip-sa si-gan un-yeong-ham-ni-da", pin: "卡基诺嫩伊西普萨西坎 乌恩咏哈姆尼达" },
        pt: { text: "O casino funciona 24 horas", rom: "Oo kah-ZEE-noo foon-SYOH-nah VIN-teh eh KWAT-roo OH-rahs", pin: "乌卡兹诺丰西奥纳 文特伊夸图奥拉斯" }
      },
      {
        zh: "入场须出示证件",
        en: { text: "ID required for casino entry", pin: "艾迪瑞夸尔德佛卡西诺恩特里" },
        fr: { text: "Une pièce d'identité est requise pour entrer", rom: "Oon pyess dee-dahn-tee-TAY ay ruh-KEEZ poor ahn-TRAY", pin: "恩皮耶丝迪当提泰艾如基斯 普尔安特雷" },
        it: { text: "Documento richiesto per l'ingresso", rom: "Doh-koo-MEN-toh ree-KYES-toh pair leen-GRES-soh", pin: "多库门托里基耶斯托 佩尔英格雷索" },
        de: { text: "Ausweis für den Casinoeingang erforderlich", rom: "OWS-vice fur den kah-ZEE-noh-AYN-gang air-FOR-der-likh", pin: "奥斯维斯菲尔丹卡兹诺 艾因刚艾尔弗尔德利赫" },
        es: { text: "Se requiere identificación para entrar", rom: "Seh reh-KYEH-reh ee-den-tee-fee-KAH-syon PAH-rah en-TRAR", pin: "塞雷基耶雷伊登提菲卡西翁 帕拉恩特拉尔" },
        ja: { text: "カジノ入場には証明書が必要です", rom: "Kajino nyūjō ni wa shōmeisho ga hitsuyō desu", pin: "卡基诺纽究尼瓦 修美修嘎黑兹哟得斯" },
        ko: { text: "카지노 입장 시 신분증이 필요합니다", rom: "Ka-ji-no ip-jang si sin-bun-jeung-i pil-yo-ham-ni-da", pin: "卡基诺伊普场西 新本中伊皮尔哟哈姆尼达" },
        pt: { text: "É necessário documento para entrar no casino", rom: "Eh neh-seh-SAH-ryoo doh-koo-MEN-too PAH-rah en-TRAR noo kah-ZEE-noo", pin: "艾内塞萨里奥多库门图 帕拉恩特拉尔诺卡兹诺" }
      }
    ]
  },
  {
    id: "emergency",
    label: "紧急情况",
    sublabel: "EMERGENCY",
    phrases: [
      {
        zh: "请冷静",
        en: { text: "Please stay calm", pin: "普利兹斯泰卡姆" },
        fr: { text: "Restez calme, s'il vous plaît", rom: "Res-TAY kalm seel-voo-PLAY", pin: "雷斯泰卡尔姆西烹普雷" },
        it: { text: "Stia calmo / calma, per favore", rom: "STEE-ah KAL-moh pair fah-VOH-reh", pin: "斯提阿卡尔莫 佩尔法沃雷" },
        de: { text: "Bitte bleiben Sie ruhig", rom: "BI-teh BLY-ben zee ROO-ikh", pin: "必特布莱本西鲁伊赫" },
        es: { text: "Por favor, mantenga la calma", rom: "Por fah-VOR man-TEN-gah lah KAL-mah", pin: "波尔法沃尔曼腾嘎拉卡尔马" },
        ja: { text: "落ち着いてください", rom: "Ochitsuite kudasai", pin: "奥奇兹伊特库达赛" },
        ko: { text: "진정해 주세요", rom: "Jin-jeong-hae ju-se-yo", pin: "金正黑朱塞哟" },
        pt: { text: "Por favor, mantenha a calma", rom: "Por fah-VOR man-TEH-nyah ah KAL-mah", pin: "普尔法沃尔曼腾亚阿卡尔马" }
      },
      {
        zh: "请跟我来",
        en: { text: "Please follow me", pin: "普利兹佛洛米" },
        fr: { text: "Suivez-moi, s'il vous plaît", rom: "SWEE-vay mwah seel-voo-PLAY", pin: "斯维唯摩瓦西烹普雷" },
        it: { text: "Mi segua, per favore", rom: "Mee SEH-gwah pair fah-VOH-reh", pin: "咪塞瓜佩尔法沃雷" },
        de: { text: "Bitte folgen Sie mir", rom: "BI-teh FOL-gen zee meer", pin: "必特佛尔根西咪尔" },
        es: { text: "Por favor, sígame", rom: "Por fah-VOR SEE-gah-meh", pin: "波尔法沃尔西嘎美" },
        ja: { text: "こちらへどうぞ", rom: "Kochira e dōzo", pin: "科奇拉艾豆佐" },
        ko: { text: "저를 따라오세요", rom: "Jeo-reul tta-ra-o-se-yo", pin: "这乐尔塔拉哦塞哟" },
        pt: { text: "Por favor, siga-me", rom: "Por fah-VOR SEE-gah-meh", pin: "普尔法沃尔西嘎美" }
      },
      {
        zh: "需要叫救护车吗？",
        en: { text: "Do you need an ambulance?", pin: "杜尤尼德安安比尤伦斯" },
        fr: { text: "Avez-vous besoin d'une ambulance?", rom: "Ah-vay-VOO buh-ZWAHN doon ahm-boo-LAHNS", pin: "阿唯烹贝泽旺顿安布朗斯" },
        it: { text: "Ha bisogno di un'ambulanza?", rom: "Ah bee-ZON-yoh dee oon ahm-boo-LAN-tsah", pin: "阿比佐尼奥迪嗯安布兰兹阿" },
        de: { text: "Brauchen Sie einen Krankenwagen?", rom: "BROW-khen zee EYE-nen KRAHN-ken-vah-gen", pin: "布劳赫西艾嫩克兰肯瓦根" },
        es: { text: "¿Necesita una ambulancia?", rom: "Neh-seh-SEE-tah OO-nah ahm-boo-LAN-syah", pin: "内塞西塔乌纳安布兰西阿" },
        ja: { text: "救急車を呼びますか？", rom: "Kyūkyūsha wo yobimasu ka?", pin: "哭哭夏沃哟比马斯卡" },
        ko: { text: "구급차가 필요하신가요?", rom: "Gu-geup-cha-ga pil-yo-ha-sin-ga-yo", pin: "古给普恰嘎皮尔哟哈新嘎哟" },
        pt: { text: "Precisa de uma ambulância?", rom: "Preh-SEE-zah deh OO-mah ahm-boo-LAN-syah", pin: "普雷西扎德乌马安布兰西阿" }
      },
      {
        zh: "紧急出口在那边",
        en: { text: "The emergency exit is over there", pin: "则伊莫金西伊格泽特伊兹奥弗则尔" },
        fr: { text: "La sortie de secours est par là", rom: "Lah sor-TEE duh suh-KOOR ay par LAH", pin: "拉索尔提得瑟库尔艾帕拉" },
        it: { text: "L'uscita di emergenza è là", rom: "Loo-SHEE-tah dee eh-mair-JEN-tsah ay LAH", pin: "路西塔迪艾梅尔真兹阿艾拉" },
        de: { text: "Der Notausgang ist dort drüben", rom: "Dair NOHT-ows-gang ist dort DRU-ben", pin: "达尔诺特奥斯刚 伊斯特多尔特德吕本" },
        es: { text: "La salida de emergencia está por allá", rom: "Lah sah-LEE-dah deh eh-mair-HEN-syah es-TAH por ah-YAH", pin: "拉萨利达德艾梅尔亨西阿 伊斯塔波尔阿亚" },
        ja: { text: "非常口はあちらです", rom: "Hijōguchi wa achira desu", pin: "黑究古奇瓦阿奇拉得斯" },
        ko: { text: "비상구는 저쪽입니다", rom: "Bi-sang-gu-neun jeo-jjok-im-ni-da", pin: "比桑古嫩这九伊姆尼达" },
        pt: { text: "A saída de emergência é por ali", rom: "Ah sah-EE-dah deh eh-mair-JEN-syah eh por ah-LEE", pin: "阿萨伊达德艾梅尔真西阿 艾普尔阿利" }
      }
    ]
  }
];
