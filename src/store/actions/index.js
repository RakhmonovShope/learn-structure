import requireContext from "require-context.macro";
import { importAll } from "../utils";

const moduleActions = importAll(
	requireContext("../../modules", true, /actions.js$/),
	"actions.js"
);
const actions = importAll(requireContext("", false, /\w+$/), ".js");

export default {
	...moduleActions,
	...actions
};
