import { toast } from "react-toastify";
import get from "lodash/get";

const companyType = type => {
  switch (type) {
    case 1:
      return "Прозводител";
    case 2:
      return "Поставщик";
    case 3:
      return "Мед учреждение";
    case 4:
      return "Мед училище";
    default: {
      return false;
    }
  }
};

const fileSize = size => {
  if (size / 1024 < 1024) {
    return `${(size / 1024).toFixed(1)} КБ`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} МБ`;
  }
};

const workType = type => {
  switch (type) {
    case 1:
      return "Полное";
    case 2:
      return "Неполное";
    case 3:
      return "Временное";
    case 4:
      return "Сменное";
    case 5:
      return "Удаленное";
    default: {
      return false;
    }
  }
};

const itemStatus = status => {
  switch (status) {
    case 0:
      return { label: "Удалено", class: "company-goods__status--red" };
    case 1:
      return { label: "Модерация", class: "company-goods__status--orange" };
    case 2:
      return { label: "Активный", class: "company-goods__status--green" };
    default:
      return { label: "", class: "company-goods__status--silver" };
  }
};

const fileType = type => {
  switch (type) {
    case "jpg":
      return "attached-files__icon--picture";
    case "png":
      return "attached-files__icon--picture";
    case "jpeg":
      return "attached-files__icon--picture";
    case "svg":
      return "attached-files__icon--picture";
    case "word":
      return "attached-files__icon--word";
    case "excel":
      return "attached-files__icon--word";
    case "txt":
      return "attached-files__icon--word";
    case "pdf":
      return "attached-files__icon--pdf";
    default:
      return "attached-files__icon--archive";
  }
};

const gender = gender => {
  switch (gender) {
    case 1:
      return "Мужской";
    case 2:
      return "Женской";
    default:
      return "Не указано";
  }
};

const toaster = (type, message) => {
  switch (type) {
    case "error":
      return toast.error(message);
    case "success":
      return toast.success(message);
    default:
      return null;
  }
};

const stringToCode = element => {
  const content = element.textContent;

  function toNode(iframeString) {
    const div = document.createElement("div");
    div.innerHTML = iframeString;
    const isYoutubePlayer = iframeString.includes("youtube.com");
    if (isYoutubePlayer) div.classList.add("youtube-player-wrapper");
    return div;
  }

  const parent = element.parentNode;
  const childOembed = parent.querySelector("code");
  childOembed.replaceWith(toNode(content));
};

const isEnableLang = lang => {
  switch (lang) {
    case "ru":
      return true;
    case "uz":
      return true;
    default:
      return false;
  }
};

const isEnableReg = reg => {
  switch (reg) {
    case "andijon":
      return true;
    case "buxoro":
      return true;
    case "tashkent_v":
      return true;
    case "fargona":
      return true;
    case "jizzax":
      return true;
    case "qoraqalpoq":
      return true;
    case "qashqadaryo":
      return true;
    case "xorazm":
      return true;
    case "namangan":
      return true;
    case "navoiy":
      return true;
    case "samarqand":
      return true;
    case "surxandaryo":
      return true;
    case "sirdaryo":
      return true;
    case "tashkent_sh":
      return true;
    case "all":
      return true;
    default:
      return false;
  }
};

//Generatin New Path

const generateNewPath = (langCode, item, key = "slug") => {
  let newPath = "";

  const pathname = window.location.pathname;
  const splitPath = pathname.split("/");

  let _l = get(item, "translations", []).find(i => i.lang === langCode);
  let hasL = isEnableLang(splitPath[1]);

  if (item) {
    if (_l) {
      let beingArr = ["", langCode];
      let arr = [];
      if (hasL) {
        arr = [...beingArr, splitPath[2], _l[key]];
      } else {
        arr = [...beingArr, splitPath[1], _l[key]];
      }
      newPath = arr.join("/");
    } else {
      let beingArr = ["", langCode];
      newPath = beingArr.join("/");
    }
  }

  if (!item) {
    if (isEnableLang(splitPath[1])) {
      splitPath[1] = langCode;

      newPath = splitPath.join("/");
    } else {
      let beingArr = ["", langCode];
      let arr = [...beingArr, ...splitPath.slice(1)];

      newPath = arr.join("/");
    }
  }

  return newPath;
};

const generateNewReg = region => {
  let newPath = "";

  const pathname = window.location.pathname;
  const locationUrl1 = pathname.split("/")[1];

  if (locationUrl1 === "info") {
    const locationUrl3 = pathname.split("/")[3];
    const locationUrl4 = pathname.split("/")[4];
    const locationUrl5 = pathname.split("/")[5];
    if (isEnableReg(locationUrl3)) {
      newPath = `/${locationUrl1}/${isEnableReg(get(region, "key")) ? get(region, "key") : ""}/${locationUrl4}${
        locationUrl5 ? `/${locationUrl5}` : ""
      }`;
    } else {
      newPath = `/${locationUrl1}/${isEnableReg(get(region, "key")) ? get(region, "key") : ""}/${locationUrl3}${
        locationUrl4 ? `/${locationUrl4}` : ""
      }`;
    }
  } else {
    const locationUrl2 = pathname.split("/")[2];
    const locationUrl3 = pathname.split("/")[3];
    const locationUrl4 = pathname.split("/")[4];
    const locationUrl5 = pathname.split("/")[5];
    if (isEnableReg(locationUrl3)) {
      newPath = `/${locationUrl1}/${locationUrl2}/${
        isEnableReg(get(region, "key")) ? get(region, "key") : ""
      }/${locationUrl4}${locationUrl5 ? `/${locationUrl5}` : ""}`;
    } else {
      newPath = `/${locationUrl1}/${locationUrl2}/${
        isEnableReg(get(region, "key")) ? get(region, "key") : ""
      }/${locationUrl3}${locationUrl4 ? `/${locationUrl4}` : ""}`;
    }
  }
  return newPath;
};

const education = [
  { id: "1", name_uz: "Олий", name_ru: "Высшее" },
  { id: "2", name_uz: "Ўрта", name_ru: "Среднее" },
  {
    id: "3",
    name_uz: "Тугалланмаган олий",
    name_ru: "Неполное высшее"
  },
  { id: "4", name_uz: "Ўрта махсус", name_ru: "Средне-специальное" },
  { id: "5", name_uz: "Бошланғич", name_ru: "Начальное" },
  { id: "6", name_uz: "Тиббий", name_ru: "Медицинское" },
  { id: "7", name_uz: "Фармацевтик", name_ru: "Фармацевтическое" }
];

function getEducation(id, lang) {
  const item = education.find(item => item.id === id);
  return get(item, `name_${lang}`);
}

const workTimes = [
  { id: 1, name_uz: "Тўлиқ кун", name_ru: "Полный день" },
  { id: 2, name_uz: "Эркин жадвал", name_ru: "Свободный график" },
  { id: 3, name_uz: "Шартнома", name_ru: "Контракт" },
  { id: 4, name_uz: "Сменада", name_ru: "Посменно" },
  { id: 5, name_uz: "Масофадан туриб", name_ru: "Удаленно" },
  { id: 6, name_uz: "Томоша қилиш", name_ru: "Вахта" },
  {
    id: 7,
    name_uz: "Қисми вақт иш",
    name_ru: "Частичная занятость/совмещение"
  },
  { id: 8, name_uz: "Кечаси", name_ru: "Ночной" },
  { id: 9, name_uz: "Дам олиш кунлари", name_ru: "Работа в выходные" },
  {
    id: 10,
    name_uz: "Кечқурун ишлаш",
    name_ru: "Работа в вечернее время"
  }
];

function getWorkTime(id, lang) {
  const item = workTimes.find(item => item.id === id);
  return get(item, `name_${lang}`);
}

export default {
  companyType,
  fileType,
  workType,
  fileSize,
  itemStatus,
  workTimes,
  education,
  gender,
  toaster,
  stringToCode,
  generateNewPath,
  isEnableLang,
  isEnableReg,
  generateNewReg,
  getEducation,
  getWorkTime
};
