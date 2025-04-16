import USERS, { IUserProps } from "./userDummyData";

export interface IMessages {
	id: number;
	messages: { id: number; message: string }[];
	user: IUserProps;
	isReply?: boolean;
}

const JUHA_VS_SAM: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: '안녕하세요. 백엔드 개발자 박주하입니다!',
			},
		],
		user: USERS.JUHA,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message: "저에 궁금하신 게 있으신가요?",
			},
		],
		user: USERS.JUHA,
		isReply: true,
	},
];

const YURI_VS_SAM: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Has everyone screened the new edit? Any thoughts?',
			},
		],
		user: USERS.YURI,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message: "Ah, can't wait to hear your notes!",
			},
		],
		user: USERS.SAM,
		isReply: true,
	},
	{
		id: 3,
		messages: [
			{
				id: 3,
				message: 'Just watched it.',
			},
			{
				id: 4,
				message: 'The driving scenes are working well.',
			},
			{
				id: 5,
				message:
					'I think the new sequence made a huge improvement with the pacing and flow',
			},
		],
		user: USERS.YURI,
	},
	{
		id: 4,
		messages: [
			{
				id: 6,
				message: "Ella, I'd like to finesse the night scenes before color grading.",
			},
		],
		user: USERS.SAM,
		isReply: true,
	},
	{
		id: 5,
		messages: [
			{
				id: 7,
				message: 'Agreed! The ending is perfect! 🎉',
			},
			{
				id: 8,
				message: "I think it's really starting to shine.",
			},
		],
		user: USERS.YURI,
	},
];

const CHATS: { [key: string]: IMessages[] } = {
	JUHA_VS_SAM,
    YURI_VS_SAM,
};

export default CHATS;