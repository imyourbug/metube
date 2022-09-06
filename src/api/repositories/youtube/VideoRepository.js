import Repository from '@/api/repositories/Repository';

const baseDomain = 'https://www.googleapis.com';
const baseUrl = `${baseDomain}/youtube/v3`;
const part = 'snippet,contentDetails,statistics'

const access_token = localStorage.getItem('access_token') ?? '';
const keyAPI = 'AIzaSyD97uUBO0mbfDQ_oJTz0FdQZ0HOPFHsFjw';
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
    getCommentsByVideoID(id) {
        return Repository.get(`${baseUrl}/commentThreads`, {
            params: {
                part: 'snippet,replies',
                key: keyAPI,
                textFormat: 'plainText',
                videoId: id,
            }
        });
    },
    addComment(video_id, channel_id, comment) {
        console.log(video_id, channel_id, comment, access_token);
        return Repository.post(`${baseUrl}/commentThreads/`, {
            'body': {
                "snippet": {
                    "channelId": channel_id,
                    "topLevelComment": {
                        "snippet": {
                            "textOriginal": comment
                        }
                    },
                    "videoId": video_id
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        });
    }
}