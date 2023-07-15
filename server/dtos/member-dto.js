export class MemberDto {
    full_name;
    email;
    id;
    roles;

    constructor(model) {
        this.full_name = model.full_name;
        this.email = model.email;
        this.id = model.id;
        this.roles = model.roles;
    }
}

