import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const UserStore = defineStore('User',() => {
    const users = reactive([
        {
            id: 0,
            name: 'Amber Holmes',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80',
            hearingMusicID: 1,
        },
        {
            id: 1,
            name: 'Mia Jones',
            avatar: 'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B',
            hearingMusicID: 13,
        },
        {
            id: 2,
            name: 'Maria Diaz',
            avatar: 'https://media.glamourmagazine.co.uk/photos/641ad4e2da6e348be265e48f/3:2/w_1920,h_1280,c_limit/A%20GOOD%20PERSON%20220323%20default1.jpg',
            hearingMusicID: 8,
        },
        {
            id: 3,
            name: 'Milton Heig',
            avatar: 'https://media.vanityfair.com/photos/6319eab06009e759e6638e28/master/w_2560%2Cc_limit/1421315651',
            hearingMusicID: 2,
        },
        {
            id: 4,
            name: 'Mia Stones',
            avatar: 'https://www.betterup.com/hubfs/Blog%20Images/authentic-self-person-smiling-at-camera.jpg',
            hearingMusicID: 6,
        },
        {
            id: 5,
            name: 'Dany Brooks',
            avatar: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg',
            hearingMusicID: 19,
        },
        {
            id: 6,
            name: 'Ashley Herch',
            avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg',
            hearingMusicID: 28,
        },
        {
            id: 7,
            name: 'Paul Dong',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Photo_portrait_PP.jpg',
            hearingMusicID: 13,
        },
        {
            id: 8,
            name: 'Leon Pierre',
            avatar: 'https://media.licdn.com/dms/image/D4E03AQGihpp8y8BaWw/profile-displayphoto-shrink_800_800/0/1672728714464?e=2147483647&v=beta&t=kRrxxla1h1ugH_uLdng6KHz4WKgL6dx6libb01faOGk',
            hearingMusicID: 24,
        },
    ])

    const token = ref('')

    return {users, token}
})