import {defineStore} from 'pinia'
import {computed, reactive, ref, watch} from "vue";
import router from "../router";
import axios from "axios";
import {useMediaControls} from "@vueuse/core";

export const musicStore = defineStore('', () => {
    const currentPlaylistId = ref(null)
    const currentPlaylist = [
        {
            id: 1,
            image: 'https://i.ytimg.com/vi/jxMIiS8RR0Y/maxresdefault.jpg',
            singer: 'Rauf & Faik',
            name: 'Мосты',
            song: '/Мосты (8D AUDIO GS)   Rauf   Faik.mp3',
            auditions: 427_000
        },
        {
            id: 2,
            image: 'https://i.scdn.co/image/ab6761610000e5ebaa8f14c655dbacb8b3be6b83',
            singer: 'Moldanazar',
            name: 'Өзің ғана',
            song: '/Өзің ғана   Moldanazar.mp3',
            auditions: 34_000
        },
        {
            id: 3,
            image: 'https://i.scdn.co/image/ab67616d0000b273ca221b0c323b13b314460abf',
            singer: 'Fujii Kaze',
            name: 'Shinunoga E-Wa',
            song: '/Shinunoga E-Wa - Fujii Kaze.m4a',
            auditions: 673_000
        },
        {
            id: 4,
            image: 'https://lastfm.freetls.fastly.net/i/u/300x300/2a5b408c35267633f7b8161283767e43.jpg',
            singer: 'YOASOBI',
            name: 'アイドル',
            song: '/Yoasobi.mp3',
            auditions: 11_000_000
        },
        {
            id: 5,
            image: 'https://i.ytimg.com/vi/MeljgyLR2D0/maxresdefault.jpg',
            singer: 'OMORI',
            name: 'World\'s End Valentine',
            song: '/OMOCAT,OMORI OST - 086 World s End Valentine.mp3',
            auditions: 547_000
        },
    ]
    const currentMusicId = ref(0)

    const genres = reactive([
        {
            name: 'House',
            isActive: false
        },
        {
            name: 'Classic',
            isActive: false
        },
        {
            name: 'Minimal',
            isActive: false
        },
        {
            name: 'Hip-Hop',
            isActive: false
        },
        {
            name: 'Electronic',
            isActive: false
        },
        {
            name: 'Chill-out',
            isActive: false
        },
        {
            name: 'Blues',
            isActive: false
        },
        {
            name: 'Country',
            isActive: false
        },
        {
            name: 'Techno',
            isActive: false
        },
        {
            name: 'Pop',
            isActive: false
        }
    ])

    let albums = reactive([])

    const defaultMusic = reactive([
        {
            id: 1,
            image: 'https://i.ytimg.com/vi/jxMIiS8RR0Y/maxresdefault.jpg',
            singer: 'Rauf & Faik',
            name: 'Мосты',
            song: '/Мосты (8D AUDIO GS)   Rauf   Faik.mp3',
            auditions: 427_000
        },
        {
            id: 2,
            image: 'https://i.scdn.co/image/ab6761610000e5ebaa8f14c655dbacb8b3be6b83',
            singer: 'Moldanazar',
            name: 'Өзің ғана',
            song: '/Өзің ғана   Moldanazar.mp3',
            auditions: 34_000
        },
        {
            id: 3,
            image: 'https://i.scdn.co/image/ab67616d0000b273ca221b0c323b13b314460abf',
            singer: 'Fujii Kaze',
            name: 'Shinunoga E-Wa',
            song: '/Shinunoga E-Wa - Fujii Kaze.m4a',
            auditions: 673_000
        },
        {
            id: 4,
            image: 'https://lastfm.freetls.fastly.net/i/u/300x300/2a5b408c35267633f7b8161283767e43.jpg',
            singer: 'YOASOBI',
            name: 'アイドル',
            song: '/Yoasobi.mp3',
            auditions: 11_000_000
        },
        {
            id: 5,
            image: 'https://i.ytimg.com/vi/MeljgyLR2D0/maxresdefault.jpg',
            singer: 'OMORI',
            name: 'World\'s End Valentine',
            song: '/OMOCAT,OMORI OST - 086 World s End Valentine.mp3',
            auditions: 547_000
        },
    ])

    const favorite = reactive([]);

    const globalMusic = ref([])

    const fetchGlobalMusic = async () => {
        const res = await fetch('http://localhost:3000/musics');
        globalMusic.value = await res.json();
    }

    const fetchMainAlbums = async () => {
        if (!localStorage.getItem('token')) {
            await router.push('/auth')
            return;
        }
        const res = await axios.get("http://localhost:3000/albums")
        console.log(res.data)
        musicStore().albums = res.data;
    }

    const checkToken = async () => {
        if (!localStorage.getItem('token')) {
            await router.push('/auth')
            return;
        }
        try {
            const res = await axios.get('http://localhost:3000/checkToken', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                }
            })
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.removeItem('token')
                await router.push('/auth')
            } else {
                console.error(e)
            }
        }
    }

    const recentlyPlayed = reactive([]);

    const search = ref('');
    const isShuffled = ref(false);

    const audio = ref(document.getElementById('musicRoot'));

    const {playing} = useMediaControls(audio)

    return {
        music: currentPlaylist,
        currentMusic: currentMusicId,
        genres,
        albums,
        defaultMusic,
        favorite,
        currentPlaylistId,
        search, globalMusic,
        fetchGlobalMusic,
        checkToken,
        isShuffled,
        fetchMainAlbums,
        recentlyPlayed,
        audio,
        playing
    }
})
