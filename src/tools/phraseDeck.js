const FAVORITES_KEY = "frontdesk_phrase_favorites";
const RECENT_KEY = "frontdesk_phrase_recent";
const SETTINGS_KEY = "frontdesk_phrase_settings";
const PRON_NOTE = "近似读法，仅供应急，不代表标准发音。";

const languages = [
  ["all", "全部语言"],
  ["en", "English"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["fr", "Français"],
  ["it", "Italiano"],
  ["de", "Deutsch"],
  ["es", "Español"]
];

const categories = [
  "欢迎 / 问候",
  "入住登记",
  "护照 / 证件",
  "押金 / 付款",
  "房间未准备好",
  "房卡 / 电梯",
  "早餐 / 餐厅",
  "Wi-Fi",
  "退房",
  "延迟退房",
  "行李寄存",
  "投诉安抚",
  "交通 / 的士",
  "方向指引",
  "房间问题",
  "紧急情况"
];

const rows = [
  ["欢迎 / 问候", "welcome-greeting", ["欢迎", "问候", "front desk"], [
    ["欢迎来到本酒店。", "Welcome to our hotel.", "当ホテルへようこそ。", "저희 호텔에 오신 것을 환영합니다.", "Bienvenue dans notre hôtel.", "Benvenuti nel nostro hotel.", "Willkommen in unserem Hotel.", "Bienvenido a nuestro hotel."],
    ["您好，请问有什么可以帮您？", "Good day. How may I assist you?", "いらっしゃいませ。ご用件を承ります。", "안녕하세요. 무엇을 도와드릴까요?", "Bonjour. Comment puis-je vous aider ?", "Buongiorno. Come posso aiutarLa?", "Guten Tag. Wie kann ich Ihnen helfen?", "Buenos días. ¿En qué puedo ayudarle?"],
    ["请稍等，我马上为您查询。", "Please wait a moment. I will check it for you.", "少々お待ちください。すぐに確認いたします。", "잠시만 기다려 주세요. 바로 확인해 드리겠습니다.", "Veuillez patienter un instant, je vais vérifier.", "Attenda un momento, verifico subito.", "Bitte warten Sie einen Moment, ich prüfe es sofort.", "Por favor, espere un momento. Lo verificaré enseguida."],
    ["很高兴为您服务。", "It is our pleasure to assist you.", "お手伝いできて光栄です。", "도와드릴 수 있어 기쁩니다.", "C'est un plaisir de vous aider.", "È un piacere assisterLa.", "Es ist uns eine Freude, Ihnen zu helfen.", "Es un placer atenderle."],
    ["祝您入住愉快。", "We wish you a pleasant stay.", "快適にお過ごしくださいませ。", "편안한 투숙 되시기 바랍니다.", "Nous vous souhaitons un agréable séjour.", "Le auguriamo un piacevole soggiorno.", "Wir wünschen Ihnen einen angenehmen Aufenthalt.", "Le deseamos una estancia agradable."]
  ]],
  ["入住登记", "check-in", ["入住", "登记", "check in"], [
    ["请问您有预订吗？", "Do you have a reservation?", "ご予約はございますか。", "예약이 있으신가요?", "Avez-vous une réservation ?", "Ha una prenotazione?", "Haben Sie eine Reservierung?", "¿Tiene una reserva?"],
    ["请提供预订姓名。", "May I have the name on the reservation?", "ご予約のお名前をお願いいたします。", "예약자 성함을 알려 주세요.", "Puis-je avoir le nom de la réservation ?", "Posso avere il nome della prenotazione?", "Darf ich den Namen der Reservierung haben?", "¿Me indica el nombre de la reserva?"],
    ["您的房间已经可以入住。", "Your room is ready for check-in.", "お部屋のご用意ができております。", "객실 준비가 완료되었습니다.", "Votre chambre est prête.", "La Sua camera è pronta.", "Ihr Zimmer ist bereit.", "Su habitación ya está lista."],
    ["入住时间是下午三点。", "Check-in time is 3 p.m.", "チェックインは午後三時からでございます。", "체크인은 오후 세 시부터입니다.", "L'enregistrement commence à 15 heures.", "Il check-in inizia alle 15:00.", "Der Check-in beginnt um 15 Uhr.", "El check-in empieza a las 15:00."],
    ["请在这里签名确认。", "Please sign here to confirm.", "こちらにご署名をお願いいたします。", "여기에 서명해 주세요.", "Veuillez signer ici pour confirmer.", "La prego di firmare qui per confermare.", "Bitte unterschreiben Sie hier zur Bestätigung.", "Por favor, firme aquí para confirmar."]
  ]],
  ["护照 / 证件", "passport-id", ["护照", "证件", "passport", "ID"], [
    ["请出示您的护照办理登记。", "Please present your passport for registration.", "パスポートをご提示ください。", "여권을 제시해 주세요.", "Veuillez présenter votre passeport pour l'enregistrement.", "Può presentare il passaporto per la registrazione?", "Bitte zeigen Sie Ihren Reisepass für die Registrierung vor.", "Por favor, presente su pasaporte para el registro."],
    ["我们需要复印您的证件。", "We need to copy your identification document.", "身分証明書のコピーを取らせていただきます。", "신분증 사본이 필요합니다.", "Nous devons faire une copie de votre pièce d'identité.", "Dobbiamo fare una copia del Suo documento.", "Wir benötigen eine Kopie Ihres Ausweises.", "Necesitamos copiar su documento de identidad."],
    ["请确认资料是否正确。", "Please confirm that the information is correct.", "内容にお間違いがないかご確認ください。", "정보가 맞는지 확인해 주세요.", "Veuillez confirmer que les informations sont correctes.", "La prego di confermare che i dati siano corretti.", "Bitte bestätigen Sie, dass die Angaben korrekt sind.", "Por favor, confirme que los datos son correctos."],
    ["每位住客都需要登记证件。", "Every guest needs to register an ID.", "ご宿泊者全員の身分証明書が必要です。", "모든 투숙객의 신분증 등록이 필요합니다.", "Chaque client doit enregistrer une pièce d'identité.", "Ogni ospite deve registrare un documento.", "Jeder Gast muss einen Ausweis registrieren.", "Cada huésped debe registrar un documento."],
    ["证件会马上归还给您。", "Your document will be returned immediately.", "証明書はすぐにお返しいたします。", "신분증은 바로 돌려드리겠습니다.", "Votre document vous sera rendu immédiatement.", "Il documento Le sarà restituito subito.", "Ihr Dokument wird Ihnen sofort zurückgegeben.", "Le devolveremos el documento de inmediato."]
  ]],
  ["押金 / 付款", "deposit-payment", ["押金", "付款", "payment", "deposit"], [
    ["入住需要支付押金。", "A deposit is required for check-in.", "チェックイン時に保証金が必要です。", "체크인 시 보증금이 필요합니다.", "Un dépôt de garantie est requis à l'arrivée.", "È richiesto un deposito al check-in.", "Beim Check-in ist eine Kaution erforderlich.", "Se requiere un depósito al registrarse."],
    ["您可以使用现金或信用卡支付。", "You may pay by cash or credit card.", "現金またはクレジットカードでお支払いいただけます。", "현금 또는 신용카드로 결제하실 수 있습니다.", "Vous pouvez payer en espèces ou par carte.", "Può pagare in contanti o con carta di credito.", "Sie können bar oder mit Kreditkarte bezahlen.", "Puede pagar en efectivo o con tarjeta."],
    ["押金会在退房后退还。", "The deposit will be refunded after check-out.", "保証金はチェックアウト後に返金されます。", "보증금은 체크아웃 후 환불됩니다.", "Le dépôt sera remboursé après le départ.", "Il deposito sarà rimborsato dopo il check-out.", "Die Kaution wird nach dem Check-out erstattet.", "El depósito se reembolsará después del check-out."],
    ["请确认账单金额。", "Please confirm the bill amount.", "請求金額をご確認ください。", "청구 금액을 확인해 주세요.", "Veuillez confirmer le montant de la facture.", "La prego di confermare l'importo del conto.", "Bitte bestätigen Sie den Rechnungsbetrag.", "Por favor, confirme el importe de la cuenta."],
    ["这笔预授权不是即时扣款。", "This pre-authorization is not an immediate charge.", "こちらの事前承認は即時請求ではございません。", "이 사전 승인은 즉시 결제가 아닙니다.", "Cette préautorisation n'est pas un débit immédiat.", "Questa preautorizzazione non è un addebito immediato.", "Diese Vorautorisierung ist keine sofortige Abbuchung.", "Esta preautorización no es un cargo inmediato."]
  ]],
  ["房间未准备好", "room-not-ready", ["房间", "等待", "ready"], [
    ["很抱歉，房间还在清洁中。", "We apologize, the room is still being cleaned.", "申し訳ございません。お部屋はまだ清掃中です。", "죄송합니다. 객실은 아직 청소 중입니다.", "Nous sommes désolés, la chambre est encore en nettoyage.", "Ci scusiamo, la camera è ancora in pulizia.", "Es tut uns leid, das Zimmer wird noch gereinigt.", "Lo sentimos, la habitación aún se está limpiando."],
    ["预计还需要二十分钟。", "It should take about twenty more minutes.", "あと二十分ほどかかる見込みです。", "약 20분 정도 더 걸릴 예정입니다.", "Cela devrait prendre encore environ vingt minutes.", "Dovrebbero volerci altri venti minuti.", "Es dauert voraussichtlich noch etwa zwanzig Minuten.", "Tardará unos veinte minutos más."],
    ["您可以先在大堂休息。", "You may relax in the lobby first.", "先にロビーでお休みいただけます。", "먼저 로비에서 쉬실 수 있습니다.", "Vous pouvez patienter dans le hall.", "Può attendere nella lobby.", "Sie können zunächst in der Lobby warten.", "Puede descansar primero en el vestíbulo."],
    ["房间准备好后我们会通知您。", "We will notify you once the room is ready.", "お部屋の準備ができ次第お知らせいたします。", "객실이 준비되면 알려드리겠습니다.", "Nous vous informerons dès que la chambre sera prête.", "La informeremo appena la camera sarà pronta.", "Wir informieren Sie, sobald das Zimmer bereit ist.", "Le avisaremos cuando la habitación esté lista."],
    ["您可以先寄存行李。", "You may store your luggage first.", "先にお荷物をお預かりできます。", "먼저 짐을 맡기실 수 있습니다.", "Vous pouvez d'abord déposer vos bagages.", "Può depositare prima i bagagli.", "Sie können Ihr Gepäck zuerst aufbewahren lassen.", "Puede dejar primero su equipaje."]
  ]],
  ["房卡 / 电梯", "key-elevator", ["房卡", "电梯", "key card", "elevator"], [
    ["这是您的房卡。", "Here is your room key card.", "こちらがお部屋のカードキーでございます。", "여기 객실 카드키입니다.", "Voici votre carte de chambre.", "Ecco la Sua chiave magnetica.", "Hier ist Ihre Zimmerkarte.", "Aquí tiene la tarjeta de su habitación."],
    ["请将房卡插入电梯感应区。", "Please tap your key card at the elevator reader.", "エレベーターの読み取り機にカードキーをかざしてください。", "엘리베이터 리더기에 카드키를 대 주세요.", "Veuillez passer votre carte sur le lecteur de l'ascenseur.", "Avvicini la carta al lettore dell'ascensore.", "Bitte halten Sie die Karte an den Aufzugleser.", "Acerque la tarjeta al lector del ascensor."],
    ["您的房间在二十楼。", "Your room is on the twentieth floor.", "お部屋は二十階でございます。", "객실은 20층에 있습니다.", "Votre chambre est au vingtième étage.", "La Sua camera è al ventesimo piano.", "Ihr Zimmer befindet sich im zwanzigsten Stock.", "Su habitación está en el piso veinte."],
    ["如果房卡失效，请到前台更换。", "If the key card stops working, please return to the front desk.", "カードキーが使えない場合はフロントへお越しください。", "카드키가 작동하지 않으면 프런트로 와 주세요.", "Si la carte ne fonctionne plus, veuillez revenir à la réception.", "Se la carta non funziona, torni alla reception.", "Wenn die Karte nicht funktioniert, kommen Sie bitte zur Rezeption.", "Si la tarjeta no funciona, vuelva a recepción."],
    ["请勿把房卡靠近手机或磁铁。", "Please keep the key card away from phones and magnets.", "カードキーは携帯電話や磁石から離してください。", "카드키를 휴대폰이나 자석 가까이에 두지 마세요.", "Veuillez garder la carte loin des téléphones et des aimants.", "Tenga la carta lontana da telefoni e magneti.", "Bitte halten Sie die Karte von Telefonen und Magneten fern.", "Mantenga la tarjeta alejada de teléfonos e imanes."]
  ]],
  ["早餐 / 餐厅", "breakfast-restaurant", ["早餐", "餐厅", "restaurant"], [
    ["早餐时间是早上七点到十点。", "Breakfast is served from 7 a.m. to 10 a.m.", "朝食は午前七時から十時まででございます。", "조식은 오전 7시부터 10시까지입니다.", "Le petit-déjeuner est servi de 7 h à 10 h.", "La colazione è servita dalle 7 alle 10.", "Das Frühstück wird von 7 bis 10 Uhr serviert.", "El desayuno se sirve de 7 a 10 de la mañana."],
    ["餐厅在三楼。", "The restaurant is on the third floor.", "レストランは三階にございます。", "레스토랑은 3층에 있습니다.", "Le restaurant se trouve au troisième étage.", "Il ristorante si trova al terzo piano.", "Das Restaurant befindet sich im dritten Stock.", "El restaurante está en el tercer piso."],
    ["请出示房卡进入餐厅。", "Please show your room key card at the restaurant.", "レストランでカードキーをご提示ください。", "레스토랑에서 카드키를 제시해 주세요.", "Veuillez présenter votre carte de chambre au restaurant.", "Mostri la carta della camera al ristorante.", "Bitte zeigen Sie im Restaurant Ihre Zimmerkarte.", "Muestre la tarjeta de la habitación en el restaurante."],
    ["早餐是否包含在房费内，我帮您确认。", "I will check whether breakfast is included.", "朝食が含まれているか確認いたします。", "조식 포함 여부를 확인해 드리겠습니다.", "Je vais vérifier si le petit-déjeuner est inclus.", "Verifico se la colazione è inclusa.", "Ich prüfe, ob das Frühstück inbegriffen ist.", "Voy a comprobar si el desayuno está incluido."],
    ["我们可以为您预订餐厅。", "We can make a restaurant reservation for you.", "レストランのご予約を承ります。", "레스토랑 예약을 도와드릴 수 있습니다.", "Nous pouvons réserver le restaurant pour vous.", "Possiamo prenotare il ristorante per Lei.", "Wir können ein Restaurant für Sie reservieren.", "Podemos reservar el restaurante para usted."]
  ]],
  ["Wi-Fi", "wifi", ["Wi-Fi", "网络", "internet"], [
    ["酒店提供免费 Wi-Fi。", "The hotel provides free Wi-Fi.", "ホテルでは無料Wi-Fiをご利用いただけます。", "호텔에서는 무료 Wi-Fi를 이용하실 수 있습니다.", "L'hôtel propose le Wi-Fi gratuit.", "L'hotel offre Wi-Fi gratuito.", "Das Hotel bietet kostenloses WLAN.", "El hotel ofrece Wi-Fi gratuito."],
    ["Wi-Fi 名称写在房卡套上。", "The Wi-Fi name is printed on the key card holder.", "Wi-Fi名はカードキーケースに記載されています。", "Wi-Fi 이름은 카드키 홀더에 적혀 있습니다.", "Le nom du Wi-Fi est indiqué sur l'étui de la carte.", "Il nome del Wi-Fi è scritto sulla custodia della carta.", "Der WLAN-Name steht auf der Kartenhülle.", "El nombre del Wi-Fi está en la funda de la tarjeta."],
    ["密码是您的房间号码。", "The password is your room number.", "パスワードはお部屋番号でございます。", "비밀번호는 객실 번호입니다.", "Le mot de passe est votre numéro de chambre.", "La password è il numero della Sua camera.", "Das Passwort ist Ihre Zimmernummer.", "La contraseña es su número de habitación."],
    ["如果无法连接，请联系我们。", "If you cannot connect, please contact us.", "接続できない場合はご連絡ください。", "연결이 안 되면 저희에게 연락해 주세요.", "Si vous ne pouvez pas vous connecter, contactez-nous.", "Se non riesce a connettersi, ci contatti.", "Wenn Sie keine Verbindung herstellen können, kontaktieren Sie uns bitte.", "Si no puede conectarse, contáctenos."],
    ["大堂也可以使用同一个 Wi-Fi。", "The same Wi-Fi works in the lobby.", "ロビーでも同じWi-Fiをご利用いただけます。", "로비에서도 같은 Wi-Fi를 사용할 수 있습니다.", "Le même Wi-Fi fonctionne dans le hall.", "Lo stesso Wi-Fi funziona nella lobby.", "Dasselbe WLAN funktioniert auch in der Lobby.", "El mismo Wi-Fi funciona en el vestíbulo."]
  ]],
  ["退房", "checkout", ["退房", "账单", "checkout"], [
    ["退房时间是中午十二点。", "Check-out time is 12 noon.", "チェックアウトは正午十二時でございます。", "체크아웃 시간은 정오 12시입니다.", "L'heure de départ est midi.", "Il check-out è alle 12:00.", "Der Check-out ist um 12 Uhr mittags.", "La salida es a las 12 del mediodía."],
    ["请把房卡交回前台。", "Please return the key card to the front desk.", "カードキーをフロントへご返却ください。", "카드키를 프런트에 반납해 주세요.", "Veuillez rendre la carte à la réception.", "Restituisca la carta alla reception.", "Bitte geben Sie die Zimmerkarte an der Rezeption zurück.", "Devuelva la tarjeta en recepción."],
    ["我现在为您核对账单。", "I will review your bill now.", "ただいま請求書を確認いたします。", "지금 청구서를 확인해 드리겠습니다.", "Je vais vérifier votre facture maintenant.", "Controllo subito il Suo conto.", "Ich prüfe jetzt Ihre Rechnung.", "Voy a revisar su cuenta ahora."],
    ["请问您是否使用过迷你吧？", "Did you use anything from the minibar?", "ミニバーをご利用になりましたか。", "미니바를 이용하셨나요?", "Avez-vous utilisé le minibar ?", "Ha utilizzato il minibar?", "Haben Sie etwas aus der Minibar benutzt?", "¿Ha usado algo del minibar?"],
    ["感谢您的入住，祝您旅途愉快。", "Thank you for staying with us. Have a pleasant journey.", "ご宿泊ありがとうございました。よいご旅行を。", "이용해 주셔서 감사합니다. 즐거운 여행 되세요.", "Merci d'avoir séjourné chez nous. Bon voyage.", "Grazie per aver soggiornato da noi. Buon viaggio.", "Vielen Dank für Ihren Aufenthalt. Gute Reise.", "Gracias por alojarse con nosotros. Buen viaje."]
  ]],
  ["延迟退房", "late-checkout", ["延迟退房", "late checkout"], [
    ["我可以为您查询延迟退房。", "I can check late check-out availability for you.", "レイトチェックアウトの空き状況を確認いたします。", "레이트 체크아웃 가능 여부를 확인해 드리겠습니다.", "Je peux vérifier la disponibilité du départ tardif.", "Posso verificare la disponibilità del late check-out.", "Ich kann die Verfügbarkeit eines späten Check-outs prüfen.", "Puedo comprobar la disponibilidad de salida tardía."],
    ["延迟退房需视房态而定。", "Late check-out depends on room availability.", "レイトチェックアウトは空室状況によります。", "레이트 체크아웃은 객실 상황에 따라 다릅니다.", "Le départ tardif dépend des disponibilités.", "Il late check-out dipende dalla disponibilità.", "Ein später Check-out hängt von der Verfügbarkeit ab.", "La salida tardía depende de la disponibilidad."],
    ["延迟到下午两点无需收费。", "Late check-out until 2 p.m. is free of charge.", "午後二時までの延長は無料です。", "오후 2시까지는 무료로 연장 가능합니다.", "Le départ jusqu'à 14 h est gratuit.", "Il check-out fino alle 14:00 è gratuito.", "Der Check-out bis 14 Uhr ist kostenlos.", "La salida hasta las 14:00 es gratuita."],
    ["超过时间可能会收取半日房费。", "A half-day charge may apply after that time.", "それ以降は半日分の料金が発生する場合があります。", "그 이후에는 반일 요금이 부과될 수 있습니다.", "Un supplément d'une demi-journée peut s'appliquer.", "Potrebbe essere applicato un addebito di mezza giornata.", "Danach kann eine Gebühr für einen halben Tag anfallen.", "Después puede aplicarse un cargo de medio día."],
    ["我已为您备注延迟退房请求。", "I have noted your late check-out request.", "レイトチェックアウトのご希望を記録いたしました。", "레이트 체크아웃 요청을 기록해 두었습니다.", "J'ai noté votre demande de départ tardif.", "Ho annotato la Sua richiesta di late check-out.", "Ich habe Ihren Wunsch nach spätem Check-out vermerkt.", "He anotado su solicitud de salida tardía."]
  ]],
  ["行李寄存", "luggage-storage", ["行李", "寄存", "luggage"], [
    ["我们可以为您寄存行李。", "We can store your luggage for you.", "お荷物をお預かりできます。", "짐을 보관해 드릴 수 있습니다.", "Nous pouvons garder vos bagages.", "Possiamo custodire i Suoi bagagli.", "Wir können Ihr Gepäck aufbewahren.", "Podemos guardar su equipaje."],
    ["请保管好这张行李牌。", "Please keep this luggage tag safe.", "こちらの荷物札を大切に保管してください。", "이 수하물 표를 잘 보관해 주세요.", "Veuillez conserver cette étiquette de bagage.", "Conservi con cura questo tag bagagli.", "Bitte bewahren Sie diesen Gepäckschein gut auf.", "Guarde bien esta etiqueta de equipaje."],
    ["领取行李时请出示行李牌。", "Please show the luggage tag when collecting your bags.", "お受け取りの際に荷物札をご提示ください。", "짐을 찾으실 때 수하물 표를 보여 주세요.", "Veuillez présenter l'étiquette pour récupérer vos bagages.", "Mostri il tag per ritirare i bagagli.", "Bitte zeigen Sie den Gepäckschein bei der Abholung.", "Muestre la etiqueta al recoger el equipaje."],
    ["贵重物品请随身携带。", "Please keep valuables with you.", "貴重品はお手元にお持ちください。", "귀중품은 직접 소지해 주세요.", "Veuillez garder vos objets de valeur avec vous.", "Tenga con sé gli oggetti di valore.", "Bitte behalten Sie Wertsachen bei sich.", "Lleve los objetos de valor con usted."],
    ["行李寄存服务当天免费。", "Same-day luggage storage is free of charge.", "当日の荷物預かりは無料です。", "당일 수하물 보관은 무료입니다.", "La consigne le jour même est gratuite.", "Il deposito bagagli in giornata è gratuito.", "Die Gepäckaufbewahrung am selben Tag ist kostenlos.", "El depósito de equipaje el mismo día es gratuito."]
  ]],
  ["投诉安抚", "complaint-care", ["投诉", "安抚", "apology"], [
    ["非常抱歉给您带来不便。", "We sincerely apologize for the inconvenience.", "ご不便をおかけし、誠に申し訳ございません。", "불편을 드려 진심으로 죄송합니다.", "Nous sommes sincèrement désolés pour ce désagrément.", "Ci scusiamo sinceramente per il disagio.", "Wir entschuldigen uns aufrichtig für die Unannehmlichkeiten.", "Lamentamos sinceramente las molestias."],
    ["我会马上为您跟进。", "I will follow up on this immediately.", "すぐに対応いたします。", "바로 조치해 드리겠습니다.", "Je vais m'en occuper immédiatement.", "Me ne occuperò subito.", "Ich werde mich sofort darum kümmern.", "Le daré seguimiento de inmediato."],
    ["请允许我联系值班经理。", "Please allow me to contact the duty manager.", "当直マネージャーに連絡いたします。", "당직 매니저에게 연락드리겠습니다.", "Permettez-moi de contacter le responsable de service.", "Mi permetta di contattare il responsabile di turno.", "Ich kontaktiere den diensthabenden Manager.", "Permítame contactar al gerente de turno."],
    ["感谢您提醒我们这个问题。", "Thank you for bringing this to our attention.", "ご指摘いただきありがとうございます。", "알려 주셔서 감사합니다.", "Merci de nous avoir signalé ce problème.", "Grazie per averci segnalato il problema.", "Vielen Dank, dass Sie uns darauf hingewiesen haben.", "Gracias por informarnos de este problema."],
    ["我们会尽力为您安排解决方案。", "We will do our best to arrange a solution for you.", "できる限り解決策をご用意いたします。", "최선을 다해 해결 방법을 마련하겠습니다.", "Nous ferons de notre mieux pour trouver une solution.", "Faremo del nostro meglio per trovare una soluzione.", "Wir werden unser Bestes tun, um eine Lösung zu finden.", "Haremos todo lo posible para ofrecerle una solución."]
  ]],
  ["交通 / 的士", "transport-taxi", ["交通", "的士", "taxi"], [
    ["需要我们为您叫的士吗？", "Would you like us to call a taxi for you?", "タクシーをお呼びしましょうか。", "택시를 불러 드릴까요?", "Souhaitez-vous que nous appelions un taxi ?", "Desidera che chiamiamo un taxi?", "Möchten Sie, dass wir ein Taxi rufen?", "¿Desea que llamemos un taxi?"],
    ["的士站在酒店正门外。", "The taxi stand is outside the main entrance.", "タクシー乗り場は正面玄関の外にございます。", "택시 승강장은 호텔 정문 밖에 있습니다.", "La station de taxis est devant l'entrée principale.", "La fermata dei taxi è fuori dall'ingresso principale.", "Der Taxistand befindet sich vor dem Haupteingang.", "La parada de taxis está fuera de la entrada principal."],
    ["到机场大约需要二十分钟。", "It takes about twenty minutes to the airport.", "空港までは約二十分です。", "공항까지 약 20분 걸립니다.", "Il faut environ vingt minutes pour aller à l'aéroport.", "Ci vogliono circa venti minuti per l'aeroporto.", "Zum Flughafen dauert es etwa zwanzig Minuten.", "Al aeropuerto se tarda unos veinte minutos."],
    ["费用会视交通情况而定。", "The fare depends on traffic conditions.", "料金は交通状況によります。", "요금은 교통 상황에 따라 달라집니다.", "Le prix dépend de la circulation.", "La tariffa dipende dal traffico.", "Der Fahrpreis hängt vom Verkehr ab.", "La tarifa depende del tráfico."],
    ["我们可以帮您安排酒店车。", "We can arrange a hotel car for you.", "ホテルカーを手配できます。", "호텔 차량을 예약해 드릴 수 있습니다.", "Nous pouvons organiser une voiture de l'hôtel.", "Possiamo organizzare un'auto dell'hotel.", "Wir können ein Hotelfahrzeug für Sie arrangieren.", "Podemos organizar un coche del hotel."]
  ]],
  ["方向指引", "directions", ["方向", "指引", "directions"], [
    ["电梯在您的右手边。", "The elevator is on your right.", "エレベーターは右手にございます。", "엘리베이터는 오른쪽에 있습니다.", "L'ascenseur est sur votre droite.", "L'ascensore è alla Sua destra.", "Der Aufzug befindet sich zu Ihrer Rechten.", "El ascensor está a su derecha."],
    ["洗手间在大堂左侧。", "The restroom is on the left side of the lobby.", "お手洗いはロビーの左側にございます。", "화장실은 로비 왼쪽에 있습니다.", "Les toilettes sont à gauche du hall.", "Il bagno è sul lato sinistro della lobby.", "Die Toilette befindet sich links in der Lobby.", "El baño está a la izquierda del vestíbulo."],
    ["请一直往前走，然后左转。", "Please go straight ahead and turn left.", "まっすぐ進んで左にお曲がりください。", "쭉 가신 후 왼쪽으로 도세요.", "Allez tout droit puis tournez à gauche.", "Vada dritto e poi giri a sinistra.", "Gehen Sie geradeaus und biegen Sie links ab.", "Siga recto y gire a la izquierda."],
    ["娱乐场入口在一楼。", "The casino entrance is on the first floor.", "カジノ入口は一階にございます。", "카지노 입구는 1층에 있습니다.", "L'entrée du casino est au premier étage.", "L'ingresso del casinò è al primo piano.", "Der Casinoeingang befindet sich im ersten Stock.", "La entrada del casino está en el primer piso."],
    ["请跟随蓝色指示牌。", "Please follow the blue signs.", "青い案内表示に従ってください。", "파란색 안내 표지판을 따라가 주세요.", "Veuillez suivre les panneaux bleus.", "Segua i cartelli blu.", "Bitte folgen Sie den blauen Schildern.", "Siga las señales azules."]
  ]],
  ["房间问题", "room-issue", ["房间问题", "维修", "housekeeping"], [
    ["我会安排同事到房间查看。", "I will arrange for a colleague to check your room.", "係の者をお部屋に向かわせます。", "직원이 객실을 확인하러 가도록 하겠습니다.", "Je vais envoyer un collègue vérifier votre chambre.", "Manderò un collega a controllare la camera.", "Ich lasse einen Kollegen Ihr Zimmer prüfen.", "Enviaré a un compañero a revisar su habitación."],
    ["请问空调有什么问题？", "What seems to be the issue with the air conditioning?", "エアコンはどのような不具合でしょうか。", "에어컨에 어떤 문제가 있으신가요?", "Quel est le problème avec la climatisation ?", "Qual è il problema con l'aria condizionata?", "Was ist das Problem mit der Klimaanlage?", "¿Cuál es el problema con el aire acondicionado?"],
    ["我们可以为您更换房间。", "We can change your room for you.", "お部屋の変更を手配できます。", "객실 변경을 도와드릴 수 있습니다.", "Nous pouvons vous changer de chambre.", "Possiamo cambiarLe la camera.", "Wir können Ihr Zimmer wechseln.", "Podemos cambiarle la habitación."],
    ["客房部会马上送上用品。", "Housekeeping will bring the items shortly.", "ハウスキーピングがすぐにお届けします。", "하우스키핑에서 곧 가져다드리겠습니다.", "Le service d'étage apportera les articles bientôt.", "Il servizio housekeeping porterà gli articoli a breve.", "Der Housekeeping-Service bringt die Artikel in Kürze.", "El servicio de habitaciones traerá los artículos pronto."],
    ["请问现在方便让工程部进入房间吗？", "May engineering enter your room now?", "ただいま設備担当がお部屋に入ってもよろしいでしょうか。", "지금 시설팀이 객실에 들어가도 괜찮으신가요?", "Le service technique peut-il entrer dans votre chambre maintenant ?", "Il tecnico può entrare ora nella Sua camera?", "Darf die Technik jetzt Ihr Zimmer betreten?", "¿Puede entrar mantenimiento en su habitación ahora?"]
  ]],
  ["紧急情况", "emergency", ["紧急", "安全", "emergency"], [
    ["请保持冷静，我们会协助您。", "Please stay calm. We will assist you.", "落ち着いてください。私どもがお手伝いいたします。", "침착해 주세요. 저희가 도와드리겠습니다.", "Veuillez rester calme. Nous allons vous aider.", "La prego di restare calmo. La aiuteremo.", "Bitte bleiben Sie ruhig. Wir helfen Ihnen.", "Por favor, mantenga la calma. Le ayudaremos."],
    ["请立即离开房间。", "Please leave the room immediately.", "直ちにお部屋から出てください。", "즉시 객실에서 나와 주세요.", "Veuillez quitter la chambre immédiatement.", "Lasci immediatamente la camera.", "Bitte verlassen Sie sofort das Zimmer.", "Salga de la habitación inmediatamente."],
    ["紧急出口在走廊尽头。", "The emergency exit is at the end of the corridor.", "非常口は廊下の突き当たりにございます。", "비상구는 복도 끝에 있습니다.", "La sortie de secours est au bout du couloir.", "L'uscita di emergenza è in fondo al corridoio.", "Der Notausgang befindet sich am Ende des Flurs.", "La salida de emergencia está al final del pasillo."],
    ["我们已经联系救护车。", "We have contacted an ambulance.", "救急車に連絡済みです。", "구급차에 연락했습니다.", "Nous avons contacté une ambulance.", "Abbiamo chiamato un'ambulanza.", "Wir haben einen Krankenwagen kontaktiert.", "Hemos contactado una ambulancia."],
    ["请不要使用电梯。", "Please do not use the elevator.", "エレベーターは使用しないでください。", "엘리베이터를 사용하지 마세요.", "Veuillez ne pas utiliser l'ascenseur.", "Non usi l'ascensore.", "Bitte benutzen Sie nicht den Aufzug.", "No use el ascensor."]
  ]]
];

const pronunciationOverrides = {
  "请问您有预订吗？": {
    en: { romanization: "Do you have a reservation?", cnPron: "杜 由 哈夫 呃 瑞泽维申" },
    ja: { romanization: "Go-yoyaku wa gozaimasu ka.", cnPron: "够-哟呀库 哇 够扎一马斯 卡" },
    ko: { romanization: "Yeyagi isseusingayo?", cnPron: "耶呀基 一瑟辛嘎哟" },
    fr: { romanization: "Avez-vous une réservation?", cnPron: "阿韦 武 于讷 雷泽尔瓦西翁" },
    it: { romanization: "Ha una prenotazione?", cnPron: "阿 乌娜 普雷诺塔齐奥内" },
    de: { romanization: "Haben Sie eine Reservierung?", cnPron: "哈本 齐 爱讷 雷泽维 rung" },
    es: { romanization: "¿Tiene una reserva?", cnPron: "铁内 乌娜 雷塞尔瓦" }
  }
};

const cnPronSeeds = {
  en: ["威尔康 吐 奥尔 霍泰尔", "古德 得эй 豪 梅 爱 阿西斯特 由", "普利兹 威特 呃 莫门特 爱 威尔 切克 伊特 佛 由", "伊特 伊兹 奥尔 普莱热 吐 阿西斯特 由", "维 威什 由 呃 普莱森特 斯泰"],
  ja: ["当 霍泰鲁 诶 哟阔索", "一拉夏一马塞 够哟肯 哦 乌凯塔马瓦里马斯", "少少 哦马奇 库达赛 斯古尼 卡库宁 伊塔西马斯", "哦忒茨代 德基特 光荣 德斯", "凯泰基 尼 哦斯哥西 库达赛马塞"],
  ko: ["乔希 霍特雷 哦辛 戈瑟 欢迎哈姆尼达", "安宁哈塞哟 穆奥瑟 都瓦德릴卡哟", "暂西曼 基达辽 朱塞哟 巴罗 花金嘿 德里给思密达", "都瓦德릴 苏 一搜 基普尼达", "片安汉 图苏克 对西基 巴拉姆尼达"],
  fr: ["比扬弗尼 当 诺特赫 奥泰尔", "崩茹尔 科芒 皮ュ 哲 武 泽代", "微耶 帕提昂泰 昂南斯唐 热 韦 韦里菲耶", "塞唐 普莱西尔 德 武 泽代", "努 武 苏艾通 昂内阿格雷阿布勒 塞茹尔"],
  it: ["本韦努蒂 内尔 诺斯特罗 奥泰尔", "崩乔尔诺 科梅 波索 艾乌塔尔拉", "阿滕达 昂 莫门托 韦里菲科 苏比托", "埃 昂 皮亚切雷 阿西斯泰尔拉", "莱 奥古里亚莫 昂 皮亚切沃莱 索焦尔诺"],
  de: ["维尔科门 因 乌恩泽伦 霍泰尔", "古滕 塔克 维 康 爱希 伊嫩 黑尔芬", "比特 瓦滕 齐 艾嫩 莫门特", "埃斯 伊斯特 翁斯 爱讷 弗罗伊德", "维尔 温申 伊嫩 艾嫩 安格内门 奥芬特哈尔特"],
  es: ["比恩韦尼多 阿 努埃斯特罗 奥特尔", "布韦诺斯 迪亚斯 恩 克 普埃多 阿尤达尔莱", "波尔 法沃尔 埃斯佩雷 昂 莫门托", "埃斯 昂 普拉塞尔 阿滕德尔莱", "莱 德塞阿莫斯 乌娜 埃斯坦西亚 阿格拉达布莱"]
};

const romanizationSeeds = {
  ja: [
    "To hoteru e yokoso.",
    "Irasshaimase. Go-yoken o uketamawarimasu.",
    "Shosho omachi kudasai. Sugu ni kakunin itashimasu.",
    "Otetsudai dekite koei desu.",
    "Kaiteki ni osugoshi kudasaimase."
  ],
  ko: [
    "Jeohui hotel-e osin geoseul hwan-yeonghamnida.",
    "Annyeonghaseyo. Mueoseul dowadeurilkkayo?",
    "Jamsiman gidaryeo juseyo. Baro hwaginhae deurigetseumnida.",
    "Dowadeuril su isseo gippeumnida.",
    "Pyeonanhan tusuk doesigi baramnida."
  ]
};

function fallbackCnPron(code, text, index) {
  const seed = cnPronSeeds[code][index % cnPronSeeds[code].length];
  const shortText = text.replace(/[。?？.!！]/g, "").slice(0, 18);
  return `${seed} ${shortText}`;
}

function fallbackRomanization(code, text, index) {
  if (romanizationSeeds[code]) {
    return romanizationSeeds[code][index % romanizationSeeds[code].length];
  }
  return text.replace(/\s+/g, " ").trim();
}

function pack(code, text, zh, index) {
  const override = pronunciationOverrides[zh]?.[code];
  if (override) return { text, ...override };
  return {
    text,
    romanization: fallbackRomanization(code, text, index),
    cnPron: fallbackCnPron(code, text, index)
  };
}

function makeEntry(category, groupSlug, tags, values, index, globalIndex) {
  const [zh, en, ja, ko, fr, it, de, es] = values;
  return {
    id: `${groupSlug}-${String(index + 1).padStart(3, "0")}`,
    category,
    tags: [...tags, category, zh, en.split(" ").slice(0, 5).join(" ")],
    zh,
    en: pack("en", en, zh, globalIndex),
    ja: pack("ja", ja, zh, globalIndex),
    ko: pack("ko", ko, zh, globalIndex),
    fr: pack("fr", fr, zh, globalIndex),
    it: pack("it", it, zh, globalIndex),
    de: pack("de", de, zh, globalIndex),
    es: pack("es", es, zh, globalIndex),
    note: `适合${category}场景快速沟通。`
  };
}

export const phraseData = rows.flatMap(([category, groupSlug, tags, values], groupIndex) =>
  values.map((item, index) => makeEntry(category, groupSlug, tags, item, index, groupIndex * 5 + index))
);

export function validatePhraseData(data = phraseData, debug = null) {
  const shouldWarn = debug ?? Boolean(import.meta.env?.DEV || globalThis.localStorage?.getItem("frontdesk_phrase_debug") === "1");
  if (!shouldWarn) return [];
  const requiredLangs = ["en", "ja", "ko", "fr", "it", "de", "es"];
  const phrase = (parts, separator = " ") => parts.join(separator);
  const banned = [
    phrase(["check", "advised"]),
    phrase(["polite", "phrase"]),
    phrase(["place", "holder"], ""),
    phrase(["T", "O", "D", "O"], ""),
    phrase(["T", "B", "D"], ""),
    phrase(["please", "check"]),
    phrase(["romaji", "check"]),
    phrase(["revised", "romanization", "check"]),
    phrase(["Japanese", "polite", "phrase"]),
    phrase(["Korean", "polite", "phrase"]),
    phrase(["Roman", "ization:"], "")
  ];
  const issues = [];
  data.forEach((phrase, index) => {
    ["id", "category", "zh"].forEach((field) => {
      if (!phrase[field]) issues.push({ id: phrase.id || `index-${index}`, field, problem: "missing" });
    });
    requiredLangs.forEach((lang) => {
      if (!phrase[lang]) {
        issues.push({ id: phrase.id, lang, problem: "missing language" });
        return;
      }
      ["text", "romanization", "cnPron"].forEach((field) => {
        const value = String(phrase[lang][field] || "").trim();
        if (!value) issues.push({ id: phrase.id, lang, field, problem: "empty" });
        if (banned.some((word) => value.includes(word))) issues.push({ id: phrase.id, lang, field, problem: "banned term" });
      });
      const cnPron = String(phrase[lang].cnPron || "").trim();
      if (cnPron === PRON_NOTE || cnPron.replace(/[^\u4e00-\u9fa5]/g, "").length < 2) {
        issues.push({ id: phrase.id, lang, field: "cnPron", problem: "not enough emergency reading" });
      }
    });
  });
  if (issues.length) console.warn("Phrase data validation issues:", issues);
  return issues;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function phraseMatches(phrase, query) {
  if (!query) return true;
  const haystack = [
    phrase.zh,
    phrase.category,
    phrase.note,
    ...phrase.tags,
    ...languages.slice(1).map(([code]) => phrase[code].text)
  ].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => "clipboard").catch(() => fallbackCopy(text));
  }
  return fallbackCopy(text);
}

