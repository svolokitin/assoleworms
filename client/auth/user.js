import $api from "./instanceAxios.js";


class Users  {
    async registration (name, email, password)  {
        try {
            await $api.post('/api/registration', {
                full_name: name,
                email: email,
                password: password
            })
            .then(function(response) {
                localStorage.setItem('AccessToken', response.data.accessToken)
                if (response.status == 200) {
                    window.location.href = '/main'
                }
            })
            .catch(function(error) {
                alert('Пользователь с таким именем уже существует!')
                console.log(error.message)
            })
            
        } catch (err) {
            alert(err.message)
        }
    }

    async login (name, password) {
        try {
            await $api.post('/api/login', {
                full_name: name,
                password: password
            })
            .then(function(response) {
                localStorage.setItem('AccessToken', response.data.accessToken)
                if (response.status == 200) {
                    window.location.href = '/main'
                }
            })
            .catch(function(error) {
                alert('Пользователя не найдено!')
                console.log(error.message)
            })

        } catch (err) {
            alert(err.message)
        }
    }

    async logout () {
        try {
            await $api.post('/api/logout')
            .then(function(response) {
                localStorage.removeItem('AccessToken', response.data.accessToken)
                if (response.status == 200) {
                    window.location.href = '/main'
                    console.log('AccessToken removed!')
                }
            })
            .catch(function(error) {
                alert('Вы уже вышли с данного аккаунта!')
                console.log('Вы уже вышли с данного аккаунта!');
                return error.message;
            })
        } catch (err) {
            alert(err.message)
        }
    }
}

    
export default new Users();
