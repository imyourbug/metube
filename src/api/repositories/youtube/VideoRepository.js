import Repository from '@/api/repositories/Repository';

const baseDomain = 'https://www.googleapis.com';
const baseUrl = `${baseDomain}/youtube/v3`;

const keyAPI = 'AIzaSyCClLpj_uqqJDqtt_X5n7yvJLT_qsub84M';
// const resource = '';

export default {
    searchVideoByKeyWord(keyword) {
        return Repository.get(`${baseUrl}/search`, {
            params: {
                part: 'snippet',
                key: keyAPI,
                q: keyword
            }
        });
    },
    getListTrendingVideos() {
        return Repository.get(`${baseUrl}/videos`, {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                regionCode: 'VN',
                key: keyAPI,
                maxResults: 10
            }
        });
    },
    getVideoByID(id) {
        return Repository.get(`${baseUrl}/videos`, {
            params: {
                part: 'snippet',
                id: id,
                key: keyAPI,
            }
        });
    },
}