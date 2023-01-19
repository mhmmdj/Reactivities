import { makeAutoObservable } from "mobx";
import { ServerError } from "../Model/ServerError";

export default class CommonStore {
	error: ServerError | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setServerError = (error: ServerError) => {
		this.error = error
	} 
}