import config from "../../config";
import systemActions from "../actions/system";

const initialState = {
	currentLangCode: config.DEFAULT_LANGUAGE,
	categories: [],
	callback: false,

	pathName: ""
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
				setPhoneVacancy: [
					...state.setPhoneVacancy,
					Number(action.payload)
				]
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
