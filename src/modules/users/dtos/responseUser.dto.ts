export class ResponseUserDto {
    id!: string;
    name!: string;
    email!: string;
    role!: string;
    token?: string;
    createdAt!: Date;
}