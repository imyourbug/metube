import VideoRepository from "@/api/repositories/youtube/VideoRepository";

const repositories = {
    video: VideoRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
