import {defineStore} from 'pinia'
import {reactive, ref} from "vue";
import router from "../router";
import axios from "axios";

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

    const albums = reactive([
        {
            id: 0,
            picture: '/images/M1.png',
            name: 'Chill Mix',
            description: 'Just relax and listen',
            tracksAmount: 39,
            musics:  [
                {
                    id: 1,
                    image: 'https://i.ytimg.com/vi/7_RVoLCx7MU/maxresdefault.jpg',
                    singer: 'Steven Universe',
                    name: 'Escapism',
                    song: '/chilling/Steven Universe feat. AJ Michalka- Grace Rolek- Zach Callison-Escapism -feat. AJ Michalka- Zach Callison - Grace Rolek--textmp3.ru.mp3',
                    auditions: 590_000
                },
                {
                    id: 2,
                    image: 'https://i.ytimg.com/vi/u9YheqFuyng/maxresdefault.jpg',
                    singer: 'Deltarune',
                    name: 'Hip Shop',
                    song: '/chilling/deltarune_28 Hip Shop.mp3',
                    auditions: 120000
                },
                {
                    id: 3,
                    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/28/b2/78/28b278af-182b-4bc3-7922-767dd85bea65/cover.jpg/600x600bf-60.jpg',
                    singer: 'Iamalex',
                    name: 'Lazy Morning',
                    song: '/chilling/Iamalex_juniorodeo_-_Lazy_Morning_(musmore.com).mp3',
                    auditions: 60000
                },
                {
                    id: 4,
                    image: 'https://f4.bcbits.com/img/a0114996247_65',
                    singer: 'OMORI',
                    name: 'Treehouse - Here We Are, Together',
                    song: '/chilling/155. Treehouse - Here We Are, Together Again.mp3',
                    auditions: 945000
                },
                {
                    id: 5,
                    image: 'https://i.ytimg.com/vi/EBhFHJMVfiI/maxresdefault.jpg',
                    singer: 'Undertale',
                    name: 'Home',
                    song: '/chilling/undertale_012. Home.mp3',
                    auditions: 1_245_000
                },
                {
                    id: 6,
                    image: 'https://i1.sndcdn.com/artworks-a7y15RvtQ0h5BWMS-T2zvDw-t500x500.jpg',
                    singer: 'Project AER',
                    name: 'After Sunset',
                    song: '/chilling/Project_AER_Wys_-_After_Sunset_(musmore.com).mp3',
                    auditions: 240_000
                },
            ]
        },
        {
            id: 1,
            picture: '/images/M2.png',
            name: 'Gamer Mix',
            description: 'Listen while you play',
            tracksAmount: 47,
            musics: [
                {
                    id: 1,
                    image: 'https://images.genius.com/577c9c8e6dea8ccb572bc3d2babe9b01.1000x1000x1.png',
                    singer: '1nonly',
                    name: 'Stay With Me',
                    song: '/Gamer Mix/1nonly-stay-with-me-mp3.mp3',
                    auditions: 27_000
                },
                {
                    id: 2,
                    image: 'https://i.ytimg.com/vi/vvo0kZSuQkE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWShHMA8=&rs=AOn4CLCJR1Z6lyNAyk2xCYHE2evKgVcBlw',
                    singer: 'JAZZ x PLUGGNB',
                    name: 'SUPЇDO',
                    song: '/Gamer Mix/[FREE] NEW JAZZ x PLUGGNB TYPE BEAT ＂SUPЇDO＂ [PROD. FROZY].mp3',
                    auditions: 472_000
                },
                {
                    id: 3,
                    image: 'https://images.genius.com/4a63493ece0b99d9c6cca57e6cec1236.1000x1000x1.jpg',
                    singer: 'Kanii & 9lives',
                    name: 'Go',
                    song: '/Gamer Mix/kanii-9lives-go-xtayalive-2.mp3',
                    auditions: 1_314_000
                },
                {
                    id: 4,
                    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/87/6b/38/876b382a-7636-2aa1-9bf0-ba77dd3dfac9/197746018502.jpg/1200x1200bf-60.jpg',
                    singer: 'John Bis',
                    name: 'PISTA TOMA TOMA',
                    song: '/Gamer Mix/rxdxvil-dj-fku-john-bis-t-mtg-pista-toma-mp3.mp3',
                    auditions: 2_720_000
                },
                {
                    id: 5,
                    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Undertale_Soundtrack_2015.jpg',
                    singer: 'Undertale',
                    name: 'Battle Against a True Hero',
                    song: '/Gamer Mix/undertale_098. Battle Against a True Hero.mp3',
                    auditions: 720_000
                },
                {
                    id: 6,
                    image: 'https://lastfm.freetls.fastly.net/i/u/ar0/924287a73e308cfca6f04c868ed5edf3.jpg',
                    singer: '#18',
                    name: 'L\'Étoile D\'Afrique',
                    song: '/Gamer Mix/VDYCD_-_Ltoile_Dafrique_-_18_(musmore.com).mp3',
                    auditions: 15_000
                },
                {
                    id: 7,
                    image: 'https://i1.sndcdn.com/artworks-zzbyz2rRjbNHP8Ez-BLUhzg-t500x500.jpg',
                    singer: '#18',
                    name: 'L’Art Du Savoir',
                    song: '.Gamer Mix/VDYCD_-_LArt_Du_Savoir_-_VDYCD__(musmore.com).mp3',
                    auditions: 79_000
                },
                {
                    id: 8,
                    image: 'https://i.scdn.co/image/ab67616d0000b273b5c128b71507ef309ff4912e',
                    singer: 'Jnhygs',
                    name: 'Jnhygs - Shake That Shit!',
                    song: '/Gamer Mix/Jnhygs - Shake That Shit!.mp3',
                    auditions: 157_000
                },
            ]
        },
        {
            id: 2,
            picture: '/images/M3.png',
            name: 'Future Mix',
            description: 'Of your favorites',
            tracksAmount: 26,
            musics: [
                {
                    id: 1,
                    image: 'https://i.pinimg.com/originals/47/a3/f9/47a3f9a5b08fb16e494a53e30c98dfe3.jpg',
                    singer: '50 Cent',
                    name: 'Just A Lil Bit',
                    song: '/Future Mix/50 Cent - Just A Lil Bit (Produced By Sc.mp3',
                    auditions: 250000
                },
                {
                    id: 2,
                    image: 'https://preview.redd.it/jujutsu-kaisen-season-2-shibuya-incident-arc-op-specialz-by-v0-z4kkbkcotglb1.jpeg?width=1874&format=pjpg&auto=webp&s=e62856ea2092541c30ea0042f3d2840e7a6b14da',
                    singer: 'Jujutsu Kaisen',
                    name: 'SPECIALZ',
                    song: '/Future Mix/King Gnu (Магическая битва 2 сезон 2 опенинг) - SPECIALZ (Jujutsu Kaisen 2nd Season OPENING 2).mp3',
                    auditions: 380000
                },
                {
                    id: 3,
                    image: 'https://www.fsunews.com/gcdn/presto/2022/11/26/PFSU/41eee0a3-f6e4-4772-8892-93e40da92404-chainsaw_man.jpeg?width=660&height=372&fit=crop&format=pjpg&auto=webp',
                    singer: 'Chainsaw Man',
                    name: 'Maximum The Hormone',
                    song: '/Future Mix/Maximum The Hormone (Человек бензопила 3 эндинг) - Hawatari 2-Oku Centi (Chainsaw Man ENDING 3).mp3',
                    auditions: 480000
                },
                {
                    id: 4,
                    image: 'https://www.cyberpunk.net/build/images/edgerunners/phase2/cover-desktop@1x-e6d6aaa1.jpg',
                    singer: 'Cyberpunk',
                    name: 'I Really Want to Stay at Your House',
                    song: '/Future Mix/Rosa Walton - I Really Want to Stay at Your House (feat. Hallie Coggins).mp3',
                    auditions: 1270000
                },
                {
                    id: 5,
                    image: 'https://i1.sndcdn.com/artworks-CsUPhld61lZ0-0-t500x500.jpg',
                    singer: 'Odetari & 6arelyhuman',
                    name: 'GMFU',
                    song: '/Future Mix/Odetari & 6arelyhuman - GMFU (w 6arelyhuman).mp3',
                    auditions: 250000
                },
                {
                    id: 6,
                    image: 'https://i1.sndcdn.com/artworks-000552352545-v9yjqc-t500x500.jpg',
                    singer: 'Post Malone',
                    name: 'Sunflower',
                    song: '/Future Mix/Post Malone feat. Swae Lee - Sunflower.mp3',
                    auditions: 4_300_000
                },
                {
                    id: 7,
                    image: 'https://www.drworkout.fitness/wp-content/uploads/2021/07/Travis-Scott-Workout.jpg',
                    singer: 'Travi Scott',
                    name: '3500',
                    song: '/Future Mix/Travi Scott - 3500 (feat. Future & 2 Chainz).mp3',
                    auditions: 2_400_000
                },
            ]
        },
        {
            id: 3,
            picture: '/images/M4.png',
            name: 'Classical Mix',
            description: 'Classic of all time',
            tracksAmount: 39,
            musics: [
                {
                    id: 1,
                    image: 'https://www.gramophone.co.uk/media/222989/camille-saint-saens-pictorial-press-ltd-alamy-stock-photo.jpg?width=795.7559681697613&height=800',
                    singer: 'Camille Saint',
                    name: 'Carnival',
                    song: '/Classical Mix/Camille Saint-Saens - Carnival of the Animals The Swan.mp3',
                    auditions: 73_000
                },
                {
                    id: 2,
                    image: 'https://cdn.epidemicsound.com/curation-assets/commercial-release-cover-images/4153/3000x3000.jpg?height=300&width=300',
                    singer: 'Franz Gordon',
                    name: 'The Tired Summer',
                    song: '/Classical Mix/Franz_Gordon_-_The_Tired_Summer_(musmore.com).mp3',
                    auditions: 129_000
                },
                {
                    id: 3,
                    image: 'https://i.scdn.co/image/ab67616d0000b2734810ca2ad15d1c6100823244',
                    singer: 'Jordan Critz',
                    name: 'Imbre',
                    song: '/Classical Mix/Jordan Critz - Imbre.mp3',
                    auditions: 201_000
                },
                {
                    id: 4,
                    imag4e: 'https://i.scdn.co/image/ab67616d0000b2734810ca2ad15d1c6100823244',
                    singer: 'Jordan Critz',
                    name: 'Starry Night',
                    song: '/Classical Mix/Jordan Critz - Starry Night (Piano).mp3',
                    auditions: 32_000
                },
                {
                    id: 5,
                    image: 'https://pbs.twimg.com/media/FUayVzoUcAAnFR7.jpg',
                    singer: 'OMORI',
                    name: 'Final Duet',
                    song: '/Classical Mix/omori-final-duet_(MUZMiNO.ORG).mp3',
                    auditions: 769_000
                },
                {
                    id: 6,
                    image: 'https://i.scdn.co/image/ab67616d00001e024fff9d8a24f392aa5baa4e75',
                    singer: 'Polyanna Maxim',
                    name: 'Dark Moment',
                    song: '/Classical Mix/Pollyanna_Maxim_-_Dark_Moment_73564785.mp3',
                    auditions: 160_000
                },
            ]
        },
    ])

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

    const search = ref('');
    const isShuffled = ref(true);

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
        isShuffled
    }
})
