export class HttpResponseFormat {
	private data: any = null;
	private message: string | string[] = '';
	private code: number = 0;
	
	constructor(data: any, message: string | string[], code: number) {
		this.data = data;
		this.message = message;
		this.code = code;
	};

	getAll(): object {
		return {data: this.data, message: this.message, code: this.code};
	}

	getMessage(): string | string[] {
		return this.message;
	}
}
