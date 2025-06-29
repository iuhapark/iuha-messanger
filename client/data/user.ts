import { User } from "@/types";

const haru: User = {
  id: '1',
  username: 'haru',
  password: '@ABC123',
  name: '하루',
  email: 'haru@iuha.com',
  profile: '/assets/img/user/haru.png',
  role: 'USER',
};

const juha: User = {
	id: '2',
	username: 'juha',
  	password: '@ABC123',
	name: '주하',
	email: 'juha@iuha.com',
	profile: '/assets/img/user/juha.png',
  role: 'USER',
};

const i: User = {
	id: '3',
	username: 'i',
  	password: '@ABC123',
	name: '아이',
	email: 'i@iuha.com',
	profile: '/assets/img/user/i.png',
  role: 'USER',
};

const mulon: User = {
	id: '4',
	username: 'mulon',
  	password: '@ABC123',
	name: '물론 머스크',
	email: 'mulon@iuha.com',
	profile: '/assets/img/user/mulon.png',
  role: 'USER',
};

const tim: User = {
	id: '5',
	username: 'tim',
  	password: '@ABC123',
	name: '팀 큭',
	email: 'tim@iuha.com',
	profile: '/assets/img/user/tim.png',
  role: 'USER',
};

const sam: User = {
	id: '6',
	username: 'sam',
  	password: '@ABC123',
	name: '샘 울트라맨',
	email: '@iuha.com',
	profile: '/assets/img/user/sam.png',
  role: 'USER',
};

const yuri: User = {
	id: '7',
	username: 'yuri',
 	 password: '@ABC123',
	name: '유리',
	email: 'yuri@iuha.com',
	profile: '/assets/img/user/yuri.png',
  role: 'USER',
};

const hyeonsu: User = {
	id: '8',
	username: 'hyeonsu',
  	password: '@ABC123',
	name: '현수',
	email: 'hyeonsu@iuha.com',
	profile: '/assets/img/user/hyeonsu.png',
  role: 'USER',
};

const harry: User = {
	id: '9',
	username: 'harry',
 	 password: '@ABC123',
	name: '해리',
	email: 'harry@iuha.com',
	profile: '/assets/img/user/harry.png',
  role: 'USER',
};

const jennifer: User = {
	id: '10',
	username: 'jennifer',
 	password: '@ABC123',
	name: '제니퍼',
	email: 'jennifer@iuha.com',
	profile: '/assets/img/user/jennifer.png',
  	role: 'USER',
};

const rocket: User = {
	id: '11',
	username: 'rocket',
 	password: '@ABC123',
	name: '로켓',
	email: 'rocket@iuha.com',
	profile: '/assets/img/user/rocket.png',
  	role: 'USER',
};

const USERS: { [key: string]: User } = {
	HARU: haru,
	JUHA: juha,
	I: i,
	MULON: mulon,
	TIM: tim,
	SAM: sam,
	YURI: yuri,
	HYEONSU: hyeonsu,
	HARRY: harry,
	JENNIFER: jennifer,
	ROCKET: rocket,
};

export default USERS;