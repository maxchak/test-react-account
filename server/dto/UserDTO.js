export class UserDTO {
  id;
  phone;
  name;
  email;
  about;
  constructor(model) {
    this.id = model.id;
    this.phone = model.phone;
    this.name = model.name;
    this.email = model.email;
    this.about = model.about;
  }
}
