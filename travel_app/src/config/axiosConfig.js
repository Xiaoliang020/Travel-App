import axios from 'axios';

axios.interceptors.response.use(
  response => {
    // 如果响应成功，直接返回响应
    return response;
  },
  error => {
    // 检查错误响应的状态码是否为401
    if (error.response && error.response.status === 401) {
      // 如果是401，重定向到登录页面
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);