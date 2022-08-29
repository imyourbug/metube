import Repository from '@/repositories/youtube/Repository';

const keyAPI = 'AIzaSyCClLpj_uqqJDqtt_X5n7yvJLT_qsub84M';

export default {
    searchVideoByKeyWord(keyword) {
        let part = 'snippet';
        return Repository.get(`\search?part=${part}?key=${keyAPI}?q=${keyword}`);
    }
}