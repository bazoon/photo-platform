import React, {useEffect, useState} from "react";
import {asyncGet} from "../../core/api";

export default function Main() {
  const [text, setText] = useState({__html: ""});

  const loadFailed = e => {
    console.log(e);
  };

  const loadOk = d => {
    setText({__html: d.text});
  };

  const load = () => {
    // asyncGet("api/about-notmagic").fork(loadFailed, loadOk);
  };


  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container pl-20 pr-20 w-3/4 flex flex-col items-center bg-bright">
    <h1 className="text-7xl mb-5">Положение</h1>
    <h2 className="text-center">о проведении II международного творческого конкурса #НеМагия</h2>
    
    <div>

    <h3> 1. Общие положения</h3>
    <p>
    1.1. Настоящее положение о творческом конкурсе «#НеМагия» (далее - Конкурс) определяет цели, задачи, участников
    Конкурса, порядок организации и проведения, требования, предъявляемые к творческим работам, критерии оценки работ,
    порядок определения победителей и призеров, награждение участников.
    </p>
    <p>
    1.2. Вся официальная информация о Конкурсе,
    включая настоящее Положение, открытое интернет-голосование, информация о победителях размещается на сайте
    https://www.global-sti.com , группе ВК https://vk.com/global_sti. Официальный сайт конкурса http://notmagic.ru 1.3.
    Конкурс проводится в рамках общественного содействия исполнению Указа Президента Российской Федерации о проведении
    Года науки и технологий № 812 от 25 декабря 2020 года при поддержки гранта Губернатора Тюменской области.
    </p>
    <p>
    <h3> 2. Цель и задачи Конкурса</h3>
    <p>
    2.1. Миссия конкурса - с помощью творческих форматов, генерируемых креативными и культурными
    индустриями рассказать о том, как новые технологии и инновации меняют жизнь человека к лучшему и решают социальные
    проблемы. 
    </p>
    <p>
    2.2. Тема конкурса в 2022 году – здоровье населения и влияние технологических инноваций в сфере медицины,
    фармацевтики, ЗОЖ, профилактики заболеваний на это.
    </p>
    <p>
    2.2. Цель Конкурса: •Популяризация идей научно-технического
    прогресса и программы Национальная технологическая инициатива (НТИ) в обществе •Формирование позитивного восприятия
    новых технологий у всех слоев населения •Объединение интересов общественных организаций регионов России и
    Казахстана. •Продвижение повестки объединенного движения общественников российско-казахстанского
    приграничья.•Привлечение внимания СМИ, органов власти, бизнес структур и граждан к успешным кейсам применения новых
    технологий и инноваций для решения социальных задач
    </p>
    <p>
    2.3. Основными задачами Конкурса являются: •развитие творческого
    потенциала детей и взрослых;•раскрытие индивидуальных творческих способностей каждого человека;•снятие
    психологических барьеров восприятия новых технологий и инноваций; •воспитание в людях интереса к инновациям,
    образованию и просвещению;•стимулирование познавательных интересов;•привлечение талантливых людей к творчеству.
    </p>
    <p>
    <h3>3. Участники Конкурса</h3>
    <p>
    3.1. К участию в Конкурсе приглашаются граждане Российской Федерации, Республики Казахстан и
    других государств без возрастных и иных ограничений.
    </p>
    <p>
    3.2. Участником конкурса может стать как один человек, так и
    группа лиц (объединения участников).
    </p>   
    <h3>4. Условия Конкурса </h3>
    4.1. Главным условием участия в конкурсе является то, что
    конкурсные работы должны быть посвящены инновациям, технологиям и изобретениям в сферах обозначенных в п. 2.2.
    настоящего Положения. 
    </p>
    <p>
    4.2. Конкурс проводится по следующим номинациям: Реклама и PR. Плакаты, а также такие формы
    рекламы, как флаэры, листовки, коллажи, афиши, т.д., варианты наружной рекламы, за исключением электронных и
    связанные с темой, целями и задачами конкурса. Изобразительное искусство. Рисунки, выполненные в любой технике, а
    также в смешанных техниках, за исключением коллажей, связанные с темой, целями и задачами конкурса .Фотография.
    Цветные и черно-белые фотографические цифровые изображения, за исключением фотограмм и коллажей, связанные с темой,
    целями и задачами конкурса.Мультимедиа. Работы, выполненные в компьютерной графике и анимации
    (мультипликации),тематический видеоряд, связанный с темой, целями и задачами конкурса не дольше 3х минут,связанные с
    целями и задачами конкурса. 
    </p>

    <h3>5. Требования к конкурсным работам</h3>
    <p>
    5.1. Организаторы оставили право выбора формы,
    структуры и виды конкурсной работы самим участникам, чтобы не ограничивать возможные креативные форматы, идеи и
    находки. 
    </p>
    <p>
    5.2. На конкурс принимаются работы, как созданные специально для участия в нем, так и работы, созданные
    участниками ранее, если они соответствуют тематике конкурса.
    </p>
    <p>
    5.3. Организаторы просят участников соблюдать только
    основные рекомендации:•В поданных работах не должно быть элементов, связанных с нарушением техники
    безопасности;•Работы должны соответствовать этическим нормам и действующему законодательству стран -
    организаторов;•Продолжительность одной видео- или любой мультимедийной работы не более 3 минут. 
    </p>
    <p>
    5.4. Приоритетными
    направлениями конкурсных работ с точки зрения их содержания является популяризация инновационный технологий и
    решений в следующих сферах: •VR (технологии виртуальной реальности) – включенная коммуникация, совместные
    виртуальные творческие пространства, коммуникационные пространства, образовательные пространства с полным
    погружением;•Сервисные роботы, роботы аватары (роботы телеприсутствия), домашние специализированные
    роботы;•Технологии умного дома;•Технические средства мониторинга состояния здоровья;•Подтвержденные биотехнологии
    (питание – производство и хранение продуктов, мониторинг здоровья, биохакинг и т.д.);•Искусственный интеллект и
    цифровые технологии. Цифровые помощники.
    </p>
    <p>
    5.5. С целью облегчения творческой работы участников организаторы размещают
    на официальном сайте конкурса примеры кейсов успешных инноваций в социальной сфере, которые могут стать темами
    работ. Этот список носит рекомендательный характер и не является исчерпывающим.
    </p>
    <p>
    5.6. Технические требования к работам
    в каждой из номинаций указаны в Правилах конкурса, которые размещены на официальном сайте http://notmagic.ru 
    </p>
    <h3>6. Требования к участникам:</h3>
    6.1. Для участия в конкурсе участнику или представителю участника необходимо подписаться в
    группу ВК https://vk.com/global_sti и зарегистрироваться на сайте http://notmagic.ru 6.2. Заявку на участие
    необходимо оформить на официальном сайте конкурса http://notmagic.ru , заполнив все обязательные поля и прикрепив
    конкурсную работу в установленном в формате.
    </p>
    <h3>7. Порядок и сроки проведения Конкурса</h3>
    <p>
    7.1. Сроки проведения Конкурса: с 01 февраля 2022 года по 17 мая 2022 года.
    </p>
    <p>
    7.2.Работы принимаются до 15 апреля 2022 г. включительно.
    </p>
    <p>
    7.3. Оценка работ и определение победителей. Оценка конкурсных работ проходит в два этапа:
    </p>
    <p>
    7.3.1. Открытое голосование и формирование
    лонг-листа. После окончания приема работ все они по номинациям с 15 апреля по 01 мая 2022 года размещаются в
    открытом доступе на сайте конкурса, где проходит открытое голосование. По его итогам отбираются 15 лучших работ в
    каждой номинации. 
    </p>
    <p>
    7.3.2. Работа жюри из числа экспертов – журналистов, представителей культурных и креативных
    индустрий, общественных организаций и научного сообщества. Жюри оценивает работы по следующим критериям:
    •Соответствие работы тематике конкурса;•Авторское воплощение тематики Конкурса (выраженность основной
      идеи);•Оригинальность и творческий подход к иллюстрированному раскрытию темы;•Качество и сложность технического
  исполнения работы;•Безопасность и комфортность;•Гуманность.На основании независимой оценки жюри конкурса выбирает по
  три лучшие работы в каждой номинации, присваивая им соответственно первое, второе и третье места – победителей
  конкурса. 
    </p>
    <p>
    7.4. Итоги Конкурса будут подведены 17 мая 2022 года на торжественном мероприятии, приуроченном к Всемирному
  дню информационного общества (World Telecommunication and Information Society Day) учреждёному резолюцией Генеральной
  Ассамблеи ООН (№A/RES/60/252).
    </p>
    <p>
    7.5. По итогам конкурса будет организована виртуальная (ЗД) выставка победителей и
  призеров конкурса.
    </p>
    <h3>8. Награждение победителей Конкурса</h3>
    <p>
    8.1. Награждение победителей Конкурса осуществляется дипломами и
  сертификатами участника для авторов работ, вошедших в лонг-лист конкурса.
    </p>
    <p>
    8.2. Участники, чьи работы заняли призовые
  места в каждой номинации награждаются ценными призами от партнеров конкурса, их работы размещаются в СМИ, медиа и
  рекламно-информационных ресурсах партнеров конкурса с указанием авторства и благодарностью. 
    </p>
    <h3>9. Авторские права</h3>
    <p>
    9.1.
    Ответственность за соблюдение авторских прав работы, участвующей в Конкурсе, несет автор, приславший данную работу
  на Конкурс. 
    </p>
    <p>
    9.2. Присылая свою работу на конкурс, автор автоматически дает право организаторам Конкурса на
  использование присланного материала (размещение в сети интернет, участие в творческих проектах и т. п.).
    </p>
    <p>
    9.3. В случае
  необходимости, организаторы Конкурса могут запросить у автора оригинал работы.
    </p>
    <p>
    9.4. Участники Конкурса дают свое
  согласие на обработку своих персональных данных: фамилии, имени, отчества, года и места рождения, почтового адреса,
    абонентского номера, адресов электронной почты, сведений о профессии и иных персональных данных, сообщенных
  участником конкурса. 
    </p>
    <p>
    9.5. Представленные работы возврату не подлежат.
    </p>
    <h3>10. Организационный комитет</h3>
    <p>
    10.1. Общее
  руководство организацией и проведением Конкурса, а также работа с партнерами, информационное сопровождение и
  формирование призового фонда конкурса осуществляется Оргкомитетом.
    </p>
    <p>
    10.2. Оргкомитет Конкурса формируется из числа
  представителей организаторов конкурса.
    </p>
    <p>
    10.3. Юридическим оператором (управляющим) конкурса является Автономная
  некоммерческая организация Центр поддержки и развития общественного самоуправления «Живой город» (Российская
    Федерация).
    </p>
    <p>
    10.4. Техническим оператором Конкурса является АНО « Тюменский Дом Фотографии», реализующая конкурс на
  многопрофильной платформе «Т.Vision 2030».
    </p>
    <h3>11. Организаторы конкурса</h3>
    <p>
    11.1. Со стороны Российской Федерации: •Тюменское
  региональное общественное движение «Альянс социально ориентированных НКО» •Тюменский областной совет Всероссийского
  общества изобретателей и рационализаторов •Экспертный клуб «Урал – Евразия» 
    </p>
    <p>
    11.2. Со стороны Республики
  Казахстан:•Общественный фонд «Гражданский Альянс Костанайской области «ГрИн» •Объединение юридических лиц «Гражданский
  Альянс Восточно-Казахстанской области».
    </p>
    <h3>12. Партнеры конкурса</h3>
    <p>
    12.1. Органы власти и государственные учреждения:
  •Департамент информатизации Тюменской области•Департамент культуры Тюменской области•Департамент социального развития
  Тюменской области•Региональный информационно-образовательный центр Тюменской области•Департамент экономики и
  стратегического развития Администрации города Тюмени•Торгово-промышленная палата Тюменской области•Управление
  Роспотребнадзора по Тюменской области•Региональный центр «Семья»
    </p>
    <p>
    12.2. СМИ и медиа: •Газета Общественной палаты
  Тюменской области «Гражданская трибуна»•Деловой журнал TMN•Журнал «Демография поколений»•Журнал «Сибирское
  богатство»•Медиа-портал «Афиша Тюмени» •Медиа-Холдинг «ТоболИнфо» (Республика Казахстан) •Медиа-центр «Зоркий» •Портал
  общественных объединений Тюменской области «Диалог» •Просветительский ютуб канал «PROроботов»•Телеканал «Город»
  •Тюменское общественное телевидение (РНИФ «Земля Сибирская») •Электронное периодическое издание «MK.ru» 
    </p>
    <p>
    12.3.
    Образовательные организации: •АНО ДПО «Многопрофильный центр обучения» •Московский госуниверситет пищевых
  производств•Представительство университета «Синергия» в городе Тюмени •Факультет биотехнологий Университета
  ИТМО•Государственный аграрный университет Северного Зауралья•Тюменский медицинский колледж
    </p>
    <p>
    12.3. Общественные
  объединения: •АНО «Большие надежды» •АНО «Вдохновение» •Ассоциация молодых предпринимателей Тюменской
  области•Региональная общественная организация развития молодежных инновационных проектов «Клуб УМНИКов Тюменской
  области» •ТОООО «Всероссийское общество автомобилистов» •Тюменское отделение общероссийской общественной организации
  «Российский красный крест» •Тюменское региональное общественное движение «Здоровый город» •Тюменское региональное
  отделение «Всероссийского корпуса волонтеров – спасателей» •Фонд «Траектория Надежды» 
    </p>
    <h3>13. Прочие положения</h3>
    <p>
    13.1.
    Редакция Положения о конкурсе может изменяться, но без изменений Целей и Задач.
    </p>
    <p>
    13.2. Все изменения будут находиться
  в открытом доступе на сайте конкурса и в любой момент можно получить обратную связь по указанным координатам.Участие в
  онлайн-конкурсе бесплатное!Желаем Вам успешной подготовки и удачного участия! Мы всегда готовы оказать Вам помощь в
  решении возникающих вопросов.Наш адрес «ВКонтакте»: https://vk.com/global_stI
    </p>

    </div>
</div>

  );
}
