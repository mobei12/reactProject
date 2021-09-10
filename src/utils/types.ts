export interface HttpResponse {
	status: number;
	statusText: string;
	data: {
		code: number;
		desc: string;
		[key: string]: any;
	};
}

export interface OverallStatistics {
	data: Array<any>;
}
