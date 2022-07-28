import { atom } from 'recoil';

export default atom({
  key: 'movie',
  default: {
    id: '',
    title: '',
    thumbnail_image_url: '',
    country: '',
    category: '',
    genre: [],
    running_time: 0,
    age: 0,
    release_date: '',
    description: '',
    actor: [],
    video_url: [],
    image_url: [],
    review_id: '',
  },
});
