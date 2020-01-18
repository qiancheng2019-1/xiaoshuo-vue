import axios from 'axios'
import router from '../router'
import {
    Toast,
    Dialog
} from 'vant';
import store from '../store/index'



let loading;

// function startLoading() {
//     loading = Toast.loading({
//       duration: 0,
//       message: '拼命加载中...'
//     })
//   }

//   function endLoading() {
//     loading = Toast.clear()
//   }


const token = JSON.parse(localStorage.getItem("userinfo"))
axios.interceptors.request.use(
    config => {

        //    startLoading()   
        if (token) {
            config.headers.Authorization = `Bearer ${token.api_token}`
        } else {
            config.headers.Authorization = ""
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

/*--------------------------------------------------------*/

axios.interceptors.response.use(
    response => {
        // endLoading();
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.data.status_code) {
                case 401:
                    if (localStorage.getItem("userinfo")) {
                        if (this.$route.name == "Bookshelf") {
                            Toast.success("用户凭证过期请重新登录")
                            return
                        }
                        Toast.success("用户凭证过期请重新登录")
                        setTimeout(() => {
                            router.push("/login")
                        }, 2000);
                        return
                    } else {
                       
                        Toast.success("请登录")
                        setTimeout(() => {
                            router.replace("/login")
                        }, 2000);
                    }
                    break;
                case 404:
                  
                      Toast.success(error.response.data.message)
                    
                  
                        
                    

            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

export default axios;