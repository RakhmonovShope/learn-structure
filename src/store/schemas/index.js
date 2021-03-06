import requireContext from "require-context.macro";
import { importAll } from "../../utils";

const schemas = importAll(
	requireContext("../../modules", true, /\/schema.js$/),
	"schema.js"
);

export default {
	...schemas
};
