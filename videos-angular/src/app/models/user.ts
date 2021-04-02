export class User {
    public constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public createdAt: any,
        public getToken: boolean
    ) { }
}
