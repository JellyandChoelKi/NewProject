import axios from 'axios';

// CSRF 토큰 설정
const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

const instance = axios.create({
    baseURL: 'http://localhost/api', // API의 기본 URL을 설정합니다.
    headers: {
        'X-CSRF-TOKEN': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // 쿠키 기반 인증을 사용하기 위해 withCredentials 설정
});

export default instance;
