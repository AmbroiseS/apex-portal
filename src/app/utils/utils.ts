export default class Utils {
    static validateEmail(email) {
        var re: RegExp = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}