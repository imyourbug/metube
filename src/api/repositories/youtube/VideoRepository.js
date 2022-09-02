import Repository from '@/api/repositories/Repository';

const baseDomain = 'https://www.googleapis.com';
const baseUrl = `${baseDomain}/youtube/v3`;
const part = 'snippet,contentDetails,statistics'

const keyAPI = 'AIzaSyCClLpj_uqqJDqtt_X5n7yvJLT_qsub84M';
// const resource = '';

export default {
    searchVideoByKeyWord(keyword) {
        return Repository.get(`${baseUrl}/search`, {
            params: {
                part: 'snippet',
                key: keyAPI,
                q: keyword,
                maxResults: 10
            }
        });
    },
    getListTrendingVideos() {
        return Repository.get(`${baseUrl}/videos`, {
            params: {
                part: part,
                chart: 'mostPopular',
                regionCode: 'VN',
                key: keyAPI,
                maxResults: 15
            }
        });
    },
    getVideoByID(id) {
        return Repository.get(`${baseUrl}/videos`, {
            params: {
                part: part,
                id: id,
                key: keyAPI,
            }
        });
    },
    getRelatedVideos(id) {
        return Repository.get(`${baseUrl}/search`, {
            params: {
                part: 'snippet',
                relatedToVideoId: id,
                key: keyAPI,
                type: 'video',
                maxResults: 10
            }
        });
    },
    getMultipleVideoByIDs(ids) {
        return Repository.get(`${baseUrl}/videos`, {
            params: {
                part: part,
                id: ids.join(),
                key: keyAPI,
            }
        });
    },
}