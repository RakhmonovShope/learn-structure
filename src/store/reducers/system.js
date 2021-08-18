import config from "config";
import systemActions from "../actions/system";

const initialState = {
  currentLangCode: config.DEFAULT_LANGUAGE,
  categories: [],
  callback: false,

  pathName: "",
  myAlert: {
    visible: false,
    type: "warning",
    title: "Вы не авторизованы",
    desc: "Чтобы иметь доступ ко всем функциям сайта,вам нужно авторизоваться",
    footerLabel: "У вас нет аккаунта?",
    footerLinkLabel: "Зарегистрироваться",
    footerLink: "/user/signup",
    hasFooter: true
  },
  activeRegionId: "all",
  regionCount: null,
  canViewPhone: [],
  setPhoneVacancy: [],
  isModal: false,
  pageTitle: "",
  regions: [
    {
      id: "all",
      country_id: "all",
      name_ru: "Все регионы",
      lat: null,
      lon: null,
      key: "all",
      name_uz: "Барчаси"
    },
    {
      id: 14,
      country_id: 1,
      name_ru: "Город Ташкент",
      lat: null,
      lon: null,
      key: "tashkent_sh",
      name_uz: "Тошкент шахри"
    },
    {
      id: 13,
      country_id: 1,
      name_ru: "Сырдарьинская область",
      lat: null,
      key: "sirdaryo",
      lon: null,
      name_uz: "Сирдарё вилояти"
    },
    {
      id: 12,
      country_id: 1,
      name_ru: "Сурхандарьинская область",
      lat: null,
      key: "surxandaryo",
      lon: null,
      name_uz: "Сурхондарё вилояти"
    },
    {
      id: 11,
      country_id: 1,
      name_ru: "Самаркандская область",
      lat: null,
      key: "samarqand",
      lon: null,
      name_uz: "Самарқанд вилояти "
    },
    {
      id: 10,
      country_id: 1,
      name_ru: "Навоиская область",
      lat: null,
      key: "navoiy",
      lon: null,
      name_uz: "Навоий вилояти"
    },
    {
      id: 9,
      country_id: 1,
      name_ru: "Наманганская область",
      lat: null,
      key: "namangan",
      lon: null,
      name_uz: "Наманган водийси"
    },
    {
      id: 8,
      country_id: 1,
      name_ru: "Хорезмская область",
      lat: null,
      key: "xorazm",
      lon: null,
      name_uz: "Хоразм вилояти"
    },
    {
      id: 7,
      country_id: 1,
      name_ru: "Кашкадарьинская область",
      lat: null,
      key: "qashqadaryo",
      lon: null,
      name_uz: "Қашқадарё вилояти"
    },
    {
      id: 6,
      country_id: 1,
      name_ru: "Каракалпакстан",
      lat: null,
      key: "qoraqalpoq",
      lon: null,
      name_uz: "Қорақалпоғистон"
    },
    {
      id: 5,
      country_id: 1,
      name_ru: "Джиззакская область",
      lat: null,
      key: "jizzax",
      lon: null,
      name_uz: "Жиззах вилояти"
    },
    {
      id: 4,
      country_id: 1,
      key: "fargona",
      name_ru: "Ферганская область",
      lat: null,
      lon: null,
      name_uz: "Фарғона водийси"
    },
    {
      id: 3,
      country_id: 1,
      name_ru: "Ташкентская область",
      lat: null,
      key: "tashkent_v",
      lon: null,
      name_uz: "Тошкент вилояти"
    },
    {
      id: 2,
      country_id: 1,
      name_ru: "Бухарская область",
      lat: null,
      key: "buxoro",
      lon: null,
      name_uz: "Бухоро вилояти"
    },
    {
      id: 1,
      country_id: 1,
      name_ru: "Андижанская область",
      lat: null,
      key: "andijon",
      lon: null,
      name_uz: "Андижон вилояти"
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case systemActions.ChangeLanguage.TRIGGER: {
      return { ...state, currentLangCode: action.payload };
    }

    case systemActions.SetRegionId.TRIGGER: {
      return { ...state, activeRegionId: action.payload.regionId };
    }

    case systemActions.getRegions.SUCCESS: {
      return { ...state, regionCount: action.payload };
    }

    case systemActions.SetPhoneView.SUCCESS: {
      return {
        ...state,
        canViewPhone: [...state.canViewPhone, Number(action.payload)]
      };
    }
    case systemActions.Callback.SUCCESS: {
      return {
        ...state,
        callback: true
      };
    }
    case systemActions.Callback.FAILURE: {
      return {
        ...state,
        callback: false
      };
    }

    case systemActions.SetPhoneVacancy.SUCCESS: {
      return {
        ...state,
        setPhoneVacancy: [...state.setPhoneVacancy, Number(action.payload)]
      };
    }

    case systemActions.toggleModal.TRIGGER: {
      return { ...state, isModal: action.payload };
    }

    case systemActions.setPageTitle.TRIGGER: {
      return { ...state, pageTitle: action.payload };
    }

    case systemActions.AlertAction.FAILURE: {
      return {
        ...state,
        myAlert: {
          visible: false,
          type: "",
          title: "",
          desc: "",
          footerLabel: "",
          footerLinkLabel: "",
          footerLink: "",
          hasFooter: true
        }
      };
    }

    default:
      return state;
  }
};
