import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const TelegramBotInstance = telegramBotToken =>
	((): AxiosInstance =>
		axios.create({
			baseURL: `https://api.telegram.org/bot${telegramBotToken}`,
			timeout: 5000,
			// headers: { 'X-Custom-Header': 'foobar' },
		}))();
