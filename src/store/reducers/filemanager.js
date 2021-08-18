import FileManagerActions from "../actions/filemanager";

const initialState = {
	image: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FileManagerActions.UploadImage.SUCCESS:
			return {
				...state,
				image: action.payload
			};
		case FileManagerActions.UploadImageDelete.SUCCESS:
			return {
				...state,
				image: null
			};

		default:
			return state;
	}
};
