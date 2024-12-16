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
// 토큰이 있는 경우 기본 헤더에 추가
const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default instance;
