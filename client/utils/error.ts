import axios, { AxiosError } from 'axios';

const error = (html: string) => { alert(html); };

/** Error Handling */
export const errorHandling = (err:unknown) => {
	if(axios.isAxiosError(err) && err.response) {
		const { data } = err.response;
		if (data) {

			const { code, type, message } = data;
			console.error('서버 오류 코드:', code);
			console.error('서버 오류 유형:', type);
			console.error('서버 오류 응답:', message);

			error(message);
			if(code === 401)
				window.location.href = '/logout';

		} else error('서버 오류가 발생했으나 반환받은 Code와 Message가 없습니다.');
	} else console.error(err);
};