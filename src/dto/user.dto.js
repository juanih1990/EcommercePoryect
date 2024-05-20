class UserDTO {
    constructor({
        email,
        given_name: name,
        family_name: lastName,
        picture,
        sub: passportId,
        age = 0,
        password = 'gmailUser',
        role = "user",
        lastLogin = new Date(),
        cart = null
    }) {
        this.email = email || '';
        this.name = name || '';
        this.lastName = lastName || '';
        this.age = age || 0;
        this.password = password || '';
        this.role = role;
        this.lastLogin = lastLogin;
        this.passportId = passportId || '';
        this.cart = cart;
        this.picture = picture || ''; // Añadimos la propiedad picture para almacenar la URL de la imagen del perfil
    }
}

export default UserDTO;