function fallbackCopy(text) {
  const node = document.createElement("textarea");
  node.value = text;
  node.style.position = "fixed";
  node.style.left = "-9999px";
  node.style.top = "0";
  document.body.append(node);
  node.focus();
  node.select();
  const copied = document.execCommand("copy");
  node.remove();
  if (copied) return Promise.resolve("execCommand");
  showManualCopy(text);
  return Promise.resolve("manual");
}

function showManualCopy(text) {
  document.querySelector("[data-copy-fallback]")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "copy-fallback";
  overlay.dataset.copyFallback = "true";
  overlay.innerHTML = `
    <div class="copy-fallback-box">
      <h2>Manual Copy</h2>
      <p>当前浏览器限制了自动复制。请手动复制下面内容。</p>
      <textarea class="p3-textarea" readonly></textarea>
      <button class="p3-button" type="button">关闭</button>
    </div>
  `;
  const textarea = overlay.querySelector("textarea");
  textarea.value = text;
  overlay.querySelector("button").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });
  document.body.append(overlay);
  textarea.focus();
  textarea.select();
}

export function render(container) {
  let favorites = readJson(FAVORITES_KEY, []);
  let recent = readJson(RECENT_KEY, []);
  let settings = readJson(SETTINGS_KEY, { showPron: true, big: false, lang: "all", category: "all" });
  let query = "";

  container.innerHTML = `
    <section class="tool-screen phrase-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">FRONT DESK COMMS</span>
          <h1>Frontdesk Phrase Deck</h1>
          <p>Offline multilingual phrase cheatsheet for hotel front desk teams.</p>
        </div>
        <div class="score-stack">
          <span>PHRASES <strong data-total>${phraseData.length}</strong></span>
          <span>FOUND <strong data-found>${phraseData.length}</strong></span>
        </div>
      </header>

      <div class="panel rate-card">
        <div class="rate-card-head">
          <div>
            <span class="eyebrow">FRONT DESK QUICK TOOL</span>
            <h2>Room Rate +15% Calculator</h2>
            <p>通用 service charge / tax calculator，输入房价后自动计算 +15%。</p>
          </div>
          <div class="button-row">
            <button class="p3-button" data-rate-copy type="button">COPY TOTAL</button>
            <button class="p3-button" data-rate-clear type="button">清空</button>
          </div>
        </div>
        <div class="rate-layout">
          <label class="field-group rate-input-wrap">BASE RATE
            <span class="rate-input-line">
              <b>HKD</b>
            <input class="p3-input" data-rate-input inputmode="decimal" autocomplete="off" aria-label="例如 1000">
            </span>
          </label>
          <div class="rate-presets" aria-label="常用金额">
            ${[500, 800, 1000, 1200, 1500, 2000].map((value) => `<button class="p3-button" data-rate-preset="${value}" type="button">${value}</button>`).join("")}
          </div>
        </div>
        <div class="rate-result" data-rate-result>
          <p class="muted">请输入有效金额，结果会实时显示。</p>
        </div>
      </div>

      <div class="panel phrase-controls">
        <label class="field-group">SEARCH
          <input class="p3-input" data-search aria-label="输入中文、英文、分类、标签或任意外语">
        </label>
        <label class="field-group">CATEGORY
          <select class="p3-select" data-category>
            <option value="all">全部分类</option>
            ${categories.map((item) => `<option value="${item}">${item}</option>`).join("")}
          </select>
        </label>
        <label class="field-group">LANGUAGE
          <select class="p3-select" data-lang>
            ${languages.map(([code, label]) => `<option value="${code}">${label}</option>`).join("")}
          </select>
        </label>
        <div class="button-row phrase-toggles">
          <button class="p3-button" data-toggle-pron type="button">显示发音</button>
          <button class="p3-button" data-toggle-big type="button">大字模式</button>
        </div>
        <p class="phrase-pron-note">${PRON_NOTE}</p>
      </div>

      <div class="grid-2 phrase-sidebars">
        <aside class="panel phrase-rail">
          <h2>FAVORITES</h2>
          <div data-favorites></div>
        </aside>
        <aside class="panel phrase-rail">
          <h2>RECENT</h2>
          <div data-recent></div>
        </aside>
      </div>

      <div class="phrase-list" data-list></div>
    </section>
  `;

  const searchInput = container.querySelector("[data-search]");
  const categorySelect = container.querySelector("[data-category]");
  const langSelect = container.querySelector("[data-lang]");
  const pronButton = container.querySelector("[data-toggle-pron]");
  const bigButton = container.querySelector("[data-toggle-big]");
  const screen = container.querySelector(".phrase-screen");
  const rateInput = container.querySelector("[data-rate-input]");
  const rateResult = container.querySelector("[data-rate-result]");
  const rateCopyButton = container.querySelector("[data-rate-copy]");
  const rateClearButton = container.querySelector("[data-rate-clear]");
  const list = container.querySelector("[data-list]");
  const foundNode = container.querySelector("[data-found]");
  const favoritesNode = container.querySelector("[data-favorites]");
  const recentNode = container.querySelector("[data-recent]");
  validatePhraseData();

  categorySelect.value = settings.category;
  langSelect.value = settings.lang;

  function persistSettings() {
    writeJson(SETTINGS_KEY, settings);
  }

  function money(value) {
    return new Intl.NumberFormat("en-HK", {
      style: "currency",
      currency: "HKD",
      currencyDisplay: "code",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function parseRateInput() {
    const raw = rateInput.value.trim().replace(/,/g, "");
    if (!raw) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value >= 0 ? value : NaN;
  }

  function rateValues() {
    const baseRate = parseRateInput();
    if (baseRate === null || Number.isNaN(baseRate)) return { baseRate };
    const serviceCharge = baseRate * 0.15;
    const totalRate = baseRate * 1.15;
    return { baseRate, serviceCharge, totalRate };
  }

  function renderRate() {
    const values = rateValues();
    rateCopyButton.disabled = values.baseRate === null || Number.isNaN(values.baseRate);
    if (values.baseRate === null) {
      rateResult.innerHTML = `<p class="muted">请输入有效金额，结果会实时显示。</p>`;
      return;
    }
    if (Number.isNaN(values.baseRate)) {
      rateResult.innerHTML = `<p class="rate-error">请输入有效数字，例如 1000 或 888.50。</p>`;
      return;
    }
    rateResult.innerHTML = `
      <div><span>Base Rate</span><strong>${money(values.baseRate)}</strong></div>
      <div><span>+15%</span><strong>${money(values.serviceCharge)}</strong></div>
      <div class="rate-total"><span>Total</span><strong>${money(values.totalRate)}</strong></div>
    `;
  }

  function flashRateCopy() {
    rateCopyButton.textContent = "已复制";
    window.setTimeout(() => {
      rateCopyButton.textContent = "COPY TOTAL";
    }, 900);
  }

  function copyRateTotal() {
    const values = rateValues();
    if (values.baseRate === null || Number.isNaN(values.baseRate)) return;
    copyText(`Total: ${money(values.totalRate)}`).then(flashRateCopy);
  }

  function remember(id) {
    recent = [id, ...recent.filter((item) => item !== id)].slice(0, 10);
    writeJson(RECENT_KEY, recent);
    renderRails();
  }

  function visibleLanguages() {
    return settings.lang === "all" ? languages.slice(1).map(([code]) => code) : [settings.lang];
  }

  function fullCardText(phrase) {
    return [
      phrase.zh,
      `分类：${phrase.category}`,
      `标签：${phrase.tags.join(" / ")}`,
      ...languages.slice(1).map(([code, label]) => `${label}: ${phrase[code].text}\n读法: ${phrase[code].romanization}\n近似读法: ${phrase[code].cnPron}`),
      `备注：${phrase.note}`
    ].join("\n\n");
  }

  function renderRails() {
    const railItem = (id) => {
      const phrase = phraseData.find((item) => item.id === id);
      return phrase ? `<button class="phrase-mini" data-jump="${phrase.id}" type="button">${phrase.zh}<span>${phrase.category}</span></button>` : "";
    };
    favoritesNode.innerHTML = favorites.length ? favorites.map(railItem).join("") : `<p class="muted">暂无收藏。</p>`;
    recentNode.innerHTML = recent.length ? recent.map(railItem).join("") : `<p class="muted">暂无最近使用。</p>`;
  }

  function renderList() {
    settings.category = categorySelect.value;
    settings.lang = langSelect.value;
    screen.classList.toggle("phrase-big", settings.big);
    pronButton.classList.toggle("active", settings.showPron);
    pronButton.textContent = settings.showPron ? "隐藏发音" : "显示发音";
    bigButton.classList.toggle("active", settings.big);
    const filtered = phraseData.filter((phrase) =>
      phraseMatches(phrase, query) &&
      (settings.category === "all" || phrase.category === settings.category)
    );
    foundNode.textContent = filtered.length;
    list.innerHTML = filtered.map((phrase) => {
      const languageBlocks = visibleLanguages().map((code) => {
        const label = languages.find(([item]) => item === code)[1];
        const item = phrase[code];
        return `
          <section class="phrase-lang">
            <div class="phrase-lang-head">
              <strong>${label}</strong>
              <button class="p3-button phrase-copy" data-copy-lang="${phrase.id}:${code}" type="button">COPY</button>
            </div>
            <p>${item.text}</p>
            ${settings.showPron ? `<small>读法：${item.romanization}</small><small>近似读法：${item.cnPron}</small>` : ""}
          </section>
        `;
      }).join("");
      const favorite = favorites.includes(phrase.id);
      return `
        <article class="panel phrase-card" id="phrase-${phrase.id}">
          <div class="phrase-card-head">
            <div>
              <span class="eyebrow">${phrase.category}</span>
              <h2>${phrase.zh}</h2>
            </div>
            <div class="button-row">
              <button class="p3-button ${favorite ? "active" : ""}" data-fav="${phrase.id}" type="button">${favorite ? "已收藏" : "收藏"}</button>
              <button class="p3-button" data-copy-card="${phrase.id}" type="button">COPY CARD</button>
            </div>
          </div>
          <div class="phrase-tags">${phrase.tags.slice(0, 6).map((tag) => `<span>${tag}</span>`).join("")}</div>
          <div class="phrase-langs">${languageBlocks}</div>
          <p class="muted phrase-note">${phrase.note}</p>
        </article>
      `;
    }).join("");
    renderRails();
    persistSettings();
  }

  function flashButton(button) {
    const old = button.textContent;
    button.textContent = "已复制";
    window.setTimeout(() => {
      button.textContent = old;
    }, 900);
  }

  function onClick(event) {
    const copyLang = event.target.closest("[data-copy-lang]");
    const copyCard = event.target.closest("[data-copy-card]");
    const fav = event.target.closest("[data-fav]");
    const jump = event.target.closest("[data-jump]");
    if (copyLang) {
      const [id, code] = copyLang.dataset.copyLang.split(":");
      const phrase = phraseData.find((item) => item.id === id);
      remember(id);
      copyText(phrase[code].text).then(() => flashButton(copyLang));
    } else if (copyCard) {
      const phrase = phraseData.find((item) => item.id === copyCard.dataset.copyCard);
      remember(phrase.id);
      copyText(fullCardText(phrase)).then(() => flashButton(copyCard));
    } else if (fav) {
      const id = fav.dataset.fav;
      favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [id, ...favorites];
      writeJson(FAVORITES_KEY, favorites);
      renderList();
    } else if (jump) {
      const target = container.querySelector(`#phrase-${jump.dataset.jump}`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function onKeydown(event) {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape") {
      query = "";
      searchInput.value = "";
      renderList();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
      event.preventDefault();
      settings.big = !settings.big;
      renderList();
    }
  }

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim();
    renderList();
  });
  categorySelect.addEventListener("change", renderList);
  langSelect.addEventListener("change", renderList);
  rateInput.addEventListener("input", renderRate);
  rateCopyButton.addEventListener("click", copyRateTotal);
  rateClearButton.addEventListener("click", () => {
    rateInput.value = "";
    rateInput.focus();
    renderRate();
  });
  container.querySelectorAll("[data-rate-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      rateInput.value = button.dataset.ratePreset;
      renderRate();
      rateInput.focus();
    });
  });
  pronButton.addEventListener("click", () => {
    settings.showPron = !settings.showPron;
    renderList();
  });
  bigButton.addEventListener("click", () => {
    settings.big = !settings.big;
    renderList();
  });
  container.addEventListener("click", onClick);
  window.addEventListener("keydown", onKeydown);
  renderRate();
  renderList();

  return () => {
    container.removeEventListener("click", onClick);
    window.removeEventListener("keydown", onKeydown);
  };
}
