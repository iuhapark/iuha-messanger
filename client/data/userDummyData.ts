import { StaticImageData } from "next/image";

export interface IUserProps {
	id: string;
	username: string;
	name: string;
	surname: string;
	position: string;
	email?: string;
	src: string| StaticImageData;
	isOnline: boolean;
	password: string;
}

const haru: IUserProps = {
	id: '1',
	username: 'haru',
	name: '하루',
	surname: 'Lee',
	position: 'CTO',
	email: 'haru@iuha.com',
	src: '/assets/img/user/haru.png',
	isOnline: true,
	password: '@ABC123',
};

const juha: IUserProps = {
	id: '2',
	username: 'juha',
	name: '주하',
	surname: 'Park',
	position: 'CEO, Founder',
	email: 'juha@iuha.com',
	src: '/assets/img/user/juha.png',
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
	src: '/assets/img/user/yuri.png',
	isOnline: true,
	password: '@ABC123',
};

const hyeonsu: IUserProps = {
	id: '3',
	username: 'hyeonsu',
	name: 'Hyeonsu',
	surname: 'Kim',
	position: 'Worker',
	email: 'hyeonsu@iuha.com',
	src: '/assets/img/user/hyeonsu.png',
	isOnline: true,
	password: '@ABC123',
};

const harry: IUserProps = {
	id: '4',
	username: 'harry',
	name: 'Harry',
	surname: 'Potter',
	position: 'Worker',
	email: 'harry@iuha.com',
	src: '/assets/img/user/harry.png',
	isOnline: true,
	password: '@ABC123',
};
const jennifer: IUserProps = {
	id: '5',
	username: 'jennifer',
	name: 'Jennifer',
	surname: 'Aniston',
	position: 'Worker',
	email: 'jennifer@iuha.com',
	src: '/assets/img/user/jennifer.png',
	isOnline: true,
	password: '@ABC123',
};

const USERS: { [key: string]: IUserProps } = {
	JUHA: juha,
	HARU: haru,
	YURI: yuri,
	HYEONSU: hyeonsu,
	HARRY: harry,
	JENNIFFER: jennifer,
};

export default USERS;