import { StaticImageData } from "next/image";
import UserImage from "../../assets/img/user/juha.png";
import UserImage2 from "../../assets/img/user/sam.png";
import UserImage3 from "../../assets/img/user/yuri.png";

export interface IUserProps {
	id: string;
	username: string;
	name: string;
	surname: string;
	position: string;
	email?: string;
	src: string| StaticImageData;
	isOnline: boolean;
	isReply?: boolean;
	fullImage?: string;
	password: string;
}

const juha: IUserProps = {
	id: '1',
	username: 'juha',
	name: 'Juha',
	surname: 'Park',
	position: 'CEO, Founder',
	email: 'juha@iuha.com',
	src: UserImage,
	isOnline: true,
	isReply: true,
	password: '@ABC123',
};

const sam: IUserProps = {
	id: '2',
	username: 'sam',
	name: 'Sam',
	surname: 'Kim',
	position: 'Worker',
	email: 'sam@iuha.com',
	src: UserImage2,
	isOnline: true,
	password: '@ABC123',
};

const yuri: IUserProps = {
	id: '2',
	username: 'yuri',
	name: 'Yuri',
	surname: 'Seok',
	position: 'Worker',
	email: 'yuri@iuha.com',
	src: UserImage3,
	isOnline: true,
	password: '@ABC123',
};

const USERS: { [key: string]: IUserProps } = {
	JUHA: juha,
	SAM: sam,
	YURI: yuri,
};

export default USERS;