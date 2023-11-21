import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const UserStore = defineStore('User',():any => {
    const users = ref([]);

    const token = ref('')

    return {users, token}
})