"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const env = process.env.NODE_ENV || 'development'
// let baseURL = 'http://192.168.100.109:8080';
let baseURL = 'http://192.168.100.109:8080'
let url = "http://192.168.100.109:8080"
if (env === 'production') {
    baseURL = process.env.API_URL || 'https://api-app.maisonier.com/api' // 'https://fse-le-maisonier.herokuapp.com/api';
}
else if (env === 'test') {

}

/*let config = {
    baseURL
};*/
let config = {
  baseURL
};
let token = JSON.parse(localStorage.getItem('sigif2.access_token'))
if (token) {
  console.log('token value', token.value);
    token = token.value
}

  const authInstance = axios.create({
        baseURL: `${url}/auth`
  })
  const operationParcInstance = axios.create({
    baseURL: url + '/operationParc'
  })
  const adminInstance = axios.create({
    baseURL: url + '/administration',
    //headers: {'Authorization': `Bearer ${token}`}
  })
  const donneesReferenceInstance = axios.create({
    baseURL: baseURL + '/donneeReference'
  })
  const abbattageInstance = axios.create({
    baseURL: url + '/abattage'
  })
  const fiscaliteInstance = axios.create({
    baseURL: url + '/fiscalite'
  })
  const controleInstance = axios.create({
    baseURL: url + '/controle'
  })
  const permisInstance = axios.create({
    baseURL: url + '/permis'
  })
  const transformationInstance = axios.create({
    baseURL: url + '/transformation'
  })
  const inventaireInstance = axios.create({
    baseURL: url + '/inventaire',
  })
  const codesBarresInstance = axios.create({
    baseURL: url + '/codebarre'
  })
  const titresInstance = axios.create({
    baseURL: url + '/titre'
  })
  const boiscemacInstance = axios.create({
    baseURL: url + '/boisCemac'
  })
  const exportations = axios.create({
    baseURL: url + '/exportation'
  })
  const tracalabilite = axios.create({
    baseURL: url + '/tracalabilite'
  })
  const jasper = axios.create({
    baseURL: url + '/JasperReport'
    //headers: {'Authorization': `Bearer ${token}`}
  })
  
  Vue.prototype.$auth = authInstance
  Vue.prototype.$operationParc = operationParcInstance
  Vue.prototype.$administration = adminInstance
  Vue.prototype.$donneesReference = donneesReferenceInstance
  Vue.prototype.$abbattage = abbattageInstance
  Vue.prototype.$fiscalite = fiscaliteInstance
  Vue.prototype.$controle = controleInstance
  Vue.prototype.$permis = permisInstance
  Vue.prototype.$transformation = transformationInstance
  Vue.prototype.$inventaire = inventaireInstance
  Vue.prototype.$codesbarres = codesBarresInstance
  Vue.prototype.$titres = titresInstance
  Vue.prototype.$boisCemac = boiscemacInstance
  Vue.prototype.$exportations = exportations
  Vue.prototype.$jasper = jasper
  Vue.prototype.$tracalabilite = tracalabilite
  Vue.prototype.$JasperReport = 'http://192.168.100.109:8080/JasperReport'


const _api = {
    all: (values) => axios.all(values),
    spread: (callback) => axios.spread(callback)
}

//interception Authentifica
adminInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = storage.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
            //config.headers['Access-Control-Allow-Origin'] = '*'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

//interception adminisatration
adminInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = storage.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
            //config.headers['Access-Control-Allow-Origin'] = '*'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
// Add a response interceptor module auth
authInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        if (error.response!=undefined&&error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);

// Add a response interceptor
adminInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);

//interception données de reférence
donneesReferenceInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
// Add a response interceptor
donneesReferenceInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }else{
            return Promise.reject(error)

        }
    }
);
//interception opérations de parc
operationParcInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
operationParcInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        else if (error.response!=undefined&&error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//interception module abbattages
abbattageInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
abbattageInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);

//interception module fiscalité
fiscaliteInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
fiscaliteInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//interception module codesbarre
codesBarresInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
codesBarresInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//interception module controle
controleInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
controleInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//interception module permis
permisInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
permisInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//interception module transformation
transformationInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
transformationInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);

//interception module inventaire
inventaireInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = storage.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
            //config.headers['Access-Control-Allow-Origin'] = '*'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
  );
  inventaireInstance.interceptors.response.use(
      function (response) {
          return response
      },
      function (error) {
          if (error.response!=undefined&&error.response.data.status=='407') {
              storage.clear()
              window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
          }
          return Promise.reject(error)
      }
  );


//interception module titres forrestiers
titresInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
titresInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.code=='ERR_NETWORK') {
            return Promise.reject(error)
        }
        if (error.response!=undefined&&error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//interception module BOIS_CEMAC
boiscemacInstance.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
boiscemacInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);

//interception module EXPORTATIONS
exportations.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
exportations.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);

//interception module TRACABILITE
tracalabilite.interceptors.request.use(
  function (config) {
      // Do something before request is sent
      const token = storage.get('access_token')
      if (token != '' && token != null) {
          config.headers['Authorization'] = `Bearer ${token}`
          //config.headers['Access-Control-Allow-Origin'] = '*'
      }
      return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);
tracalabilite.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.data.status=='407') {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login?alreadyconnected=call-alert'
        }
        return Promise.reject(error)
    }
);
//MODULE JASPERREPORT
//interception module EXPORTATIONS
jasper.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = storage.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
            //config.headers['Access-Control-Allow-Origin'] = '*'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
  );



















const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = storage.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
            config.headers['Access-Control-Allow-Origin'] = '*'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Do something with response error
        let response = error.response || null
        if (response == null) {
            return Promise.reject(error)
        }
        let data = response.data || null
        if (data == null) {
            return Promise.reject(response)
        }
        if(data.status==500){
            return App.alertError('Erreur interne du Serveur')
        }
        if (data.code == 498) {
            storage.clear()
            window.location.href = env === 'production' ? '/app/login' : '/login'
        }
        return Promise.reject(data)
    }
);

Vue.use({
    install: function (Vue, options) {
        Vue.axios = _axios;
        window.axios = _axios;

        Vue.api = _api
        window.api = _api

        Object.defineProperties(Vue.prototype, {
            axios: {
                get() {
                    return _axios;
                }
            },
            $axios: {
                get() {
                    return _axios;
                }
            },
            api: {
                get: () => _api
            },
        });
    }
})