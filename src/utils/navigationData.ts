export const routes = {
    HOME:"",
    MY_COLLECTIONS:"my-collections",
    PLAYLIST: "playlist",
    RADIO: "radio",
    VIDEOS: "videos",
    PROFILE: "profile",
    LOGOUT: "logout",
}

export const routeParams = {
    ID: "id"
}

export type NavBtnInfo = {
    icon: string,
    activeStateIcon: string,
    label: string,
    inactiveStateLabelColor: string,
    activeStateLabelColor: string
}
