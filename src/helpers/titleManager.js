export default function setTitle(title) {
    if (title && title.hasOwnProperty('username')) {
        this.pageTitle = title.username.charAt(0).toUpperCase() + title.username.slice(1);
    } else {
        this.pageTitle = title;
    }
};